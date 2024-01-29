import Chart from "chart.js/auto"
import "chartjs-adapter-date-fns"

let chart = null

class Graph {
  /**
   * new Graph(
   *   document.getElementById("graph"),
   *   "Test A",
   *   [
   *     { x: now-(86400000*4), y: 10 },
   *     { x: now-(86400000)  , y: 20 },
   *     { x: now             , y: 15 },
   *   ],
   * )
   */
  constructor(HtmlCanvasElement, Legend, Data){
    const data = Data == undefined ? [] : Data
    this.canvas = HtmlCanvasElement
    this.options = {
      type: "line",
      options: {
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "minute",
              displayFormats: {
                minute: "HH:mm:ss", //dd/LL/yyyy HH:mm:ss
              }
            }
          }
        }
      },
      data: {
        datasets: [{
          label: Legend,
          data,
        }],
      },
    }
    this.chart = new Chart(this.canvas, this.options)
  }

  /**
   * {
   *   x: Date.now(),
   *   y: 10,
   * }
   */
  addData(Data){
    this.chart.data.datasets.forEach((Dataset) => Dataset.data.push(Data))
    this.chart.update()
  }
}

export default Graph
