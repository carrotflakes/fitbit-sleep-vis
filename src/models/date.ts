// Format date in the format "YYYY-MM-DD" in local time.
export function showDate(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1 + "").padStart(2, "0")}-${(date.getDate() + "").padStart(2, "0")}`
}

export function showDateWithWeek(date: Date) {
  return (
    showDate(date) +
    " " +
    "SUN MON TUE WED THU FRI SAT".split(" ")[date.getDay()]
  )
}
