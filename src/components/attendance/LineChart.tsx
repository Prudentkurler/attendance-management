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
import { FaSliders } from 'react-icons/fa6';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TimeFrame = 'month' | 'week' | 'day';

interface LineChartProps {
  data: {
    labels: string[];
    attendees: number[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>('month');
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  const getMaxPointColor = (attendees: number[], defaultColor: string, maxColor: string) => {
    const maxAttendees = Math.max(...attendees);
    return attendees.map((value) =>
      value === maxAttendees ? maxColor : defaultColor
    );
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Attendees',
        data: data.attendees,
        borderColor: '#618CDE',
        backgroundColor: 'rgba(173, 216, 230, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'rgba(255, 255, 255, 0)',
        pointBorderColor: getMaxPointColor(data.attendees, 'rgba(75, 192, 192, 1)', 'rgba(0, 0, 139, 1)'),
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverBorderWidth: 3,
        pointHoverRadius: 7,
        pointHoverBorderColor: getMaxPointColor(data.attendees, 'rgba(75, 192, 192, 1)', 'rgba(0, 0, 139, 1)'),
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 0)',
        pointStyle: 'circle',
        pointShadowBlur: 5,
        pointShadowColor: 'rgba(0, 0, 0, 0.3)',
        fill: true,
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
  }

  return (
    <div>
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;

