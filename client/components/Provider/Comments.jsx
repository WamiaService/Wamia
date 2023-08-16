import { TouchableOpacity ,View, Text, TextInput, Image, KeyboardAvoidingView, Platform , ScrollView} from 'react-native';
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
const Comments = ({custumorId ,providerId} ) => {

     const[reviews,setReviews]=useState([])//all comments
       const [review,setReview]=useState('')
      const [data,setData]=useState([])
      const [rate,setRate]=useState()
      console.log('c',custumorId)
      console.log('prov' ,providerId )
   

useEffect(() => {
  getOneCustumor(custumorId)
}, []);
 console.log('cus',data)


const getOneCustumor = async (custumorId)=> {
       
  try {

    const response = await axios.get(`http://192.168.100.12:3000/custumor/getOne/${custumorId}`);
    console.log(response.data)
    setData(response.data); 
    
  } catch (error) {
    console.error('Error :', error);
  }
};

    
const handleRating=async(req,res)=>{

 console.log(rate)
try{
 const rating= await axios.post(`http://192.168.100.12:3000/rate/create/${providerId}`,{
  rate:rate,
  review:review,
  custumorId:custumorId
 })
  console.log( "dd",rating.data)
 res=rating.data
}catch(error){

 console.error('An error occurred', error);
 
}
 
}







  
  
  
    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Comments</Text>
            {/* <ScrollView style={styles.commentsScrollView}>
              <View style={styles.commentsContainer}>
                {reviews.map((commentItem) => (
                  <View key={reviews.id} style={styles.commentBox}>
                    <View style={styles.commentItem}>
                      <Image
                        style={styles.commentUserImage}
                        source={{ uri: commentItem.userImage }}
                      />
                      <Text>{commentItem.text}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView> */}
            <TextInput
              style={styles.input}
              placeholder="Add a comment"
              value={review}
              onChangeText={() => setReview()}
            />
          </ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: data.imgprof
              }}
            />
          </View>

          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: data.imgprof
              }}
            />

          </View>
   
          <TouchableOpacity
          style={{
            backgroundColor:"#FFA500",
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              
              color: "#white"
            }}
          
            onPress={()=>{handleRating()}}
      
          >
            Sumbit
          </Text>
        </TouchableOpacity>

     




        </KeyboardAvoidingView>
    );
  };
  
  
    const styles = {
      commentBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
          width: 0,
          height: 2,
        },
    
        elevation: 3,
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      commentsScrollView: {
        flex: 1,
      },
      commentsContainer: {
        width: '100%',
        marginBottom: 10,
      },
      commentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 3,
      },
      commentUserImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
      },
      input: {

        flexDirection: "column",
        marginBottom: 6,
        height: 50,
        width: "100%",
        borderColor:"#FFA500" ,
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 6,
        justifyContent: "center",
        paddingLeft: 8,
    
      },
      imageContainer: {
        position: 'absolute',
        bottom: 15,
        left: -0,
      },
      profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
}

export default Comments