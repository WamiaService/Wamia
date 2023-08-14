import  React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState,useEffect ,useRef} from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Dialog from './dialog';
import './custumor.css'
  

 


const ManageProvider = () => {
  const columnsProvider = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'username', width: 150},
    { field: 'adresse', headerName: 'adresse', width: 150 },
    { field: 'category', headerName: 'category', width: 150 },
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
        <Button onClick={() =>  handleDelete (params.row.id)} variant="outlined" color="error">
        Delete
       </Button>
      ),
    },
   
  ];
  const [dialog,setDialog]=useState({
    message:"",
    isLoading:false,
  })
  const [rows, setproviderRows] = useState([]);
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
     const response =  await axios.delete(`http://localhost:3000/api/admin/deleteprovider/${id}`); 
     console.log(id)
  
       if(response.status === 200){
        setrefrech(!refrech);;
       }
      console.log('load data')
    } catch (error) {
      console.error(error);
    }
  }
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/allprovider'); 
         console.log(response.data)
       
        const mappedproviderRows = response.data.map((ele) => ({
       id : ele.id,
       username : ele.username,
       adresse : ele.adresse,
       category : ele.category,
       email : ele.email

        }));
        setproviderRows(mappedproviderRows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refrech])
 
  
  
  
   
  return (
    <div className='container1'>
    <div className="table-header"></div>
    <div className="custumor-container">
      <DataGrid
        rows={rows}
        columns={columnsProvider}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
    {dialog.isLoading&& <Dialog ondialog={areUsureTodelete} message ={dialog.message}/>}
  </div>
    

    
  )
}

export default ManageProvider
