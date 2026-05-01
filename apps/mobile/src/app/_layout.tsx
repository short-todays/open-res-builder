import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Resume Builder',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="editor"
        options={{
          title: 'Edit Resume',
        }}
      />
      <Stack.Screen
        name="preview"
        options={{
          title: 'Preview',
        }}
      />
    </Stack>
  );
}
