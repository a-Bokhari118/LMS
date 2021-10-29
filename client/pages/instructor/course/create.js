import { useEffect, useState } from 'react';
import axios from 'axios';
import InstructorRoute from '@components/routes/InstructorRoute';

import CourseCreateForm from '@components/forms/CourseCreateForm';

const CourseCreate = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '9.99',
    uploading: false,
    paid: true,
    category: '',
    loading: false,
    imagePreview: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = () => {
    //
  };

  const handleSubmit = (e) => {
    e.preventdefult();
    console.log(values);
  };

  return (
    <InstructorRoute>
      <div className="p-5 mb-4 bg-primary text-center square">
        <h1>{values.name ? values.name : 'Create Course'}</h1>
      </div>
      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImage={handleImage}
          values={values}
          setValues={setValues}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CourseCreate;
