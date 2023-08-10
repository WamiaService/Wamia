import { Space, Typography ,Card,Statistic} from 'antd'
import{UserOutlined,DollarCircleOutlined} from "@ant-design/icons"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { PieChart } from '@mui/material';
import React from 'react'
import {useState,useEffect} from "react"
import axios from 'axios'
import PiieChart from './Piechart';

const Dashboard = () => {
  const[numberProvider,setNumberProv]=useState(0)
  const[numberCustumors,setNumberCust]=useState(0)
  
  const[nbelectricien,setelectricien]=useState(0)
  const[nbclimatisation,setclimatisation]=useState(0)
  const[nbplombier,setplombier]=useState(0)
  const[nbtransporteur,settransporteur]=useState(0)
  const[nbpeinture,setpeinture]=useState(0)
  const[nbmachinealaver,setmachinealaver]=useState(0)
  const[nbmenuisier,setmenuisier]=useState(0)
  const[nbcamera,setcamera]=useState(0)
  const[Data,setData]=useState([])
 
  useEffect(() => {
    fetchProv()
    fetchCUST()
  
    
  },[Data])
  

    
    var countelectricien=0
    var countclimatisation=0
    var countplombier=0
    var counttransporteur=0
    var countpeinture=0
    var countlaver=0
    var countmenuisier=0
    var countcamera=0
    
    const pieChart=(Data)=>{ 
      console.log(Data)
    for(var i=0 ;i<= Data.length-1;i++){
      
      if(Data[i].category==="electricien"){
        countelectricien++
        setelectricien(countelectricien)
      }
      else if(Data[i].category==="plombier"){
        countplombier++
        setplombier(countplombier)

      }
      else if(Data[i].category==="climatisation"){
        countclimatisation++
        setclimatisation(countclimatisation)
      }
      else if(Data[i].category==="transporteur"){
        counttransporteur++
        settransporteur(counttransporteur)
      }
      else if(Data[i].category==="peinture"){  
        countpeinture++
        setpeinture(countpeinture)
      }
      else if(Data[i].category==="machine a laver"){ 
        countlaver++
        setmachinealaver(countlaver)
      }
      else if(Data[i].category==="menuisier"){
        countmenuisier++
        setmenuisier(countmenuisier)
      }
      else if(Data[i].category==="camera"){ 
        countcamera++
        setcamera(countcamera)
      }
    }
  }

    const fetchProv = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/allprovider'); 
        
         setNumberProv(response.data.length)
         
         console.log("dataaaaa",Data);
         pieChart(response.data)
         setData(response.data)
         console.log("nb",nbelectricien)
         
         
         
        
      } catch (error) {
        console.log(error);
      }
    }
    const fetchCUST= async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/allcustumor'); 
         
         setNumberCust(response.data.length)
      } catch (error) {
        console.log(error);
      }
    };
  

  return (
    <div className='dashboard-container'>
    <div className='dash1'>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space>
       <DashboardCard icon={<UserOutlined style={{color:"green",backgroundColor:"rgba(0,255,0,0.25)",borderRadius:20,fontSize:24,padding:8}}/>} title={"Custumors"} value={numberCustumors}/>
       <DashboardCard icon={<UserOutlined style={{color:"blue",backgroundColor:"rgba(0,255,255,0.25)",borderRadius:20,fontSize:24,padding:8}}/>} title={"Providers "} value={numberProvider}/>
       <DashboardCard icon={<DollarCircleOutlined style={{color:"red",backgroundColor:"rgba(255,0,0,0.25)",borderRadius:20,fontSize:24,padding:8}}/>} title={"Revenue"} value={numberProvider*10}/>
       
      </Space>
    </div>
    <div className='pie'>
    <PiieChart Electricien={nbelectricien} Climatisation={nbclimatisation} plombier={nbplombier} nbtransporteur={nbtransporteur} peinture={nbpeinture} laver={nbmachinealaver} menuisier={nbmenuisier} camerman={nbcamera}/>
    
    </div>
    </div>
  )
}
const DashboardCard =({title,value,icon}) => {
  return (
    <div className='dash'>
    <Card style={{fontSize:60,padding:30 }}>
    <Space>
     {icon}
      <Statistic title={title} value={value}/>
    </Space>
    
  </Card>
  </div>
  )
}
export default Dashboard
