const FS               = require("node:fs")
const HttpServer       = require("./lib/httpServer.js")
const Fs               = require("./lib/fs.js")
const JpegStreamWriter = require("./lib/jpegStreamWriter.js")

const jpegStreamWriter = new JpegStreamWriter()

let streamingLoop = false

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
  streamingLoop = true
  jpegStreamWriter.writeHeader(Response)

  let i = 0
  const files = await Fs.readDir("img/")
  while(streamingLoop){
    jpegStreamWriter.writeImage(
      FS.readFileSync("img/" + files[i])
    )

    await delay(200)
    i++
    if (i == files.length) i = 0
  }
}

console.log("Listening on 8080...")
const httpServer = new HttpServer(8080, stream)

/**
 * Request end of streaming loop when another request occure
 */
httpServer.on("url", () => {
  streamingLoop = false
})

httpServer.start()
