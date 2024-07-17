import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensure all chart types are loaded
import './ChartPage.css'; // Import your CSS file for styling

const ChartPage = () => {
  const [yearData, setYearData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/data/get-category');
        const years = response.data.CategoryData;

        // Count the occurrences of each year
        const yearCounts = years.reduce((acc, year) => {
          if (year) {
            acc[year] = (acc[year] || 0) + 1;
          }
          return acc;
        }, {});

        setYearData(yearCounts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const labels = Object.keys(yearData);
  const data = Object.values(yearData);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Occurrences',
        data,
        backgroundColor: '#4BC0C0', // You can change the color as needed
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="chart-title">Category Chart</h1>
        <section className="chart-container">
          <Bar data={chartData} options={options} />
        </section>
      </main>
    </div>
  );
};

export default ChartPage;
