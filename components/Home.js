import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text} from 'react-native';
import { COLORS } from '../constants';
import Card from './Card';
import HomeHeader from './HomeHeader';
import FocusedStatusBar from './FocusedStatusBar';

const Home = () => {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("Trending")
    const  populate = async () => {
        const req = await fetch('http://localhost:3005/trending', {
          method: 'GET',
        })
        const data = await req.json()
        console.log(data)
        setGames(data)
    }
    useEffect(() => {
      populate();
    }, []);
    console.log(games)

    const  repopulate = async (value) => {
      const req = await fetch(`http://localhost:3005/search/${value}`, {
        method: 'GET',
      })
      const data = await req.json()
      console.log(data)
      setGames(data)
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
            {games &&
                <FlatList 
                    data={games} 
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
}

export default Home