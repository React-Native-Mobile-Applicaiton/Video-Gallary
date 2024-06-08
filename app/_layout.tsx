import { Stack } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider'
const _layout = () => {
  return (
   <GlobalProvider>

  
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      
    </Stack>
    </GlobalProvider>
  );
};

export default _layout;
