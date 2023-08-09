

import  React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import './custumor.css';
import Dialog from './dialog'
  

 


const Custumor = () => {
  const [dialog,setDialog]=useState({
    message:"Are you sure you want to delete?",
    isLoading:false,
  })
  const columnsCustumor = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'username',    width: 150},
    { field: 'adresse', headerName: 'adresse', width: 150 },
    {
      field: 'email',
      headerName: 'email',
      width: 250,
    },
    {
      field: 'delete',
      headerName: 'actions',
      width: 75,
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete  (params.row.id)} variant="outlined" color="error">
        Delete
       </Button>
      ),
    },
   
  ];
  const [rows, setcustumorRows] = useState([]);
  const [refrech, setrefrech] = useState(false);
  const idproviderRef = useRef()
 const areUsureTodelete = (choose)=>{
           if(choose){
            deleteData(idproviderRef.current )
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
  const deleteData = async (id) => {
    
    try {
     const response =  await axios.delete(`http://localhost:3000/api/admin/deletecustumor/${id}`); 
     console.log(id)
  
       if(response.status === 200){
        setrefrech(!refrech);
       }
      console.log('load data')
    } catch (error) {
      console.error(error);
    }
  }
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/allcustumor'); 
         console.log(response.data)
       
        const mappedcustumorRows = response.data.map((ele) => ({
       id : ele.id,
       username : ele.username,
       adresse : ele.adresse,
       email : ele.email

        }));
        setcustumorRows(mappedcustumorRows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refrech])
 
  
  
  
   
  return (
    <div>
    <div class="table-header">List of custumors</div>
    <div class="table-container">
      <DataGrid
        rows={rows}
        columns={columnsCustumor}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
    <div>{dialog.isLoading&& <Dialog ondialog={areUsureTodelete} message ={dialog.message}/>}</div>
    
  </div>
    

    
  )
}

export default Custumor
