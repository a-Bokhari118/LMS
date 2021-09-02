import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Context } from '../context';
import { useRouter } from 'next/router';

const forgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Context
  const {
    state: { user },
  } = useContext(Context);
  // Router
  const router = useRouter();

  // Redirect LoggedIn users
  useEffect(() => {
    if (user !== null) router.push('/');
  }, []);

  // reset password (sending code)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/api/forgot-password', { email });
      setSuccess(true);
      toast.success('Check Your Email For Secret Code');
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  // reset password Submitting Code
  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(email, code, newPassword);
    return;
    try {
      setLoading(true);
      const { data } = await axios.post('/api/reset-password', {
        email,
        code,
        newPassword,
      });
      setEmail('');
      setCode('');
      setNewPassword('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <h1 className="p-5 mb-4 bg-secondary text-center text-white square">
        Forgot Password
      </h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />

          {success && (
            <>
              <input
                type="text"
                className="form-control mb-4 p-4"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Code"
                required
              />
              <input
                type="password"
                className="form-control mb-4 p-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 p-2"
            disabled={loading || !email}
          >
            {loading ? <SyncOutlined spin /> : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default forgotPassword;
