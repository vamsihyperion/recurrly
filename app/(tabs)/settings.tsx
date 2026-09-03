import { useAuth } from "@clerk/expo";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreView);

export default function SettingsScreen() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/signIn");
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background">
      <View className="gap-4">
        <Text className="text-2xl font-sans-bold text-primary">Settings</Text>
        <Pressable className="rounded-2xl bg-accent px-6 py-3" onPress={handleSignOut}>
          <Text className="text-base font-sans-bold text-primary">Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}