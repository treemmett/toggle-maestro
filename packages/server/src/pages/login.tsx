import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login: NextPage = () => {
  const { query } = useRouter();

  useEffect(() => {
    if (query.code) {
      axios.post('/api/login', { code: query.code }).then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          window.close();
        }
      });
    }
  }, [query]);

  return <div>Logging in</div>;
};

export default Login;
