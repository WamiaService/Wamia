import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-google-charts';



const PieChart = ({Electricien,Climatisation,plombier,nbtransporteur,peinture,laver,camerman}) => {
    const pieData = [
        ['Task', 'Hours per Day'],
        ['ELECTRICIEN', Electricien],
        ['Climatisation', Climatisation],
        ['plombier', plombier],
        ['nbtransporteur', nbtransporteur],
        ['peinture', peinture],
        ['laver', laver],
        ['cameramen',camerman]
      ];
      
      const pieOptions = {
        title: 'My Daily Activities',
        pieHole: 0.4,
      };
  return (
    <div className="container mt-5">
      <h2>Donut Chart</h2>
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

