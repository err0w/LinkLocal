import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PhoneNumberInputScreen from './PhoneNumberInputScreen';
import OTPInputScreen from './OTPInputScreen';
import EventList from './EventList1';
import EventDetails from './EventDetails';
import ConfirmationScreen from './ConfirmationScreen';
// ... other imports

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = await AsyncStorage.getItem('userToken');
        setIsAuthenticated(!!authToken);
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
