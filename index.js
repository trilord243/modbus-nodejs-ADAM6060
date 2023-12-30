var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

const ip = "192.168.1.30";
const port = 502;

const startAddressForInputChannel = 0;
const startAddressForOutputChannel = 16;

const totalDigitalOutputChannels = 6;
const totalDigitalInputChannels = 6;

client
  .connectTCP(ip, { port: port })
  .then(function () {
    console.log("Conectado a %s en el puerto %s", ip, port);

    return client.readCoils(
      startAddressForOutputChannel,
      totalDigitalOutputChannels
    );
  })
  .then(function (data) {
    console.log("Estado actual de los canales de salida:", data.data);

    client.writeCoil(startAddressForOutputChannel, true);
  })
  .then(function () {
    console.log("Relay 0 activado (cerrado)");
    client.close();
  })
  .catch(function (e) {
    console.error(e);
    client.close();
  });
