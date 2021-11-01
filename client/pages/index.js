import CourseCard from '@components/cards/CourseCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get('/api/courses');
      setCourses(data);
    };
    fetchCourses();
  }, []);
  return (
    <div>
      <h1 className="p-5 mb-4 bg-primary text-center square">Students LMS</h1>

      <div className="container">
        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
