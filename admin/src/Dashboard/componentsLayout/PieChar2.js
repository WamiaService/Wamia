import React, { useState, useEffect } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-google-charts';
import axios from 'axios';

const PieChart = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    Reservations();
  }, []);

  useEffect(() => {
    console.log('Updated Data:', Data);
  }, [Data]);

  const getCatCount = (category) => {
    if (!Data) {
      return 0;
    }
    return Data.filter(item => item.provider.category === category).length;
  };

  const Reservations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/getreservation');
      console.log('API Response:', response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  const pieData = [
    ['Task', 'proportion'],
    ['Electricité', getCatCount('electricien')],
    ['Climatisation', getCatCount('climatisation')],
    ['plomberie', getCatCount('plombier')],
    ['transporteur', getCatCount('transporteur')],
    ['peinture', getCatCount('peinture')],
    ['Machine a laver', getCatCount('machine a laver')],
    ['menuiserie', getCatCount('menuisier')],
    ['camera de surveillance', getCatCount('camera')],
  ];

  const pieOptions = {
    title: 'Proportion of Reservations by Category',
    titleTextStyle: {
      fontSize: 24, // Set the font size here
    },
    pieHole: 0.4,
  };

  return (
    <div className="container mt-5">
      {Data.length > 0 ? (
        <Chart
          width={'500px'}
          height={'350px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={pieData}
          options={pieOptions}
          rootProps={{ 'data-testid': '3' }}
        />
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
};

export default PieChart;


