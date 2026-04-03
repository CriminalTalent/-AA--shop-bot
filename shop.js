// ============================================================
// shop.js — 상가 거리 봇
// ============================================================
import "dotenv/config";
import { createRestAPIClient, createStreamingAPIClient } from "masto";
import { PUBLIC_STATS, HIDDEN_STATS, buildStatusLine }  from "./game.js";
import { getItems, SHOP_FILTER, 장착형, drawTarot, buildTarotReading } from "./items.js";
import {
  getPlayer,
  buyItem,
  sellItem,
  useItem,
  eatFood,
  equipItem,
  unequipSlot,
  processPlayer,
} from "./storage.js";
import { logTransaction } from "./sheets.js";

const BOT_TOKEN    = process.env.SHOP_TOKEN;
const INSTANCE_URL = process.env.MASTODON_URL;

if (!BOT_TOKEN || !INSTANCE_URL) {
  console.error(".env 설정 필요: MASTODON_URL, SHOP_TOKEN");
  process.exit(1);
}

const rest      = createRestAPIClient({ url: INSTANCE_URL, accessToken: BOT_TOKEN });
const streaming = createStreamingAPIClient({
  streamingApiUrl: INSTANCE_URL.replace(/\/$/, "") + "/api/v1/streaming",
  accessToken:     BOT_TOKEN,
});

// ── 야바위 설정 ───────────────────────────────────────────────

const YABAUI = {
  하: {
    cups:      3,
    successRate: 1 / 3,
    multiplier: 2,    // 성공 시 베팅액 x2 수령 (순수익 100%)
    desc:      "컵 3개",
    dealerLine: [
      "노점상이 느긋하게 컵을 천천히 섞는다. 눈으로 따라가기 어렵지 않다.",
      "\"자, 잘 봐~ 이 정도는 쉽지?\"",
    ],
    winLines: [
      "컵을 들어올리자 구슬이 또르르 굴러 나온다. 노점상이 씩 웃으며 돈을 내민다.",
      "\"운이 좋군. 다시 한 번 해볼 텐가?\"",
    ],
    loseLine: [
      "컵 아래는 텅 비어 있다. 구슬은 엉뚱한 곳에 숨어 있었다.",
      "\"아이고, 아깝네. 한 번 더 하면 맞출 텐데?\"",
    ],
  },
  중: {
    cups:      3,
    successRate: 1 / 4,
    multiplier: 3,    // 성공 시 베팅액 x3 수령 (순수익 200%)
    desc:      "컵 3개 (딜러 속임수 있음)",
    dealerLine: [
      "노점상의 손놀림이 제법 빠르다. 눈을 부릅뜨고 봐도 헷갈린다.",
      "\"자자자~ 어디 있게? 잘 봐야 해~\"",
    ],
    winLines: [
      "컵을 들자 구슬이 나왔다. 노점상의 표정이 굳는다.",
      "\"…재수 좋은 녀석. 돈 가져가.\"",
    ],
    loseLine: [
      "컵 아래는 비어 있다. 노점상이 다른 컵을 들어 보이며 씩 웃는다.",
      "\"여기 있었지~ 눈 똑바로 뜨고 봐야 해.\"",
    ],
  },
  상: {
    cups:      5,
    successRate: 1 / 6,
    multiplier: 5,    // 성공 시 베팅액 x5 수령 (순수익 400%)
    desc:      "컵 5개 (고수 딜러)",
    dealerLine: [
      "노점상의 손이 눈에 보이지 않는다. 컵들이 번개처럼 섞인다.",
      "\"이걸 맞추는 사람은 지금껏 셋밖에 없었지. 한번 해보겠나?\"",
    ],
    winLines: [
      "컵을 들자 구슬이 반짝인다. 노점상이 멈칫하더니 깊게 한숨을 내쉰다.",
      "\"...귀신이 따로 없군. 가져가시오.\"",
    ],
    loseLine: [
      "컵 아래엔 아무것도 없다. 노점상이 다른 컵을 들어 구슬을 보여주며 웃는다.",
      "\"허허. 이 판에서 이기려면 열 번은 더 와야 할 거야.\"",
    ],
  },
};

