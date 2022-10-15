import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import { List } from '../components/List';
import styles from '../styles/Home.module.css';
import { client } from '../utils/apiClient';
import { useSession } from '../utils/fetchers';

export interface OAuthSuccessMessage {
  type: 'OAUTH_CODE';
  payload: string;
}

export interface OAuthErrorMessage {
  type: 'OAUTH_ERROR';
  payload: string;
}

export interface OAuthCloseMessage {
  type: 'OAUTH_CLOSE';
}

const Home: NextPage = () => {
  const { session, authenticating, login } = useSession();

  const [value, setValue] = useState('');
  const save = useCallback(async () => {
    await client.post('/manifest', { id: value });
    setValue('');
  }, [value]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Toggle Maestro</title>
        <meta content="Toggle those features, with finesse" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      {session.accessToken ? (
        <main className={styles.main}>
          <input onChange={(e) => setValue(e.currentTarget.value)} value={value} />
          <button onClick={save} type="button">
            Save
          </button>
          <List />
        </main>
      ) : (
        <main className={styles.main}>
          <button disabled={authenticating} onClick={login} type="button">
            Login with GitHub
          </button>
        </main>
      )}
    </div>
  );
};

export default Home;
