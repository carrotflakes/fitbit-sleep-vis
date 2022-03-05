import useSWR from 'swr';
import styles from './App.module.css';
import SleepsView from './components/SleepsView';
import useFitbit from './hooks/useFitbit';
import { useSleeps } from './hooks/useSleeps';

function App() {
  const { signin, fetcher, loggedin } = useFitbit();

  const profile = useSWR({ path: '/1/user/-/profile.json' }, fetcher);
  const { sleeps, completed, error } = useSleeps(fetcher, new Date().toISOString().slice(0, 10));

  return (
    <div className={styles.app}>
      <header>
        <h1 className={styles.title}>Fitbit Sleep Vis</h1>
        <div className={styles.subtitle}>
          Looking back on your sleep😴
        </div>
      </header>
      <main>
        {
          !loggedin && <div>
            <button className={styles.signinButton} onClick={signin}>Sign in with Fitbit</button>
          </div>
        }
        {
          loggedin && <div>
            <div>
              hello, {profile?.data?.user?.displayName ?? 'anonymous'}
              {
                profile?.data?.user?.avatar &&
                <img className={styles.avatar} src={profile.data.user.avatar} alt="" />
              }
            </div>
            {error &&
              <div>
                {error.message.startsWith('429 ') ? 'rate limit!' : error.toString()}
              </div>}
            {!!sleeps.length &&
              <>
                {!completed && <div>loading...</div>}
                <div>
                  duration: {sleeps.at(-1)?.endDate} - {sleeps[0].startDate}
                </div>
              </>
            }
            <SleepsView sleeps={sleeps} />
          </div>
        }
      </main>
      <footer>
        <a href="https://twitter.com/carrotflakes">@carrotflakes</a>
      </footer>
    </div>
  );
}

export default App;