// ── 메시지 유틸 ───────────────────────────────────────────────

function parseTokens(content) {
  const plain   = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const matches = [...plain.matchAll(/\[([^\]]+)\]/g)];
  return matches.map((m) => {
    const parts = m[1].split("/");
    return { key: parts[0].trim(), value: parts[1]?.trim() ?? null, extra: parts[2]?.trim() ?? null };
  });
}

function splitText(text, limit) {
  if (text.length <= limit) return [text];
  const chunks = [];
  while (text.length > 0) {
    chunks.push(text.slice(0, limit));
    text = text.slice(limit);
  }
  return chunks;
}

async function reply(notification, text) {
  const chunks  = splitText(text, 480);
  let   replyId = notification.status?.id;
  for (const chunk of chunks) {
    const status = await rest.v1.statuses.create({
      status:      `@${notification.account.acct} ${chunk}`,
      inReplyToId: replyId,
      visibility:  notification.status?.visibility ?? "unlisted",
    });
    replyId = status.id;
  }
}

// ── 명령 핸들러 ───────────────────────────────────────────────

// [상가/무기상] [상가/의상실] [상가/잡화점]
async function handleShopList(notification, shopName) {
  const filter = SHOP_FILTER[shopName];
  if (!filter) {
    await reply(notification, "상점명을 확인해주세요. (무기상 / 의상실 / 잡화점)");
    return;
  }

  const ITEMS   = await getItems();
  const entries = Object.entries(ITEMS).filter(([, item]) => filter(item));

  if (entries.length === 0) {
    await reply(notification, `${shopName}에 등록된 아이템이 없습니다.`);
    return;
  }

  const lines = entries.map(([name, item]) => {
    const effects = 장착형.has(item.category) ? item.equip : item.use;
    const fx      = Object.entries(effects ?? {}).map(([s, d]) => `${s}${d > 0 ? "+" : ""}${d}`).join(", ");
    const tag     = 장착형.has(item.category) ? `[${item.slot}]` : "[소비]";
    return `${tag} ${name} — ${item.price}G (판매 ${item.sellPrice}G) | ${fx}`;
  });

  await reply(notification, `[${shopName} 목록]\n${lines.join("\n")}`);
}

// [레스토랑]
async function handleRestaurant(notification) {
  const ITEMS   = await getItems();
  const entries = Object.entries(ITEMS).filter(([, item]) => item.category === "음식");

  if (entries.length === 0) {
    await reply(notification, "레스토랑 메뉴가 없습니다.");
    return;
  }

  const lines = entries.map(([name, item]) => {
    const fx = Object.entries(item.use ?? {}).map(([s, d]) => `${s}${d > 0 ? "+" : ""}${d}`).join(", ");
    return `${name} — ${item.price}G | ${fx}`;
  });

  await reply(notification, `[레스토랑 메뉴]\n${lines.join("\n")}\n\n구매 즉시 효과 적용됩니다.`);
}

// [구매/이름]
async function handleBuy(notification, accountId, displayName, itemName) {
  if (!itemName) { await reply(notification, "아이템명을 입력해주세요."); return; }

  const ITEMS = await getItems();
  const item  = ITEMS[itemName];
  if (!item)  { await reply(notification, `'${itemName}'은(는) 없는 아이템입니다.`); return; }

  if (item.category === "음식") {
    const result = await eatFood(accountId, displayName, itemName, PUBLIC_STATS, HIDDEN_STATS);
    if (!result.ok) { await reply(notification, result.reason); return; }

    const fx = Object.entries(item.use ?? {}).map(([s, d]) => `${s}${d > 0 ? "+" : ""}${d}`).join(", ");
    await reply(notification, `[${itemName}] 식사 완료.\n-${item.price}G / ${fx}\n소지금: ${result.updated.gold}G`);
    await logTransaction(displayName, "식사", itemName, -item.price, result.updated.gold);
    return;
  }

  const result = await buyItem(accountId, displayName, itemName);
  if (!result.ok) { await reply(notification, result.reason); return; }

  await reply(notification, `[${itemName}] 구매 완료.\n-${item.price}G | 소지금: ${result.updated.gold}G`);
  await logTransaction(displayName, "구매", itemName, -item.price, result.updated.gold);
}

