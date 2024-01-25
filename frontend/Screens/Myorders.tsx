import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import AppButton from '../Components/Button'
interface Order {
  nombre: string;
  cantidad: number;
  Email: string;
  CreatedAt: string;
}

export default function Myorders({ navigation, route }: any) {
  const [mycryptoData, setmyCryptoData] = useState<Order[]>([]);

  useEffect(() => {
    const viewOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getalldata');
        setmyCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        window.alert('Error fetching data');
      }
    };
    viewOrders();
  }, []);

  return (
    <View style={styles.container}>
      <AppButton title='Ingresar' onPress={()=>console.log("presionado")}/>
      <View style={styles.header}>
        
        <Text style={styles.txt}>Órdenes disponibles</Text>
      </View>
      <View style={styles.cardContainer}>
        {mycryptoData.map((order, index) => (
          <Card
            key={index}
            style={styles.card}
            onPress={() => {
              navigation.navigate('Datascreen', { order: order });
            }}
          >
            <Card.Content>
              <Title style={styles.titlecardText}>{order.nombre}</Title>
              <Paragraph style={styles.cardText}>${order.cantidad}</Paragraph>
              <Paragraph style={styles.cardText}>{order.Email}</Paragraph>
              <Paragraph style={styles.cardText}>
                {new Date(order.CreatedAt).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: '2-digit',
                })}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("NewOrder")
        }}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
