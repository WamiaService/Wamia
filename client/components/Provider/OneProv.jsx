import { View, Text, TouchableOpacity,Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../Custumor/constant.jsx";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";

const OneProv=({providerId,handleLogoutProvider})=>{
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation = useNavigation();
  const [clientSecret, setClientSecret] = useState("");
  
  useEffect(() => {
    axios
      .post("http://192.168.1.5:3000/api/payment/pay", {
        amount: 1000, 
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
        initPaymentSheet({
          paymentIntentClientSecret: response.data.clientSecret,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [initPaymentSheet])

const navigateToEditProfile = () => {
  navigation.navigate("updateprovider");
};


const navigateToReservation = () => {
navigation.navigate("reservation")
};

const navigateToNotifications = () => {
  console.log("Notifications function");
};

const navigateToAddPost = () => {
  navigation.navigate("postprovider");
};


const pay = async () => {
  try {
    const presentResponse = await presentPaymentSheet({
      clientSecret: clientSecret,
    });

    if (presentResponse.error) {
      console.log(presentResponse.error);
      Alert.alert(
        `Error code: ${presentResponse.error.code}`,
        presentResponse.error.message
      );
    } else {
      Alert.alert(
        "Payment Successful",
        "Your payment has been processed successfully!"
      );

     
      console.log("provid payment",providerId);
      // const providerId = 3; 
      await axios.post(`http://192.168.1.5:3000/api/payment/success/${providerId}`);


      navigation.navigate("providerprofile");
    }
  } catch (error) {
    console.log(error);
  }
}

const navigateToSupport = () => {
  console.log("Support function");
};





const navigateToMyProfile = ()=>{
  navigation.navigate("providerprofile");

}

const logout = () => {
  handleLogoutProvider()
  navigation.navigate("login");

};



const accountItems = [
  {
   icon: "person-outline",
    text: "Edit Profile",
    action: navigateToEditProfile,
  } ,
  {
    icon: "person-outline",
     text: "My Profile",
     action: navigateToMyProfile,
   },
  { icon: "calendar", text: "Reservtion", action: navigateToReservation },
  {
    icon: "notifications-none",
    text: "Notifications",
    action: navigateToNotifications,
  },
  { icon: "add", text: "Add Post", action: navigateToAddPost },
];

const supportItems = [
  {
    icon: "credit-card",
    text: "Payment",
    action: pay,
  },
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
export default OneProv
