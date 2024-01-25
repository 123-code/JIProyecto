import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const AppButton: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="person" size={16} color="gray" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#39FF14',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '15%',
  },
  title: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Futura',
    marginLeft: 5
  }
});

export default AppButton;