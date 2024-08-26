import React, { useState, useEffect } from 'react';
import { fetchSchedules} from '../../Services/ScheduleService';

const ScheduleUser = () => {
  const [schedules, setSchedules] = useState([]);
  
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const data = await fetchSchedules();
        setSchedules(data || []);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };
    getSchedules();
  }, []);

  return (
    <div>
      <h1>Horarios de atención</h1>
      <h2>Te mostramos los horarios de atención</h2>
      <table>
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora de apertura</th>
            <th>Hora de cierre</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.id}>
              <td>{schedule.day}</td>
              <td>{schedule.start_time}</td>
              <td>{schedule.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule.id}>
            <span>{schedule.day} - {schedule.start_time} to {schedule.end_time}</span>
          </li>
        ))}
      </ul>
      <h2>Te esperamos</h2>
    </div>
  );
};

export default ScheduleUser;
