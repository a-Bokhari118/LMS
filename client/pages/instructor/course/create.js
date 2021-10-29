import { useEffect, useState } from 'react';
import axios from 'axios';
import InstructorRoute from '@components/routes/InstructorRoute';
import Resizer from 'react-image-file-resizer';
import CourseCreateForm from '@components/forms/CourseCreateForm';
import { toast } from 'react-toastify';

const CourseCreate = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '9.99',
    uploading: false,
    paid: true,
    category: '',
    loading: false,
  });

  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setValues({ ...values, loading: true });
    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {
      try {
        let { data } = await axios.post('/api/course/upload-image', {
          image: uri,
        });

        console.log('image Uploaded', data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast.error('Image Upload Faild');
      }
    });
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
          preview={preview}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CourseCreate;
