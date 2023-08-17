import { TouchableOpacity ,View, Text, TextInput, Image, KeyboardAvoidingView, Platform , ScrollView} from 'react-native';
import React, { useState,useEffect } from 'react'
import axios from 'axios'

const ForKhouloud = ({custumorId}) => {

    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([
      { id: 1, text: 'This is a comment!', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },]);
  

      const [data,setData]=useState([])

      console.log('c',custumorId)

useEffect(() => {
  getOneCustumor()
}, []);
 console.log(data)


const getOneCustumor = async (custumorId)=> {
       
  try {

    const response = await axios.get(`http://192.168.1.14:3000/custumor/getOne/${custumorId}`);

    setData(response.data); 
    
  } catch (error) {
    console.error('Error :', error);
  }
};

    
  







  
  
  
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.commentSection}>
          <ScrollView style={styles.commentsScrollView}>
            <View style={styles.commentsContainer}>
              {commentsList.map((commentItem) => (
                <View key={commentItem.id} style={styles.commentBox}>
                  <View style={styles.commentItem}>
                    <Image
                      style={styles.commentUserImage}
                      source={{ uri: commentItem.userImage }}
                    />
                    <Text>{commentItem.text}</Text>
                  </View>
                  {/* Add a bottom border to separate comments */}
                  <View style={styles.commentDivider}></View>
                </View>
              ))}
            </View>
          </ScrollView>
          <TextInput
            style={styles.input}
            placeholder="Add a comment"
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
        </View>
      </ScrollView>
      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri:
              'https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg',
          }}
        />
      </View>
    </KeyboardAvoidingView>
    
    );
  };

  const styles = {
    commentBox: {
      backgroundColor: 'white',
      borderRadius: 10,
      marginTop: 15,
      // Set a fixed width and height
      width: 380, // Adjust this based on your preference
      height: 2500, // Adjust this based on your preference
      shadowColor: '#000',
  shadowOpacity: 0.2 ,
  shadowRadius: 3,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  padding:15
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
      width: 40,
      height: 40,
      borderRadius: 15,
      marginLeft:5,
      marginTop:20
    },
    input: {
      width: 320,
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 8,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 3,
      marginBottom: 20,
      marginLeft:55
    },
    imageContainer: {
      position: 'absolute',
      bottom: 23,
      left: 6,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    }
  
}

export default ForKhouloud