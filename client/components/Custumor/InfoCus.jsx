import {
    View,
    Text,
    Image,
    TouchableOpacity,
    // useWindowDimensions,

  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { COLORS, FONTS, SIZES, images } from "./constant.jsx";
  import { StatusBar } from "expo-status-bar";
  import { MaterialIcons } from "@expo/vector-icons";
  import { useNavigation } from '@react-navigation/native';


  
 const Infocus=({custumorId})=>{
  
  const navigation = useNavigation();
console.log("infocust",custumorId);
    
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
            // source={images.cover}
            // resizeMode="cover"
            style={{
              height: 228,
              width: "100%",
            }}
          />
        </View>
  
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
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
          Custumor name 
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
                ...FONTS.body3,
                marginLeft: 4,
              }}
            >
              Adresse
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
  
        {/* <View style={{ flex: 1, marginHorizontal: 22, marginTop: 20 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View> */}
      </SafeAreaView>
    );
            }
        
  export default Infocus;
