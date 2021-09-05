import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Context } from '../context';
import { useRouter } from 'next/router';
const login = () => {
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

  // Redirect user if he logged in
  useEffect(() => {
    if (user !== null) router.push('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      dispatch({
        type: 'LOGIN',
        payload: data,
      });
      window.localStorage.setItem('user', JSON.stringify(data));
      setLoading(false);
      router.push('/user');
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="p-5 mb-4 bg-light text-center square">Login Page</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
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
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : 'Submit'}
          </button>
        </form>
        <p className="text-center pt-3">
          New User?{' '}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </p>
        <p className="text-center text-danger">
          <Link href="/forgot-password">
            <a>Forgot Password?</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default login;
