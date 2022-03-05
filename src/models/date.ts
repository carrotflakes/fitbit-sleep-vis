export function showDate(date: Date) {
  return (
    `${date.getFullYear()}-${(date.getMonth() + 1 + "").padStart(2, "0")}-${(date.getDate() + "").padStart(2, "0")}` +
    " " +
    "SUN MON TUE WED THU FRI SAT".split(" ")[date.getDay()]
  )
}
