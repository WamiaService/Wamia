import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  Image
} from "react-native";
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { useRoute } from '@react-navigation/native';


export default function Calender({ custumorId}) {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const route = useRoute();
  const providerId = route.params?.providerId;

  const [selectedStartDate, setSelectedStartDate] = useState("");
 
const image=require('../../assets/w.png')

// control the date picker in the model is open
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

console.log('c',custumorId)
console.log("pCALNDER",providerId)
  const handleReservation = async (req,res) => {
       const date =new Date()
       console.log(date)
    try {
    

     let reservation = await axios.post(`http://192.168.1.7:3000/reservation/book/${providerId}`, {date:selectedStartDate,custumorId:custumorId,providerId:providerId})
     console.log(selectedStartDate)
        res=reservation.data 
       

      console.log('r',res) 
      alert('Reservation created successfully');


    } catch (error) {

      console.log('Error creating reservation:', error);
    }
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
          <Image style={styles.ImageHeaderHeader}
               
              //  style={styles.logo}
               resizeMode="contain"

             source={image}
             />
           
           <Text style={styles.textHeader}>Reservation</Text>


          <View style={{ width: "100%", paddingHorizontal: 22, marginTop: 64 }}>
            <View>
             
              <Text style={{ fontSize: 18 }}>Select Date</Text>
              <TouchableOpacity
                style={styles.inputBtn}
                onPress={handleOnPressStartDate}
              >
                <Text>{selectedStartDate}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleReservation}
              style={styles.submitBtn}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Submit</Text>
            </TouchableOpacity>
          </View>

          {/* Create modal for date picker */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
             
              <View style={styles.modalView}>
              <DatePicker
                mode="calendar"
            
                onSelectedChange={(date) => setSelectedStartDate(date)}
                options={{
                  backgroundColor: "#080516",
                  textHeaderColor: "#FFA500",
                  textDefaultColor: "#FFFFFF",
                  selectedTextColor: "#FFF",
                  mainColor: "#FFA500",
                  textSecondaryColor: "#FFFFFF",
                  borderColor: "rgba(122, 146, 165, 0.1)",
                }}
              />

                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ImageHeader: {

    marginVertical: 60,
  
  },
  textHeader: {
    fontSize: 30,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "#FFA500",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
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
  },
});
