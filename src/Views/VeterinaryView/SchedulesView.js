import React, { useState, useEffect } from 'react';
import { fetchSchedules, createSchedule, deleteSchedule, updateSchedule } from '../../Services/ScheduleService';

const ScheduleCRUD = () => {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    day: '',
    start_time: '',
    end_time: ''
  });
  const [editSchedule, setEditSchedule] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editSchedule) {
      setEditSchedule({ ...editSchedule, [name]: value });
    } else {
      setNewSchedule({ ...newSchedule, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editSchedule) {
        await updateSchedule(editSchedule.id, editSchedule);
        setEditSchedule(null);
      } else {
        await createSchedule(newSchedule);
        setNewSchedule({ day: '', start_time: '', end_time: '' });
      }
      const updatedSchedules = await fetchSchedules();
      setSchedules(updatedSchedules || []); 
    } catch (error) {
      console.error('Error submitting schedule:', error);
    }
  };

  const handleEdit = (schedule) => {
    setEditSchedule(schedule);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSchedule(id);
      const updatedSchedules = await fetchSchedules();
      setSchedules(updatedSchedules || []); 
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  return (
    <div>
      <h1>Horarios de atención</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="day"
          placeholder="Day"
          value={editSchedule ? editSchedule.day : newSchedule.day}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="start_time"
          placeholder="Start Time"
          value={editSchedule ? editSchedule.start_time : newSchedule.start_time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="end_time"
          placeholder="End Time"
          value={editSchedule ? editSchedule.end_time : newSchedule.end_time}
          onChange={handleChange}
          required
        />
        <button type="submit">{editSchedule ? 'Update Schedule' : 'Add Schedule'}</button>
      </form>

      <ul>
        {schedules.map(schedule => (
          <li key={schedule.id}>
            <span>{schedule.day} - {schedule.start_time} to {schedule.end_time}</span>
            <button onClick={() => handleEdit(schedule)}>Edit</button>
            <button onClick={() => handleDelete(schedule.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleCRUD;
