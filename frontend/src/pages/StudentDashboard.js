import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  const register = async () => {
    try {
      const res = await axiosInstance.post(`/courses/:id/register`, localStorage.getItem(token));
    } catch (err) {
      console.error(err);
      setError('Failed to register course');
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get('/courses');
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch courses');
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Available Courses</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button onClick={register()}>Register</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
