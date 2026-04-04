# 상가 거리 봇

마스토돈 기반 텍스트 RPG 상점 봇입니다.
멘션 명령어로 아이템 구매/판매/장착, 음식 섭취, 타로 점술, 야바위 도박을 진행할 수 있습니다.

---

## 시작하기

### 요구 사항

- Node.js 18 이상
- 마스토돈 계정 및 액세스 토큰
- Google Cloud 서비스 계정 (Sheets 연동)
- Google Sheets 스프레드시트

### 설치
```bash
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성합니다.
```env
MASTODON_URL=https://your.instance.url
SHOP_TOKEN=your_mastodon_access_token

GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}
```

### Google Sheets 설정

스프레드시트에 아래 탭과 헤더를 구성합니다.

**Players**
