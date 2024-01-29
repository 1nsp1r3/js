/**
 * @return "14:54:26" for 14h54 26s
 */
const time = function(Now){
  const now = Now == undefined ? new Date() : new Date(Now)
  const hh = now.getHours().toString().padStart(2, "0")
  const mm = now.getMinutes().toString().padStart(2, "0")
  const ss = now.getSeconds().toString().padStart(2, "0")
  return `${hh}:${mm}:${ss}`
}

/**
 * @return "145426" for 14h54 26s
 */
const timeFilename = function(Now){
  const now = Now == undefined ? new Date() : new Date(Now)
  const hh = now.getHours().toString().padStart(2, "0")
  const mm = now.getMinutes().toString().padStart(2, "0")
  const ss = now.getSeconds().toString().padStart(2, "0")
  return `${hh}${mm}${ss}`
}

/**
 * @return "20230629" for 06/29/2023
 */
const dateFilename = function(Now){
  const now = Now == undefined ? new Date() : new Date(Now)
  const year = now.getFullYear().toString()
  const month = (now.getMonth()+1).toString().padStart(2, "0")
  const day = now.getDate().toString().padStart(2, "0")
  return `${year}${month}${day}`
}

/**
 * @param Reference timestamp in ms
 * @return "00:15:24" for 15 minutes and 24 seconds
 */
const elapsedTime = function(Reference){
  const chrono = Date.now() - Reference // ms

  let rest = chrono
  const hours = Math.floor(rest / 3600000)
  rest -= hours * 3600000

  const minutes = Math.floor(rest / 60000)
  rest -= minutes * 60000

  const seconds = Math.floor(rest / 1000)

  const hh = hours.toString().padStart(2, "0")
  const mm = minutes.toString().padStart(2, "0")
  const ss = seconds.toString().padStart(2, "0")
  return `${hh}:${mm}:${ss}`
}

//CommonJS style
module.exports = {
  dateFilename,
  elapsedTime,
  time,
  timeFilename,
}
