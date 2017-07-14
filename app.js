var request = require('request');
var http = require('http');
var curl = require('curlrequest');
var translator = require('./spotifyTranslator');
var Spotify = require('machinepack-spotify');

module.exports = function (link) {
  return new Promise(function(resolve, reject) {

    function loadAudioFeatures (token) {
      var target = {
        url     : 'https://api.spotify.com/v1/audio-features/' + link.split('/').pop(),
        method  : 'GET',
        headers : {
        Authorization : 'Bearer ' + token,
        Accept        : 'application/json',

      }};

      request(target, function(err, res, body) {
        if (err) return reject(err);

          let data = JSON.parse(body);
          resolve(translator(data).join('\n'));
      });
    };

    // Get access token to use with requests to Spotify Web API.
    Spotify.getAccessToken({
    clientId: 'b56a80c949f6434da37b510d377d5bf1',
    clientSecret: '2fe32ecb0dd3427199a4feb842a9804c',
    }).exec({
      // An unexpected error occurred.
      error: reject,
      // OK.
      success: loadAudioFeatures,
    });
});
}
