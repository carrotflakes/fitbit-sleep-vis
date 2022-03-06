import * as React from "react"
import { VFC } from "react"
import { Sleep } from "../../models/sleep"

import styles from './index.module.css';

const Heatmap: VFC<{ sleeps: Sleep[] }> = ({ sleeps }) => {
  const canvasEl = React.useRef(null as null | HTMLCanvasElement)
  
  const resolusion = 500;

  React.useEffect(() => {
    const days = sleeps
      .flatMap(sleep => [sleep.startDate, sleep.endDate])
      .filter((x, i, a) => a.indexOf(x) === i).length

    const a = new Array(resolusion).fill(0)
    const base = new Date("2000-01-01 ").getTime()
    for (const sleep of sleeps) {
      const start =
        (sleep.startTime.getTime() - base) * resolusion / (1000 * 60 * 60 * 24) | 0
      const end = (sleep.endTime.getTime() - base) * resolusion / (1000 * 60 * 60 * 24) | 0
      for (let i = start; i < end; i++) {
        a[i % a.length] += 1
      }
    }

    const ctx = canvasEl.current?.getContext("2d")
    if (!ctx) return;

    ctx.fillStyle = "#eee"
    ctx.fillRect(0, 0, resolusion, 1)
    for (let i = 0; i < a.length; i++) {
      // ctx.fillStyle = `rgba(255, 0, 0, ${a[i] / days})`
      ctx.fillStyle = `hsl(${240 * (1 - a[i] / days)}, 100%, 50%)`
      ctx.fillRect((i * resolusion) / a.length, 0, resolusion / a.length, 1)
    }
  }, [sleeps])

  return <canvas className={styles.heatmap} ref={canvasEl} width={resolusion} height={1} > </canvas>
}

export default Heatmap
