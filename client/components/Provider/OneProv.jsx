import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../Custumor/constant.jsx";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const OneProv=({handleLogoutCustumor,handleLogoutProvider})=>{
  const navigation = useNavigation()
const navigateToEditProfile = () => {
  navigation.navigate("updateprovider");
};


const navigateToSecurity = () => {
  console.log("Security function");
};

const navigateToNotifications = () => {
  console.log("Notifications function");
};

const navigateToPrivacy = () => {
  console.log("Privacy function");
};

const navigateToSubscription = () => {
  navigation.navigate("payment");
};

const navigateToSupport = () => {
  console.log("Support function");
};

const navigateToTermsAndPolicies = () => {
  console.log("Terms and Policies function");
};

const navigateToFreeSpace = () => {
  console.log("Free Space function");
};

const navigateToDateSaver = () => {
  console.log("Date saver");
};

const navigateToReportProblem = () => {
  console.log("Report a problem");
};

const addAccount = () => {
  console.log("Aadd account ");
};

const logout = () => {
  handleLogoutProvider()
  navigation.navigate("login");

};


const accountItems = [
  {
    icon: "person-outline",
    text: "Edit Profile",
    action: navigateToEditProfile,
  },
  { icon: "calendar", text: "Reservtion", action: navigateToSecurity },
  {
    icon: "notifications-none",
    text: "Notifications",
    action: navigateToNotifications,
  },
];

const supportItems = [
  {
    icon: "credit-card",
    text: "Payment",
    action: navigateToSubscription,
  },
  { icon: "help-outline", text: "Help & Support", action: navigateToSupport },
  
];

const cacheAndCellularItems = [
  {
    icon: "delete-outline",
    text: "Free up space",
    action: navigateToFreeSpace,
  },
  { icon: "save-alt", text: "Date Saver", action: navigateToDateSaver },
];

const actionsItems = [
  {
    icon: "outlined-flag",
    text: "Report a problem",
    action: navigateToReportProblem,
  },
  { icon: "people-outline", text: "Add Account", action: addAccount },
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

      <Text style={{ ...FONTS.h3 }}>Provider Profil</Text>
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

      {/* Cache & Cellular */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ ...FONTS.h4, marginVertical: 10 }}>
          Cache & Cellular{" "}
        </Text>
        <View
          style={{
            borderRadius: 12,
            backgrounColor: COLORS.gray,
          }}
        >
          {cacheAndCellularItems.map((item, index) => (
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
export default OneProv