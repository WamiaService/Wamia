import './App.css';
import {Space} from "antd"
import React from 'react';
import Header from './Dashboard/componentsLayout/Header';
import SideMenu from './Dashboard/componentsLayout/SideMenu';
import PageContent from './Dashboard/componentsLayout/PageContent';
import Footer from './Dashboard/componentsLayout/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Space className="sideMenuandpageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Space>
      <Footer/>
    </div>
  );
}

export default App;
