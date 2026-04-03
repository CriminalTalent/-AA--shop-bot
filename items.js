// ============================================================
// items.js — 상가 거리 아이템 정의
// ============================================================

// category: 무기 / 의상 / 장신구 / 방패 / 소비 / 음식
// 무기, 의상, 장신구, 방패 → 장착형 (slot 지정)
// 소비 → 인벤토리 보관 후 [사용/]
// 음식 → 구매 즉시 효과 적용, 인벤토리 미저장

export const ITEMS = {

  // ── 무기상 ────────────────────────────────────────────────
  "훈련용목검":   { category: "무기",   slot: "무기",   price: 150, sellPrice: 70,  equip: { 전투: 2 } },
  "단검":         { category: "무기",   slot: "무기",   price: 250, sellPrice: 120, equip: { 전투: 4 } },
  "롱소드":       { category: "무기",   slot: "무기",   price: 450, sellPrice: 200, equip: { 전투: 7 } },
  "기사검":       { category: "무기",   slot: "무기",   price: 700, sellPrice: 350, equip: { 전투: 10 } },
  "마법지팡이":   { category: "무기",   slot: "무기",   price: 500, sellPrice: 250, equip: { 전투: 4, 지능: 4 } },
  "사냥용활":     { category: "무기",   slot: "무기",   price: 350, sellPrice: 170, equip: { 전투: 5, 체력: -1 } },

  // ── 방패 ──────────────────────────────────────────────────
  "나무방패":     { category: "방패",   slot: "방패",   price: 200, sellPrice: 90,  equip: { 위험도: -2 } },
  "철제방패":     { category: "방패",   slot: "방패",   price: 450, sellPrice: 200, equip: { 위험도: -4 } },

  // ── 의상실 (12종) ─────────────────────────────────────────
  "평민의상":     { category: "의상",   slot: "의상",   price: 100, sellPrice: 40,  equip: { 사회성: 1 } },
  "여행복":       { category: "의상",   slot: "의상",   price: 150, sellPrice: 70,  equip: { 체력: 1, 스트레스: -1 } },
  "상인복":       { category: "의상",   slot: "의상",   price: 200, sellPrice: 90,  equip: { 사회성: 2, 평판: 1 } },
  "학자의로브":   { category: "의상",   slot: "의상",   price: 300, sellPrice: 140, equip: { 지능: 3, 감성: 1 } },
  "무도회드레스": { category: "의상",   slot: "의상",   price: 400, sellPrice: 200, equip: { 매력: 4, 사회성: 2 } },
  "기사갑옷":     { category: "의상",   slot: "의상",   price: 600, sellPrice: 300, equip: { 전투: 3, 위험도: -3 } },
  "귀족의상":     { category: "의상",   slot: "의상",   price: 700, sellPrice: 350, equip: { 매력: 5, 사회성: 3, 평판: 2 } },
  "성직자복":     { category: "의상",   slot: "의상",   price: 350, sellPrice: 160, equip: { 도덕성: 3, 평판: 2 } },
  "마법사외투":   { category: "의상",   slot: "의상",   price: 450, sellPrice: 220, equip: { 지능: 4, 야망: 1 } },
  "무녀복":       { category: "의상",   slot: "의상",   price: 380, sellPrice: 180, equip: { 감성: 4, 도덕성: 2 } },
  "첩보원복":     { category: "의상",   slot: "의상",   price: 500, sellPrice: 250, equip: { 야망: 2, 위험도: -2, 전투: 2 } },
  "왕실예복":     { category: "의상",   slot: "의상",   price: 900, sellPrice: 450, equip: { 매력: 6, 사회성: 4, 평판: 4 } },

  // ── 잡화점 — 장신구 ───────────────────────────────────────
  "행운부적":     { category: "장신구", slot: "장신구", price: 200, sellPrice: 90,  equip: { 매력: 2, 평판: 1 } },
  "집중반지":     { category: "장신구", slot: "장신구", price: 250, sellPrice: 110, equip: { 지능: 3 } },
  "체력보호대":   { category: "장신구", slot: "장신구", price: 220, sellPrice: 100, equip: { 전투: 2 } },
  "마법결정":     { category: "장신구", slot: "장신구", price: 400, sellPrice: 200, equip: { 지능: 3, 감성: 3 } },
  "카리스마핀":   { category: "장신구", slot: "장신구", price: 300, sellPrice: 140, equip: { 매력: 3, 사회성: 2 } },

  // ── 잡화점 — 소비 아이템 ─────────────────────────────────
  "소형회복약":   { category: "소비", price: 80,  sellPrice: 35,  use: { 체력: 3,  스트레스: -2 } },
  "중형회복약":   { category: "소비", price: 150, sellPrice: 70,  use: { 체력: 6,  스트레스: -4 } },
  "대형회복약":   { category: "소비", price: 280, sellPrice: 130, use: { 체력: 10, 스트레스: -7 } },
  "진정제":       { category: "소비", price: 100, sellPrice: 45,  use: { 스트레스: -8 } },
  "집중포션":     { category: "소비", price: 130, sellPrice: 60,  use: { 지능: 3 } },
  "매력물약":     { category: "소비", price: 130, sellPrice: 60,  use: { 매력: 3 } },
  "붕대":         { category: "소비", price: 50,  sellPrice: 20,  use: { 체력: 4 } },
  "해독제":       { category: "소비", price: 90,  sellPrice: 40,  use: { 위험도: -3, 스트레스: -2 } },

  // ── 레스토랑 (8종) ───────────────────────────────────────
  "빵과스프":     { category: "음식", price: 30,  use: { 체력: 2,  스트레스: -2 } },
  "구운생선":     { category: "음식", price: 50,  use: { 체력: 3,  스트레스: -3 } },
  "고급스테이크": { category: "음식", price: 120, use: { 체력: 5,  스트레스: -4, 야망: 1 } },
  "허브차":       { category: "음식", price: 40,  use: { 스트레스: -5, 감성: 1 } },
  "왕실디저트":   { category: "음식", price: 150, use: { 매력: 2,  스트레스: -5, 의존성: 1 } },
  "전사의정식":   { category: "음식", price: 80,  use: { 체력: 4,  전투: 1 } },
  "학자의만찬":   { category: "음식", price: 90,  use: { 지능: 2,  감성: 2 } },
  "축제음식":     { category: "음식", price: 60,  use: { 매력: 1,  사회성: 2, 스트레스: -3 } },
};

