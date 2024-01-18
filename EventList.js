// EventList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  // ... add more styles for your event cards
});

export default EventList;
