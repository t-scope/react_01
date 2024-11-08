import React from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { calculateDailyBarances } from '../ulils/financeCalculations';
import { Transaction } from '../types';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps{
  monthlyTransactions:Transaction[],
}


const BarChart = ({monthlyTransactions}:BarChartProps) => {

  const labels = [
   '2024-11-01',
   '2024-11-04',
   '2024-11-06',
   '2024-11-08',
   '2024-11-10',
   '2024-11-12',
   '2024-11-14',
      ];

  const options = {
    maintainAspectRatio:false,
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' as const,
      },
      title: {
        display: true,
        text: '日別収支',
      },
    },
  };
  const monthlyTransactionsArray =  calculateDailyBarances(monthlyTransactions)
  console.log(monthlyTransactionsArray)
  
  const data = {
    labels,
    datasets: [
      {
        label: '支出',
        data: [100,200,300,400,500,600,700],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '収入',
        data:[110,220,330,440,650,560,770],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  return <Bar options={options} data={data} />;
}

export default BarChart
