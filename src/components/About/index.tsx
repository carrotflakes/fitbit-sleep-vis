import { useState, VFC } from "react";
import githubLogo from "./github_logo.svg";

import styles from './index.module.css';

const About: VFC = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      {open &&
        <div className={styles.content}>
          <h4>Fitbit Sleep Vis</h4>
          <p>This app visualizes your sleep over the past. It uses your <a href="https://www.fitbit.com/">Fitbit</a> account.</p>
          <p>This app is not affiliated with Fitbit in any way.</p>
          <br />
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
