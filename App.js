import 'react-native-gesture-handler';
import React, { useEffect, useContext, useReducer, useMemo } from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import your screens and Firebase setup
import PhoneNumberInputScreen from './PhoneNumberInputScreen';
import OTPInputScreen from './OTPInputScreen';
import EventList from './EventList1';
import EventDetails from './EventDetails';
import ConfirmationScreen from './ConfirmationScreen';
// Assuming you have a firebase.js for Firebase setup

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const AuthContext = React.createContext();

function CustomDrawerContent(props) {
  const { signOut } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Log Out", onPress: signOut }
            ]
          );
        }}
      />
    </DrawerContentScrollView>
  );
}

function StackLoggedIn() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventList"
        component={EventList}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 30 }}>☰</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={StackLoggedIn} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

const App = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        const token = 'dummy-auth-token'; // Simulate getting a token from a server
        await AsyncStorage.setItem('userToken', token);
        dispatch({ type: 'SIGN_IN', token: token });
      },
      signOut: async () => {
        await AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        const token = 'dummy-auth-token'; // Simulate getting a token from a server
        await AsyncStorage.setItem('userToken', token);
        dispatch({ type: 'SIGN_IN', token: token });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? (
          <Stack.Navigator>
            <Stack.Screen name="PhoneNumberInputScreen" component={PhoneNumberInputScreen} options={{ title: 'Login' }} />
            <Stack.Screen name="OTPInputScreen" component={OTPInputScreen} />
          </Stack.Navigator>
        ) : (
          <DrawerNavigation />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
// At the bottom of App.js
export { AuthContext };
