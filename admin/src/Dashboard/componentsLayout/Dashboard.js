import { Space, Typography ,Card,Statistic} from 'antd'
import{UserOutlined,DollarCircleOutlined} from "@ant-design/icons"
import { PieChart } from '@mui/material';
import React from 'react'
import {useState,useEffect} from "react"
import axios from 'axios'

const Dashboard = () => {
  const[numberProvider,setNumberProv]=useState(0)
  const[numberCustumors,setNumberCust]=useState(0)
  useEffect(() => {
    fetchProv()
    fetchCUST()
  })
    const fetchProv = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/allprovider'); 
         console.log("rsss",response.data[0].category)
         setNumberProv(response.data.length)
        
      } catch (error) {
        console.log(error);
      }
    }
    const fetchCUST= async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/allcustumor'); 
         console.log("res",response.data)
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
