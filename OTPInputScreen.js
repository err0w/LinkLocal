// OTPInputScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from './App'; // Adjust the import path as per your project structure
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPInputScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const { signIn } = useContext(AuthContext); // Use AuthContext here
  const { phoneNumber, confirm } = route.params;

  const handleVerifyOTP = async () => {
    try {
      const user = await confirm.confirm(otp);
      console.log(user);
      // Use signIn from AuthContext to update the authentication state
      await AsyncStorage.setItem('phone_number', user["user"]["phoneNumber"]);
      signIn(user["_tokenResponse"]["idToken"]);
      
      // Navigation to 'EventList' or wherever appropriate happens after sign-in
    } catch (error) {
      console.log("Incorrect OTP", error);
      // Optionally, show an error message to the user
    }
  };

  const resendOTP = () => {
    // Implementation for resending OTP goes here
  };

  return (
    <View style={styles.container}>
      <Text>Please enter the 6 digit OTP sent to {phoneNumber}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setOtp}
        value={otp}
        keyboardType="number-pad"
        maxLength={6} // Adjust based on your OTP length
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>Submit OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resendOTP}>
          <Text style={styles.buttonText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ flexDirection: 'row', marginTop: 12 }} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name='replay' size={24} color='black' />
        <Text style={{ margin: 2 }}>Change Phone</Text>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
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
