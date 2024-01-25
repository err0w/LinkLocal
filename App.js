import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import PhoneNumberInputScreen from './PhoneNumberInputScreen';
import OTPInputScreen from './OTPInputScreen';
import EventList from './EventList1';
import EventDetails from './EventDetails';
import ConfirmationScreen from './ConfirmationScreen';
import app from './firebase.js'
// ... other imports

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

 

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = await AsyncStorage.getItem('userToken');
        const uid = await AsyncStorage.getItem('uid');
        setIsAuthenticated(!!uid);
      } catch (e) {
        // handling exception
      }
    };

    checkAuthentication();
  }, []);
  const renderScreens = () => {
    if (isAuthenticated) {
      return (
        <>
          <Stack.Screen name="EventList" component={EventList} />
          <Stack.Screen name="EventDetails" component={EventDetails} />
          <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen name="PhoneNumberInputScreen" component={PhoneNumberInputScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="OTPInputScreen">
            {props => <OTPInputScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        </>
      );
    }
  };


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {renderScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
