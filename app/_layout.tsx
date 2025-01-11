import { Stack } from 'expo-router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen 
        name="index" 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="step/index" 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="create/index" 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="nutrition/index" 
        options={{ headerShown: false }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
