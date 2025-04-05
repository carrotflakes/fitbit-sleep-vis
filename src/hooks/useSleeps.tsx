import { Sleep } from "../models/sleep"
import useSWRInfinite from 'swr/infinite'
import { useEffect, useState } from "react"
import { Fetcher } from "swr"

export const useSleeps = (fetcher: Fetcher<any, {path: string}> | null, end: string): { sleeps: Sleep[]; completed: boolean, error: null | Error } => {
  const { data, error, isValidating, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.sleep?.length === 0) {
        console.log("no more data")
        return null
      }

      const e = new Date(end);
      e.setDate(e.getDate() - pageIndex * 100);
      const s = new Date(e);
      s.setUTCHours(1); // Add 1 hour to avoid daylight saving time issue
      s.setDate(s.getDate() - 99);

      return {
        path: `/1.2/user/-/sleep/date/${s.toISOString().slice(0, 10)}/${e.toISOString().slice(0, 10)}.json`,
      }
    },
    fetcher,
    {
      revalidateFirstPage: false,
    }
  );

  const sleeps = (data || [])
    .map(d => d?.sleep || [])
    .flat()
    .map(s => new Sleep(new Date(s.startTime), new Date(s.endTime)))
    .sort((a, b) => b.startTime.getTime() - a.startTime.getTime()) || [] as Sleep[];

  const completed = Array.isArray(data) && data[data.length - 1]?.sleep?.length === 0;

  useEffect(() => {
    if (fetcher && !isValidating && !completed && !error && size <= (data || []).length) {
      setTimeout(() => {
        console.log("next")
        setSize(size + 1);
      }, 10);
    }
  }, [fetcher, isValidating, completed, error, data, size, setSize]);

  return {
    sleeps,
    completed,
    error,
  }
}

export const useSleepsDummy = (): { sleeps: Sleep[]; completed: boolean, error: null | Error } => {
  const [sleeps, setSleeps] = useState<Sleep[]>([])
  useEffect(() => {
    if (sleeps.length < 1000) {
      const timeoutId = setTimeout(() => {
        const time = new Date(new Date().toISOString().slice(0, 10).replace(/-/g, "/"));
        time.setDate(time.getDate() - sleeps.length);
        const ss = [] as Sleep[];
        for (let i = 0; i < 10; i++) {
          time.setDate(time.getDate() - 1);
          const startTime = new Date(time);
          startTime.setMinutes(startTime.getMinutes() + (21 + Math.random() * 3) * 60);
          const endTime = new Date(startTime);
          endTime.setMinutes(endTime.getMinutes() + (7 + Math.random() * 3) * 60);
          ss.push(new Sleep(startTime, endTime));
        }
        setSleeps(sleeps => [...sleeps, ...ss]);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [sleeps, setSleeps]);

  return {
    sleeps,
    completed: sleeps.length >= 1000,
    error: null,
  };
}
