import { useCallback, useMemo } from "react";

export const useFitbit = () => {
  const accessToken = useMemo(() =>
    window.location.hash.match(/access_token=([^&]*)/)?.[1] ?? null
    , []);

  const signin = useCallback(() => {
    const clientId = '23894W';
    const redirectUri = encodeURIComponent(window.location.href.replace(window.location.hash, ''));
    const scope = 'profile sleep';
    window.location.href = `https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  }, []);

  const fetcher = useCallback((param: { path: string; }) =>
    accessToken && fetch('https://api.fitbit.com' + param.path, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken,
      }),
      mode: 'cors',
    }).then(res => {
      if (!res.ok) {
        throw new Error(res.status + ' ' + res.statusText);
      }
      return res.json();
    }), [accessToken]);

  return {
    signin,
    fetcher,
    loggedin: !!accessToken,
  };
};

export default useFitbit;
