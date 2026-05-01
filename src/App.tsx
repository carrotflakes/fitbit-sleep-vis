import useSWR from 'swr';
import styles from './App.module.css';
import About from './components/About';
import Loading from './components/Loading';
import SleepsView from './components/SleepsView';
import useFitbit from './hooks/useFitbit';
import { useSleeps } from './hooks/useSleeps';

const nextAppUrl = 'https://sleep-vis.cflake.net/';

function App() {
  const { signin, signout, fetcher, loggedin } = useFitbit();

  const apiVersion = useApiVersion();
  const profile = useSWR(loggedin && { path: '/1/user/-/profile.json' }, fetcher);
  const { sleeps, completed, error } = useSleeps(fetcher, new Date().toISOString().slice(0, 10), apiVersion);
  // const { sleeps, completed, error } = useSleepsDummy();

  return (
    <div className={styles.app}>
      <header>
        <h1 className={styles.title}>Fitbit Sleep Vis</h1>
        {
          !loggedin &&
          <div className={styles.subtitle}>
            Looking back on your sleep😴
          </div>
        }
        {
          loggedin &&
          <div>
            Hello,&nbsp;
            {
              profile?.data?.user?.avatar &&
              <img className={styles.avatar} src={profile.data.user.avatar} alt="" />
            }
            {profile?.data?.user?.displayName ?? 'user.'}
            &nbsp;
            <div className={styles.signoutButton} onClick={signout}>[signout]</div>
          </div>
        }
      </header>
      <main className={styles.main}>
        {
          !loggedin && <div>
            <div className={styles.migrationNotice}>
              <p className={styles.migrationTitle}>A newer version is now available.</p>
              <p className={styles.migrationText}>
                Due to the discontinuation of the Fitbit Web API, this app will become unusable in September 2026.
                Please try the new Google Health version.
              </p>
              <a
                className={styles.migrationLink}
                href={nextAppUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open the new Sleep Vis
              </a>
            </div>
            <button className={styles.signinButton} onClick={signin}>Continue with Fitbit</button>
          </div>
        }
        {
          loggedin && <div>
            {error &&
              <div>
                {error.message.startsWith('429 ') ? 'rate limit!' : error.toString()}
              </div>}
            {(!completed && !error) && <div>
              <Loading />
            </div>}
            {!!sleeps.length && false &&
              <>
                {!completed && <div>loading...</div>}
                <div>
                  duration: {sleeps[sleeps.length - 1]?.endDateStr} - {sleeps[0].startDateStr}
                </div>
              </>
            }
            <SleepsView sleeps={sleeps} />
          </div>
        }
      </main>
      <About />
    </div>
  );
}

export default App;

function useApiVersion(): "1" | "1.1" | "1.2" {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('apiVersion');
  return raw === '1' || raw === '1.1' || raw === '1.2' ? raw : '1.1';
}
