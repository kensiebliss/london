import dayjs from "dayjs"

export const now = {
  get date() {
    return dayjs().format("MM/DD/YYYY")
  },

  get time() {
    return dayjs().format("hh:mm:ssa")
  },

  dateTime() {
    // return dayjs().format('MM/DD/YYYY hh:mm:ssa')
    return `${now.date} ${now.time}`
  },
}
