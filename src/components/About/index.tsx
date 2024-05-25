import { useState } from "react";
import githubLogo from "./github_logo.svg";

import styles from './index.module.css';

const About = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      {open &&
        <div className={styles.content}>
          <h3>Fitbit Sleep Vis</h3>
          <p>
            This is an app that visualizes sleep records from <a href="https://www.fitbit.com/">Fitbit</a>.
            It allows you to analyze sleep patterns daily, weekly, monthly, and annually, helping you understand the quality and quantity of your sleep.
          </p>
          <div>
            <h4>Privacy policy</h4>
            <p>
              This app retrieves user data from the user's Fitbit account.
              The user data includes sleep records and the username.
              The retrieved user data is used for display purposes only.
              This app is implemented as one of the Fitbit API applications and securely obtains information through OAuth 2.0 authentication.
              The app does not have a server and functions by directly accessing Fitbit's servers from the browser.
              Therefore, user data is not disclosed to third parties or developers.
            </p>
          </div>
          <div className={styles.contentFoot}>
            <div><a href="https://github.com/carrotflakes/fitbit-sleep-vis"><img src={githubLogo} alt="github" width="40px"></img></a></div>
            <div>Created by <a href="https://twitter.com/carrotflakes">@carrotflakes</a></div>
          </div>
        </div>
      }
      <div className={styles.icon} onClick={() => setOpen(b => !b)}>
        <span>{open ? "✕" : "?"}</span>
      </div>
    </div>
  );
}

export default About;
