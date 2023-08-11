import React from 'react'
import{Routes,Route} from "react-router-dom"
import Provider from "../provider"
import Dashboard from './Dashboard'
import Custumor from '../custumor'
import VerificationProvider from '../VerificationProvider'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Providers" element={<Provider />} />
        <Route path="/Custumors" element={<Custumor />} />
        <Route path="/Verification" element={<VerificationProvider />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
