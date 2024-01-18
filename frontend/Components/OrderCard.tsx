import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
interface Orden { 
    coin: string; 
    amount: string; 
    email: string;
  }
const OrderCard = ({ navigation,route }: any) => (
  
    <View style={styles.card}>
      <Text style={styles.cardText}>{coin}</Text> 
      <Text style={styles.cardText}>$({amount})</Text> 
      <Text style={styles.cardText}>email:{email}</Text>
    </View>
  );
 
  const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    card: {
      padding: 10,
      marginBottom: 20,
      backgroundColor: '#39FF14',
      borderRadius: 18,
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
  export default OrderCard;