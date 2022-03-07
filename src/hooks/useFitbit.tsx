import { useCallback, useEffect, useMemo, useState } from "react";

export const useFitbit = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    let token = window.location.hash.match(/access_token=([^&]*)/)?.[1] || null;
    if (token) {
      window.sessionStorage.setItem("fitbitAccessToken", token);
      window.location.hash = "";
      setAccessToken(token);
    } else {
      setAccessToken(window.sessionStorage.getItem("fitbitAccessToken"));
    }
  }, []);

  const signin = useCallback(() => {
    const clientId = '23894W';
    const redirectUri = encodeURIComponent(window.location.href.replace(/#.*/, ''));
    const scope = 'profile sleep';
    window.location.href = `https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  }, []);

  const fetcher = useMemo(() => accessToken ? (param: { path: string; }) =>
    fetch('https://api.fitbit.com' + param.path, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken,
      }),
      mode: 'cors',
    }).then(res => {
      if (!res.ok) {
        throw new Error(res.status + ' ' + res.statusText);
      }
      return res.json();
    }) : null, [accessToken]);

  const signout = useCallback(() => {
    setAccessToken(null);
    window.sessionStorage.removeItem("fitbitAccessToken");
  }, []);

  return {
    signin,
    signout,
    fetcher,
    loggedin: !!accessToken,
  };
};

export default useFitbit;
