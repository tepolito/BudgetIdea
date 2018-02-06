$(function()
{
  let instrument;
  let pianoNotes = {'C6' : 'C6.[mp3|ogg]',
            'C1' : 'C1.[mp3|ogg]',
            'D#1' : 'Ds1.[mp3|ogg]',
            'F#1' : 'Fs1.[mp3|ogg]',
            'A1' : 'A1.[mp3|ogg]',
            'C2' : 'C2.[mp3|ogg]',
            'D#2' : 'Ds2.[mp3|ogg]',
            'F#2' : 'Fs2.[mp3|ogg]',
            'A2' : 'A2.[mp3|ogg]',
            'C3' : 'C3.[mp3|ogg]',
            'D#3' : 'Ds3.[mp3|ogg]',
            'F#3' : 'Fs3.[mp3|ogg]',
            'A3' : 'A3.[mp3|ogg]',
            'C4' : 'C4.[mp3|ogg]',
            'D#4' : 'Ds4.[mp3|ogg]',
            'F#4' : 'Fs4.[mp3|ogg]',
            'A4' : 'A4.[mp3|ogg]',
            'C5' : 'C5.[mp3|ogg]',
            'D#5' : 'Ds5.[mp3|ogg]',
            'F#5' : 'Fs5.[mp3|ogg]',
            'A5' : 'A5.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'D#6' : 'Ds6.[mp3|ogg]',
            'F#6' : 'Fs6.[mp3|ogg]',
            'A6' : 'A6.[mp3|ogg]',
            'C7' : 'C7.[mp3|ogg]',
            'D#7' : 'Ds7.[mp3|ogg]',
            'F#7' : 'Fs7.[mp3|ogg]',
            'A7' : 'A7.[mp3|ogg]',
            'C8' : 'C8.[mp3|ogg]',
        }

	var piano = new Tone.Sampler(pianoNotes, {
            'release' : 1,
            'baseUrl' : './audio/salamander/'
        }).toMaster();

  var synth = new Tone.Synth(pianoNotes, {
            'release' : 1,
            'baseUrl' : './audio/salamander/'
        }).toMaster();

  var memSynth = new Tone.MembraneSynth(pianoNotes, {
            'release' : 1,
            'baseUrl' : './audio/salamander/'
        }).toMaster();
        // GUI //
        var keyboard = Interface.Keyboard();

        var recording = [];

        function playRecord(recording)
        {

          recording.forEach(function(note)
          {
            if(note.attack)
            {

              setTimeout(function()
              {
                instrument = note.instrument

                switch(note.instrument)
                {
                  case 'piano': 
                  piano.triggerAttack(note.key);
                  break;

                  case 'synth': 
                  synth.triggerAttackRelease(note.key, '8n');
                  break;

                  case 'memSynth':
                  memSynth.triggerAttackRelease(note.key, '8n');
                  break;                             
                }
              }, note.time);
            }
            else
            {
              setTimeout(function()
              {
                instrument = note.instrument
                
                switch(note.instrument)
                {
                  case 'piano': 
                  piano.triggerRelease(note.key)
                  break;

                  case 'synth': 
                  synth.triggerAttackRelease(note.key, '8n');
                  break;

                  case 'memSynth': 
                  memSynth.triggerAttackRelease(note.key, '8n');
                  break;                             
                }
              }, note.time);
            }
          })
        }

        /*function playRecord(record_array)
        {
             console.log(record_array);
             if(record_array.length > 0)
             { 
              //console.log('in playrecord record-array is ' + record_array + 'the length is ' + record_array.length);
             let record = record_array.shift();
             //console.log('in playrecord record is ' + record);

             setTimeout(function ()
               {
                  piano.triggerAttack(record.note);
                  //piano.triggerRelease(record.note);
                  console.log(record);
                  playRecord(record_array);
              }, record.attack);
            }
        }

        playRecord(record_array);*/

        $('.songBox').on('click', '.playButton', function (e)
        {
          console.log(this);

          console.log($(this).siblings('.wave'));

          newSong = JSON.parse($(this).siblings('.span-song').text());

         /* var wavesurfer = WaveSurfer.create({container: '.wave', waveColor: 'darkorange'});

          wavesurfer.load('./audio/salamander/A0.mp3');

          wavesurfer.play();*/

          record_array = [];
          record_array = newSong;

          console.log(record_array);

          playRecord(record_array);
        })


});