// [판매/이름]
async function handleSell(notification, accountId, displayName, itemName) {
  if (!itemName) { await reply(notification, "아이템명을 입력해주세요."); return; }

  const result = await sellItem(accountId, displayName, itemName);
  if (!result.ok) { await reply(notification, result.reason); return; }

  const ITEMS = await getItems();
  const item  = ITEMS[itemName];
  await reply(notification, `[${itemName}] 판매 완료.\n+${item.sellPrice}G | 소지금: ${result.updated.gold}G`);
  await logTransaction(displayName, "판매", itemName, +item.sellPrice, result.updated.gold);
}

// [사용/이름]
async function handleUse(notification, accountId, displayName, itemName) {
  if (!itemName) { await reply(notification, "아이템명을 입력해주세요."); return; }

  const result = await useItem(accountId, displayName, itemName, PUBLIC_STATS, HIDDEN_STATS);
  if (!result.ok) { await reply(notification, result.reason); return; }

  const ITEMS = await getItems();
  const item  = ITEMS[itemName];
  const fx    = Object.entries(item.use ?? {}).map(([s, d]) => `${s}${d > 0 ? "+" : ""}${d}`).join(", ");
  await reply(notification, `[${itemName}] 사용 완료.\n변화: ${fx}\n\n${buildStatusLine(result.updated)}`);
  await logTransaction(displayName, "사용", itemName, 0, result.updated.gold);
}

// [장착/이름]
async function handleEquip(notification, accountId, displayName, itemName) {
  if (!itemName) { await reply(notification, "아이템명을 입력해주세요."); return; }

  const result = await equipItem(accountId, displayName, itemName);
  if (!result.ok) { await reply(notification, result.reason); return; }

  const ITEMS   = await getItems();
  const item    = ITEMS[itemName];
  const prevMsg = result.prev ? ` (기존 ${result.prev} 해제됨)` : "";
  await reply(notification, `[${itemName}] 장착 완료. (슬롯: ${item.slot})${prevMsg}`);
  await logTransaction(displayName, "장착", itemName, 0, result.updated.gold);
}

// [제거/슬롯명]
async function handleUnequip(notification, accountId, displayName, slotName) {
  if (!slotName) { await reply(notification, "슬롯명을 입력해주세요."); return; }

  const result = await unequipSlot(accountId, displayName, slotName);
  if (!result.ok) { await reply(notification, result.reason); return; }

  await reply(notification, `[${result.removed}] 제거 완료.`);
  await logTransaction(displayName, "제거", result.removed, 0, result.updated.gold);
}

// [주머니]
async function handlePocket(notification, accountId, displayName) {
  const player = await getPlayer(accountId, displayName);

  const invLines = player.inventory.length > 0
    ? player.inventory.map((name) => {
        const isEquipped = Object.values(player.equipped).includes(name);
        return `  ${name}${isEquipped ? " [장착중]" : ""}`;
      }).join("\n")
    : "  없음";

  const equipLines = Object.entries(player.equipped).length > 0
    ? Object.entries(player.equipped).map(([slot, name]) => `  ${slot}: ${name}`).join("\n")
    : "  없음";

  await reply(notification,
    `[${player.name}] 주머니\n소지금: ${player.gold}G\n\n[인벤토리]\n${invLines}\n\n[장착 현황]\n${equipLines}`
  );
}

// [타로]
async function handleTarot(notification, accountId, displayName) {
  const cards   = drawTarot();
  const reading = buildTarotReading(displayName, cards);
  await reply(notification, reading);

  const player = await getPlayer(accountId, displayName);
  await logTransaction(displayName, "타로", "-", 0, player.gold);
}

// ── [야바위/난이도/베팅액] ────────────────────────────────────
// 난이도: 하 / 중 / 상
// 베팅액: 양의 정수, 최소 10G
// 성공 시: 베팅액 x multiplier 수령 (원금 포함)
// 실패 시: 베팅액 전액 손실 (마이너스 허용)

