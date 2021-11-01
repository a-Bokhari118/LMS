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

      <div className="cointainer-fluid">
        <div className="row">
          {courses.map((course) => (
            <div key={courses._id} className="col-md-4">
              {<pre>{JSON.stringify(course)}</pre>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
