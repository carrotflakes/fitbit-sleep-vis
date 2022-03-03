export const fitbitFetcher = (param: { path: string; accessToken: string; }) =>
  param.accessToken && fetch('https://api.fitbit.com' + param.path, {
    headers: new Headers({
      'Authorization': 'Bearer ' + param.accessToken,
    }),
    mode: 'cors',
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.status + ' ' + res.statusText);
    }
    return res.json();
  });
