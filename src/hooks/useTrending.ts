import { useQuery } from '@tanstack/react-query';
import { tmdbFetch } from '../lib/tmdb';

export function useTrending(
  type: 'tv' | 'movie' = 'tv'
) {
  return useQuery({
    queryKey: ['trending', type],
    queryFn: () =>
      tmdbFetch(`/trending/${type}/week`),
    staleTime: 1000 * 60 * 30, // 30 min
  });
}