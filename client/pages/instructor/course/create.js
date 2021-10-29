import axios from 'axios';
import InstructorRoute from '@components/routes/InstructorRoute';
const CourseCreate = () => {
  return (
    <InstructorRoute>
      <div className="p-5 mb-4 bg-primary text-center square">
        Create Course
      </div>
    </InstructorRoute>
  );
};

export default CourseCreate;
