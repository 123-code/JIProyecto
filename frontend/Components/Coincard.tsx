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
      <Text style={styles.cardText}>{name} ({symbol})</Text> 
      <Text>${price}</Text>
    </View>
  );
 

  const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    card: {
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#39FF14',
      borderRadius: 28,
    },
    cardText: {
      fontSize: 16,
      color: 'black',
      fontFamily: 'Futura',
      letterSpacing: 1.2,
      flex: 1,
      textAlign: 'center',
    },
  });
  export default CoinCard;