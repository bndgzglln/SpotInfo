const KEYMAP = ['C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B', 'H'];
const MODE = ['Minor', 'Major'];
const SIGNATURE = ['Leider nicht bekannt', '1/4', '1/2', '3/4', '4/4', '5/4'];
const TRANSLATORMAP = {
  key: function (value)  {
    return 'Tonart: ' + KEYMAP[value];
  },
  mode: function (value)  {
    return 'Modus: ' + MODE[value];
  },
  tempo: function (value) {
    return 'Tempo:' + value + ' BPM';
  },
  time_signature: function (value)  {
    return 'Taktangabe: ' + SIGNATURE[value];
  },
};


var translate = function(spotifyData) {
  var ausgabe = [];

  Object.keys(TRANSLATORMAP).forEach(
    function(key) {

      let translated = TRANSLATORMAP[key];

      if (typeof translated === 'function') {
        translated = translated(spotifyData[key]);
      }
      else {
        translated += ' ' + spotifyData[key];
      }

      ausgabe.push(translated);
    }
  );

  return ausgabe;
};

module.exports = translate;
