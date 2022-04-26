import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, AppRegistry, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import  jwt  from 'jsonwebtoken';
import { COLORS } from '../constants';
import Card from './Card';
import HomeHeader from './HomeHeader';
import FocusedStatusBar from './FocusedStatusBar';


const Profile = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [user, setUser] = useState({});
    const [gameData, setGameData] = useState([]);
    const [search, setSearch] = useState("Your")

    const  populate = async () => {
        const req = await fetch('http://localhost:3005/api/quote', {
          method: 'GET',
          headers: {
              'x-access-token': localStorage.getItem('token'),
          },
        })
        const data = await req.json()
        console.log(data)
        if(data.status === 'ok'){
            setUser({username: data.username, email: data.email, games: data.games});
            findGames(data.games);
        }
    }
    const findGames = (gamesList) => {
        const results = [];
        console.log(gamesList)
        gamesList.forEach( async (element) => {
            const req = await fetch(`http://localhost:3005/fullInfo/${element}`);
            const data = await req.json();
            console.log(data)
            results.push(data);
            console.log(results)
            setGameData(results);
        });
    }
    console.log(gameData);
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          const user1 = jwt.decode(token)
          if (!user1) {
              localStorage.removeItem('token');
              navigation.navigate('Login');
          } else {
              populate();
          }
      }
    }, []);

    const  repopulate = async (value) => {
        const req = await fetch(`http://localhost:3005/search/${value}`, {
          method: 'GET',
        })
        const data = await req.json()
        console.log(data)
        setGameData(data)
      }

    const handleSearch = (value) =>{
        if (!value.length) {
          value = "Trending"
          populate()  
          setSearch(value)
          console.log(search)
          return
        }
        repopulate(value);
        setSearch(value);
      }
    
  return (
      <SafeAreaView style={{ flex: 1 }}>
        <FocusedStatusBar background={COLORS.primary}/>
        <View style={{ flex: 1 }}>
            <View style={{ zIndex: 0 }}>
            {gameData &&
                <FlatList 
                    data={gameData} 
                    renderItem={({ item }) => <Card data={item} />}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<HomeHeader title={search} onSearch={handleSearch} />}
                />
                }
            </View>
        
            <View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: -1,
            }}>
                <View style={{ height: 300, background: COLORS.primary }} />
                <View style={{ flex: 1, background: COLORS.white }} />
            </View>
        </View>
    </SafeAreaView>
  );
};

export default Profile