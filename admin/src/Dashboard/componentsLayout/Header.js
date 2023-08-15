import React from 'react'

import {Badge, Image,Typography,Space} from "antd"
import {MailOutlined,BellFilled} from "@ant-design/icons"

const Header = () => {
  return (
    <div className="AppHeader">
     <Image />
     <Typography.Title className='ADash1'> ADMIN DASHBOARD</Typography.Title>
     <Space className='mail'>
        {/* <Badge count={10} >
        <MailOutlined style={{fontSize:32}}/>
        </Badge>
        <Badge count={20}>
        <BellFilled style={{fontSize:32}}/>
        </Badge> */}
     </Space>
    </div>
  )
}

export default Header
