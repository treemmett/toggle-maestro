import type { NextPage } from 'next';
import Head from 'next/head';
import { List } from '../components/List';
import styles from '../styles/Home.module.css';
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Toggle Maestro</title>
        <meta content="Toggle those features, with finesse" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      {session.accessToken ? (
        <List />
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
