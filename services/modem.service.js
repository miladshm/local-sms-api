// this example app is actually tested by me. So it MUST work if
//  you use a valid phone number as recipient and the same gsm modem as me


//import { Modem } from './lib/modem'; // if you use typescript with nodejs
const Modem = require('modemjs').Modem; // if you prefer to use the standard nodejs' style javascript
var env = require('dotenv').config()



// this config is necessary but will be simplified soon, in the next updates of modem.js
// PS: the msPause of 10000ms is recommended by now to avoid
//  missed delivery reports but are free to try smaller periods

//modem.onReceivedSMS().subscribe(sms => console.log('SMS Received:', sms));
// this observable will log every SMS that your modem receives
let port = process.env.SERIAL_PORT;
let baudRate = parseInt(process.env.BAUD_RATE);
let msPause = parseInt(process.env.MS_PAUSE);
module.exports = {
    send(phoneNumber, text) {
        let modem = new Modem({
            port: port || '/dev/ttyACM0', // change this
            baudRate: baudRate || 115200, // change this
            initCommands: [
                '\u241bAT', 'AT+CMGF=1', 'AT+CNMI=1,1,0,1,0',
                'AT+CNMI=2', 'AT+CSMP=49,167,0,0', 'AT+CPMS=\"SM\",\"SM\",\"SM\"'
            ],
            msPause: msPause || 10000
        });
        console.log(text);
        modem.sendSMS({ phoneNumber, text })
            .subscribe(data => console.log(data));
    }
}

// this funtion will send 'Hi! I\'m a robot!' to '910000000' as a text message / SMS and when
//  the message gets delivered to the recipient, the delivery report will be logged
