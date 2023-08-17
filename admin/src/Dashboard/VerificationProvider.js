import axios from 'axios';
import React from 'react'
import { useState,useEffect,useRef } from 'react';
import "./verification.css";
import Dialog from './dialog';
import { Button } from '@mui/material';


const VerificationProvider = () => {

  const [data, setData] = useState([]);
  const [refrech, setrefrech] = useState(false);
  
  
  const [dialog,setDialog]=useState({
    message:"Are you sure you want to delete?",
    isLoading:false,
  })
  const idproviderRef = useRef()
  const idproviderupRef= useRef()
  const areUsureToUpdate = (choose)=>{
    if(choose){
      handleUpdate(idproviderupRef.current) 
      setDialog({
             
        isLoading : false})
    }
    setDialog({
             
      isLoading : false
    })
  }
  
  const handleDelete=(id)=>{
    setDialog({
      
      isLoading : true
    })
    idproviderRef.current = id
   }
   const Update =(id)=>{
    setDialog({
      isLoading : true
    })
    idproviderupRef.current = id
   }
  
  const handleUpdate = async (id) => {
      
        
    try{
      
      const response= await axios.put(`http://localhost:3000/api/admin/approveprovider/${id}`)
      if (response.status===200){
        setrefrech(!refrech)
       
      }
      
    }catch (error){
      console.log(error)
    }
   
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/admin/allnpProviders'); 
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [refrech]);
  const deleteData = async (id) => {
    try {
     const response =  await axios.delete(`http://localhost:3000/api/admin/deleteprovider/${id}`); 
     console.log(id)
  
       if(response.status === 200){
        setrefrech(!refrech)
       }
      
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='verif'>
       <div className="card-list">
      {data.map((item, index) => (
        
        <div className="card" key={index}>
        
        <div className="card-body">
          <h4 className="card-title">Username : <b>{item.username}</b></h4>
          <h5 className="card-text">Profession : {item.category} </h5>
          <h5 className="card-text">Email : {item.email} </h5>

          <img src={item.patente} className="card-img"  />
          <div className='buttons'>
          <Button onClick={()=>Update(item.id)} variant="contained" color="success" className='butt'>
  accept
</Button>
<Button onClick={() => deleteData  (item.id)} variant="outlined" color="error" className='butt'>
  delete
</Button>
          </div>
        </div>
      </div>
      ))}
    </div>
    {dialog.isLoading && <Dialog ondialog={areUsureToUpdate} message ={dialog.message}/>}
    </div>
   
  )
}

export default VerificationProvider
