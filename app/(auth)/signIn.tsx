import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const signIn = () => {
    return (
        <View>
            <Text>signIn</Text>
            <Link href="/(auth)/signUp" className="mt-4 rounded bg-primary text-white p-4">
                Create Account
            </Link>
        </View>
    )
}

export default signIn;