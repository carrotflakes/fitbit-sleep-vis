import * as React from "react"
import { FC } from "react"
import { Sleep } from "../../models/sleep"

import styles from './index.module.css';

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

const Heatmap: FC<{ sleeps: Sleep[] }> = ({ sleeps }) => {
  const canvasEl = React.useRef(null as null | HTMLCanvasElement)

  const resolusion = 500;

  React.useEffect(() => {
    const days = Math.ceil((Math.max(...sleeps.map(s => s.endTime.getTime())) - Math.min(...sleeps.map(s => s.startTime.getTime()))) / ONE_DAY_MS)

    const a = new Array(resolusion).fill(0)
    const base = new Date("2000/01/01").getTime()
    for (const sleep of sleeps) {
      const start =
        (sleep.startTime.getTime() - base) * resolusion / ONE_DAY_MS | 0
      const end = (sleep.endTime.getTime() - base) * resolusion / ONE_DAY_MS | 0
      for (let i = start; i < end; i++) {
        a[i % a.length] += 1
      }
    }

    const ctx = canvasEl.current?.getContext("2d")
    if (!ctx) return;

    ctx.clearRect(0, 0, resolusion, 5)

    for (let i = 0; i < resolusion; i++) {
      // ctx.fillStyle = `rgba(255, 0, 0, ${a[i] / days})`
      ctx.fillStyle = `hsl(${240 * (1 - a[i] / days)}, 100%, 50%)`
      ctx.fillRect(i, 0, 1, 5)
    }

    // Draw separator
    for (let i = 0; i < 23; i++) {
      ctx.fillStyle = "#fff"
      ctx.fillRect((i + 1) * resolusion / 24, 1, 1, 3)
    }
  }, [sleeps])

  return <canvas className={styles.heatmap} ref={canvasEl} width={resolusion} height={5} > </canvas>
}

export default Heatmap
