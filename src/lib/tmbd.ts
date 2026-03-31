import Constants from 'expo-constants';

const API_KEY =
  Constants.expoConfig?.extra?.tmdbApiKey;
const BASE = 'https://api.themoviedb.org/3';

export async function tmdbFetch<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([k,v]) =>
    url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}