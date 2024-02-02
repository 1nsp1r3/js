const EventEmitter = require("events")

/**
 * Read a http jpeg stream and emit 'image' event for each image received
 */
class JpegStreamReader extends EventEmitter {
  /**
   *
   */
  constructor(BufferSize){
    super()

    this.bufferSize = BufferSize
    this.initHeaderVars()
    this.initDataVars()
    this.image = null //Buffer
  }

  /**
   *
   */
  initHeaderVars(){
    this.header          = []
    this.headerCompleted = false
    this.contentLength   = 0
  }

  /**
   *
   */
  initDataVars(){
    this.data       = Buffer.allocUnsafe(this.bufferSize)
    this.dataLength = 0
  }

  /**
   *
   */
  getImage(){
    return this.image
  }

  /**
   *
   */
  read(Chunk){
    if (!this.headerCompleted){
      this.readHeaders(Chunk)
    }else{
      this.readImage(Chunk)
    }
  }

  /**
   * 0:
   * 1: --Inspir3
   * 2: Content-Type: image/jpeg
   * 3: Content-Length: 119230
   * 4:
   */
  readHeaders(Chunk){
    const chunk = Chunk.toString()
    //console.log(`'${chunk}'`)
    const lines = chunk.split(/\r\n/)

    for(const line of lines){
      //console.log("line", this.header.length, ":", line)
      this.header.push(line)
    }

    if (this.header.length == 7){
      //console.log("header completed !", this.header)
      this.headerCompleted = true
      this.contentLength = this.header[4].split(": ")[1]
      //console.log("content length: '" + this.contentLength + "'")

      this.initDataVars() //Reset data vars
    }
  }

  /**
   *
   */
  readImage(Chunk){
    Chunk.copy(this.data, this.dataLength)
    this.dataLength += Chunk.byteLength

    if (this.dataLength >= this.contentLength){
      this.image = Buffer.from(this.data, 0, this.dataLength)
      this.emit("image")

      this.initHeaderVars() //Reset header vars
    }
  }
}

//CommonJS style
module.exports = JpegStreamReader
