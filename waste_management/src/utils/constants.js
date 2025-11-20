const { VITE_API_BASE_URL } = import.meta.env;

export const BASE_URL = VITE_API_BASE_URL || "http://localhost:4000";