export const SHOP_FILTER = {
  무기상: (item) => item.category === "무기" || item.category === "방패",
  의상실: (item) => item.category === "의상",
  잡화점: (item) => item.category === "장신구" || item.category === "소비",
};

export const 장착형 = new Set(["무기", "의상", "장신구", "방패"]);
export const 소비형 = new Set(["소비", "음식"]);

// ── 타로 78장 ──────────────────────────────────────────────
export const TAROT_CARDS = [
  // 메이저 아르카나 (22장)
  { name: "0번 바보",             upright: "새로운 시작, 순수한 도전, 예측 불허의 여정",    reversed: "무모함, 방향 없는 방황, 판단 미숙" },
  { name: "1번 마법사",           upright: "의지와 기술, 잠재력의 발현, 목표를 향한 집중",  reversed: "속임수, 재능의 낭비, 흐트러진 의지" },
  { name: "2번 여교황",           upright: "직관과 내면의 지혜, 숨겨진 진실, 인내",         reversed: "비밀의 과잉, 단절, 직관의 무시" },
  { name: "3번 여황제",           upright: "풍요와 창조, 모성, 자연의 흐름",                reversed: "결핍, 창의력 고갈, 과잉 의존" },
  { name: "4번 황제",             upright: "안정과 권위, 질서, 강력한 의지",                reversed: "독재, 경직, 권력의 남용" },
  { name: "5번 교황",             upright: "전통과 가르침, 정신적 지도, 신뢰",              reversed: "독단, 형식에의 집착, 잘못된 조언" },
  { name: "6번 연인",             upright: "선택과 조화, 깊은 유대, 가치관의 일치",         reversed: "불화, 잘못된 선택, 관계의 균열" },
  { name: "7번 전차",             upright: "의지력과 승리, 도전 극복, 강한 추진력",         reversed: "통제 상실, 방향 혼란, 무력함" },
  { name: "8번 힘",               upright: "내면의 용기, 인내로 이끄는 힘, 자기 극복",      reversed: "자기 의심, 억압된 감정, 두려움" },
  { name: "9번 은둔자",           upright: "내면 탐구, 고독한 지혜, 성찰의 시간",           reversed: "고립, 사회적 단절, 지나친 내향" },
  { name: "10번 운명의 수레바퀴", upright: "변화와 순환, 운명의 전환점, 예상치 못한 기회",  reversed: "불운의 반복, 저항하는 변화, 정체" },
  { name: "11번 정의",            upright: "균형과 공정, 결과에 대한 책임, 진실의 판단",    reversed: "불공정, 회피, 자기기만" },
  { name: "12번 매달린 사람",     upright: "희생과 기다림, 다른 시각, 자발적 인내",         reversed: "무의미한 희생, 지연, 순교 강요" },
  { name: "13번 죽음",            upright: "끝과 변환, 낡은 것의 소멸, 새로운 시작",        reversed: "변화에 대한 저항, 집착, 끝맺지 못함" },
  { name: "14번 절제",            upright: "균형과 조화, 인내, 중용의 지혜",                reversed: "극단, 과잉, 불균형" },
  { name: "15번 악마",            upright: "속박과 유혹, 물질적 집착, 두려움의 실체",       reversed: "해방, 속박에서 벗어남, 각성" },
  { name: "16번 탑",              upright: "갑작스러운 붕괴, 낡은 구조의 파괴, 혼란 속 해방", reversed: "재앙 회피, 내부 붕괴, 지연된 위기" },
  { name: "17번 별",              upright: "희망과 치유, 영감, 밝은 전망",                  reversed: "절망, 믿음 상실, 방향의 혼돈" },
  { name: "18번 달",              upright: "불안과 환상, 무의식의 흐름, 불확실성",          reversed: "혼란 해소, 진실의 부상, 공포 극복" },
  { name: "19번 태양",            upright: "활력과 성공, 명확한 진실, 기쁨",                reversed: "과신, 일시적 그늘, 흐린 자아" },
  { name: "20번 심판",            upright: "각성과 재탄생, 과거의 청산, 새로운 부름",       reversed: "자기 심판, 과거 집착, 부름 외면" },
  { name: "21번 세계",            upright: "완성과 통합, 목표 달성, 새로운 여정의 문턱",    reversed: "미완성, 지연, 성취 직전의 정체" },
  // 완드 (14장)
  { name: "완드 에이스",  upright: "창조적 불꽃, 새로운 영감, 시작의 에너지",     reversed: "영감의 지연, 창의력 막힘" },
  { name: "완드 2",       upright: "계획과 비전, 미래를 향한 결단",               reversed: "우유부단, 두려움으로 인한 정체" },
  { name: "완드 3",       upright: "확장과 탐험, 기회를 기다리는 시선",           reversed: "기회 놓침, 과도한 기대" },
  { name: "완드 4",       upright: "축하와 안정, 공동체의 기쁨",                  reversed: "불안한 기반, 갈등 속 축제" },
  { name: "완드 5",       upright: "경쟁과 갈등, 에너지의 분산",                  reversed: "내부 갈등, 불필요한 다툼" },
  { name: "완드 6",       upright: "승리와 인정, 자신감의 회복",                  reversed: "인정 갈구, 자만, 지연된 성공" },
  { name: "완드 7",       upright: "용기 있는 방어, 끈질긴 저항",                 reversed: "압도, 포기의 유혹" },
  { name: "완드 8",       upright: "빠른 변화, 소식의 도래, 가속",                reversed: "지연, 혼선, 에너지 낭비" },
  { name: "완드 9",       upright: "지속적인 노력, 방어적 경계, 회복력",          reversed: "방어 과잉, 편집증, 소진" },
  { name: "완드 10",      upright: "과중한 책임, 완수를 향한 마지막 분투",        reversed: "짐의 포기, 번아웃, 책임 회피" },
  { name: "완드 시종",    upright: "열정적인 탐구, 새로운 아이디어",              reversed: "충동적 계획, 후속 없는 시작" },
  { name: "완드 기사",    upright: "충동적 행동, 빠른 이동, 모험심",              reversed: "무모함, 에너지 낭비, 성급한 결정" },
  { name: "완드 여왕",    upright: "자신감, 따뜻한 리더십, 창의적 열정",          reversed: "지배욕, 질투, 에너지 과소비" },
  { name: "완드 왕",      upright: "카리스마, 비전을 가진 지도자, 결단력",        reversed: "독단, 오만, 불안정한 리더십" },
  // 컵 (14장)
  { name: "컵 에이스",    upright: "감정의 새 출발, 사랑의 흐름, 직관의 깨어남",  reversed: "감정 억압, 기회 거절, 흘러넘침" },
  { name: "컵 2",         upright: "유대와 조화, 파트너십, 감정의 교류",          reversed: "불균형, 감정 불일치, 관계의 단절" },
  { name: "컵 3",         upright: "우정과 축제, 공동의 기쁨, 연대",              reversed: "과음, 삼각관계, 지나친 쾌락" },
  { name: "컵 4",         upright: "권태와 성찰, 내면으로의 전환",                reversed: "새로운 기회 수용, 무기력 탈출" },
  { name: "컵 5",         upright: "상실의 슬픔, 아직 남은 것에 대한 주목",       reversed: "슬픔 극복, 용서, 앞으로 나아감" },
  { name: "컵 6",         upright: "추억과 순수함, 과거의 온기",                  reversed: "과거 집착, 미성숙, 지나간 것에 대한 집착" },
  { name: "컵 7",         upright: "환상과 선택, 흐릿한 욕망",                    reversed: "환상 탈피, 현실 직시, 의지의 정렬" },
  { name: "컵 8",         upright: "이별과 전진, 더 깊은 것을 향한 떠남",         reversed: "포기, 방황, 미완의 감정" },
  { name: "컵 9",         upright: "소원 성취, 감정적 만족",                      reversed: "자기 탐닉, 공허한 충족" },
  { name: "컵 10",        upright: "행복한 완성, 가정과 공동체의 조화",           reversed: "가정 불화, 이상과 현실의 괴리" },
  { name: "컵 시종",      upright: "감수성, 상상력, 내면의 목소리",               reversed: "감정 과잉, 비현실적 기대" },
  { name: "컵 기사",      upright: "낭만, 이상주의, 감정을 따르는 행동",          reversed: "기만, 감정에 의한 충동적 행동" },
  { name: "컵 여왕",      upright: "공감과 직관, 감정적 지혜",                    reversed: "감정 조종, 불안정, 자기 연민 과잉" },
  { name: "컵 왕",        upright: "감정의 균형, 따뜻한 이해, 성숙한 마음",       reversed: "감정 억압, 냉담, 감정적 조종" },
  // 소드 (14장)
  { name: "소드 에이스",  upright: "명확한 진실, 결단, 생각의 돌파구",            reversed: "혼란, 잘못된 정보, 생각의 막힘" },
  { name: "소드 2",       upright: "교착 상태, 결정의 회피, 내면의 긴장",         reversed: "교착 탈피, 진실 직면, 결단" },
  { name: "소드 3",       upright: "슬픔과 상처, 진실이 주는 고통",               reversed: "회복, 상처 치유, 슬픔 극복" },
  { name: "소드 4",       upright: "휴식과 회복, 충전의 필요",                    reversed: "강제된 활동, 불안한 휴식" },
  { name: "소드 5",       upright: "갈등 후의 공허함, 불명예스러운 승리",         reversed: "화해, 갈등 해소, 패배 인정" },
  { name: "소드 6",       upright: "이행과 전환, 어려움에서 벗어남",              reversed: "정체, 이행 거부, 과거에 발이 묶임" },
  { name: "소드 7",       upright: "전략과 회피, 단독 행동",                      reversed: "발각, 양심의 가책, 비밀 노출" },
  { name: "소드 8",       upright: "자기 부과된 제한, 무력감, 인식의 속박",       reversed: "해방, 자기 인식, 제한 탈피" },
  { name: "소드 9",       upright: "불안과 악몽, 마음의 고통",                    reversed: "회복, 불안 해소, 최악의 고비 넘김" },
  { name: "소드 10",      upright: "배신과 끝, 고통스러운 종결",                  reversed: "회복 시작, 최악 이후의 여명" },
  { name: "소드 시종",    upright: "지적 탐구, 예리한 관찰, 빠른 사고",           reversed: "소문, 경솔한 말, 교활한 계략" },
  { name: "소드 기사",    upright: "빠른 행동, 날카로운 판단, 단호함",            reversed: "무모한 돌진, 파괴적 성급함" },
  { name: "소드 여왕",    upright: "명석함, 독립적 사고, 직언",                   reversed: "냉혹함, 고집, 편견" },
  { name: "소드 왕",      upright: "지적 권위, 공정한 판단, 명확한 소통",         reversed: "독단적 사고, 잔인한 언어, 냉정함" },
  // 펜타클 (14장)
  { name: "펜타클 에이스", upright: "물질적 기회, 새로운 풍요, 현실적 시작",     reversed: "기회 낭비, 물질주의, 재정 불안" },
  { name: "펜타클 2",      upright: "균형 잡기, 유연한 적응, 변화 속 안정",       reversed: "재정 불균형, 과부하, 우선순위 혼란" },
  { name: "펜타클 3",      upright: "협력과 기술, 장인 정신, 공동 성과",          reversed: "불화, 실력 미인정, 비협조" },
  { name: "펜타클 4",      upright: "안정 추구, 자원 보존, 재정 통제",            reversed: "인색함, 물질 집착, 변화 거부" },
  { name: "펜타클 5",      upright: "결핍과 어려움, 도움 구하기, 시련",           reversed: "회복, 도움 수용, 재정 개선" },
  { name: "펜타클 6",      upright: "관대함, 자원 나눔, 균형 잡힌 교환",          reversed: "불균등한 나눔, 조건부 친절" },
  { name: "펜타클 7",      upright: "인내와 노력, 장기적 투자, 수확을 앞둔 기다림", reversed: "조급함, 노력 대비 부족한 성과" },
  { name: "펜타클 8",      upright: "장인 정신, 숙련도 향상, 성실한 노력",        reversed: "완벽주의, 단조로움, 실력 정체" },
  { name: "펜타클 9",      upright: "독립과 풍요, 자기 충족, 성숙한 성과",        reversed: "과의존, 물질 남용, 공허한 풍요" },
  { name: "펜타클 10",     upright: "유산과 번영, 가족의 안정, 세대를 넘는 성과", reversed: "가족 갈등, 재산 분쟁, 기반 흔들림" },
  { name: "펜타클 시종",   upright: "학습과 실용적 탐구, 새로운 기술 습득",       reversed: "미완성 계획, 집중력 부족" },
  { name: "펜타클 기사",   upright: "성실함, 꾸준한 전진, 현실적 접근",           reversed: "정체, 과도한 신중함, 지루한 반복" },
  { name: "펜타클 여왕",   upright: "실용적 지혜, 안정적 양육, 풍요로운 현실감",  reversed: "과보호, 물질 집착, 자기 돌봄 소홀" },
  { name: "펜타클 왕",     upright: "재정적 성숙, 현실적 리더십, 풍요의 구현",    reversed: "물질주의, 완고함, 재정 고집" },
];

