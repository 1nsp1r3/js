const HTTP = require("http")
const FS   = require("node:fs")
const Fs   = require("./lib/fs.js")

const MULTIPART_BOUNDARY = "Inspir3"
const          MULTIPART = "multipart/x-mixed-replace;boundary=" + MULTIPART_BOUNDARY

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
  Response.writeHead(200, {"Content-Type": MULTIPART})

  let i = 0
  const files = await Fs.readDir("img/")
  while(true){
    const data = FS.readFileSync("img/" + files[i])
    Response.write("\r\n--" + MULTIPART_BOUNDARY + "\r\n")
    Response.write("Content-Type: image/jpeg\r\n")
    Response.write("Content-Length: " + data.length + "\r\n\r\n")
    Response.write(data)

    await delay(200)
    i++
    if (i == files.length) i = 0
  }
}

/**
 *
 */
function sendImage(Response){
  const data = FS.readFileSync("img/0.jpg")
  Response.writeHead(200, {"Content-Type": "image/jpeg"})
  Response.write(data)
}

/**
 *
 */
function sendIndex(Response){
  Response.writeHead(200, {"Content-Type": "text/plain"})
  Response.write("Hello World!")
}

/**
 *
 */
function send404(Response){
  Response.writeHead(404, {"Content-Type": "text/plain"})
  Response.write("404 Not Found\n")
}

/**
 * Main
 */
async function main(Request, Response){
  console.log("Url requested:", Request.url)

  switch(Request.url){
    case "/stream":    await stream(Response); break
    case  "/image": sendImage(Response); break
    case       "/": sendIndex(Response); break
    case   "/exit":     process.exit(0); break
           default:   send404(Response)
  }
  Response.end()
}

HTTP.createServer(main)
  .listen(8080)
