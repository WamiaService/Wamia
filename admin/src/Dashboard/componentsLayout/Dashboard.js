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
  
  const[nbelectricien,setelectricien]=useState(0)
  const[nbclimatisation,setclimatisation]=useState(0)
  const[nbplombier,setplombier]=useState(0)
  const[nbtransporteur,settransporteur]=useState(0)
  const[nbpeinture,setpeinture]=useState(0)
  const[nbmachinealaver,setmachinealaver]=useState(0)
  const[nbmenuisier,setmenuisier]=useState(0)
  const[nbcamera,setcamera]=useState(0)

  const[PTunis,setPTunis]=useState(0)
  const[PAriana,setPAriana]=useState(0)
  const[PManouba,setPManouba]=useState(0)
  const[PBenArous,setPBenArous]=useState(0)
  const[PNabeul,setPNabeul]=useState(0)
  const[PSousse,setPSousse]=useState(0)
  const[PBeja,setPBeja]=useState(0)
  const[PGasrine,setPGasrine]=useState(0)
  const[PSfax,setPSfax]=useState(0)
  const[NTunis,setNTunis]=useState(0)
  const[NAriana,setNAriana]=useState(0)
  const[NManouba,setNManouba]=useState(0)
  const[NBenArous,setNBenArous]=useState(0)
  const[NNabeul,setNNabeul]=useState(0)
  const[NSousse,setNSousse]=useState(0)
  const[NBeja,setNBeja]=useState(0)
  const[NGasrine,setNGasrine]=useState(0)
  const[NSfax,setNSfax]=useState(0)

  const[DataP,setDataP]=useState([])
  const[DataN,setDataN]=useState([])
  

  useEffect(() => {
    fetchProv()
    fetchCUST()
  
    
  },[])
  
  var countPTunis=0
  var countPAriana=0
  var countPManouba=0
  var countPBenArous=0
  var countPNabeul=0
  var countPSousse=0
  var countPBeja=0
  var countPGasrine=0
  var countPSfax=0
  
  const BarProvider=(DataP)=>{ 
    
  for(var i=0 ;i<= DataP.length-1;i++){
    
    if(DataP[i].adresse==="Tunis"){
      countPTunis++
      setPTunis(countPTunis)
      
    }
    else if(DataP[i].adresse==="Ariana"){
      countPAriana++
      setPAriana(countPAriana)

    }
    else if(DataP[i].adresse==="Manouba"){
      countPManouba++
      setPManouba(countPManouba)
    }
    else if(DataP[i].adresse==="BenArous"){
      countPBenArous++
      setPBenArous(countPBenArous)
    }
    else if(DataP[i].adresse==="Nabeul"){  
      countPNabeul++
      setPNabeul(countPNabeul)
    }
    else if(DataP[i].adresse==="Sousse"){ 
      countPSousse++
      setPSousse(countPSousse)
    }
    else if(DataP[i].adresse==="Beja"){
      countPBeja++
      setPBeja(countPBeja)
    }
    else if(DataP[i].adresse==="Gasrine"){ 
      countPGasrine++
      setPGasrine(countPGasrine)
    }
    else if(DataP[i].adresse==="Sfax"){ 
      countPSfax++
      setPSfax(countPSfax)
    }
  }
}

var countNTunis=0
  var countNAriana=0
  var countNManouba=0
  var countNBenArous=0
  var countNNabeul=0
  var countNSousse=0
  var countNBeja=0
  var countNGasrine=0
  var countNSfax=0
  
  const BarCustumor=(DataN)=>{ 
    
  for(var i=0 ;i<= DataN.length-1;i++){
    
    if(DataN[i].adresse==="Tunis"){
      countNTunis++
      setNTunis(countNTunis)
    }
    else if(DataN[i].adresse==="Ariana"){
      countNAriana++
      setNAriana(countNAriana)

    }
    else if(DataN[i].adresse==="Manouba"){
      countNManouba++
      setNManouba(countNManouba)
    }
    else if(DataN[i].adresse==="BenArous"){
      countNBenArous++
      setNBenArous(countNBenArous)
    }
    else if(DataN[i].adresse==="Nabeul"){  
      countNNabeul++
      setNNabeul(countNNabeul)
    }
    else if(DataN[i].adresse==="Sousse"){ 
      countNSousse++
      setNSousse(countNSousse)
    }
    else if(DataN[i].adresse==="Beja"){
      countNBeja++
      setNBeja(countNBeja)
    }
    else if(DataN[i].adresse==="Gasrine"){ 
      countNGasrine++
      setNGasrine(countNGasrine)
    }
    else if(DataN[i].adresse==="Sfax"){ 
      countNSfax++
      setNSfax(countNSfax)
    }
  }
}
    
    var countelectricien=0
    var countclimatisation=0
    var countplombier=0
    var counttransporteur=0
    var countpeinture=0
    var countlaver=0
    var countmenuisier=0
    var countcamera=0
    
    const pieChart=(DataP)=>{ 
      
    for(var i=0 ;i<= DataP.length-1;i++){
      
      if(DataP[i].category==="electricien"){
        countelectricien++
        setelectricien(countelectricien)
      }
      else if(DataP[i].category==="plombier"){
        countplombier++
        setplombier(countplombier)

      }
      else if(DataP[i].category==="climatisation"){
        countclimatisation++
        setclimatisation(countclimatisation)
      }
      else if(DataP[i].category==="transporteur"){
        counttransporteur++
        settransporteur(counttransporteur)
      }
      else if(DataP[i].category==="peinture"){  
        countpeinture++
        setpeinture(countpeinture)
      }
      else if(DataP[i].category==="machine a laver"){ 
        countlaver++
        setmachinealaver(countlaver)
      }
      else if(DataP[i].category==="menuisier"){
        countmenuisier++
        setmenuisier(countmenuisier)
      }
      else if(DataP[i].category==="camera"){ 
        countcamera++
        setcamera(countcamera)
      }
    }
  }

    const fetchProv = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/allprovider'); 
        
         setNumberProv(response.data.length)
         
         
         pieChart(response.data)
         setDataP(response.data)
         BarProvider(response.data);
         
         
         
        
      } catch (error) {
        console.log(error);
      }
    }
    const fetchCUST= async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/allcustumor'); 
         
         setNumberCust(response.data.length)
         BarCustumor(response.data);
        setDataN(response.data)
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
    <div className='charts'>
    <div className='pie'>
    <PiieChart Electricien={nbelectricien} Climatisation={nbclimatisation} plombier={nbplombier} nbtransporteur={nbtransporteur} peinture={nbpeinture} laver={nbmachinealaver} menuisier={nbmenuisier} camerman={nbcamera}/>
    </div>

    <div className='Bar'>
    <ApexColumnBarChart PTunis={PTunis} PAriana={PAriana} PManouba={PManouba} PBenArous={PBenArous} PNabeul={PNabeul} PSousse={PSousse}  PBeja={PBeja} PGasrine={PGasrine} PSfax={PSfax} NTunis={NTunis} NAriana={NAriana} NManouba={NManouba}   NBenArous={NBenArous}  NNabeul={NNabeul}  NSousse={NSousse}   NBeja={NBeja} NGasrine={NGasrine}   NSfax={NSfax}      />
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
