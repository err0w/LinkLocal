// EventList.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from "firebase/firestore";
import { truncateTitle, formatFirestoreTimestamp } from './util.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
import {db} from './firebase.js';



const EventList = () => {


  const [events, setEvents] = useState([]);
  
  const navigation = useNavigation()
  const fetchEvents = async () => {
         
    await getDocs(collection(db, "events"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({id:doc.data().id, charges:doc.data().charges, event_desc_images: doc.data().event_desc_images, location:doc.data().location_name , name:doc.data().name, image:doc.data().main_image, event_date_time:formatFirestoreTimestamp(doc.data().event_date_time), description:doc.data().description }));
            console.log(newData)
            setEvents(newData);                
            console.log(events, newData);
        })
   
  }
  
  useEffect(()=>{
    fetchEvents();
  }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Text style={styles.headerButton}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  // const navigation = useNavigation();

  const navigateToEventDetails = (event) => {
    navigation.navigate('EventDetails', { event });
  };


  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity onPress={showLogoutAlert}>
  //         <Text style={styles.headerButton}>⋮</Text>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation]);

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
      // Reset the navigation state to the new ro*ute
      navigation.reset({
        index: 0,
        routes: [{ name: 'PhoneNumberInputScreen' }],
      });
    } catch (e) {
      // handling exception
      console.log(e)
    }
  };

  // ... rest of your EventList component
  const renderItem = ({ item }) => {
    //truncating the title to accomodate various event titles
    const title = truncateTitle(item.name, 2, 24)
    
    return(
    <TouchableOpacity style={styles.card} onPress={() => navigateToEventDetails(item)}>
       <Image source={{uri:item.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.locationContainer}>
          <MaterialCommunityIcons name = 'map-marker' size={12} color='black'/> 
          <Text style={styles.location}>{item.location}</Text>
        </View>
        <View style = {styles.locationContainer} >
          <MaterialCommunityIcons name = 'calendar-clock' size={12} color = 'black' />
          <Text style={styles.dateTime}>{item.event_date_time}</Text>
        </View>
        <View style = {styles.locationContainer} >
          <MaterialCommunityIcons name = 'currency-inr' size={12} color = 'black'/>
          <Text style={styles.price}>{item.charges} per person</Text>
        </View>
      </View>
    </TouchableOpacity>
  )};

  return (
    <FlatList
      style = {styles.eventList}
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};



const styles = StyleSheet.create({
    eventList: {
      backgroundColor: 'white'
    },
    card: {
        flexDirection: 'row',
        padding: 8,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        margin: 4,
        height: 100
      },
      image: {
        width: 85,
        height: 85,
        borderRadius: 4
        // Adjust the image styling as needed
      },
      info: {
        flex: 1,
        paddingLeft: 8,
      },
      title: {
        fontSize: 14,
        height: '40%'
      },
      
      dateTime: {
        marginLeft:4,
        fontSize: 12,
      },
      location: {
        marginLeft:4,
        marginTop:4,
        fontSize: 12,
      },
      price: {
        marginLeft:4,
        fontSize: 12,
      },
  headerButton: {
    padding: 10,
    fontSize: 18,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // Add any additional styling as needed
  },
});

export default EventList;
