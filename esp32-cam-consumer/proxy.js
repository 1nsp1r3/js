const HTTP             = require("node:http")
const FS               = require("node:fs")
const HttpServer       = require("./lib/httpServer.js")
const JpegStreamReader = require("./lib/jpegStreamReader.js")
const JpegStreamWriter = require("./lib/jpegStreamWriter.js")

let   jpegStreamReader = null
const jpegStreamWriter = new JpegStreamWriter()

let clientConnected = false

var onImage = function(Data){
  //console.log("new image !")
  //FS.writeFileSync(jpegStreamReader.imageCount + ".jpg", Data)

  if (clientConnected) jpegStreamWriter.writeImage(Data)
}

jpegStreamReader = new JpegStreamReader(onImage)

/**
 *
 */
function delay(Time) {
  return new Promise(resolve  => setTimeout(resolve, Time))
}

/**
 *
 */
async function stream(Response){
  console.log("client connected.")
  clientConnected = true
  jpegStreamWriter.writeHeader(Response)

  while(true){
    await delay(1000)
  }
}

console.log("Listening on 8081...")
const httpServer = new HttpServer(8081, stream)
httpServer.start()

console.log("client init... OK")
HTTP
  .get({
    hostname: "127.0.0.1",
    //hostname: "192.168.1.20",
    //port: 80,
    port: 8080,
    path: "/stream",
  }, (Response) => {
    if (Response.statusCode != 200){
      console.error("Status code:", Response.statusCode)
      return
    }

    Response.on("data", (Chunk) => jpegStreamReader.read(Chunk))
    Response.on("end", () => console.log("[event] end"))
  })
