const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();

// allows us to track temporary state simulating a database
const fakeDB = {};

app.use(express.urlencoded({extended: true}));

app.all('/ivr', (request, response) => {
   const twiml = new VoiceResponse();

   const gather = twiml.gather({
      numDigits: 5,
      timeout: 30,
      action: '/gather_result'
   });

   // The retry flag is set, so we can differentiate our response.. we could also pass
   // a counter to track how many retries
   if (request.query.retry) {
      gather.say('let\'s try again');
   }

   gather.say('Please enter your 5 digit code');

   response.type('text/xml');
   response.send(twiml.toString());
});

app.all('/gather_result', (request, response) => {
   const twiml = new VoiceResponse();

   if (request.body.Digits === '00000') {
      twiml.say('those digits are invalid');
      twiml.redirect('/ivr?retry=true');
   } else {
      twiml.say('thanks for your digits: ' + request.body.Digits);
      fakeDB[request.body.CallSid] = {
         initialDigits: request.body.Digits,
      };

      const gather = twiml.gather({
         action: '/extra_digits',
         timeout: 30,
         numDigits: 2,
      });
      gather.say('what\'s your favorite two digit number');
   }

   response.type('text/xml');
   response.send(twiml.toString());
});

app.post('/extra_digits', (request, response) => {
   const twiml = new VoiceResponse();
   twiml.say(`the first digits were ${fakeDB[request.body.CallSid].initialDigits}`);
   twiml.say(`your favorite number is ${request.body.Digits}. Goodbye!`);

   response.type('text/xml');
   response.send(twiml.toString());
});

app.listen(3000, () => {
   console.log('Demo IVR listening on port 3000');
});
