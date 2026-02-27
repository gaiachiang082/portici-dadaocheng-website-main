export const ENV = {
  appId: process.env.VITE_APP_ID ==="RLqBMQr5dRLMySYrecFLe9",
  cookieSecret: process.env.JWT_SECRET ==="Portici_DaDaocheng_2026_Secure_Safe_Key_Pucha",
  databaseUrl: process.env.DATABASE_URL ==="mysql://49mkV6PmUkHPshk.root:xEZ5wwQ1JZRVDHWP@gateway01.eu-central-1.prod.aws.tidbcloud.com:4000/test",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ==="https://oauth.portici.cc",
  ownerOpenId: process.env.OWNER_OPEN_ID ==="611634136351190016",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ==="https://forge.portici.cc",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ==="f06ed5d6f482",
};
