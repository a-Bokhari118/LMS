import InstructorRoute from '@components/routes/InstructorRoute';
import axios from 'axios';
import { Context } from '../../context';
import { useContext } from 'react';

const InstructorIndex = () => {
  const {
    state: { user },
  } = useContext(Context);
  return (
    <InstructorRoute>
      <div className="p-5 mb-4 bg-primary text-center square">
        Instructor Dashboard
      </div>
    </InstructorRoute>
  );
};

export default InstructorIndex;
