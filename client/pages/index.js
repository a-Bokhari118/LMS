import CourseCard from '@components/cards/CourseCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home({ courses }) {
  // const [courses, setCourses] = useState([]);

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

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);

  return {
    props: {
      courses: data,
    },
  };
}
