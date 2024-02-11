// PhoneNumberInputScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
      <Image style ={{width: 100, height: 100, marginBottom: 20}}
        source= {{uri: 'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png'}}
      ></Image>

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
      <TouchableOpacity style={styles.button} onPress={() => handleGetOTP()}>
          <Text style={styles.buttonText}>Submit OTP</Text>
      </TouchableOpacity>
      {/* <Button title="Get OTP" onPress={handleGetOTP} /> */}
      <View style={styles.links}>
        <Text style={styles.linkText}>Privacy Policy</Text>
        <Text style={styles.linkText}>Terms of Use</Text>
      </View>
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
  links: {
    marginTop: 32
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
  linkText: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default PhoneNumberInputScreen;