var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var cfenv = require('cfenv');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
    
var appEnv = cfenv.getAppEnv();

var router = express.Router();

var text_to_speech = new TextToSpeechV1 ({
  "url": "https://stream.watsonplatform.net/text-to-speech/api",
  "username": "4949913b-e7e4-472a-88ac-ed71183efb6e",
  "password": "BLwZgt3VhQmO"
});

function textToSpeech(params, res) {
  text_to_speech.synthesize(params).on('error', function(error) {
    console.log('Error:', error);
  })
  .pipe(fs.createWriteStream('retornotts.wav'))
  .on('finish', function () { getFile(res); });
}

function getFile(res) {  
  var file = __dirname + '/retornotts.wav';

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
}

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/ttspeech', function(req, res){

  var params = {
    "text": req.query.text,
    "voice": req.query.voice,
    "accept": req.query.accept
  } 

  textToSpeech(params, res);
});

app.get('/voices', function(req, res){
  text_to_speech.voices(null, function(error, voices) {
    if (error)
      res.write(error);
    else
      res.write(JSON.stringify(voices, null, 2));
  });
});

app.listen(appEnv.port, appEnv.bind, function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});