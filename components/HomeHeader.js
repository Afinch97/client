import { View, Text, Image, TextInput, Button } from 'react-native';
import { COLORS, FONTS, SIZES, assets } from '../constants';
import React from 'react';
import { IoLogoGameControllerB } from 'react-icons/io';
import { sign } from 'jsonwebtoken';
import { useNavigation } from '@react-navigation/native';

const HomeHeader = ({ title, onSearch }) => {
  const navigation = useNavigation();

  return (
    <View style={{
      backgroundColor: COLORS.primary,
      padding: SIZES.font
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text resizeMode="contain" style={{ 
          width: 200, height: 50, 
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.extraLarge,
          color: COLORS.white }}>
            <IoLogoGameControllerB style={{fontSize: 36, verticalAlign:'-20%'}} /> Game Finch
      </Text>
      <View style={{ width: 100, height: 45 }}>
        <Button resizeMode="contain" title="Profile" onPress={() => navigation.push('Profile')} />
      </View>
      </View>
    

      <View style={{ marginTop: SIZES.font }}>
        <View style={{
          width: '100%',
          borderRadius: SIZES.large,
          backgroundColor: COLORS.gray,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.small - 2
        }}>
          <Image 
            source={assets.search}
            resizeMethod="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder='Search Games'
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
        </View>
        <View style={{ marginVertical:SIZES.large }}>
        <Text style={{ fontFamily: FONTS.bold, fontSize:SIZES.large, 
        color: COLORS.white, marginTop: SIZES.base / 2}}>
          {title} Games
        </Text>
        </View>
      </View>
    </View>
  )
}

export default HomeHeader