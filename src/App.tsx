import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import styles from './App.module.css';
import Heatmap from './components/heatmap';
import SleepsList from './components/SleepsList';
import { fitbitFetcher } from './fitbitFetcher';
import { useSleeps } from './hooks/useSleeps';

function App() {
  const accessToken = useMemo(() =>
    window.location.hash.match(/access_token=([^&]*)/)?.[1] ?? null
    , []);
  const signin = useCallback(() => {
    const clientId = '23894W';
    const redirectUri = encodeURIComponent(window.location.href.replace(window.location.hash, ''));
    const scope = 'profile sleep';
    window.location.replace(`https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`);
  }, []);

  const profile = useSWR({ path: '/1/user/-/profile.json', accessToken }, fitbitFetcher);
  const sleepsRes = useSleeps(accessToken);

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
          !accessToken && <div>
            <button className={styles.signinButton} onClick={signin}>Sign in with Fitbit</button>
          </div>
        }
        {
          accessToken && <div>
            <div>
              hello, {profile?.data?.user?.displayName ?? 'anonymous'}
              {
                profile?.data?.user?.avatar &&
                <img className={styles.avatar} src={profile.data.user.avatar} alt="" />
              }
            </div>
            <Heatmap sleeps={sleepsRes.sleeps} />
            <SleepsList sleeps={sleepsRes.sleeps} />
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
