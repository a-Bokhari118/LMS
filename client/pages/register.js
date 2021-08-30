import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Context } from '../context';
import { useRouter } from 'next/router';
const register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Access state
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  // Router
  const router = useRouter();

  // Redirect user if he is logged in
  useEffect(() => {
    if (user !== null) router.push('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      toast.success('User Created Successfully');
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="p-5 mb-4 bg-light text-center square">Register Page</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />

          <button
            className="btn btn-block btn-primary p-2 w-100"
            type="submit"
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : 'Submit'}
          </button>
        </form>
        <p className="text-center p-3">
          Already registered?{' '}
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default register;
