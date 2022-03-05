import * as React from "react"
import { VFC } from "react"
import { Sleep } from "../../models/sleep"

const Heatmap: VFC<{ sleeps: Sleep[] }> = ({ sleeps }) => {
  const canvasEl = React.useRef(null as null | HTMLCanvasElement)

  React.useEffect(() => {
    const days = sleeps
      .flatMap(sleep => [sleep.startDate, sleep.endDate])
      .filter((x, i, a) => a.indexOf(x) === i).length

    const a = new Array(24 * 60).fill(0)
    const base = new Date("2000-01-01 ").getTime()
    for (const sleep of sleeps) {
      const start =
        (sleep.startTime.getTime() - base) / (1000 * 60) | 0
      const end = (sleep.endTime.getTime() - base) / (1000 * 60) | 0
      for (let i = start; i < end; i++) {
        a[i % a.length] += 1
      }
    }

    const ctx = canvasEl.current?.getContext("2d")
    if (!ctx) return;

    ctx.fillStyle = "#eee"
    ctx.fillRect(0, 0, 500, 20)
    for (let i = 0; i < a.length; i++) {
      // ctx.fillStyle = `rgba(255, 0, 0, ${a[i] / days})`
      ctx.fillStyle = `hsl(${240 * (1 - a[i] / days)}, 100%, 50%)`
      ctx.fillRect((i * 500) / a.length, 0, 500 / a.length, 10)
    }
  }, [sleeps])

  return <canvas ref={canvasEl} width={500} height={10} > </canvas>
}

export default Heatmap
