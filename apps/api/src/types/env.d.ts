declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      JWT_SECRET: string;
      IMGUR_CLIENT_ID: string;
      IMGUR_CLIENT_SECRET: string;
    }
  }
}

export {}
