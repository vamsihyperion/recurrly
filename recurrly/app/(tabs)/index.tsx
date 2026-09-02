import "@/global.css"

import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView as RNSafeAreView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreView);
export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      < Text className="text-5xl font-sans-extrabold text-primary" >
        Home
      </Text >
      <Link href="/onboarding" className="mt-4 font-sans-bold rounded bg-primary text-white p-4">
        Go to Onboarding
      </Link>
      <Link href="/(auth)/signIn" className="mt-4 font-sans-bold rounded bg-primary text-white p-4">
        Go to Sign In
      </Link>
      <Link href="/(auth)/signUp" className="mt-4 font-sans-bold rounded bg-primary text-white p-4">
        Go to Sign Up
      </Link>
    </SafeAreaView >
  );
}