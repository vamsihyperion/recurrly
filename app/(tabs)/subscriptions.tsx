import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreView);

const Subscriptions = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text>Subscriptions</Text>
    </SafeAreaView>
  );
};

export default Subscriptions;