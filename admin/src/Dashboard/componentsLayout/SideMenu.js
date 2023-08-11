import React from 'react'
import {Menu} from "antd"
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons'
import {useNavigate} from "react-router-dom"

const SideMenu = () => {
    const navigate = useNavigate();

  return (
    <div className="SideMenu">
      <Menu className="menu"
      onClick={(item)=>{
        navigate(item.key)
      }
    }
      
      
      items={[
        {
        label:'Dashboard',
        icon:<AppstoreOutlined/>,
        key:"/Dashboard"
    
      },
      {
        label:"Custumors",
        icon: <UserOutlined/>,
        key:"/Custumors"
      },
      {
        label:"Providers",
        icon: <UserOutlined/>,
        key:"/Providers"
      },
      {
        label:"Verification providers",
        icon: <UserOutlined/>,
        key:"/Verification"
      }
      ]}>

      </Menu>
    </div>
  )
}

export default SideMenu
