import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import data from './ChartData';
import { FaSliders } from 'react-icons/fa6';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register the Filler plugin
);

type TimeFrame = 'month' | 'week' | 'day';

const LineChart = () => {
  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>('month');
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const getMaxPointColor = (attendees: string[], defaultColor: string, maxColor: string) => {
    const attendeesNum = attendees.map(Number);
    const maxAttendees = Math.max(...attendeesNum);
    return attendeesNum.map((value) =>
      value === maxAttendees ? maxColor : defaultColor
    );
  };

  const chartData = {
    labels: data[timeFrame].labels,
    datasets: [
      {
        label: 'Attendees',
        data: data[timeFrame].attendees.map(Number), // Convert data to numbers
        borderColor: '#618CDE', // Light blue color for the line
        backgroundColor: 'rgba(173, 216, 230, 0.2)',
        borderWidth: 2,
        tension: 0.4, // Tension for smooth curve
        pointBackgroundColor: 'rgba(255, 255, 255, 0)', // Transparent inside
        pointBorderColor: getMaxPointColor(data[timeFrame].attendees, 'rgba(75, 192, 192, 1)', 'rgba(0, 0, 139, 1)'), // Color for the point border with deep blue for the highest point
        pointBorderWidth: 2, // Border width for the point
        pointRadius: 5, // Radius for the point
        pointHoverBorderWidth: 3, // Border width for the point when hovered
        pointHoverRadius: 7, // Radius for the point when hovered
        pointHoverBorderColor: getMaxPointColor(data[timeFrame].attendees, 'rgba(75, 192, 192, 1)', 'rgba(0, 0, 139, 1)'), // Hover border color
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 0)', // Transparent inside on hover
        pointStyle: 'circle', // Shape of the points
        pointShadowBlur: 5, // Add shadow blur
        pointShadowColor: 'rgba(0, 0, 0, 0.3)', // Shadow color
        fill: true, // Enable fill under the line
      },
    ],
  };

  const options = {
    responsive: true,
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
  }

  return (
    <div>
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
