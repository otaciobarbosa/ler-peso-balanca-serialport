var SerialPort = require('serialport');
const express = require('express')
const app = express()

app.get('/', (req, res) => {


		var port = new SerialPort('COM2', {
			baudRate: 9600,
			dataBits: 8,
			stopBits: 1,
			parity: 'none'
		});

		port.write(String.fromCharCode('5'), function (err) {
			if (err) {
				port.close();
				return console.error(err.message);
			}
		});

		port.once('error', function (err) {
			console.error(err.message);
			port.close();
		});

		port.once('data', function (data) {
			if (data != '') {
				var peso = data.toString('utf8').substr(1,7);
				res.json({ peso })
				port.close();
			} else {
				port.close();
				res.json({ "peso":'0.00' });

			}
		});

})

app.listen('3333', () => {
	console.log(`Produto pesado via http://localhost:${3333}`)
});