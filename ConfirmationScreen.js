// ConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import ConfirmedSVG from './assets/undraw_confirmed_re_sef7.svg'

const ConfirmationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source ={require('./assets/confirmed.png')} style={{height: 120, width: 120}} />
      <Text style={styles.congratsText}>Congratulations!</Text>
      <Text style={styles.infoText}>
        Your booking has been received. Someone from our team will contact you to confirm your
        booking & collect payment.
      </Text>
      <Text style={styles.thanksText}>Thanks!</Text>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('EventList')}>
          <Text style={styles.buttonText}>Explore More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0000ff', 
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    margin: 8,
  },
  buttonText: {
    color: 'white'
  },
  container: {
    backgroundColor:'white',
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
