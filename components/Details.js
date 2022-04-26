import { View, Text, SafeAreaView, Image, StatusBar, FlatList } from 'react-native';
import { COLORS, SIZES, SHADOWS, FONTS, assets } from '../constants';
import { useState, useEffect } from 'react';
import React from 'react';
import FocusedStatusBar from './FocusedStatusBar';
import { CircleButton, RectButton } from './Button';
import { SubInfo, Title, Rating } from './SubInfo';
import { DetailsDesc } from './DetailsDesc';
import { DetailsBid} from './DetailsBid';

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

const DetailsHeader = ({ data, navigation }) => (
    <View style={{ width: '100%', height: 373 }}>
        <Image 
            source={data.image}
            resizeMode="cover"
            style={{ width: '100%', height:'100%'}}
        />
        <CircleButton 
            imgUrl={assets.left}
            handlePress={() => navigation.goBack()}
            left={15}
            top={StatusBar.currentHeight + 10}
        />
        <CircleButton 
            imgUrl={assets.heart}
            right={15}
            top={StatusBar.currentHeight + 10}
            handlePress={() => {
                favGame(data.id);
            }}
        />
    </View>
)

const Details = ({ route, navigation }) => {
    const { data } = route.params;
    const [info, setInfo] = useState("");
    const  populate = async () => {
        const req = await fetch(`http://localhost:3005/info/${data.id}`, {
          method: 'GET',
        })
        const response = await req.json()
        console.log(response)
        setInfo(response)
    }
    useEffect(() => {
      populate();
    }, []);
    console.log(info)
    console.log(data)
    if(info.length>0){
        data.description = info;
        console.log(data)
    }
  return (
    <SafeAreaView style={{ flex: 1}}>
        <FocusedStatusBar
            barStyle="darl-content"
            backgroundColor="transparent"
            translucent={true}
        />
        <View style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            paddingVertical: SIZES.font,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.5)',
            zIndex: 1,
        }}>
            <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} />
        </View>
        {info.length>0 && 
        <FlatList 
            contentContainerStyle={{paddingBottom: SIZES.extraLarge * 3}}
            ListHeaderComponent={() => (
                <React.Fragment>
                    <DetailsHeader data={data} navigation={navigation} />
                    <SubInfo date={data.released} />
                    <View style={{ padding: SIZES.font }}>
                        <DetailsDesc data={data} />
                    </View>
                </React.Fragment>
            )}
        />}
    </SafeAreaView>
  )
}

export default Details