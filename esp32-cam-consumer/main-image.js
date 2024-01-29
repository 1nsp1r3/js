const HTTP   = require("node:http")
const FS     = require("node:fs")
const Stream = require("stream").Transform

HTTP.get({
  hostname: "192.168.1.20",
  port: 80,
  path: "/",
}, (res) => {

  const { statusCode } = res
  if (statusCode != 200){
    console.error("Status code:", statusCode)
    return
  }

  const contentType   = res.headers["content-type"]
  const contentLength = res.headers["content-length"]

  //image/jpeg
  //multipart/x-mixed-replace;boundary=Inspir3
  console.log("contentType:", contentType)

  //281502
  console.log("contentLength:", contentLength)

  let data = new Stream()
  res.on("data", (chunk) => {
    //console.log("[event] data")
    data.push(chunk)
  })

  res.on("end", () => {
    console.log("[event] end")
    FS.writeFileSync("test.jpg", data.read())
  })
})

