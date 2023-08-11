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

  
  const EditProfile = ({custumorId}) => {

    const [data,setData]=useState([])
    const [name, setName] = useState("");
  
    const [password, setPassword] = useState("");

    const[imageprof,setImage]=useState("")
    const [adresse,setAdresse]=useState("")
    const [mobile,setMobile]=useState()
    const[refetch,setRefetech]=useState(false)

    const infoCus={
      username: name,
      adresse:adresse,
      imgprof:imageprof,
      mobile:mobile

    }

    useEffect(() => {
      getOneCustumor(custumorId)
    }, [!refetch]);

  console.log("data",data)


    


    const getOneCustumor = async (custumorId)=> {
      console.log('u');
      try {
        const response = await axios.get(`http://192.168.1.7:3000/custumor/getOne/${custumorId}`);
        setData(response.data); 
      } catch (error) {
        console.error('Error :', error);
      }
    };


    console.log(custumorId)


    const _uploadImage = (photo, setImage) => {
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
          setImage(data.url);
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










  
    const update = async (custumorId) => {
      try {
        await axios.put(`http://192.168.1.7:3000/custumor/update/${custumorId}`, infoCus);
        setRefetech(!refetch)
      } catch (err) {
        console.log(err);
      }
    };


    console.log(custumorId)

  

  
// Function to handle changes to the input
 const handleName =(text) => {
 setName(text);
};
// const handleImage= (text) => {
//   setImage(text);
// };
const handleMobile= (text) => {
  setMobile(text);
};

const handlePass= (text) => {
  setPassword(text);
};

const handleAdresse= (text) => {
  setAdresse(text);
};

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
                
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: COLORS.color,
              }}

              value={imageprof}
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
            <Text style={{ ...FONTS.h4 }}>Username</Text>
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
                onChangeText={handleName} 
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
          <Text style={{ ...FONTS.h4 }}>Adresse</Text>
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
             onChangeText={handleAdresse} 
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
            <Text style={{ ...FONTS.h4 }}>Mobile Phone</Text>
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
                onChangeText={handleMobile} 
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
          > */}
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
          
            onPress={()=>{update(custumorId), _uploadImage()}}
      
          >
            Save Change
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};
  
   
    
  
  export default EditProfile;