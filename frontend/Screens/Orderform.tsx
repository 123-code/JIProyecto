import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Pressable } from 'react-native';

export default function OrderForm() {
  const [coin, setCoin] = useState('');
  const [amount, setAmount] = useState('');

  const placeOrder = () => {
    // Logic to place order
    console.log(`Order placed for ${amount} ${coin}`); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
      <Text style={styles.txt}>Iniciar una orden</Text>
      
      <TextInput  style={styles.input}
        placeholder="Tipo de moneda (eg. BTC)"
        value={coin}
        onChangeText={setCoin}  

      />

      <TextInput style={styles.input}
        keyboardType="numeric"
        placeholder="Cantidad a pedir($)"
        value={amount}
        onChangeText={setAmount}  
      />

<Pressable
  style={styles.button} 
  onPress={placeOrder}
>
  <Text style={styles.buttonText} > Crear orden </Text> 
</Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#39FF14',
    borderRadius: 38,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
    marginBottom: 10,
    width: '100%',
  },
  
  buttonText: {
    fontSize: 16,
  
    color: 'black',
    fontFamily: 'Futura',
    letterSpacing: 1.2,
    flex: 1,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  main: {
    flex: 1,
    backgroundColor: '#212121',
    borderRadius: 10,
    padding: 20,
  },
  txt:{
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Futura',
  }
});