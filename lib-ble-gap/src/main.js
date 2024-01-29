let bluetoothLEScan = null

/**
 * Options: {
 *   name: 'foo',
 * }
 */
const startScanning = async function(Options){
  console.log('Start scanning...')

  const filters = [{
    name: Options.name
  }]

  bluetoothLEScan = await navigator.bluetooth.requestLEScan({
    filters,
    keepRepeatedDevices: true,
  })
  console.log('Start scanning... OK', bluetoothLEScan)
  return bluetoothLEScan
}

const onAdvertisement = function(Callback){
  navigator.bluetooth.addEventListener('advertisementreceived', event => {
    event.serviceData.forEach(dataView => {
      Callback(dataView)
    })
  })
}

/**
 *
 */
const stopScanning = async function(){
  console.log('Stop scanning...')
  bluetoothLEScan.stop()
  console.log('Stop scanning... OK')
}

//CommonJS style
module.exports = {
  startScanning,
  onAdvertisement,
  stopScanning,
}
