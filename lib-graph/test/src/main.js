import Graph from "../../dist/lib.graph.min.mjs"

const now = Date.now()

const test = new Graph(
  document.getElementById("graph"),
  "Test A",
  /*[
    { x: now-86400000*4, y: 10 },
    { x: now-86400000  , y: 20 },
    { x: now           , y: 15 },
  ],*/
)

test.addData({ x: now-86400000*4, y: 30 })
test.addData({ x: now-86400000  , y: 20 })
test.addData({ x: now           , y: 15 })
