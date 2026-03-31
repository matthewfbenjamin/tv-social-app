import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Stack } from 'expo-router';

const qc = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={qc}>
      <Stack />
    </QueryClientProvider>
  );
}