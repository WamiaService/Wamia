import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-google-charts';



const PieChart = ({getCategoryCount,DataP }) => {
    const pieData = [
        ['Task', 'proportion'],
        ['Electricité', getCategoryCount(DataP,"electricien") ],
        ['Climatisation', getCategoryCount(DataP,"climatisation") ],
        ['plomberie', getCategoryCount(DataP,"plombier") ],
        ['transporteur', getCategoryCount(DataP,"transporteur") ],
        ['peinture', getCategoryCount(DataP,"peinture") ],
        ['Machine a laver', getCategoryCount(DataP,"machine a laver") ],
        ['menuiserie',getCategoryCount(DataP,"menuisier") ],
        ['camera de surveillance',getCategoryCount(DataP,"camera") ]
      ];
      
      const pieOptions = {
        title: 'Proportion of Providers by Category',
        titleTextStyle: {
          fontSize: 24, 
        },
        pieHole: 0.4,
      };
  return (
    <div className="container mt-5">
      
      <Chart
        width={'500px'}
        height={'350px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={pieData}
        options={pieOptions}
        rootProps={{ 'data-testid': '3' }}
      />
    </div>
  );
};

export default PieChart;

