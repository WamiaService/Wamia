import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, TextInput , Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



const ProfilePayment = () => {
  const navigation = useNavigation()

    const [amount,setAmount]=useState(0)
 
  
  const premuim=()=>{
    setAmount(50000)
  }
  const normale=()=>{
    setAmount(35000)
  }
  console.log(amount);
  const pay = ()=>{
axios.post(http://192.16.11.8:3000/api/payment/pay/${amount})
.then((rslt)=>{
  const {result}=rslt.data
  console.log(result);
  Linking.openURL(result.link);


}).then((rslt)=>{
  console.log(rsl);
})
.catch((err)=>{
  console.log(err);
})

  }  
    return (
       
    <View style={styles.container}>
    <View style={styles.containerCoverture} >
      <View style={styles.containerImage}>
        <Image
         source={{ uri: data.image }}
          style={styles.image}
        />
      </View>
      
      <Text style={styles.Username} variant="displayLarge"> {data.name}</Text>
      <Text style={styles.profileUsername}>{data.email}</Text>
</View>

<View style={styles.AddButton}>
<Button  title="Pay" onPress={pay}   />
</View>
<TouchableOpacity onPress={premuim} >
<View style={styles.card}>
<View style={styles.image}>
<View style={styles.all}>
<Image
style={styles.logo}
source={require("../../components/Image/Tawelti.png")}
/>
<Text style={styles.ta}> Tawelti</Text>
</View>
<Text style={styles.pre}>Premuim</Text>
</View>
<View style={styles.content}>
<Text style={styles.title}>
if you chose this package your place will be in the home page so every client will enter to our application will see it  
</Text>
</View>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={normale} >
<View style={styles.cardd}>
<View style={styles.imagee}>
<View style={styles.all}>
<Image
style={styles.logo}
source={require("../../components/Image/Tawelti.png")}
/>
    <Text style={styles.ta}> Tawelti</Text>
    </View>
    <Text style={styles.pre}>Normale</Text>
    </View>
    <View style={styles.content}>
    <Text style={styles.title}>
    if you chose this package your place will be in the category   
    </Text>
    
    
    </View>
    
    </View>
    </TouchableOpacity>
    </View>
    
    
    
    );
}

const styles = StyleSheet.create({
    container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    
  },
  containerImage: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    marginTop: '35%',
    marginLeft: '38%',
    overflow: 'hidden',
    background: 'linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  Username: {
    marginTop: '-1%',
    marginLeft: '38%',
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
    wordWrap: 'break-word',
  },
  profileUsername: {
    marginTop: '1%',
    color: '#757575',
    fontSize: 12,
    fontFamily: 'Hanuman',
    fontWeight: '400',
    marginLeft: '38%',
  },
  containerCoverture: {
    width: '100%',
    height: '25%',
    backgroundColor: '#E7AF2F',
    borderRadius: 40,
    borderTopRightRadius: 40,
  },
                        
  AddButton : {
    marginTop : 110
  },
  cardd: {
    maxWidth: 390,
    maxHeight:230,
    borderRadius: 0.5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: 'transparent',
    top:30
    // Add more card styles as needed
  },
  image: {
    width: '100%',
    height: 90,
    backgroundColor: '#E7AF2F',
    // Add more image styles as needed
  },
  content: {
    padding: 17.6,
  },
  title: {
    color: '#111827',
    fontSize: 10, 
    lineHeight: 28, 
    fontWeight: '600',
    top:-15
  },
  
  logo:{
    maxWidth:70,
    maxHeight:70,
    marginLeft:20,

  },
  all:{
    flexDirection: 'row',
  },
  ta:{
    top:10
  },
  pre:{
      left:95,
      top:-40,
  },
  card: {
    maxWidth: 390,
    maxHeight:230,
    borderRadius: 0.5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: 'transparent',
    top:20
    
    // Add more card styles as needed
  },
  imagee: {
    width: '100%',
    height: 90,
    backgroundColor: '#F0F8FF',
    // Add more image styles as needed
  },
  content: {
    padding: 17.6,
  },
  title: {
    color: '#111827',
    fontSize: 10, 
    lineHeight: 28, 
    fontWeight: '600',
    top:-15
  },
  
  logo:{
    maxWidth:70,
    maxHeight:70,
    marginLeft:110,

  },
  all:{
    flexDirection: 'row',
  },
  ta:{
    top:10
  },
  pre:{
      left:215,
      top:-40,
  }

});

export default ProfilePayment;