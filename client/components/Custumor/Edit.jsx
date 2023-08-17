import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,

  } from "react-native";
  import React, { useState,useEffect } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { COLORS, FONTS } from "./constant";
  import { MaterialIcons } from "@expo/vector-icons";
  import * as ImagePicker from 'expo-image-picker';
   import axios from 'axios'
   import { useNavigation } from '@react-navigation/native';

  
  const EditProfile = ({custumorId}) => {
    const navigation = useNavigation()
   
    const [data,setData]=useState([])
    const [name, setName] = useState("");
  
    const [password, setPassword] = useState("");

    const[imgprof,setImage]=useState("")
    const [adresse,setAdresse]=useState("")
    const [mobile,setMobile]=useState()
    const[refetch,setRefetch]=useState(false)


    const infoCus={
      username: name,
      adresse:adresse,
      imgprof:imgprof,
      mobile:mobile

    }

    useEffect(() => {
     fetchDataCus()
    }, []);

  console.log("data",data)

  const fetchDataCus = () => {
    // const cookie = new Cookies();
    // const token = jwtDecoder(cookie.get("jwt-token"));
    // console.log("token",token);
    
      axios.get(`http://192.168.100.12:3000/custumor/getOne/${custumorId}`)
 
        .then((res) => {
          setData(res.data);
          setName(res.data.username); // Add this line to set username
          setAdresse(res.data.adresse); // Add this line to set adresse
          setMobile(res.data.mobile); // Add this line to set mobile
          setImage(res.data.imgprof);
          console.log(res.data)
        })
        .catch((err) => console.log(err));
    }

  
  



    console.log(custumorId)


    const _uploadImage = (photo) => {
      const data = new FormData();
      data.append('file', {
        uri: photo.assets[0].uri,
        type: 'image/jpg',
        name: 'image.jpg',
      });
      data.append('upload_preset', 'phoneProduct');
      data.append('cloud_name', 'dgcdmrj7x');
      fetch('https://api.cloudinary.com/v1_1/dgcdmrj7x/image/upload', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.secure_url);
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
  
        if (!result.canceled) {
          _uploadImage(result, setImage);
        }
      } catch (error) {
        console.log('Error selecting image from gallery:', error);
      }
    };










  
  
  
    const update =  () => {
     axios.put(`http://192.168.100.12:3000/custumor/update/${custumorId}`, infoCus)
      .then(res => {
         console.log('Profile updated successfully:', res.data);
             navigation.navigate("one")
      })
      .catch(error=>{
        console.log(error)
      })
    }

 console.log(infoCus)
    console.log(custumorId)

    

  
// Function to handle changes to the input
//  const handleName =(text) => {
//  setName(text);
// };
// // const handleImage= (text) => {
// //   setImage(text);
// // };
// const handleMobile= (text) => {
//   setMobile(text);
// };

// const handlePass= (text) => {
//   setPassword(text);
// };

// const handleAdresse= (text) => {
//   setAdresse(text);
// };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3 }}>Edit Profile</Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity >
            <Image
                source={{uri:imgprof}}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: COLORS.color,
              }}

       
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
      >


              <MaterialIcons
                name="photo-camera"
               onPress={handleGalleryAccessProfile}
                size={32}
                color={COLORS.color}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h3}}>Username</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.color,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={name}
                onChangeText={setName} 
                placeholder="username"
                editable={true}
              />
            </View>
          </View>
          <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ ...FONTS.h3}}>Adresse</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.color,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >

        <TextInput
                   value={adresse}
             onChangeText={setAdresse} 
               placeholder="adresse"
                editable={true}
            
              />
       
          </View>
        </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>Mobile Phone</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.color,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={mobile}
                onChangeText={setMobile} 
                placeholder="mobile phone"
                editable={true}
              />
            </View>
          </View>

          {/* <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          > *
            {/* <Text style={{ ...FONTS.h4 }}>Password</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.color,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >

        
              <TextInput
                     value={password}
             onChangeText={handlePass} 
               placeholder="password"
                editable={true}
                secureTextEntry
              />
            </View>
          </View>
 */}
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
           
          
          </View>
        </View>

       
      

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.color,
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}
          
            onPress={()=>{update()}}
      
          >
            Save Change
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );

  
          }
    
  
  export default EditProfile;