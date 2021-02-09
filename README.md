# IVR Sample

This is a simple IVR example demonstrating  how to gather input, retry if invalid (00000 being our invalid entry), and track state to be used in a later part of the call flow.

*Note:* This demo does not implement signature validation which is highly encouraged and demonstrated [here](https://www.twilio.com/docs/usage/tutorials/how-to-secure-your-express-app-by-validating-incoming-twilio-requests). For other best security practices, see [this document](https://www.twilio.com/docs/usage/security).

# Setup

* Clone this repository
* npm install
* npm run start
* start an ngrok tunnel pointed at localhost:3000
* point a Twilio Phone number at https://yourtunnel.ngrok.io/ivr
* Call the number and try the tree
