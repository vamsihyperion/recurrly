import { Image, View, Text } from 'react-native'
import React from 'react'
import { formatCurrency } from '@/lib/utlis'

const UpcomingSubscriptionCard = ({ name, price, daysLeft, icon, currency  }: UpcomingSubscription) => {
    return (
        <View className="upcoming-card">
            <View className="upcoming-row">
                <Image source={icon} className="upcoming-icon" />
                <View className="upcoming-price">
                    <Text className="upcoming-price">{formatCurrency(price, currency)}</Text>
                    <Text className="upcoming-meta" numberOfLines={1}>{daysLeft > 1 ? `${daysLeft} days left` : 'Last Day'}</Text>
                </View>
            </View>
            <Text className="upcoming-name" numberOfLines={1}>
                {name}
            </Text>
        </View>
    )
}

export default UpcomingSubscriptionCard