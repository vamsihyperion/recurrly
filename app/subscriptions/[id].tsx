import { View, Text } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router'

const subscriptionDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <View>
            <Text> Subscription Details : {id}</Text>
            <Link href="/">
                Go Back to Subscriptions
            </Link>
        </View >
    )
}

export default subscriptionDetails