declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
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
