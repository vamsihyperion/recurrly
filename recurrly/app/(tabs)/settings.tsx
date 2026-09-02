import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView as RNSafeAreView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreView);
const settings = () => {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Text>settings</Text>
        </SafeAreaView>
    )
}

export default settings