import { useState, useEffect } from 'react';
import axios from 'axios';
import InstructorRoute from '@components/routes/InstructorRoute';
import Resizer from 'react-image-file-resizer';
import CourseCreateForm from '@components/forms/CourseCreateForm';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const EditCourse = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '9.99',
    uploading: false,
    paid: true,
    category: '',
    loading: false,
  });

  const [image, setImage] = useState({});
  const [preview, setPreview] = useState('');

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setValues(data);
  };

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

        setImage(data);
        console.log('image Uploaded', data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast.error('Image Upload Faild');
      }
    });
  };

  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post('/api/course/remove-image', { image });
      setImage({});
      setPreview('');
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast.error('Image Remove Faild');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/course', { ...values, image });
      toast.success('Course Created');
      router.push('/instructor');
    } catch (err) {
      toast.error(err.response.data);
    }
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
          handleImageRemove={handleImageRemove}
          values={values}
          setValues={setValues}
          preview={preview}
        />
      </div>
    </InstructorRoute>
  );
};

export default EditCourse;
