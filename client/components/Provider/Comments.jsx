import { TouchableOpacity ,View, Text, TextInput, Image, KeyboardAvoidingView, Platform , ScrollView} from 'react-native';
import React from 'react'

const Comments = () => {
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([
      { id: 1, text: 'This is a comment!', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
      { id: 2, text: 'Another comment here.', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
      { id: 3, text: 'Here is a new comment.', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
      { id: 4, text: 'Adding more comments!', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
      { id: 5, text: 'Yet another comment.', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
      { id: 6, text: 'Keep the comments coming!', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
      { id: 7, text: 'Commenting is fun!', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
      { id: 8, text: 'Let\'s add more variety!', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
      { id: 9, text: 'One more comment for the list.', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
      { id: 10, text: 'The comments keep on coming!', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
      { id: 11, text: 'Yet another comment.', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
      { id: 12, text: 'Adding more comments!', userImage: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk=' },
    ]);
  
    
  
  
  
  
    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Comments</Text>
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
          </ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: 'https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg',
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
        width: '100%',
        height: 40,
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
        marginBottom: 10,
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