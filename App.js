import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import Map from './components/Map'
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native'
import * as Location from 'expo-location';
import { getDistance } from "geolib";




export default function App() {
  const [CurrentLocation, setCurrentLocation] = useState()
  const [locationLoading, setLocationLoading] = useState(true)
  
  const [mts, setMts] = useState()

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setCurrentLocation(location);
      setLocationLoading(false)
      handleDistance(location);
      

     
      
    })();
  }, [])

  function handleDistance(location) {
    const Rstnt1 = getDistance(location.coords, {
        latitude: 19.305297215614292 ,
        longitude: -99.11210019335235 
    })
    const Rstnt2 = getDistance(location.coords, {
      latitude: 19.311575472442417,
      longitude:  -99.11054227207927
  })
  const restaurantes = [Rstnt1, Rstnt2];
  const minValue = Math.min(...restaurantes); 
  setMts(minValue)
      
  };
  

  

 
  
  if(locationLoading) {
    return <ActivityIndicator color='blue' size='small' />
  }

  return (
    <View style={styles.container}>
      <Map location={CurrentLocation}/>
      <Text> Estas a {mts} metros de el Restaurante</Text>

      
      
    </View>
      
      
  );
}

const styles = StyleSheet.create({
  container: {
   width:'100%',
   height:'100%'

  },
  /* location : {
    flex:2,
    with:50,
    
  } */
});
