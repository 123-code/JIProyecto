import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';

interface Info {
  name: string;
  symbol: string;
  current_price: number; 
}


export default function HomeScreen({navigation}:any) {
  const [cryptoData, setCryptoData] = useState<Info[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h&x-cg-pro-api-key=CG-pDUhHeh4gm6dA1fzPTWkwE3K', {
          params: {
            vs_currency: 'usd',
            per_page: 10,  
          },
        });
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        window.alert('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.cardtext}>Lista de monedas</Text>
      {cryptoData.map((crypto, index) => (
        <Card key={index} style={styles.card}
        onPress={()=>{navigation.navigate("Ordenform" ,{cryptodata: crypto})}}
        >
          <Card.Content>
            <Title>{crypto.name}</Title>
            <Paragraph>{crypto.symbol}</Paragraph>
            <Paragraph>Precio Actual: {crypto.current_price} USD</Paragraph>
          </Card.Content>
        </Card>
      ))}

      

      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#39FF14',
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    elevation: 3,
    marginBottom: 10,
    marginTop: 20,
    width: '70%',
  },
  cardtext: {
    fontSize: 16,
  
    color: 'black',
    fontFamily: 'Futura',
    letterSpacing: 1.2,
    flex: 1,
    textAlign: 'center',
  }
});