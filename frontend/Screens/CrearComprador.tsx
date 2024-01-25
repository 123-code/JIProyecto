import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { CompradorForm } from '../Components/compradorForm';

const CrearCompradorFormPage = () => {
  return (
    <View style={styles.container}>
      <CompradorForm />
    </View>
  );
};

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
 
 

export default CrearCompradorFormPage;

