const HttpServer       = require("./httpServer.js")
const JpegStreamWriter = require("./jpegStreamWriter.js")

/**
 *
 */
function delay(Time) {
  return new Promise(resolve  => setTimeout(resolve, Time))
}

/**
 * Read a http jpeg stream and emit 'image' event for each image received
 */
class Server extends JpegStreamWriter {

  /**
   * Constructor
   */
  constructor(Port){
    super()

    this.port          = Port
    this.streamingLoop = false
  }

  /**
   *
   */
  async stream(Response){
    console.log("client connected.")

    this.streamingLoop = true
    this.writeHeader(Response)

    while(this.streamingLoop){
      await delay(1000)
    }

    console.log("client disconnected.")
  }


  /**
   *
   */
  start(){
    const that = this
    const httpServer = new HttpServer(this.port, async (Response) => { await that.stream(Response) }) //Function anonyme intermédiaire pour pouvoir utiliser une méthode d'objet en tant que callback
    httpServer.start()

    //Request end of streaming loop when connection is closed
    httpServer.on("close", () => {
      that.streamingLoop = false
    })
  }

  /**
   *
   */
  pushImage(Data){
    if (this.streamingLoop) this.writeImage(Data)
  }
}

//CommonJS style
module.exports = Server
