import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "./constant.jsx";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const One=({handleLogoutCustumor})=>{
  const navigation = useNavigation()
  
const navigateToEditProfile = () => {
  navigation.navigate("edit");
};


const navigateToSecurity = () => {
  console.log("Security function");
};

const navigateToNotifications = () => {
  console.log("Notifications function");
};





const navigateToSupport = () => {
  navigation.navigate("helpsupport")
};











const logout = () => {
  navigation.navigate("choose");

};
const navigateToMyProfile =()=>{
  navigation.navigate("custprofile")
}

const accountItems = [
  {
    icon: "person-outline",
    text: "Edit Profile",
    action: navigateToEditProfile,
  },
  {
    icon: "person-outline",
     text: "My Profile",
     action: navigateToMyProfile,
   },

  { icon: "calendar", text: "Reservtion", action: navigateToSecurity },
  {
    icon: "notifications-none",
    text: "Notifications",
    action: navigateToNotifications,
  },
];

const supportItems = [
 
  
  { icon: "help-outline", text: "Help & Support", action: navigateToSupport },
 
];



const actionsItems = [
 
  { icon: "logout", text: "Log out", action: logout },
];

const renderSettingsItem = ({ icon, text, action }) => (
  <TouchableOpacity
    onPress={action}
    style={{
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingLeft: 12,
      backgroundColor: COLORS.gray,
    }}
  >
    <MaterialIcons name={icon} size={24} color="#FFA500" />
    <Text
      style={{
        marginLeft: 36,
        ...FONTS.Bold,
        fontWeight: 600,
        fontSize: 16,
      }}
    >
      {text}{" "}
    </Text>
  </TouchableOpacity>
);

return (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: COLORS.white,
    }}
  >
    <View
      style={{
        marginHorizontal: 12,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
     
    </View>

    <ScrollView style={{ marginHorizontal: 12 }}>
      {/* Account Settings */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Account</Text>
        <View
          style={{
            borderRadius: 12,
            backgrounColor: COLORS.gray,
          }}
        >
          {accountItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderSettingsItem(item)}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Support and About settings */}

      <View style={{ marginBottom: 12 }}>
        <Text style={{ ...FONTS.h4, marginVertical: 10 }}>
          Support & About{" "}
        </Text>
        <View
          style={{
            borderRadius: 12,
            backgrounColor: COLORS.gray,
          }}
        >
          {supportItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderSettingsItem(item)}
            </React.Fragment>
          ))}
        </View>
      </View>

      

      {/* Actions Settings */}

      <View style={{ marginBottom: 12 }}>
        <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Actions</Text>
        <View
          style={{
            borderRadius: 12,
            backgrounColor: COLORS.gray,
          }}
        >
          {actionsItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderSettingsItem(item)}
            </React.Fragment>
          ))}
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
          }
export default One
