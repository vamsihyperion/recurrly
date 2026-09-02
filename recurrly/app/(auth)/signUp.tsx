import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const signUp = () => {
    return (
        <View>
            <Text>Sign Up</Text>
            <Link href="/(auth)/signIn" className="mt-4 rounded bg-primary text-white p-4">
                Sign In
            </Link>
        </View>
    )
}

export default signUp;