import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './Screens/MainPage';
import OrdenformScreen from './Screens/Orderform';
import Myorders from './Screens/Myorders'
import DataScreen from './Screens/Editorder';
import Success from "./Screens/Success";
import OrderFormNew from "./Screens/OrderNew"
import CrearCompradorFormPage  from './Screens/CrearComprador';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Myorders" component={Myorders}/>
      <Stack.Screen name="CrearComprador" component={CrearCompradorFormPage} />
    
      <Stack.Screen name="Datascreen" component={DataScreen}/>
      <Stack.Screen name="Home" component={MainPage} />  
      <Stack.Screen name="Ordenform" component={OrdenformScreen} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="NewOrder" component={OrderFormNew} />

      </Stack.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    padding: 10,
  },
});
