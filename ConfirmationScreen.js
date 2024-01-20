// ConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ConfirmationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.congratsText}>Congratulations!</Text>
      <Text style={styles.infoText}>
        Your booking has been received. Someone from our team will contact you to confirm your
        booking & collect payment.
      </Text>
      <Text style={styles.thanksText}>Thanks!</Text>
      <Button
        title="Explore More"
        onPress={() => navigation.navigate('EventList')} // Assuming you want to go back to the list
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  congratsText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  thanksText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ConfirmationScreen;
