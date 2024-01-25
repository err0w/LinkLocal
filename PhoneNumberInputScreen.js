// PhoneNumberInputScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {app, firebaseConfig} from './firebase.js'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, signOut } from "firebase/auth";

const PhoneNumberInputScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const recaptchaVerifier = useRef(null);

  const handleGetOTP = async () => {
    const phoneProvider = new PhoneAuthProvider();
    const auth = getAuth(app)
    try{
    const confirmation = await signInWithPhoneNumber(auth,phoneNumber, recaptchaVerifier.current)
    console.log(confirmation)
    setConfirm(confirmation)
    navigation.navigate('OTPInputScreen', { phoneNumber: phoneNumber, confirm:confirmation });
    }catch(err){
      console.log(err)
    }
     
  };




  return (
    <View style={styles.container}>
      <Text>Please enter your mobile number</Text>
      <FirebaseRecaptchaVerifierModal
  ref={recaptchaVerifier}
  firebaseConfig={firebaseConfig}
  attemptInvisibleVerification={true | false /* experimental */}
/>
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