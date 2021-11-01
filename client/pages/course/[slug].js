import axios from 'axios';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

const SingleCourse = ({ course }) => {
  const router = useRouter();

  return (
    <>
      <div className="container">
        <div className="row">{JSON.stringify(course, null, 4)}</div>
      </div>
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
