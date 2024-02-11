// OTPInputScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const OTPInputScreen = ({ route, navigation, setIsAuthenticated }) => {
  const [otp, setOtp] = useState('');
  const { phoneNumber, confirm } = route.params;

  const handleVerifyOTP = async () => {
    // Normally, verify the OTP with your backend
    // For now, we'll assume the OTP is always '123456'
    try{
      const user = await confirm.confirm(otp);
      console.log(user)
      await AsyncStorage.setItem('userToken',user["_tokenResponse"]["idToken"]);
      await AsyncStorage.setItem('uid',user["user"]["uid"]);
      setIsAuthenticated(true);
      navigation.navigate('EventList');
    }catch(error){
      console.log("incorrect otp")
      console.log(error)
    }

    // if (otp === '123456') {
    //   await AsyncStorage.setItem('userToken', 'authenticated');
    //   setIsAuthenticated(true);
    //   navigation.navigate('EventList');
    // } else {
    //   alert('Incorrect OTP');
    // }
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
      <View style = {styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleVerifyOTP()}>
          <Text style={styles.buttonText}>Submit OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => resendOTP()}>
          <Text style={styles.buttonText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{color: 'black', flexDirection: 'row', marginTop: 12}} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name='replay' size={24} color='black' /> 
        <Text style={{margin: 2}}>Change Phone</Text>
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
    flexDirection: 'row', // align children in a row (horizontal)
    justifyContent: 'center', // center children horizontally in the container
    alignItems: 'center', // center children vertically in the container
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
