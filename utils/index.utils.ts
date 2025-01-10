if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  throw new Error("Missing NEXT_PUBLIC_BACKEND_URL environment variable");
}

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
