import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Modal,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";

  import { COLORS, FONTS } from "./constant";
  import { MaterialIcons } from "@expo/vector-icons";

  import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
  
  const EditProfile = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  

  

  
    function renderDatePicker() {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={openStartDatePicker}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                padding: 35,
                width: "90%",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <DatePicker
                mode="calendar"
                minimumDate={startDate}
                selected={startedDate}
                onDateChanged={handleChangeStartDate}
                onSelectedChange={(date) => setSelectedStartDate(date)}
                options={{
                  backgroundColor: COLORS.primary,
                  textHeaderColor: "#469ab6",
                  textDefaultColor: COLORS.white,
                  selectedTextColor: COLORS.white,
                  mainColor: "#469ab6",
                  textSecondaryColor: COLORS.white,
                  borderColor: "#FFA500",
                }}
              />
  
              <TouchableOpacity onPress={handleOnPressStartDate}>
                <Text style={{ ...FONTS.body3, color: COLORS.white }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }
  
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
                  value={email}
        
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
              <Text style={{ ...FONTS.h4 }}>Password</Text>
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
                 
                  editable={true}
                  secureTextEntry
                />
              </View>
            </View>
  
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
             
            
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
            >
              Save Change
            </Text>
          </TouchableOpacity>
  
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default EditProfile;