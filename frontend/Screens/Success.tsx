import React from "react";

import { StyleSheet, Text, View } from "react-native";

const Success = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success</Text>
    </View>
  );
};
 export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
});