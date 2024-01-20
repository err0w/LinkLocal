// EventDetails.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';

const EventDetails = ({ route }) => {
  // Assuming route.params contains the event details passed from the event list item
  const { event } = route.params;
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
       <Image source={{uri:event.image}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.dateTime}>{event.event_date_time}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.price}>₹{event.charges} per person</Text>
        <Text style={styles.description}>{event.description}</Text>
        {/* Render additional details like why attend etc. */}
      </View>
      <View style={styles.previousEventsContainer}>
        {/* Render previous events, if any */}
      </View>
      <View style={styles.priceContainer}>
        <Button title="Attend" onPress={() => navigation.navigate('ConfirmationScreen')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200, // Set the image height
    // Add any additional styling if needed
  },
  detailsContainer: {
    padding: 10,
    // Add any additional styling if needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // Add any additional styling if needed
  },
  // Add styles for dateTime, location, price, description, and any other elements
  previousEventsContainer: {
    // Add styling for the previous events section
  },
  priceContainer: {
    padding: 10,
    // Add any additional styling if needed
  },
});

export default EventDetails;
