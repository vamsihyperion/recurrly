import { Image, View, Text, Pressable } from 'react-native'
import React from 'react'
import { formatCurrency } from '@/lib/utlis'
import clsx from 'clsx'

const formatSubscriptionDateTime = (date: string | number | Date) =>
    new Date(date).toLocaleDateString()

const SubscriptionCard = ({ name, billing, icon, price, currency, color, category, plan, renewalDate, expanded, onPress, paymentMethod, startDate }: SubscriptionCardProps) => {
    return (
        <Pressable onPress={onPress} className={clsx('sub-card', expanded ? 'sub-card-expanded' : ' bg-card')} style={!expanded && color ? { backgroundColor: color } : undefined
        }>
            <View className="sub-head">
                <View className="sub-main">
                    <Image source={icon} className="sub-icon" />
                    <View className="sub-copy">
                        <Text numberOfLines={1} className="sub-title">{name}</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" className="sub-meta">
                            {category?.trim() || plan?.trim() || (renewalDate ? formatSubscriptionDateTime(renewalDate) : '')}
                        </Text>
                    </View>
                </View>
                <View className="sub-price-box">
                    <Text className="sub-price">{formatCurrency(price, currency)}</Text>
                    <Text className="sub-billing">{(billing)}</Text>

                </View>
            </View>
            {expanded && (
                <View className="sub-bdy">
                    <View className="sub-details">
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Payment: </Text>
                                <Text numberOfLines={1} className="sub-value" ellipsizeMode="tail">
                                    {paymentMethod?.trim() || 'N/A'}
                                </Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Category: </Text>
                                <Text numberOfLines={1} className="sub-value" ellipsizeMode="tail">
                                    {category?.trim() || plan?.trim() || 'N/A'}
                                </Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Started: </Text>
                                <Text numberOfLines={1} className="sub-value" ellipsizeMode="tail">
                                    {startDate ? formatSubscriptionDateTime(startDate) : 'N/A'}
                                </Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Renewal: </Text>
                                <Text numberOfLines={1} className="sub-value" ellipsizeMode="tail">
                                    {renewalDate ? formatSubscriptionDateTime(renewalDate) : 'N/A'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </Pressable>
    )
}

export default SubscriptionCard