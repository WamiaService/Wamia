import React , { useState} from 'react'
import { StyleSheet,Image, Button,Text, TextInput, View ,TouchableOpacity } from 'react-native';

 const Custumor=()=> {
  
   const [data,setData]=useState([])
   const[refetch,setRefectch]=useState()

// getone Custumor
   const getOneCustumor = async () => {
    try {
      const response = await axios.get('');
      setData(response.data); // 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



    return (
  
      <View></View>
      );
    };
    
 


export default Custumor

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    editButton: {
      marginTop: 20,
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    editButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });








