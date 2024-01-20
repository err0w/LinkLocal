// OTPInputScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPInputScreen = ({ route, navigation, setIsAuthenticated }) => {
  const [otp, setOtp] = useState('');
  const { phoneNumber } = route.params;

  const handleVerifyOTP = async () => {
    // Normally, verify the OTP with your backend
    // For now, we'll assume the OTP is always '123456'
    if (otp === '123456') {
      await AsyncStorage.setItem('userToken', 'authenticated');
      setIsAuthenticated(true);
      navigation.navigate('EventList');
    } else {
      alert('Incorrect OTP');
    }
  };

  const resendOTP = () => {
    // Normally, you would resend the OTP here
    // For this example, do nothing
  };

  return (
    <View style={styles.container}>
      <Text>Please enter the 4 digit OTP sent to {phoneNumber}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setOtp}
        value={otp}
        keyboardType="number-pad"
        maxLength={6} // OTP length
      />
      <Button title="Submit OTP" onPress={handleVerifyOTP} />
      <Button title="Change phone" onPress={() => navigation.goBack()} />
      <Button title="Resend OTP" onPress={resendOTP} />
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
});

export default OTPInputScreen;
