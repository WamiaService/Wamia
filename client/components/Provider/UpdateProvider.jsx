import { View, Text ,Image, TextInput ,Button , StyleSheet , TouchableOpacity, AsyncStorage } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { launchImageLibrary } from 'react-native-image-picker';
import jwtDecoder from "jwt-decode";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native';



const UpdateProvider = ({providerId}) => {
    const [username, setUsername]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [mobile, setMobile]=useState(null)
    const [imgprof, setImgprof]=useState("")
    const [data,setData]=useState([])
    const[refetch,setRefetech]=useState(false)
    const navigation = useNavigation()
console.log("prov id in update",providerId);

    useEffect(()=>{
        fetchData()
    },[!refetch])

    const fetchData = () => {
      // const cookie = new Cookies();
      // const token = jwtDecoder(cookie.get("jwt-token"));
      // console.log("token",token);
      
        axios.get(`http://192.168.100.4:3000/provider/getOne/${providerId}`)
   
          .then((res) => {
            setData(res.data);
            setUsername(res.data.username); // Add this line to set username
            setEmail(res.data.email); // Add this line to set email
            setMobile(res.data.mobile); // Add this line to set mobile
            setImgprof(res.data.imgprof);
            console.log(res.data)
          })
          .catch((err) => console.log(err));
      }

      

    const handleUpdate = () => {
        const info = {
          username:username,
          password: password,
          email:email,
          mobile:mobile,
          imgprof:imgprof
        };
    
       
        axios.put(`http://192.168.100.4:3000/provider/update/${providerId}`, info)
                   .then(res => {
            console.log('Profile updated successfully:', res.data)
            navigation.navigate("providerprofile")
          

            
          })
          .catch(err => {
            console.error('Error updating profile:', err);
          });
      };

    
      const _uploadImage = (photo) => {
        const data = new FormData();
        data.append('file', {
          uri: photo.assets[0].uri,
          type: 'image/jpg',
          name: 'image.jpg',
        });
        data.append('upload_preset', 'phoneProduct');
        data.append('cloud_name', 'dgcdmrj7x');
        return fetch('https://api.cloudinary.com/v1_1/dgcdmrj7x/image/upload', {
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setImgprof(data.secure_url); // Update imgprof with the secure_url
            console.log(data);
          })
          .catch((err) => {
            Alert.alert('Error While Uploading');
          });
      };
      const handleGalleryAccessProfile = async () => {
        try {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            console.log('Gallery permission denied');
            return;
           }
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1.0,
          });
          if (!result.cancelled) {
            _uploadImage(result);
          }
        } catch (error) {
          console.log('Error selecting image from gallery:', error);
        }
      }


  return (
    <View>  
     <TouchableOpacity>
        {imgprof ? (
          <Image
            source={{ uri: imgprof}} 
            style={{
              height: 170,
              width: 170,
              borderRadius: 85,
              borderWidth: 2,
              borderColor: "black",
            }}
          />
        ) : (
          <View
            style={{
              height: 170,
              width: 170,
              borderRadius: 85,
              borderWidth: 2,
              borderColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="user" size={40} color="black" />
          </View>
        )}

        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 10,
            zIndex: 9999,
          }}
        >
          <MaterialIcons
            onPress={handleGalleryAccessProfile}
            name="photo-camera"
            size={32}
            color="black"
          />
        </View>
      </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 10, marginVertical: 10, width: 260, borderRadius: 15 }}>
        <AntDesign name="profile" size={24} color="black" style={{ marginRight: 10 }} />
        <TextInput
          onChangeText={setUsername}
          placeholder="Username"
          style={{ flex: 1 }} 
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 10, marginVertical: 10, width: 260, borderRadius: 15 }}>
  <AntDesign name="mail" size={24} color="black" style={{ marginRight: 10 }} />
  <TextInput
 
    onChangeText={setEmail}
    placeholder="Email"
    keyboardType="email-address"
    style={{ flex: 1 }} 
  />
</View>

<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 10, marginVertical: 10, width: 260, borderRadius: 15 }}>
  <AntDesign name="lock" size={24} color="black" style={{ marginRight: 10 }} />
  <TextInput
    value={password}
    onChangeText={setPassword}
    placeholder="Password"
    secureTextEntry
    style={{ flex: 1 }} 
  />
</View>
     
<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 10, marginVertical: 10, width: 260, borderRadius: 15 }}>
  <AntDesign name="phone" size={24} color="black" style={{ marginRight: 10 }} />
  <TextInput
    value={mobile}
    onChangeText={setMobile}
    placeholder="Mobile Number"
    keyboardType="phone-pad"
    style={{ flex: 1 }} 
  />
</View>
     <TouchableOpacity onPress={handleUpdate} style={{ backgroundColor: '#FFA500', padding: 10 , borderRadius:15 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Update Profile</Text>
      </TouchableOpacity>

    </View>

  )
}

export default UpdateProvider







