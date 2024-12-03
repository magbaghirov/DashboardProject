import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import styles from './Events.module.scss';

function Events() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    time: '',
    description: ''
  });
  const [editingEvent, setEditingEvent] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Məlumatları çəkməkdə xəta:', error));
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const selectedDate = new Date(newDate.setHours(0, 0, 0, 0));
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        const filteredEvents = response.data.filter(event => {
          const eventDate = new Date(event.date);
          const eventDateFormatted = new Date(eventDate.setHours(0, 0, 0, 0));
          return eventDateFormatted.getTime() === selectedDate.getTime();
        });
        setEvents(filteredEvents);
      })
      .catch(error => console.error('Məlumatları filtr etməkdə xəta:', error));
  };

  const formatDate = (date) => {
    const months = [
      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
      'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  const handleAddEvent = () => {
    axios.post('http://localhost:5000/api/events', newEvent)
      .then(response => {
        setEvents([...events, response.data]);
        setShowEventForm(false);
        setNewEvent({
          name: '',
          date: '',
          time: '',
          description: ''
        });
      })
      .catch(error => console.error('Tədbir əlavə edilərkən xəta:', error));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setShowEventForm(true);
  };

  const handleUpdateEvent = () => {
    axios.put(`http://localhost:5000/api/events/${editingEvent.id}`, newEvent)
      .then(response => {
        setEvents(events.map(event => event.id === editingEvent.id ? response.data : event));
        setShowEventForm(false);
        setEditingEvent(null);
        setNewEvent({
          name: '',
          date: '',
          time: '',
          description: ''
        });
      })
      .catch(error => console.error('Tədbir yenilənərkən xəta:', error));
  };

  const handleDeleteEvent = (id) => {
    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(() => {
        setEvents(events.filter(event => event.id !== id));
      })
      .catch(error => console.error('Tədbir silinərkən xəta:', error));
  };

  const convertTo24HourFormat = (time) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours) + 12;
    } else if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    return `${hours}:${minutes}`;
  };

  const convertTo12HourFormat = (time) => {
    let [hours, minutes] = time.split(':');
    let period = 'AM';
    
    if (parseInt(hours) >= 12) {
      period = 'PM';
      if (parseInt(hours) > 12) {
        hours = (parseInt(hours) - 12).toString();
      }
    } else if (hours === '00') {
      hours = '12';
    }

    return `${hours}:${minutes} ${period}`;
  };

  const calculateTimeLeft = (eventDate, eventTime) => {
    const formattedTime = convertTo24HourFormat(eventTime);
    const formattedDateTime = `${eventDate}T${formattedTime}`;
    const eventDateTime = new Date(formattedDateTime);
    const currentDate = new Date();
    const timeDiff = eventDateTime - currentDate;
    
    if (timeDiff <= 0) return 'Tədbir artıq keçirildi';

    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${daysLeft} gün, ${hoursLeft} saat, ${minutesLeft} dəqiqə`;
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className={styles.eventsContainer}>
      <h1>Tədbirlər</h1>
      <div className={styles.calendarContainer}>
        <Calendar onChange={handleDateChange} value={date} />
      </div>

      <div className={styles.selectedDate}>
        <p>Seçilmiş Tarix: {formatDate(date)}</p>
      </div>

      <button onClick={() => setShowEventForm(true)} className={styles.addEventButton}>Yeni Tədbir Əlavə Et</button>

      {showEventForm && (
        <div className={styles.eventForm}>
          <h2>{editingEvent ? 'Tədbiri Yenilə' : 'Yeni Tədbir Əlavə Et'}</h2>
          <input 
            type="text" 
            name="name" 
            placeholder="Tədbir adı" 
            value={newEvent.name} 
            onChange={handleInputChange} 
          />
          <input 
            type="date" 
            name="date" 
            value={newEvent.date} 
            onChange={handleInputChange} 
          />
          <input 
            type="time" 
            name="time" 
            value={newEvent.time} 
            onChange={handleInputChange} 
          />
          <textarea 
            name="description" 
            placeholder="Tədbir təsviri" 
            value={newEvent.description} 
            onChange={handleInputChange} 
          ></textarea>
          <button onClick={editingEvent ? handleUpdateEvent : handleAddEvent} className={styles.submitEventButton}>
            {editingEvent ? 'Tədbiri Yenilə' : 'Tədbir Əlavə Et'}
          </button>
          <button onClick={() => setShowEventForm(false)} className={styles.cancelButton}>Ləğv et</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Tədbir Adı</th>
            <th>Tarix</th>
            <th>Saat</th>
            <th>Təsvir</th>
            <th>Başlamağa Qalan Vaxt</th>
            <th>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.description}</td>
                <td>{calculateTimeLeft(event.date, event.time)}</td>
                <td>
                  <button onClick={() => handleEditEvent(event)} className={styles.editButton}>Yenilə</button>
                  <button onClick={() => handleDeleteEvent(event.id)} className={styles.deleteButton}>Sil</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Bu tarixdə heç bir tədbir yoxdur</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={handleGoBack} className={styles.goBackButton}>Geri</button>
    </div>
  );
}

export default Events;
