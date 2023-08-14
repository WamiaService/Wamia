import {
    View,
    Text,
    Image,
    TouchableOpacity,
    // useWindowDimensions,

  } from "react-native";
  import React, { useState,useEffect } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { COLORS, FONTS, SIZES,} from "./constant.jsx";
  import { StatusBar } from "expo-status-bar";
  import { MaterialIcons } from "@expo/vector-icons";
  import { useNavigation } from '@react-navigation/native';
  import axios from 'axios'

  
 const Infocus=({custumorId})=>{
  
  const navigation = useNavigation();
console.log("infocust",custumorId);
const [data,setData]=useState([])
const[refetch,setRefetech]=useState(false)


useEffect(() => {
  getOneCustumor(custumorId)
}, [!refetch]);
 console.log(data)


const getOneCustumor = async (custumorId)=> {
       
  try {
    const response = await axios.get(`http://192.168.1.7:3000/custumor/getOne/${custumorId}`);

    setData(response.data); 
    
  } catch (error) {
    console.error('Error :', error);
  }
};










    
    return (


      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: "100%" }}>
          <Image
            //  source={image}
            // resizeMode="cover"
            style={{
              height: 228,
              width: "20%",
              backgroundColor:"#black"
            }}
          />
        </View>
  
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
           source={{
            uri: data.imgprof,
          }}
            resizeMode="contain"
            style={{
              height: 155,
              width: 155,
              borderRadius: 999,
              borderColor: COLORS.color,
              borderWidth: 2,
              marginTop: -90,
            }}
          />
  
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.primary,
              marginVertical: 8,
            }}
          >
       {data.username}
          </Text>
               
      
  
          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="location-on" size={24} color="#FFA500"
 />
            <Text
              style={{
                ...FONTS.h3,
                marginLeft: 4,
              }}
            >
          {data.adresse}
            </Text>
          </View>
  
          <View
            style={{
              paddingVertical: 8,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: SIZES.padding,
              }}
            >
             
             
            </View>
  
  
          
          </View>
  
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 124,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.color,
                borderRadius: 10,
                marginHorizontal: SIZES.padding * 2,
              }}
            >
              <Text
              onPress={()=>{
              navigation.navigate('edit')
              }}
                style={{
                  ...FONTS.body4,
                  color: COLORS.white,
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={{
                width: 124,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.color,
                borderRadius: 10,
                marginHorizontal: SIZES.padding * 2,
              }}
            >
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.white,
                }}
              >
                    Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>
  
        
      </SafeAreaView>
    );
            }
        
  export default Infocus;
