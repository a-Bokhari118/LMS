import InstructorRoute from '@components/routes/InstructorRoute';
import axios from 'axios';
import { Context } from '../../context';
import { useContext, useEffect, useState } from 'react';

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data } = await axios.get('/api/instructor-courses');
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <InstructorRoute>
      <div className="p-5 mb-4 bg-primary text-center square">
        Instructor Dashboard
      </div>
      <pre>{JSON.stringify(courses, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default InstructorIndex;
