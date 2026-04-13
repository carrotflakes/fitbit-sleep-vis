import { Sleep } from "../models/sleep"
import useSWRInfinite from 'swr/infinite'
import { useEffect, useState } from "react"
import { Fetcher } from "swr"

type SleepLogListResponse = {
  sleep?: Array<{ startTime: string; endTime: string }>;
  pagination?: {
    next?: string;
  };
};

export const useSleeps = (fetcher: Fetcher<any, {path: string}> | null, end: string, apiVersion: "1" | "1.1" | "1.2"): { sleeps: Sleep[]; completed: boolean, error: null | Error } => {
  const { data, error, isValidating, size, setSize } = useSWRInfinite<SleepLogListResponse>(
    (pageIndex, previousPageData) => {
      if (!fetcher) {
        return null
      }

      if (pageIndex === 0) {
        const endDate = new Date(end);
        const beforeDate = endDate.toISOString().slice(0, 10);
        return {
          path: `/${apiVersion}/user/-/sleep/list.json?beforeDate=${beforeDate}&sort=desc&offset=0&limit=100`,
        }
      }

      const next = previousPageData?.pagination?.next;
      if (!next) {
        console.log("no more data")
        return null
      }

      const nextUrl = new URL(next);
      return {
        path: nextUrl.pathname + nextUrl.search,
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

  const completed = Array.isArray(data) && !!data[data.length - 1] && !data[data.length - 1]?.pagination?.next;

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

export const useSleepsDummy2 = (): { sleeps: Sleep[]; completed: boolean, error: null | Error } => {
  const [sleeps, setSleeps] = useState<Sleep[]>([])
  useEffect(() => {
    if (sleeps.length < 1000) {
      const timeoutId = setTimeout(() => {
        const time = new Date(new Date().toISOString().slice(0, 10).replace(/-/g, "/"));
        time.setDate(time.getDate() - sleeps.length * 5);
        const ss = [] as Sleep[];
        for (let i = 0; i < 10; i++) {
          time.setDate(time.getDate() - 5);
          const startTime = new Date(time);
          startTime.setMinutes(startTime.getMinutes() + (21 + Math.random() * 20) * 60);
          const endTime = new Date(startTime);
          endTime.setMinutes(endTime.getMinutes() + (30 + Math.random() * 3) * 60);
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
