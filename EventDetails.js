// EventDetails.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';

const EventDetails = ({ route }) => {
  // Assuming route.params contains the event details passed from the event list item
  const { event } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={event.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.dateTime}>{event.dateTime}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.price}>{event.price}</Text>
        <Text style={styles.description}>{event.description}</Text>
        {/* Render additional details like why attend etc. */}
      </View>
      <View style={styles.previousEventsContainer}>
        {/* Render previous events, if any */}
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{event.price} per person</Text>
        <Button title="Attend" onPress={() => { /* Handle the attend action */ }} />
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
