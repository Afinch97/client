import { View, Image, Text, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

import { COLORS, SIZES, SHADOWS, assets } from '../constants';
import { CircleButton, RectButton } from './Button';
import { SubInfo, Title, Rating } from './SubInfo';
import  jwt  from 'jsonwebtoken';

const Card = ({ data }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [isStatus, setStatus] = useState(true)
    const navigation = useNavigation();

    const  favGame = async (value) => {
        const req = await fetch(`http://localhost:3005/api/favorite/${value}`, {
          method: 'POST',
          headers: {
            'x-access-token': localStorage.getItem('token'),
        },
        })
        const data1 = await req.json()
        console.log(data1)
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user1 = jwt.decode(token)
            console.log(user1)
            if (!user1) {
                localStorage.removeItem('token');
                navigation.navigate('Login');
            } 
        }
      }, [isStatus]);
    

  return (
    <View style={{
        backgroundColor: COLORS.white, 
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark
    }}>
        <View style={{ width: "100%", height:250 }}>
            <Image
                source={data.image}
                resizeMethod="cover"
                style={{
                    width: "100%",
                    height: "100%",
                    borderTopLeftRadius: SIZES.font,
                    borderTopRightRadius: SIZES.font,
                }}
                />
            <CircleButton 
                imgUrl={assets.heart} right={10} top={10}
                handlePress={() => {
                    favGame(data.id);
                    setStatus(!isStatus);
                }}
            />
        </View>

        <SubInfo date={data.released}/>
        <View style={{ width: "100%", padding: SIZES.font }}>
            <Title 
                title={data.name}
                genres={data.genres}
                titleSize={SIZES.large}
                subtitleSize={SIZES.regular}
            />
            <View style={{
                marginTop: SIZES.font,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center',
            }}>
                <Rating  rating={data.rating} />
                <RectButton 
                    minWidth={120}
                    fontSize={SIZES.font}
                    handlePress={() => navigation.navigate("Details", { data })}
                />
            </View>
        </View>
    </View>
  )
}

export default Card