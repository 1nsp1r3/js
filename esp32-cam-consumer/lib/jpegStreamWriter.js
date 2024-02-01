const MULTIPART_BOUNDARY = "Inspir3"
const          MULTIPART = "multipart/x-mixed-replace;boundary=" + MULTIPART_BOUNDARY

/**
 * Write a http jpeg stream
 */
class JpegStreamWriter {
  /**
   *
   */
  constructor(){
    this.response = null
  }

  /**
   * Content-Type: multipart/x-mixed-replace;boundary=Inspir3
   */
  writeHeader(Response){
    this.response = Response
    this.response.writeHead(200, {"Content-Type": MULTIPART})
  }

  /**
   *
   * --Inspir3
   * Content-Type: image/jpeg
   * Content-Length: 119230
   *
   * [data...]
   */
  writeImage(Data){
    this.response.write("\r\n--" + MULTIPART_BOUNDARY + "\r\n")
    this.response.write("Content-Type: image/jpeg")
    this.response.write("Content-Length: " + Data.length + "\r\n\r\n")
    this.response.write(Data)
  }

}

//CommonJS style
module.exports = JpegStreamWriter
