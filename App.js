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
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';


const Stack = createStackNavigator();

// const Drawer = createDrawerNavigator();



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  // function EventListDrawer() {
  //   return (
  //     <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
  //       <Drawer.Screen name="EventList" component={EventList} />
  //       {/* Add other screens here, like About Us and Help, if they have separate components */}
  //     </Drawer.Navigator>
  //   );
  // }
  

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
          <Stack.Screen name="EventList"> 
            {props => <EventList {...props} setIsAuthenticated ={setIsAuthenticated}/>}

          </Stack.Screen>
          {/* <Stack.Screen name="Home" component={EventListDrawer} options={{ headerShown: false }} /> */}
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
