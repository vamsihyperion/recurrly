import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router, useSegments } from "expo-router";
import { useEffect } from "react";
import "@/global.css";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

function AuthGate() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  useEffect(() => {
   if (!isLoaded) {
     return;
   }

   const currentRoute = segments[0];
   const inPublicRoute = currentRoute === "(auth)" || currentRoute === undefined;

   if (isSignedIn && inPublicRoute) {
     router.replace("/(tabs)");
   }

   if (!isSignedIn && !inPublicRoute) {
     router.replace("/(auth)/signIn");
   }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) {
   return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
   "sans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
   "sans-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
   "sans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
   "sans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
   "sans-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
   "sans-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf")
  });

  useEffect(() => {
   if (fontsLoaded) {
     SplashScreen.hideAsync();
   }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
   return null;
  }

  return (
   <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
     <AuthGate />
   </ClerkProvider>
  );
}
