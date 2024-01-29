const HTTP   = require("node:http")
const FS     = require("node:fs")
const Stream = require("stream").Transform

//headers vars
let header          = []
let headerCompleted = false
let contentLength   = 0
//data vars
let data            = new Stream()
let dataLength      = 0

let imageCount = 0

HTTP.get({
  hostname: "192.168.1.20",
  port: 80,
  path: "/stream",
}, (res) => {

  const { statusCode } = res
  if (statusCode != 200){
    console.error("Status code:", statusCode)
    return
  }

  const contentType   = res.headers["content-type"]

  //image/jpeg
  //multipart/x-mixed-replace;boundary=Inspir3
  //console.log("contentType:", contentType)

  let data = new Stream()
  let i = 0
  res.on("data", (Chunk) => {
    if (!headerCompleted){
      readHeaders(Chunk)
    }else{
      readData(Chunk)
    }
  })

  res.on("end", () => {
    console.log("[event] end")
  })
})


/**
 * 0:
 * 1: --Inspir3
 * 2: Content-Type: image/jpeg
 * 3: Content-Length: 119230
 * 4:
 */
function readHeaders(Chunk){
  const chunk = Chunk.toString()
  //console.log(`'${chunk}'`)
  const lines = chunk.split(/\r\n/)

  for(const line of lines){
    //console.log("line", header.length, ":", line)
    header.push(line)
  }

  if (header.length == 7){
    //console.log("header completed !", header)
    headerCompleted = true
    contentLength = header[4].split(": ")[1]
    //console.log("content length: '" + contentLength + "'")

    //Reset data vars
    data       = new Stream()
    dataLength = 0
  }
}

function readData(Chunk){
  data.push(Chunk)
  dataLength += Chunk.byteLength
  if (dataLength >= contentLength){
    console.log("image completed")
    FS.writeFileSync(imageCount + ".jpg", data.read())

    //Reset header vars
    header          = []
    headerCompleted = false
    contentLength   = 0

    imageCount++
  }
}