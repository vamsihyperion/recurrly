import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreView);

const Insights = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text>Insights</Text>
    </SafeAreaView>
  );
};

export default Insights;