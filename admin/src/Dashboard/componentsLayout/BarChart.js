import React from "react";
import Chart from "react-apexcharts";



function ApexColumnBarChart({PTunis,PAriana,PManouba,PBenArous,PNabeul,PSousse,PBeja,PGasrine,PSfax,NTunis,NAriana,NManouba,NBenArous,NNabeul,NSousse,NBeja,NGasrine,NSfax}) {
  

  
  
  

   
    

  

  const data = {
    series: [
      {
        name: "Providers",
        data: [PTunis,PAriana,PManouba,PBenArous,PNabeul,PSousse,PBeja,PGasrine,PSfax],
      },
      {
        name: "Custumors",
        data: [NTunis,NAriana,NManouba,NBenArous,NNabeul,NSousse,NBeja,NGasrine,NSfax],
      },
      
    ],
    options: {
      title: {
        text: "Providers and Customers in Various Regions",
        align: "center",
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
     
      chart: {
        
        type: "bar",
        height: 350,
        
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Tunis",
          "Ariana",
          "Manouba",
          "BenArous",
          "Nabeul",
          "Sousse",
          "Beja",
          "Gasrine",
          "Mahdia",
          "Sfax"
        ],
      },
      yaxis: {
        title: {
          text: " (person)",
        },
        categories: [0, 5, 10, 22, 80, 100, 120], // Customize the y-axis tick values here
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return  val + " person";
          },
        },
      },
    },
  };
  
   

   

  return (
    <>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height={350}
      />
    </>
  );
}

export default ApexColumnBarChart;