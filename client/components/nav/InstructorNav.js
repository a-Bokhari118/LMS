import Link from 'next/link';

const InstructorNav = () => {
  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link href="/instructor">
        <a className="nav-link active">Dashboard</a>
      </Link>
      <Link href="/course/create">
        <a className="nav-link active">Create Course</a>
      </Link>
    </div>
  );
};

export default InstructorNav;