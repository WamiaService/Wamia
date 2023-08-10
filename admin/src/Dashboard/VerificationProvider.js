import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import "./verification.css";
import { Button } from '@mui/material';


const VerificationProvider = () => {

  const [data, setData] = useState([]);
  const [refrech, setrefrech] = useState(false);

  const handleUpdate = async (id) => {


    try {

      const response = await axios.put(`http://localhost:3000/api/admin/approveprovider/${id}`)
      if (response.status === 200) {
        setrefrech(!refrech)

      }

    } catch (error) {
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
      const response = await axios.delete(`http://localhost:3000/api/admin/deleteprovider/${id}`);
      console.log(id)

      if (response.status === 200) {
        setrefrech(!refrech)
      }

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='container'>
      <div className="card-list">
        {data.map((item, index) => (

          <div className="card" key={index}>

            <div className="card-body">
              <h4 className="card-title">UserName : <b>{item.username}</b></h4>
              <h5 className="card-text">Profession : {item.category} </h5>
              <h5 className="card-text">Email : {item.email} </h5>
              <div className='image-container'>
                <img src={item.patente} className="card-img" />
                </div>

              <div className='buttons-container'>
                <Button onClick={() => handleUpdate(item.id)} variant="contained" color="success" className='butt'>
                  accept
                </Button>
                <Button onClick={() => deleteData(item.id)} variant="outlined" color="error" className='butt'>
                  delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default VerificationProvider