async function handleGamble(notification, accountId, displayName, level, betStr) {
  // 안내 메시지
  if (!level && !betStr) {
    const lines = Object.entries(YABAUI).map(([lv, cfg]) =>
      `  ${lv} — ${cfg.desc} / 성공 시 ${cfg.multiplier}배 수령`
    );
    await reply(notification,
      `[야바위 도박판]\n사용법: [야바위/난이도/베팅액]\n\n${lines.join("\n")}\n\n최소 베팅: 10G`
    );
    return;
  }

  const cfg = YABAUI[level];
  if (!cfg) {
    await reply(notification, "난이도는 하 / 중 / 상 중 하나를 입력해주세요.");
    return;
  }

  const bet = parseInt(betStr, 10);
  if (isNaN(bet) || bet < 10) {
    await reply(notification, "베팅액은 10G 이상의 정수로 입력해주세요.");
    return;
  }

  const player = await getPlayer(accountId, displayName);
  if (player.gold < bet) {
    await reply(notification, `골드가 부족합니다. (보유: ${player.gold}G / 베팅: ${bet}G)`);
    return;
  }

  // 판정
  const roll    = Math.random();
  const isWin   = roll < cfg.successRate;
  const goldDelta = isWin
    ? bet * (cfg.multiplier - 1)   // 원금 제외 순수익
    : -bet;

  const updated = await processPlayer(accountId, (p) => ({
    ...p,
    gold: p.gold + goldDelta,
  }));

  // 연출 텍스트
  const lines = [
    `[${displayName}] 야바위 — 난이도 ${level}`,
    `베팅: ${bet}G`,
    "",
    ...cfg.dealerLine,
    "",
    ...(isWin ? cfg.winLines : cfg.loseLine),
    "",
    isWin
      ? `결과: 성공! +${goldDelta}G`
      : `결과: 실패. -${bet}G`,
    `소지금: ${updated.gold}G`,
  ];

  await reply(notification, lines.join("\n"));
  await logTransaction(
    displayName,
    `야바위(${level})`,
    "-",
    goldDelta,
    updated.gold
  );
}

// ── 명령 분기 ─────────────────────────────────────────────────

async function handleNotification(notification) {
  if (notification.type !== "mention")               return;
  if (!notification.status || !notification.account) return;

  const accountId   = notification.account.id;
  const acct        = notification.account.acct;
  const displayName = notification.account.displayName || acct;
  const tokens      = parseTokens(notification.status.content);

  if (tokens.length === 0) return;

  for (const token of tokens) {
    switch (token.key) {
      case "상가":     await handleShopList(notification, token.value);                        break;
      case "레스토랑": await handleRestaurant(notification);                                   break;
      case "구매":     await handleBuy(notification, accountId, displayName, token.value);     break;
      case "판매":     await handleSell(notification, accountId, displayName, token.value);    break;
      case "사용":     await handleUse(notification, accountId, displayName, token.value);     break;
      case "장착":     await handleEquip(notification, accountId, displayName, token.value);   break;
      case "제거":     await handleUnequip(notification, accountId, displayName, token.value); break;
      case "주머니":   await handlePocket(notification, accountId, displayName);               break;
      case "타로":     await handleTarot(notification, accountId, displayName);                break;
      case "야바위":   await handleGamble(notification, accountId, displayName, token.value, token.extra); break;
      default:         await reply(notification, "알 수 없는 명령입니다.");                    break;
    }
  }
}

// ── 시작 ─────────────────────────────────────────────────────

async function main() {
  const me = await rest.v1.accounts.verifyCredentials();
  console.log("상가 거리 봇 시작: @" + me.username);

  const stream = await streaming.user.subscribe();

  for await (const event of stream) {
    if (event.event !== "notification") continue;
    try {
      await handleNotification(event.payload);
      await rest.v1.notifications.dismiss({ id: event.payload.id });
    } catch (err) {
      console.error("알림 처리 오류:", err);
    }
  }
}

main().catch((err) => {
  console.error("봇 오류:", err);
  process.exit(1);
});
