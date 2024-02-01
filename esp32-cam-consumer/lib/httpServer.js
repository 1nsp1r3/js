const HTTP         = require("http")
const EventEmitter = require("events")
const FS           = require("fs")

/**
 * Write a http jpeg stream
 */
class HttpServer extends EventEmitter {
  /**
   *
   */
  constructor(Port, StreamCallback){
    super()

    this.port           = Port
    this.streamCallback = StreamCallback
  }

  /**
   *
   */
  start(){
    let that = this
    HTTP
      .createServer((Request, Response) => { //Function anonyme intermédiaire pour pouvoir utiliser une méthode d'objet en tant que callback
        that.main(Request, Response)
      })
      .listen(this.port)

    console.log(`Listening on ${this.port}...`)
  }

  /**
   * Main
   */
  async main(Request, Response){
    console.log("Url requested:", Request.url)

    Request.on("close", () => this.emit("close"))
    switch(Request.url){
      case "/stream": await this.streamCallback(Response); break
      case  "/image": this.sendImage(Response)           ; break
      case       "/": this.sendIndex(Response)           ; break
      case   "/exit": process.exit(0)                    ; break
             default: this.send404(Response)
    }
    Response.end()
  }

  /**
   *
   */
  sendImage(Response){
    const data = FS.readFileSync("img/0.jpg")
    Response.writeHead(200, {"Content-Type": "image/jpeg"})
    Response.write(data)
  }

  /**
   *
   */
  sendIndex(Response){
    Response.writeHead(200, {"Content-Type": "text/html"})
    Response.write("<html><body><a href='/stream'>stream</a></body></html>")
  }

  /**
   *
   */
  send404(Response){
    Response.writeHead(404, {"Content-Type": "text/plain"})
    Response.write("404 Not Found\n")
  }
}

//CommonJS style
module.exports = HttpServer
