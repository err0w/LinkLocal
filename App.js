// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EventList from './EventList'; // The EventList component from above
import EventDetails from './EventDetails'; // The EventDetails component we created earlier

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EventList">
        <Stack.Screen name="EventList" component={EventList} options={{ title: 'Events' }} />
        <Stack.Screen name="EventDetails" component={EventDetails} options={{ title: 'Event Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
