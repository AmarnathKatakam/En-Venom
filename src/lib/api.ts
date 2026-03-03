const rawApi = import.meta.env.VITE_ORDER_API_URL?.trim() ?? "";

export const API = rawApi.replace(/\/+$/, "");

export const apiUrl = (path: `/${string}`): string => {
  if (!API) return path;
  return `${API}${path}`;
};
