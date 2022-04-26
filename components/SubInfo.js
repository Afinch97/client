import { View, Text } from 'react-native'
import React from 'react'
import { SIZES, FONTS, COLORS, SHADOWS, assets } from '../constants'

export const Title = ({ title,genres, titleSize, subtitleSize }) => {
  return (
    <View>
      <Text style={{ fontFamily: FONTS.semiBold, fontSize: titleSize, 
        color: COLORS.primary }}>{title}</Text>
      <Text style={{ fontFamily: FONTS.regular, fontSize: subtitleSize, 
        color: COLORS.primary }}>{genres.join(', ')}</Text>
    </View>
  )
}

export const Released = ({ date }) => {
    return (
      <View
        style={{
            paddingHorizontal: SIZES.font, 
            paddingVertical: SIZES.base, 
            backgroundColor: COLORS.white, 
            justifyContent: 'center',
            alignItems: 'center',
            ...SHADOWS.light,
            elevation: 1,
            maxWidth: '50%'
        }}
      >
        <Text style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.primary
        }}>
            Released
        </Text>
        <Text style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.medium,
            color: COLORS.primary
        }}>
            {date}
        </Text>
      </View>
    )
  }

export const Platforms = () => {
    return (
        <View>
            <Text>  </Text>
        </View>
    )
}

export const Rating = ({ rating }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.font,
            color: COLORS.primary
        }}>Rating: {rating}/5</Text>
      </View>
    )
  }

export const SubInfo = ({ date }) => {
    return (
      <View style={{
          width: '100%',
          paddingHorizontal: SIZES.font,
          marginTop: -SIZES.extraLarge,
          flexDirection: "row",
          justifyContent: 'space-between'
      }}>
        <Platforms />
        <Released date={date}/>
      </View>
    )
  }
