import React , { useEffect, useState} from 'react'
import { StyleSheet,Image, Button,Text, TextInput, View ,TouchableOpacity } from 'react-native';
import axios from 'axios';
import jwtDecoder from "jwt-decode";
import Cookies from "universal-cookie";
import Edit from './Edit.jsx'

 const Custumor=({custumorId})=> {
  const [data, setData] = useState([]);
  const[refetch,setRefetech]=useState(false)
  const [id,setId] = useState(null)


   useEffect(() => {
    // custInfo()
 
  }, []);
  {console.log(data)}


// Custumor Info 
   const custInfo=()=>{
    const cookie = new Cookies();
    const token = jwtDecoder(cookie.get("jwt-token"));
    console.log("token",token)
         
       axios
        .post("http://192.168.104.7:3000/custumor/login"),{

        username:token.username
        }
    
      then((res) => {
        setData(res.data);
        console.log(res.data)
        setId(res.data.id)
        console.log(res.data.id)
      })
      .catch((err) => console.log(err));

   

    }

    //get one custumor 


  const getOneCustumor = async ()=> {
       
    try {
      const response = await axios.get(`http://192.168.104.7:3000/custumor/getOne/${custumorId}`);

      setData(response.data); 
    } catch (error) {
      console.error('Error :', error);
    }
  };

  const updateCus=(id,username,adresse,mobile)=>{
   
    axios.put(`http://192.168.104.7:3000/custumor/update/${id}`,{
      username: username,
      adressse:adresse,
      // imgprof:imgprof,
      mobile:mobile
      })
    .then((res)=>{setRefetech(!refetch)})
    .catch((err)=>{console.log(err)})
  
  
  
  
  }
  

    return (
  
      <View>
        <Text> <Edit  data={data}  update={updateCus}/></Text>  
      </View>
      );
    };
    
 


export default Custumor

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    editButton: {
      marginTop: 20,
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    editButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });







