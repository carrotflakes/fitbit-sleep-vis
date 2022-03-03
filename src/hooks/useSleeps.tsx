import { Sleep } from "../models/sleep"
import useSWRInfinite from 'swr/infinite'
import { fitbitFetcher } from "../fitbitFetcher"
import { useEffect } from "react"

export const useSleeps = (accessToken: string | null, end: string): { sleeps: Sleep[]; completed: boolean, error: null | Error } => {
  // const [sleeps, setSleeps] = useState<Sleep[]>([])
  // useEffect(() => {
  //   if (sleeps.length < 100) {
  //     setTimeout(() => {
  //       const time = new Date(new Date().toISOString().slice(0, 10));
  //       time.setDate(time.getDate() - sleeps.length);
  //       const ss = [] as Sleep[];
  //       for (let i = 0; i < 10; i++) {
  //         time.setDate(time.getDate() - 1);
  //         const startTime = new Date(time);
  //         startTime.setMinutes(startTime.getMinutes() + Math.random() * 6 * 60);
  //         const endTime = new Date(startTime);
  //         endTime.setMinutes(endTime.getMinutes() + 3 * 60 + Math.random() * 6 * 60);
  //         ss.push({
  //           startTime: startTime.toISOString(),
  //           endTime: endTime.toISOString(),
  //         });
  //       }
  //       setSleeps(sleeps => [...sleeps, ...ss]);
  //     }, 1000);
  //   }
  // }, [sleeps, setSleeps]);

  // return {
  //   sleeps,
  //   completed: sleeps.length >= 100,
  //   error: null,
  // };

  const { data, error, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.sleep?.length === 0) {
        console.log("no more data")
        return null
      }

      const e = new Date(end);
      e.setDate(e.getDate() - pageIndex * 101);
      const s = new Date(e);
      s.setDate(s.getDate() - 100);

      return {
        path: `/1.2/user/-/sleep/date/${s.toISOString().slice(0, 10)}/${e.toISOString().slice(0, 10)}.json`,
        accessToken,
      }
    },
    fitbitFetcher,
  )

  const sleeps = (data || [])
    .map(d => d?.sleep || [])
    .flat()
    .map(s => ({
      startTime: s.startTime,
      endTime: s.endTime,
    }))
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()) || [] as Sleep[];

  const completed = Array.isArray(data) && data.at(-1)?.length === 0; // FIXME

  useEffect(() => {
    if (!completed && !error && data?.at(-1)) {
      setTimeout(() => {
        console.log("next")
        setSize(size + 1);
      }, 10);
    }
  }, [completed, error, data, size, setSize]);

  return {
    sleeps,
    completed,
    error,
  }
}
