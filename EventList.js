// EventList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { collection, getDocs } from "firebase/firestore";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {db} from './firebase.js';

// const events = [
//   {
//     id: '1',
//     title: 'Pottery Workshop at F House with Complimentary drinks',
//     dateTime: 'Wednesday, Jan 17 2024 at 13:00',
//     location: 'F House, Hyderabad',
//     price: '₹1400 per person',
//     image: './path-to-your-image.png', // Replace with actual image path or URL
//     description: 'Join us for a fun pottery workshop...',
//     // Add more details that you will pass to the EventDetails screen
//   },
//   // ... more events
// ];

const EventList = () => {

const [events, setEvents] = useState([]);

const fetchEvents = async () => {
       
  await getDocs(collection(db, "events"))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
              .map((doc) => ({id:doc.data().id, charges:doc.data().charges, event_desc_images: doc.data().event_desc_images, location:doc.data().location_name , name:doc.data().name, image:doc.data().main_image}));
          console.log(newData)
          setEvents(newData);                
          console.log(events, newData);
      })
 
}

useEffect(()=>{
  fetchEvents();
}, [])

  const navigation = useNavigation();

  const navigateToEventDetails = (event) => {
    navigation.navigate('EventDetails', { event });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigateToEventDetails(item)}>
      <Image source={{uri:item.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.dateTime}>{item.event_date_time}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.price}>{item.charges}</Text>
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

const Drawer = createDrawerNavigator()
const DrawerWithEventList = () =>{
  return(
    <NavigationContainer >
      <Drawer.Screen name = "Events List" component={EventList}/>
    </NavigationContainer>
  )
}

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


export default DrawerWithEventList;