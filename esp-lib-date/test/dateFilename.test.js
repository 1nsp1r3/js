const LibDate = require("../dist/esp.lib.date.min.js")

/**
 *
 */
test("dateFilename() should return a length of string equals to 8", () => {
  const str = LibDate.dateFilename()
  expect(str.length).toBe(8)
})


/**
 *
 */
test("dateFilename(1686264128465) should return 20230609", () => {
  const str = LibDate.dateFilename(1686264128465)
  expect(str).toBe("20230609")
})
