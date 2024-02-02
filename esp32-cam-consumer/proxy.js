const FS            = require("fs")
const Server        = require("./lib/server.js")
const Client        = require("./lib/client.js")
const Configuration = require("./config.json")

//
// [CAM] -- (http jpeg stream) --> [client] -- (disk) --> [server] -- (http jpeg stream) --> [Navigator]
//

const server = new Server(Configuration.server.port)
server.start()

const client = new Client(Configuration.client.url, Configuration.advanced.bufferSize)

let imageCount = 0
let cron = false

client.on("image", () => {
  const image = client.getImage()
  server.pushImage(image)

  if (cron){
    FS.writeFileSync(imageCount + ".jpg", image)
    imageCount++
    cron = false
  }
})

client.connect() //Start reading

/**
 * CRON engine
 */
setInterval(() => {
  cron = true
}, Configuration.cron.interval)
