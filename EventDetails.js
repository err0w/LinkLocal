// EventDetails.js
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-carousel-banner';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from './firebase.js';

const EventDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
  const [attendingEvent, setAttendingEvent] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const [attendButtonText, setAttendButtonText] = useState("Attend")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const phoneNumber = await AsyncStorage.getItem('phone_number');
        setUserPhoneNumber(phoneNumber);

        // Assuming you have a collection called "userBookings"
        const userBookingDoc = await db.collection("userBookings").doc(phoneNumber).get();

        if (userBookingDoc.exists) {
          const userData = userBookingDoc.data();
          console.log(userData[event.id]);
          if(userData[event.id]){
            setAttendingEvent(userData[event.id]["attending"])
            
          }
          console.log(attendingEvent);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    fetchData();
  },[]);

  const handleAttendButton = async () => {

    if(!attendingEvent){
      const event_id = event.id
      console.log(event_id)
      setAttendingEvent(true)
      db.collection("userBookings").doc(userPhoneNumber).update({[event_id]:{"attending": true}})
      navigation.navigate('ConfirmationScreen')
    }
  };



  // Function to render placeholders for previous events images
  const renderPreviousEventsImages = () => {
    // Assuming we have an array of previous event image URLs
    // For now, just returning placeholders
    return event.event_picture_list.map((imageUrl, index) => (
      <Image key={index} source={{ uri: imageUrl }} style={styles.previousEventImage} />
    ));
  };

  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      {/* <Image source={{ uri: event.image }} style={styles.image} /> */}
      <Carousel data={event.top_image_list} roundedSize={8} style={{margin:16}} />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.dateTime}>{event.event_date_time}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.price}>₹{event.charges} per person</Text>

        <View style={styles.reasonsContainer}>
          <Text style={styles.sectionTitle}>{event.mid_section_title}</Text>
          {/* {renderReasonsToAttend(["Good Weather", "Bad Weather"])} */}
          <RenderHtml
            contentWidth={width}
            source={{html: `<p>`+event.mid_section_html+`</p>`}}
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

      <TouchableOpacity style={attendingEvent ? styles.attendButtonGray : styles.attendButton} onPress={handleAttendButton}>
        <Text style={styles.attendButtonText}>{attendingEvent ? '✔ Invited' : 'Attend'}</Text>
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
  attendButtonGray: {
    backgroundColor: '#979797', // Gray color for the button when attending
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
