import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Pressable } from 'react-native';
import axios from 'axios';
import { Card, Title, Paragraph } from 'react-native-paper';


export default function BuyOrder({navigation,route}:any){
    const {order} = route.params;
    const [ordername, setordername] = useState(order?.nombre || ''); 
    const [amount, setAmount] = useState(order?.cantidad || 0);
    const [email, setEmail] = useState(order?.email || '');
    return(
     <View>
        <Text> orden {ordername}</Text>
     </View>
    )

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