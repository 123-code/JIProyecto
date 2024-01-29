import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import AppButton from '../Components/Button'
interface Order {
  Nombre: string;
  Cantidad: number;
  Email: string;
  CreatedAt: string;
}

export default function MisOrdenes({ navigation, route }: any) {
  const [mycryptoData, setmyCryptoData] = useState<Order[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
const {userId} = route.params;

useEffect(() => {
    const GetotherOrders = async()=>{
      try{
        const response = await axios.get<Order[]>(`http://localhost:8080/user_orders?user_id=${userId}`);
        const data = response.data;
        console.log(data);
        setOrders(data);
  
      }
      catch(err){
        console.error(err)  
      
      }
    }
    GetotherOrders();
  
  },[])

  return (
    <View style={styles.container}>
     <Text style={styles.txt}> otras ordenes por este usuario:</Text>
        <Text>{orders[0]?.Nombre}</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    padding: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // Adjust the width as needed
    marginBottom: 10,
    backgroundColor: '#39FF14',
    borderRadius: 28,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Futura',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  txt: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Futura',
  },
  titlecardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777',
    fontFamily: 'Futura',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#39FF14',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonText: {
    fontSize: 24,
    color: 'black',
  },
});
