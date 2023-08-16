import React, { useEffect, useState } from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";

const Payment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation = useNavigation();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Make an API request to your server to create a payment intent
    axios
      .post("http://192.168.104.5:3000/api/payment/pay", {
        amount: 1000, // Set your desired amount here
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
        // Initialize the payment sheet
        initPaymentSheet({
          paymentIntentClientSecret: response.data.clientSecret,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [initPaymentSheet]);

  const pay = async () => {
    try {
      // Present the payment sheet to the user
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
        navigation.navigate("providerprofile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Replace with your UI elements */}
      <Button onPress={pay} title="Pay" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
});

export default Payment;
