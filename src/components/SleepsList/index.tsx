import { VFC } from "react";
import { Sleep } from "../../models/sleep";

const SleepsList: VFC<{ sleeps: Sleep[] }> = ({ sleeps: ss }) => {
  const sleeps = ss
    .map(sleep => {
      const startTime = new Date(sleep.startTime)
      return {
        dateStr: [
          startTime.getFullYear(),
          startTime.getMonth() + 1,
          startTime.getDate(),
        ].join("-"),
        date: new Date(
          startTime.getFullYear(),
          startTime.getMonth(),
          startTime.getDate()
        ),
        startTime,
        endTime: new Date(sleep.endTime),
      }
    })
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
  return (
    <div>
      {sleeps
        .map(sleep => sleep.date.getTime())
        .filter((x, i, a) => a.indexOf(x) === i)
        .map(date => new Date(date))
        .map(date => (
          <div
            key={date.getTime()}
            style={{
              height: "12px",
              margin: "1px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "120px",
                fontSize: "12px",
              }}
            >
              {showDate(date)}
            </div>
            <div
              style={{
                display: "inline-block",
                position: "relative",
                width: "500px",
                height: "10px",
                background: "#ddd",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              {sleeps
                .filter(
                  sleep =>
                    date.getTime() <= sleep.endTime.getTime() &&
                    sleep.startTime.getTime() <= date.getTime() + 86400000
                )
                .map(sleep => {
                  const factor = 500 / (60 * 60 * 24 * 1000)
                  const left =
                    (sleep.startTime.getTime() - date.getTime()) * factor - 5 // 5 is borderRadius
                  const width =
                    (sleep.endTime.getTime() - sleep.startTime.getTime()) *
                    factor +
                    5 * 2 // 5 is borderRadius
                  return (
                    <div
                      key={sleep.startTime.getTime()}
                      style={{
                        position: "absolute",
                        left: (left | 0) + "px",
                        width: (width | 0) + "px",
                        height: "10px",
                        backgroundColor: "#e22",
                        borderRadius: "5px",
                      }}
                    ></div>
                  )
                })}
              {[...Array(3)].map((_, i) => (
                <div
                  style={{
                    position: "absolute",
                    top: "1px",
                    left: (((500 / 4) * (i + 1)) | 0) + "px",
                    width: 1 + "px",
                    height: "8px",
                    backgroundColor: "#000",
                    opacity: 0.3,
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default SleepsList;

function showDate(date: Date) {
  return (
    date.toISOString().slice(0, 10) +
    " " +
    "sun mon tue wed thu fri sat".split(" ")[date.getDay()]
  )
}
