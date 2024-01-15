import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'; 
import CoinCard from './Components/Coincard';
import { useNavigation } from '@react-navigation/native';
// Main Page 
export default function App() {
  const navigation = useNavigation();
  const [coinData, setCoinData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch('https://api.coinlore.net/api/tickers/');
      const data = await res.json(); 
      setCoinData(data.data.slice(0, 10)); 
    };
    fetchCoins();
  }, []);

  return (
    <View style={styles.container}>
      {coinData.map(coin => ( 
        <CoinCard  
          key={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          price={coin.price_usd} id={''}        />
      ))}
      <Button onPress={() => navigation.navigate('OrderForm')} title="Order Form"/>
    </View>
  );
}

// Card Component
interface Coin { 
  id: string; 
  name: string; 
  symbol: string;
  price: number;
}



const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  card: {
    backgroundColor: 'white',  
    padding: 10,
    marginBottom: 10
  }
});