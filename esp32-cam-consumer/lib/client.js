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
    this.url = Url
  }

  /**
   *
   */
  connect(){
    console.log(`Connecting to ${this.url}...`)

    HTTP
      .get(this.url, (Response) => {
        if (Response.statusCode != 200){
          console.error("Status code:", Response.statusCode)
          return
        }
        console.log(`Connecting to ${this.url}... OK`)
        Response.on("data", (Chunk) => this.read(Chunk))
      })
  }
}

//CommonJS style
module.exports = Client
