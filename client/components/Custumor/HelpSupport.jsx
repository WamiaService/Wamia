import { StyleSheet, TouchableOpacity,Image,SafeAreaView,KeyboardAvoidingView,Text, View } from 'react-native'
import React from 'react'

const HelpSupport = () => {


  const image=require('../../assets/w.png')

  const handleHelpButtonClick = () => {
    setShowHelp(true);
    setShowTerm(false);
  };
  const handleTermsButtonClick = () => {
    setShowHelp(false);
    setShowTerm(true );
  };
  return (

    <SafeAreaView style={{ flex: 1 }}>
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image style={styles.ImageH}
             
            //  style={styles.logo}
             resizeMode="contain"

           source={image}
           />
 

         <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          style={styles.buttone}
       
        >
          <Text style={styles.buttonTexte}>Terms of use </Text>
            <View>
          <Text  style={styles.textSubHeaderr} >The application Wamia Service is the property of the company «Wamia Services», our service offers a connection of the independent workforce to the local demand.Customers must use the Wamia Services platform only in connection with the search and booking of services offered by the verified service providers. They must not use the platform for illegal or fraudulent purposes.
The customer may send his location to the service provider for on-site intervention.
The customer may send photos to the service provider to document their need.
Once the client and the service provider are connected, the Wamia Services application will have achieved its objective, and will no longer intervene in the rest of the agreement.</Text>
</View>
        </TouchableOpacity>

        
      </View>

     
     
     
    </View>
      
    </KeyboardAvoidingView>
  </SafeAreaView>
);
}
 



export default HelpSupport

const styles = StyleSheet.create({


  ImageH: {

    marginVertical: 20,
  
  },
  teHeader: {
    fontSize: 20,
    marginVertical: 20,
    color: "#111",
  },
  textSubHeaderr: {
    fontSize: 14,
    color: "#111",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the right
    paddingHorizontal: 16, // Adjust padding as needed
    marginTop: 30,
  },
  buttone: {
    marginRight: 15,
    backgroundColor:  'rgba(36, 39, 96, 0.05)',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonTexte: {
    color: "#000000",
    fontWeight: 'bold',
  },



})