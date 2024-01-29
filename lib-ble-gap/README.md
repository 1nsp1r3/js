# libblegap
Allow listening BLE advertising from a navigator

## About implentation
This lib use `navigator.bluetooth.requestLEScan()`

An alternativ is possible with `navigator.bluetooth.requestDevice()`

```js
let device = await navigator.bluetooth.requestDevice({
  acceptAllDevices: true,
  optionalServices: [0x1809], //Temperature
})

device.addEventListener('advertisementreceived', (event) => {
  event.serviceData.forEach(dataView => {
    console.log(dataView.getInt8(0))
  })
})

device.watchAdvertisements()
```
