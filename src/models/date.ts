export function showDate(date: Date) {
  return (
    date.toISOString().slice(0, 10) +
    " " +
    "SUN MON TUE WED THU FRI SAT".split(" ")[date.getDay()]
  )
}
