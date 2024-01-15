import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
interface Coin { 
    id: string; 
    name: string; 
    symbol: string;
    price: number;
  }
const CoinCard = ({ name, symbol, price }: Coin) => (
    <View style={styles.card}>
      <Text>{name} ({symbol})</Text> 
      <Text>${price}</Text>
    </View>
  );
  

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
  export default CoinCard;