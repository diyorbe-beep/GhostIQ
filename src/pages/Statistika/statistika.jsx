import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Navbar from '../../components/navbar/navbar.jsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './statistika.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import imgs from "../../assets/index.js";
const Statistika = () => {
  const [activeTab, setActiveTab] = useState('umumiy');
  const [timeRange, setTimeRange] = useState('haftalik');
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    // Mock data - aslida API dan olishingiz kerak
    const fetchData = async () => {
      const data = {
        umumiy: {
          oquvchilar: 1245,
          ustozlar: 68,
          fanlar: 12,
          testlar: 543
        },
        davomat: {
          labels: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
          present: [85, 79, 92, 87, 76, 95],
          absent: [15, 21, 8, 13, 24, 5]
        },
        baholar: {
          labels: ['Matematika', 'Ona tili', 'Fizika', 'Kimyo', 'Tarix'],
          data: [4.5, 4.8, 4.2, 4.6, 4.9]
        }
      };
      setStatsData(data);
    };

    fetchData();
  }, [timeRange]);

  return (
    <div className="wrapper">
      <Navbar />
      <div className="statistika-container">
        <h1 className="statistika-title">Statistika</h1>

        <div className="statistika-controls">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'umumiy' ? 'active' : ''}`}
              onClick={() => setActiveTab('umumiy')}
            >
              Umumiy statistika
            </button>
            <button
              className={`tab-btn ${activeTab === 'davomat' ? 'active' : ''}`}
              onClick={() => setActiveTab('davomat')}
            >
              Davomat
            </button>
            <button
              className={`tab-btn ${activeTab === 'baholar' ? 'active' : ''}`}
              onClick={() => setActiveTab('baholar')}
            >
              Baholar
            </button>
          </div>

          <div className="time-range">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-select"
            >
              <option value="haftalik">Haftalik</option>
              <option value="oylik">Oylik</option>
              <option value="yillik">Yillik</option>
            </select>
          </div>
        </div>

        <div className="statistika-content">
          {!statsData ? (
            <div className="loading">Yuklanmoqda...</div>
          ) : activeTab === 'umumiy' ? (
            <div className="stats-cards">
              <StatCard
                title="O'quvchilar"
                value={statsData.umumiy.oquvchilar}
                icon={imgs.graduted}
                trend="up"
                change="5%"
              />
              <StatCard
                title="Ustozlar"
                value={statsData.umumiy.ustozlar}
                icon={imgs.classroom}
                trend="stable"
              />
              <StatCard
                title="Fanlar"
                value={statsData.umumiy.fanlar}
                icon={imgs.books}
                trend="up"
                change="10%"
              />
              <StatCard
                title="Testlar"
                value={statsData.umumiy.testlar}
                icon={imgs.test}
                trend="up"
                change="15%"
              />
            </div>
          ) : activeTab === 'davomat' ? (
            <div className="chart-container">
              <Bar
                data={{
                  labels: statsData.davomat.labels,
                  datasets: [
                    {
                      label: 'Qatnashgan',
                      data: statsData.davomat.present,
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1
                    },
                    {
                      label: 'Qatnashmagan',
                      data: statsData.davomat.absent,
                      backgroundColor: 'rgba(255, 99, 132, 0.6)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Davomat statistikasi',
                      font: {
                        size: 16
                      }
                    },
                    legend: {
                      position: 'top'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      title: {
                        display: true,
                        text: 'Foiz (%)'
                      }
                    }
                  }
                }}
              />
            </div>
          ) : (
            <div className="chart-container">
              <div className="half-width">
                <Pie
                  data={{
                    labels: statsData.baholar.labels,
                    datasets: [{
                      data: statsData.baholar.data,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                      ],
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Fanlar boʻyicha baholar',
                        font: {
                          size: 16
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="half-width">
                <Line
                  data={{
                    labels: statsData.baholar.labels,
                    datasets: [{
                      label: 'Oʻrtacha baho',
                      data: statsData.baholar.data,
                      fill: false,
                      backgroundColor: 'rgba(54, 162, 235, 0.7)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      tension: 0.1
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Baholar dinamikasi',
                        font: {
                          size: 16
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        min: 3,
                        max: 5
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, change }) => {
  return (
    <div className="stat-card">
      <div className='stat-icon'><img src={icon} alt="" /></div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
        {trend && (
          <div className={`stat-trend ${trend}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            {change && ` ${change}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistika;