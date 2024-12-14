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
import { FaSliders } from 'react-icons/fa6';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TimeFrame = 'month' | 'week' | 'day';

interface BarChartProps {
  data: {
    labels: string[];
    attendees: number[];
  };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>('month');
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  const getBarColors = (attendees: number[]) => {
    const maxAttendees = Math.max(...attendees);
    return attendees.map((value) =>
      value === maxAttendees ? '#F58E06' : '#C9D3FA'
    );
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Attendees',
        data: data.attendees,
        backgroundColor: getBarColors(data.attendees),
        borderRadius: {
          topLeft: 6,
          topRight: 6,
        },
        borderSkipped: 'bottom' as const,
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Attendees by ${timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}`,
      },
    },
    scales: {
      y: {
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
        <button onClick={handleMenuOpen}>
          <FaSliders/>
        </button>
        {menuOpen && (
          <div className='w-[100px] p-3 flex flex-col gap-2 items-center justify-center bg-gray-100 shadow-md z-100 absolute'>
            <button onClick={() => { setTimeFrame('month'); handleMenuOpen(); }} className='text-lg font-semibold text-blue-300 hover:opacity-85'>Month</button>
            <button onClick={() => {setTimeFrame('week'); handleMenuOpen();}} className='text-lg font-semibold text-blue-300 hover:opacity-85'>Week</button>
            <button onClick={() => {setTimeFrame('day'); handleMenuOpen()}} className='text-lg font-semibold text-blue-300 hover:opacity-85'>Day</button>
          </div>
        )}
      </div>
      <div style={{ width: '100%', height: '100%', maxHeight: '500px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;

