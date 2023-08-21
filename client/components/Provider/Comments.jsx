import { TouchableOpacity ,StyleSheet,View, Text, TextInput, Image, KeyboardAvoidingView, Platform ,SafeAreaView ,ScrollView} from 'react-native';
import React, { useState,useEffect } from 'react'
import axios from 'axios'

import { COLORS, FONTS ,SIZES} from "../Custumor/constant.jsx";
import { IconButton } from 'react-native-paper'
 import {
  MaterialIcons,
  Ionicons,
  Feather,
  Foundation,
  MaterialCommunityIcons,
} from '@expo/vector-icons'





const Comments = ({custumorId ,providerId} ) => {




  const[reviews,setReviews]=useState([])//all comments
  const [review,setReview]=useState('') //one comments 
 const [data,setData]=useState([])
  const[refetch,setRefecth]=useState(false)
 console.log('c',custumorId)
 console.log('prov' ,providerId )
const rev={
 review:review,
 custumorId:custumorId,
 providerId:providerId
}
console.log("gggg",review)
useEffect(() => {
getOneCustumor(custumorId)
getOneReview()
}, [!refetch]);
console.log('cus',data)
console.log("reviews",reviews)

const getOneCustumor = async (custumorId)=> {
  
try {

const response = await axios.get(`http://192.168.1.7:3000/custumor/getOne/${custumorId}`);
console.log(response.data)
setData(response.data); 

} catch (error) {
console.error('Error :', error);
}
};


// getALLREVIE

const getOneReview= async ()=> {
  
try {

const response = await axios.get(`http://192.168.1.7:3000/review/getAll/${providerId}`);

setReviews(response.data); 

} catch (error) {
console.error('Error :', error);
}
};




//post Review 
const handleReview=(req,res)=>{



  axios
 .post(`http://192.168.1.7:3000/review/create/${providerId}`,rev)
 .then(()=>{setRefecth(!refetch)})
 .catch((err)=>{console.log(err);})


}









function renderFeedPost() {
return (
<View
   style={{
       backgroundColor: '#fff',
       flexDirection: 'column',
       width: '100%',
       borderRadius: 26,
       borderWidth: 1,
       borderColor: "#FFA500",
       marginVertical: 12,
   }}
>
  





   <View
       style={{
           marginHorizontal: 8,
           flexDirection: 'row',
           alignItems: 'center',
           justifyContent: 'space-between',
           paddingBottom: 6,
       }}
   >
      
 <View style={{ flexDirection: 'row' }}>
      
           <View
               style={{
                   flexDirection: 'row',
                   alignItems: 'center',
                   justifyContent: 'center',
                   marginLeft: 10,
               }}
           >
             <ScrollView >
              <View 
              
              
              
              
              style={{
                flexDirection: 'column',
                marginHorizontal: 8,
                paddingVertical: 18,
                borderTopWidth: 1,
                borderTopColor: '#FDF6ED',
            }}>
                {reviews.map((review ,key) => (
                  <View key={reviews.id} >
                    <View
                    
                    
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 8,
                      paddingVertical: 18,
                      borderTopWidth: 1,
                      borderTopColor: '#FDF6ED',
                  }}>
                      <Image
                    
                        source={{ uri:data.imgprof}}
                        resizeMode="contain"
                        style={{
                            height: 52,
                            width: 52,
                            borderRadius: 26,
                        }}

                      />

                       <Text     
                      style={{
                        flex: 1,
                      
                        justifyContent: 'center',
                        textAlign: 'center',
                        alignItems: 'center',
                      
                        height: 52,
                        borderRadius: 26,
                        borderWidth: 1,
                        borderColor: '#CCC',
                        marginLeft: 12,
                        paddingLeft: 12,
                        justifyContent: 'center',
                     
                    }}>{review.review}</Text>
                     
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView> 
              
              
           </View>
       </View>
   </View>

   {/* comment section */}

   <View
       style={{
           flexDirection: 'row',
           marginHorizontal: 8,
           paddingVertical: 18,
           borderTopWidth: 1,
           borderTopColor: '#FDF6ED',
       }}
   >
       <Image
           source={{
            uri:data.imgprof
           }}
           resizeMode="contain"
           style={{
               height: 52,
               width: 52,
               borderRadius: 26,
               borderColor: '#FFA500',
           }}
       />

       <View


           style={{
               flex: 1,
               flexDirection: 'row', // To align the icon and TextInput horizontally
               alignItems: 'center',
               height: 52,
               borderRadius: 26,
               borderWidth: 1,
               borderColor: '#FFA500',
               marginLeft: 12,
               paddingLeft: 12,
               justifyContent: 'center',
           }}
       >
               
   
           <TextInput
               placeholder="Add a review "
               placeholderTextColor="#CCC"
              value={review}
              onChangeText={setReview}
               style={{ flex: 1,
                marginRight: 10
              
              }}
            
            ></TextInput>
              <IconButton
              icon="send" size={24} color="black" style={{
        marginRight:4 }} 
        onPress={()=>{handleReview()}}
        
        />
       </View>
   </View>
</View>
)

}







return (

 <SafeAreaView style={{ flex: 1, backgroundColor: '#E7E7E7' }}>
       <View style={{ flex: 1, paddingHorizontal: 22 }}>
        
           <ScrollView>
              
               {renderFeedPost()}
         
           </ScrollView>
       </View>
   </SafeAreaView>
                   
   )
















}

     



  









  

export default Comments