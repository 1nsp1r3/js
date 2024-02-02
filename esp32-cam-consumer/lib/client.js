const HTTP             = require("http")
const JpegStreamReader = require("./jpegStreamReader.js")

/**
 * Read a http jpeg stream and emit 'image' event for each image received
 */
class Client extends JpegStreamReader {

  /**
   * Constructor
   */
  constructor(Url, BufferSize){
    super(BufferSize)

    const url = Url.replace("http://", "")
    const pos = url.indexOf("/")
    const part  = url
      .substring(0, pos)
      .split(":")

    this.hostname = part[0]
    this.port     = part[1]
    this.path = url.substring(pos)

    //http://127.0.0.1:8080/stream
    //console.log("hostname:", this.hostname) // 127.0.0.1
    //console.log("port:"    , this.port)     // 8080
    //console.log("path:"    , this.path)     // /stream
  }

  /**
   *
   */
  connect(){
    console.log(`Connecting to ${this.hostname}:${this.port}...`)

    HTTP
      .get({
        hostname: this.hostname,
        port    : this.port,
        path    : this.path,
      }, (Response) => {
        if (Response.statusCode != 200){
          console.error("Status code:", Response.statusCode)
          return
        }
        console.log(`Connecting to ${this.hostname}:${this.port}... OK`)
        Response.on("data", (Chunk) => this.read(Chunk))
      })
  }
}

//CommonJS style
module.exports = Client
