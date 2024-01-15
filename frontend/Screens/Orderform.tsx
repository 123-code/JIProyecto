import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function OrderForm() {
  const [coin, setCoin] = useState('');
  const [amount, setAmount] = useState('');

  const placeOrder = () => {
    // Logic to place order
    console.log(`Order placed for ${amount} ${coin}`); 
  };

  return (
    <View style={styles.container}>
      <Text>Place a Crypto Order</Text>
      
      <TextInput 
        placeholder="Coin type (eg. BTC)"
        value={coin}
        onChangeText={setCoin}  
      />

      <TextInput
        keyboardType="numeric"
        placeholder="Order amount"
        value={amount}
        onChangeText={setAmount}  
      />

      <Button title="Place Order" onPress={placeOrder} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20    
  }
});