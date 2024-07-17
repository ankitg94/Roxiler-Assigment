
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import './PriceChart.css'; // Import your CSS file for styling

const PriceChart = () => {
  const [topicData, setTopicData] = useState({});
  const [filteredTopicData, setFilteredTopicData] = useState({});
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/data/get-Price');
        const topics = response.data.PriceCategory;

        // Count the occurrences of each topic
        const topicCounts = topics.reduce((acc, topic) => {
          if (topic) {
            acc[topic] = (acc[topic] || 0) + 1;
          }
          return acc;
        }, {});

        setTopicData(topicCounts);
        setFilteredTopicData(topicCounts); // Initially, filtered data is the same as the original data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter the topic data based on the filter input
    if (filter) {
      const filteredData = Object.keys(topicData).reduce((acc, key) => {
        if (key.toLowerCase().includes(filter.toLowerCase())) {
          acc[key] = topicData[key];
        }
        return acc;
      }, {});
      setFilteredTopicData(filteredData);
    } else {
      setFilteredTopicData(topicData);
    }
  }, [filter, topicData]);

  const labels = Object.keys(filteredTopicData);
  const data = Object.values(filteredTopicData);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Occurrences',
        data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
        ], // You can add more colors or use a dynamic color generation
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="price-chart-container">
      <div className="price-chart">
        <h1 className="chart-title">Price Category Chart</h1>
        <input
          type="text"
          placeholder="Filter categories..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
        <div className="chart-wrapper">
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
