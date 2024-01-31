const HTTP = require("http")
const FS   = require("node:fs")

/**
 * Write a http jpeg stream
 */
class HttpServer {
  /**
   *
   */
  constructor(Port, StreamCallback){
    this.port           = Port
    this.streamCallback = StreamCallback
  }

  /**
   *
   */
  start(){
    let that = this //On ne peut pas indiquer this.main directement en callback de createServer, obligé de feinter
    HTTP
      .createServer((Request, Response) => {
        that.main(Request, Response)
      })
      .listen(this.port)
  }

  /**
   * Main
   */
  async main(Request, Response){
    console.log("Url requested:", Request.url)
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
    Response.writeHead(200, {"Content-Type": "text/plain"})
    Response.write("Hello World!")
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
