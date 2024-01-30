const FS          = require("node:fs")
const { orderBy } = require("natural-orderby")

/**
 *
 */
const readDir = async function(Directory){
  return new Promise((Resolve, Reject) => {
    FS.readdir(Directory, (Err, Files) => {
      Resolve(
        orderBy(Files)
      )
    })
  })
}

//CommonJS style
module.exports = {
  readDir,
}
