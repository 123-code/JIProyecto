import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Pressable } from 'react-native';
import axios from 'axios';
import { Card, Title, Paragraph } from 'react-native-paper';

//import OrderCard  from '../Components/OrderCard'

interface Order {
    nombre: string;
    cantidad: number; 
    Email: string;
    CreatedAt: string;
  }
  

export default function Myorders({navigation,route}:any){
  const [mycryptoData, setmyCryptoData] = useState<Order[]>([]);
 

  useEffect (()=>{
    const ViewOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getalldata')
            setmyCryptoData(response.data);
    
          
         // console.log(myorders.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
            window.alert('Error fetching data');
          }
      }; 
      ViewOrders(); 
  },[])
 
  
  return (
    <View style={styles.container}>
         <View style={styles.header}>
         <Text style={styles.txt}> Mis Órdenes</Text>
         </View>
     {mycryptoData.map((order,index)=>(
        <Card key={index} style={styles.card} onPress={()=>{navigation.navigate('Datascreen' ,{order: order})}}
        >
      <Card.Content>
            <Title style={ styles.titlecardText}>{order.nombre}</Title>
            <Paragraph style={styles.cardText}>${order.cantidad}</Paragraph>
            <Paragraph style={styles.cardText}>{order.Email}</Paragraph>
            <Paragraph style={styles.cardText}>{new Date(order.CreatedAt).toLocaleDateString('en-US', {
                                                month: '2-digit',
                                                day: '2-digit',
                                                year: '2-digit'
                                                 })}</Paragraph>
                                   </Card.Content>
                                    </Card>
                                    ))}
                                     </View>
    
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#212121',
    padding: 10,
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
  
  cardText: {
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
    marginBottom: 30,
    fontFamily: 'Futura',
  },
  titlecardText: {
    fontSize: 16,
  fontWeight:'bold',
    color: '#777',
    fontFamily: 'Futura',
    letterSpacing: 1.2,
    flex: 1,
    textAlign: 'center',
  },
  header: { 
    
    paddingVertical: 16,
    paddingHorizontal: 12
  },

});