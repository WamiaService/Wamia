import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,

  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";

  import { COLORS, FONTS } from "./constant";
  import { MaterialIcons } from "@expo/vector-icons";


  
  const EditProfile = () => {


    const [name, setName] = useState("");
  
    const [password, setPassword] = useState("");
    const[image,setImage]=useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
    const [adresse,setAdresse]=useState("")
    const [mobile,setMobile]=useState()
  

  
// Function to handle changes to the input
const handleName= (text) => {
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

              value={image}
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

            onPress={()=>{props.update(props.data.id,name,adresse,mobile,adresse)}}
          >
            Save Change
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};
  
   
    
  
  export default EditProfile;