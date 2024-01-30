import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//"Ordenform"

export default function OrderFormNew({navigation,route}:any) {

  const [coin, setCoin] = useState(''); 
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');

  const placeOrder = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log(storedUserId);
      const response = await axios.post('https://jiproyecto-production.up.railway.app/createstore', {
        UserID: storedUserId,
        nombre: coin,
        cantidad: amount,
        email: email  
      });
      navigation.navigate("Success");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.main}>
      <Text style={styles.txt}>Iniciar una orden.</Text>
      
      <TextInput  style={styles.input}
        placeholder="Tipo de moneda (eg. BTC)"
        value={coin}
        onChangeText={setCoin}  

      />

<TextInput  
          style={styles.input}
          keyboardType="numeric"
          placeholder="Cantidad a pedir($)"
          value={amount.toString()} 
          onChangeText={(value) => setAmount(parseInt(value))} 
        />

        <TextInput style={styles.input}
        placeholder="Email(para notificaciones de tu orden)"
        value={email}
        onChangeText={setEmail}  
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
    padding: 10,
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
    marginTop: 20,
    width: '90%',
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
    alignItems: 'center',
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 38,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  main: {
    flex: 1,
    backgroundColor: '#212121',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  txt:{
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Futura',
  }
});
