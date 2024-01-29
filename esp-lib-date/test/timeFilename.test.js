const LibDate = require("../dist/esp.lib.date.min.js")

/**
 *
 */
test("timeFilename() should return a length of string equals to 6", () => {
  const str = LibDate.timeFilename()
  expect(str.length).toBe(6)
})


/**
 *
 */
test("timeFilename(1686264128465) should return 004208", () => {
  const str = LibDate.timeFilename(1686264128465)
  expect(str).toBe("004208")
})
