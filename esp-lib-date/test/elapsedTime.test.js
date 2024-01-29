const LibDate = require("../dist/esp.lib.date.min.js")

/**
 *
 */
test("elapsedTime() should return 00:00:00 if no elapsedTime", () => {
  const str = LibDate.elapsedTime(Date.now())
  expect(str).toBe("00:00:00")
})

/**
 *
 */
test("elapsedTime() should return 00:00:01 if elapsed time = 1s", () => {
  const str = LibDate.elapsedTime(Date.now()-1000)
  expect(str).toBe("00:00:01")
})

/**
 *
 */
test("elapsedTime() should return 00:01:00 if elapsed time = 60s", () => {
  const str = LibDate.elapsedTime(Date.now()-60000)
  expect(str).toBe("00:01:00")
})

/**
 *
 */
test("elapsedTime() should return 01:00:00 if elapsed time = 3600s", () => {
  const str = LibDate.elapsedTime(Date.now()-3600000)
  expect(str).toBe("01:00:00")
})
