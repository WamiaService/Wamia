import { Space, Typography ,Card,Statistic} from 'antd'
import{UserOutlined,DollarCircleOutlined} from "@ant-design/icons"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { PieChart } from '@mui/material';
import React from 'react'
import {useState,useEffect} from "react"
import axios from 'axios'
import PiieChart from './Piechart';
import ApexColumnBarChart from "./BarChart"

const Dashboard = () => {
  const[numberProvider,setNumberProv]=useState(0)
  const[numberCustumors,setNumberCust]=useState(0)
  
  

  const[DataP,setDataP]=useState([])
  const[DataN,setDataN]=useState([])
  

  useEffect(() => {
    fetchProv()
    fetchCUST()
  
    
  },[])
  const getStateCount = (data, stateName) => {
    return data.filter(item => item.adresse === stateName).length;
  };
  const getCategoryCount = (data, categoryName) => {
    return data.filter(item => item.category === categoryName).length;
  };
  
    const fetchProv = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/allprovider'); 
         setNumberProv(response.data.length)
         setDataP(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    const fetchCUST= async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/allcustumor'); 
         setNumberCust(response.data.length) 
        setDataN(response.data)
      } catch (error) {
        console.log(error);
      }
    };
  

  return (
    <div className='dashboard-container'>
    <div className='dash1'>
      <Typography.Title level={4}></Typography.Title>
      <Space>
       <DashboardCard icon={<UserOutlined style={{color:"green",backgroundColor:"rgba(0,255,0,0.25)",borderRadius:20,fontSize:24,padding:8}}/>} title={"Custumors"} value={numberCustumors}/>
       <DashboardCard icon={<UserOutlined style={{color:"blue",backgroundColor:"rgba(0,255,255,0.25)",borderRadius:20,fontSize:24,padding:8}}/>} title={"Providers "} value={numberProvider}/>
       <DashboardCard icon={<DollarCircleOutlined style={{color:"red",backgroundColor:"rgba(255,0,0,0.25)",borderRadius:20,fontSize:24,padding:8}}/>} title={"Revenue"} value={numberProvider*10}/>
      </Space>
    </div>
    <div className='charts'>
    <div className='pie'>
    <PiieChart  getCategoryCount={getCategoryCount }   DataP={DataP}  />
    </div>

    <div className='Bar'>
    <ApexColumnBarChart  getStateCount={getStateCount} DataN={DataN} DataP={DataP}/>
    </div>
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
