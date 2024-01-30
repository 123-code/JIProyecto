import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function CrearCompradorFormPage({navigation}):any{
 
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState(''); 
  const [cedula, setCedula] = useState('');
  const [usocuenta, setUsocuenta] = useState('');
  const [userId, setUserId] = useState<string>();

  const handleRegister = async () => {
    try {
      const data = await axios.post('http://localhost:8080/createuser', {
        Nombre: nombre,
        Apellido: apellido,
        Cedula: cedula,
        UsoCuenta: usocuenta
      });
    
      const userId = data.data.id;
      //setUserId(userId);
      console.log(userId);
    
     // setUserId(createdUserId);
   
      
      console.log('User created!');
      console.log(userId);
      await AsyncStorage.setItem('userId', userId);
      navigation.navigate("Myorders", {Userdata:data});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.main}>
      <TextInput style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
      />
      <TextInput  style={styles.input}
        value={apellido}
        onChangeText={setApellido}
        placeholder="Apellido"
      />
      <TextInput  style={styles.input}
        value={cedula}
        onChangeText={setCedula}
        placeholder="Cédula."  
      />
      <TextInput  style={styles.input}
        value={usocuenta} 
        onChangeText={setUsocuenta}
        placeholder="Uso de cuenta"
      />

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrame</Text>
      </Pressable>
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
  },
  deleteButton: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  },
  });