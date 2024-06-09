declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      REDIS_URL: string;
      NODE_ENV: string;
      ACCESS_TOKEN: string;
      ACCESS_TOKEN_EXPIRE: string;
      ORIGIN: string;
    }
  }
}

export {}
