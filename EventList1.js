// EventList.js
import React from 'react';
import { View, FlatList, Alert, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// ... other imports and rest of your code for EventList component
const events = [
    {
      id: '1',
      title: 'Pottery Workshop at F House with Complimentary drinks',
      dateTime: 'Wednesday, Jan 17 2024 at 13:00',
      location: 'F House, Hyderabad',
      price: '₹1400 per person',
      image: './path-to-your-image.png', // Replace with actual image path or URL
      description: 'Join us for a fun pottery workshop...',
      // Add more details that you will pass to the EventDetails screen
    },
    // ... more events
  ];

const EventList = () => {
  const navigation = useNavigation();

  const navigateToEventDetails = (event) => {
    navigation.navigate('EventDetails', { event });
  };


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={showLogoutAlert}>
          <Text style={styles.headerButton}>⋮</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const showLogoutAlert = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", onPress: handleLogout }
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      // Reset the navigation state to the new route
      navigation.reset({
        index: 0,
        routes: [{ name: 'PhoneNumberInputScreen' }],
      });
    } catch (e) {
      // handling exception
    }
  };

  // ... rest of your EventList component
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigateToEventDetails(item)}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.dateTime}>{item.dateTime}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      },
      image: {
        width: 50,
        height: 50,
        // Adjust the image styling as needed
      },
      info: {
        flex: 1,
        paddingLeft: 10,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      dateTime: {
        fontSize: 14,
      },
      location: {
        fontSize: 14,
      },
      price: {
        fontSize: 14,
      },
  headerButton: {
    padding: 10,
    fontSize: 18,
  },
});

export default EventList;
