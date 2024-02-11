// EventDetails.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-carousel-banner';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const EventDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();

  // Function to render the reasons to attend section
  const renderReasonsToAttend = (reasons) => {
    return reasons.map((reason, index) => (
      <Text key={index} style={styles.reasonItem}>{index + 1}. {reason}</Text>
    ));
  };

  // Function to render placeholders for previous events images
  const renderPreviousEventsImages = () => {
    // Assuming we have an array of previous event image URLs
    // For now, just returning placeholders
    return [...Array(9)].map((_, index) => (
      <View key={index} style={styles.previousEventImage} />
    ));
  };

  const imageUrls = ["https://cdn.socio.events/spai/q_glossy+w_966+to_avif+ret_img/socio.events/wp-content/uploads/2022/10/AdobeStock_240758729-2048x1146.jpeg", 
  "https://media.licdn.com/dms/image/C561BAQE-51J-8KkMZg/company-background_10000/0/1584559866970/eventscom_cover?e=2147483647&v=beta&t=8NsL_HPkr3nHk4ppAg8MkUoiYPUIf082mpMvySv5C7o"]

  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      {/* <Image source={{ uri: event.image }} style={styles.image} /> */}
      <Carousel data={imageUrls} roundedSize={8} style={{margin:16}} />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.dateTime}>{event.event_date_time}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.price}>₹{event.charges} per person</Text>

        <View style={styles.reasonsContainer}>
          <Text style={styles.sectionTitle}>Why should you join?</Text>
          {/* {renderReasonsToAttend(["Good Weather", "Bad Weather"])} */}
          <RenderHtml
            contentWidth={width}
            source={{html: `<p>Hello World!</p>`}}
          />
        </View>

        {/* <Text style={styles.description}>{event.description}</Text> */}
        <RenderHtml
            contentWidth={width}
            source={{html: `<p>`+event.description+`</p>`}}
          />
      </View>

      <View style={styles.previousEventsContainer}>
        <Text style={styles.sectionTitlePreviousEvents}>Previous events</Text>
        <View style={styles.previousEventsImagesContainer}>
          {renderPreviousEventsImages()}
        </View>
      </View>

      <TouchableOpacity style={styles.attendButton} onPress={() => navigation.navigate('ConfirmationScreen')}>
        <Text style={styles.attendButtonText}>Attend</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  carouselImage: {
    width: '100%', // Carousel image width
    height: 200, // Carousel image height, adjust as needed
  },

  container: {
    flex: 1,
    backgroundColor: '#fff', // Assuming a white background
  },
  image: {
    width: '100%',
    height: 200, // Image height as per design
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateTime: {
    // Style for date and time
  },
  location: {
    // Style for location
  },
  price: {
    // Style for price
  },
  reasonsContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  sectionTitlePreviousEvents: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16
  },
  description: {
    marginTop: 16,
  },
  previousEventsContainer: {
    marginTop: 16,
    padding: 8
  },
  previousEventsImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  previousEventImage: {
    width: '31%', // 3 images per row with spacing
    height: 100, // Fixed height for images
    backgroundColor: '#e1e1e1', // Placeholder color
    marginBottom: 8,
  },
  attendButton: {
    backgroundColor: '#0000ff', // Blue color for the button
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    margin: 8,
  },
  attendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Add styles for dateTime, location, price, description, and any other elements
});

export default EventDetails;
