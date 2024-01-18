import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Pressable } from 'react-native';
import axios from 'axios';


export default function OrderForm({navigation,route}:any) {
  const { order } = route.params;
  const [ordername, setordername] = useState(order?.nombre || ''); 
  const [amount, setAmount] = useState(order?.cantidad || 0);
  const [email, setEmail] = useState(order?.email || '');
console.log("email:",email)
  const placeOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8080/createstore', {
        nombre: ordername,
        cantidad: amount,
        email: email  
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.main}>
      <Text style={styles.txt}>Confirma los datos de: {ordername}</Text>
      
      <TextInput  style={styles.input}
        placeholder="Tipo de moneda (eg. BTC)"
        value={ordername}
        onChangeText={setordername}  

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



<Text style={styles.txt} > Total Órden: </Text>
<Text style={styles.txt} > ${amount} </Text>
<Pressable
  style={styles.button} 
  onPress={placeOrder}
>
  <Text style={styles.buttonText} > Ok </Text> 

  
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
    width: '70%',
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
    width: '70%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 38,
    marginBottom: 15,
    marginTop: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    fontFamily: 'Futura',
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