// 카드 3장 무작위 뽑기 (정방향/역방향 랜덤)
export function drawTarot() {
  const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((card) => ({
    ...card,
    reversed: Math.random() < 0.35,
  }));
}

// 타로 지문 생성 (나이든 점술사 화자)
export function buildTarotReading(playerName, cards) {
  const positions = ["과거", "현재", "미래"];
  const lines     = [
    `노점술사가 낡은 천을 걷어내고 ${playerName}의 손을 가만히 바라보더니, 천천히 카드를 펼쳐놓는다.`,
    "",
  ];

  for (let i = 0; i < 3; i++) {
    const card    = cards[i];
    const pos     = positions[i];
    const meaning = card.reversed ? card.reversed : card.upright;
    const dir     = card.reversed ? "역방향" : "정방향";

    lines.push(`[ ${pos} — ${card.name} (${dir}) ]`);

    switch (i) {
      case 0:
        lines.push(
          `"흠… ${card.name}이로구나. ${meaning}. ` +
          `지나온 길이 네 지금을 빚었지. 그 무게를 잊지 말거라."`
        );
        break;
      case 1:
        lines.push(
          `"이것이 지금 너의 자리다. ${card.name}. ${meaning}. ` +
          `눈을 돌리지 마라, 이 순간이 모든 것의 중심이니."`
        );
        break;
      case 2:
        lines.push(
          `"마지막 패다. ${card.name}. ${meaning}. ` +
          `운명은 정해진 것이 아니야. 다만… 이 길목에서 네가 어떤 선택을 하느냐가 전부겠지."`
        );
        break;
    }

    lines.push("");
  }

  lines.push(`점술사가 카드를 다시 거두며 조용히 눈을 감는다.`);
  return lines.join("\n");
}
