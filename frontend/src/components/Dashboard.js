import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.scss';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [username, setUsername] = useState('');
  const [ageStats, setAgeStats] = useState({ '18-19': 0, '20-22': 0, '23+': 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsername(storedUser.username);
    } else {
      navigate('/login');
    }

    const membersData = JSON.parse(localStorage.getItem('members')) || [];
    const ageGroups = { '18-19': 0, '20-22': 0, '23+': 0 };

    membersData.forEach(member => {
      if (member.age >= 18 && member.age <= 19) {
        ageGroups['18-19'] += 1;
      } else if (member.age >= 20 && member.age <= 22) {
        ageGroups['20-22'] += 1;
      } else {
        ageGroups['23+'] += 1;
      }
    });

    setAgeStats(ageGroups);
  }, [navigate]);

  const pieData = {
    labels: ['18-19', '20-22', '23+'],
    datasets: [
      {
        data: [ageStats['18-19'], ageStats['20-22'], ageStats['23+']],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.topBar}>
        <div className={styles.leftSide}>
          {username && <h2 className={styles.username}>Hello, {username}!</h2>}

          <div className={styles.hamburgerIcon} onClick={() => setMenuVisible(prev => !prev)}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>

          <div className={`${styles.menuBar} ${menuVisible ? styles.menuVisible : ''}`}>
            <button className={styles.menuButton} onClick={() => navigate('/members')}>Members</button>
            <button className={styles.menuButton} onClick={() => navigate('/events')}>Events</button>
          </div>
        </div>

        <button
          className={styles.logoutButton}
          onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>

      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Distribution by Age Groups</h3>
        <Pie data={pieData} className={styles.pieChart} />
      </div>
    </div>
  );
}

export default Dashboard;
