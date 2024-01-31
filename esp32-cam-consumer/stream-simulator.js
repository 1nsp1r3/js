const FS               = require("node:fs")
const HttpServer       = require("./lib/httpServer.js")
const Fs               = require("./lib/fs.js")
const JpegStreamWriter = require("./lib/jpegStreamWriter.js")

const jpegStreamWriter = new JpegStreamWriter()

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
  jpegStreamWriter.writeHeader(Response)

  let i = 0
  const files = await Fs.readDir("img/")
  while(true){
    const data = FS.readFileSync("img/" + files[i])
    jpegStreamWriter.writeImage(data)

    await delay(200)
    i++
    if (i == files.length) i = 0
  }
}

console.log("Listening on 8080...")
const httpServer = new HttpServer(8080, stream)
httpServer.start()
