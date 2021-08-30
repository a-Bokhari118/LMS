import axios from 'axios';
import { useRouter } from 'next/router';
import { useReducer, createContext, useEffect } from 'react';

const intialState = {
  user: null,
};

// Create Context
const Context = createContext();

// Root reducer

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

// Context provider

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, intialState);

  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(window.localStorage.getItem('user')),
    });
  }, []);

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get('/api/logout')
            .then((data) => {
              dispatch({ type: 'LOGOUT' });
              window.localStorage.removeItem('user');
              router.push('/');
            })
            .catch((err) => {
              console.log('Axios interceptors error', err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get('/api/csrf-token');
      console.log(data);
      axios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };