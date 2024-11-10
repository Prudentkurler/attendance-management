import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import data from './ChartData';
import { FaSliders } from 'react-icons/fa6';
import { set } from 'lodash';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TimeFrame = 'month' | 'week' | 'day';

const BarChart = () => {
  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>('month');
    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const getBarColors = (attendees: string[]) => {
    const attendeesNum = attendees.map(Number);
    const maxAttendees = Math.max(...attendeesNum);
    return attendeesNum.map((value) =>
      value === maxAttendees ? '#F58E06' : '#C9D3FA'
    );
  };

  const chartData = {
    labels: data[timeFrame].labels,
    datasets: [
      {
        label: 'Attendees',
        data: data[timeFrame].attendees.map(Number), // Convert data to numbers
        backgroundColor: getBarColors(data[timeFrame].attendees),
        borderRadius: {
          topLeft: 6,
          topRight: 6,
        },
        borderSkipped: 'bottom' as const, // Ensure the border is not skipped at the bottom
        borderWidth: 1,
        barThickness: 20, // Adjust bar width
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart takes the full size of the container
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Attendees by ${timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} (%)`,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw}%`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: any) => `${value}%`,
        },
        beginAtZero: true,
      },
    },
  };


  const handleMenuOpen = () => {
   setMenuOpen(!menuOpen);
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div>
        <button onClick={()=> handleMenuOpen()}>
        <FaSliders/>
        </button>
        {
            menuOpen && (
        <div className='w-[100px] p-3 flex flex-col gap-2 items-center justify-center bg-gray-100 shadow-md z-100 absolute'>

            <button onClick={() => { setTimeFrame('month'); handleMenuOpen(); }} className='text-lg font-semibold text-blue-300 hover:opacity-85'>Month</button>
            <button onClick={() => {setTimeFrame('week'); handleMenuOpen();}} className='text-lg font-semibold text-blue-300 hover:opacity-85'>Week</button>
            <button onClick={() => {setTimeFrame('day'); handleMenuOpen()}} className='text-lg font-semibold text-blue-300 hover:opacity-85'>Day</button>
        </div>)
        }
      </div>
      <div style={{ width: '100%', height: '100%', maxHeight: '500px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
