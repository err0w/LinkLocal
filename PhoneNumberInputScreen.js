// PhoneNumberInputScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PhoneNumberInputScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGetOTP = () => {
    // Here you would normally connect to your backend to send an OTP
    // For now, we will just navigate to the OTP screen
    navigation.navigate('OTPInputScreen', { phoneNumber: `+91${phoneNumber}` });
  };

  return (
    <View style={styles.container}>
      <Text>Please enter your mobile number</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="+91"
        keyboardType="phone-pad"
      />
      <Button title="Get OTP" onPress={handleGetOTP} />
      <Text style={styles.linkText}>Privacy Policy</Text>
      <Text style={styles.linkText}>Terms of Use</Text>
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
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  linkText: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default PhoneNumberInputScreen;