import SingleCourseCard from '@components/cards/SingleCourseCard';
import SingleCourseLessons from '@components/cards/SingleCourseLessons';
import PreviewModal from '@components/modals/PreviewModal';

import axios from 'axios';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

const SingleCourse = ({ course }) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState('');
  return (
    <>
      <SingleCourseCard
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
      />
      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />
      {course?.lessons && (
        <SingleCourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);

  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
