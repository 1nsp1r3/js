const Stream = require("stream").Transform

/**
 * Read a http jpeg stream
 * And save each frame to the disk
 */
class JpegStreamReader {
  /**
   *
   */
  constructor(Callback){
    //headers vars
    this.header          = []
    this.headerCompleted = false
    this.contentLength   = 0
    //data vars
    this.data            = new Stream()
    this.dataLength      = 0
    this.imageCount      = 0
    this.callback        = Callback
  }


  /**
   *
   */
  read(Chunk){
    if (!this.headerCompleted){
      this.#readHeaders(Chunk)
    }else{
      this.#readImage(Chunk)
    }
  }

  /**
   * 0:
   * 1: --Inspir3
   * 2: Content-Type: image/jpeg
   * 3: Content-Length: 119230
   * 4:
   */
  #readHeaders(Chunk){
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

      //Reset data vars
      this.data       = new Stream()
      this.dataLength = 0
    }
  }

  /**
   *
   */
  #readImage(Chunk){
    this.data.push(Chunk)
    this.dataLength += Chunk.byteLength
    if (this.dataLength >= this.contentLength){
      this.callback(this.data.read())

      //Reset header vars
      this.header          = []
      this.headerCompleted = false
      this.contentLength   = 0

      this.imageCount++
    }
  }
}

//CommonJS style
module.exports = JpegStreamReader
