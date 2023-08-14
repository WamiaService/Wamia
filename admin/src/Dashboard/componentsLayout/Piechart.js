import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-google-charts';



const PieChart = ({Electricien,Climatisation,plombier,nbtransporteur,peinture,laver,camerman,menuisier}) => {
    const pieData = [
        ['Task', 'Hours per Day'],
        ['Electricité', Electricien],
        ['Climatisation', Climatisation],
        ['plomberie', plombier],
        ['transporteur', nbtransporteur],
        ['peinture', peinture],
        ['Machine a laver', laver],
        ['camera de surveillance',camerman],
        ['menuiserie',menuisier]
      ];
      
      const pieOptions = {
        title: 'Distribution of Tasks',
        titleTextStyle: {
          fontSize: 24, // Set the font size here
        },
        pieHole: 0.4,
      };
  return (
    <div className="container mt-5">
      
      <Chart
        width={'700px'}
        height={'420px'}
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

