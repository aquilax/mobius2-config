var assert = require('chai').assert;
var parser = require('../');

describe('parse', function(){
  it('returns object', function() {
    result = parser.parse('');
    assert.isObject(result);
  });
  it('parses single line', function() {
    var sampleLine = 'Date format=[2];set date format,0:YYYY/MM/DD, 1:DD/MM/YYYY, 2:MM/DD/YYYY';
    var sampleLineObject = [
      {
        type: 'config',
        name: 'Date format',
        value: '2',
        description: 'set date format',
        options: [
          {
            id: '0',
            value: 'YYYY/MM/DD'
          }, {
            id: '1',
            value: 'DD/MM/YYYY'
          }, {
            id: '2',
            value: 'MM/DD/YYYY'
          }
        ]
      }
    ];

    result = parser.parse(sampleLine);
    assert.deepEqual(result, sampleLineObject)
  });

  it('parses first paragraph', function() {
    var sampleParagraph = `Date format=[2];set date format,0:YYYY/MM/DD, 1:DD/MM/YYYY, 2:MM/DD/YYYY
/**Note: "Date time" must be in accordance with the date format specified otherwise unable to set the date**/
Date time=[02/10/2017-18:49:18];date time setting,yyyy/mm/dd-hh:mm:ss,dd/mm/yyyy-hh:mm:ss, mm/dd/yyyy-hh:mm:ss
Modify datetime=[0];date time setting comfirm,0:not set, 1:modify

`
    var sampleParagraphObject = [
      {
        type: 'config',
        name: 'Date format',
        value: '2',
        description: 'set date format',
        options: [
          {
            id: '0',
            value: 'YYYY/MM/DD'
          }, {
            id: '1',
            value: 'DD/MM/YYYY'
          }, {
            id: '2',
            value: 'MM/DD/YYYY'
          }
        ]
      }, {
        type: 'comment',
        value: 'Note: "Date time" must be in accordance with the date format specified otherwise unable to set the date',
      }, {
        type: 'config',
        name: 'Date time',
        value: '02/10/2017-18:49:18',
        description: 'date time setting',
        options: [
          {
            value: 'yyyy/mm/dd-hh:mm:ss',
          }, {
            value: 'dd/mm/yyyy-hh:mm:ss',
          }, {
            value: 'mm/dd/yyyy-hh:mm:ss',
          }
        ]
      }, {
        type: 'config',
        name: 'Modify datetime',
        value: '0',
        description: 'date time setting comfirm',
        options: [
          {
            id: '0',
            value: 'not set'
          }, {
            id: '1',
            value: 'modify'
          }
        ]
      }, {
        type: 'line'
      }
    ];
    result = parser.parse(sampleParagraph);
    for(var i = 0; i < sampleParagraphObject.length; i++) {
      assert.deepEqual(result[i], sampleParagraphObject[i]);
    }
  });
  it('parses the whole config', function() {
    var sampleConfig = `Date format=[2];set date format,0:YYYY/MM/DD, 1:DD/MM/YYYY, 2:MM/DD/YYYY
/**Note: "Date time" must be in accordance with the date format specified otherwise unable to set the date**/
Date time=[02/10/2017-18:49:18];date time setting,yyyy/mm/dd-hh:mm:ss,dd/mm/yyyy-hh:mm:ss, mm/dd/yyyy-hh:mm:ss
Modify datetime=[0];date time setting comfirm,0:not set, 1:modify

Default Mode=[0];set power-on default mode,0:Video Mode 1, 1:Video Mode 2, 2:Photo Mode

VIDEO MODE 1
Movie Resolution=[1];0:1080p,1:720p,2:wvga
Movie Frame Rate=[5];0:120fps,1:60fps,2:30fps,3:100fps,4:50fps,5:25fps ,Note:120fps and 100fps only for 720P and WVGA.
Movie Sound=[3];set movie sound,0:Mute,1:Low,2:Medium,3:High
Movie Cycle time=[3];movie cycle time,0:3 minutes,1:5 minutes,2:10 minutes,3:20 minutes
Movie Loop Recording=[0];set loop recording on or off, 0:off, 1:on
Movie Rotate=[0];set movie rotate,0:No,1:Inverted,2:90 degrees Right,3:90 degrees Left
Movie Time stamp=[1];set date/time stamp on or off,0:off,1:on
Movie Bitstream Algorithm=[0];set video bitstream,constant-bit-rate(CBR) or variable-bit-rate(VBR),0:CBR,1:VBR
Movie quality=[3];set movie quality,0:Highest,1:Higher,2:High,3:Standard,4:Low ,5:Lower,6:Lowest
Movie Codec=[1];set video codec,0:H265 HEVC,1:H264 AVC
Movie WDR =[0];set Wide Dynamic Range,0:Off,1:On

VIDEO MODE 2
Movie Resolution=[1];0:1080p,1:720p,2:wvga
Movie Frame Rate=[5];0:120fps,1:60fps,2:30fps,3:100fps,4:50fps,5:25fps ,Note:120fps and 100fps only for 720P and WVGA.
Movie Sound=[3];set movie sound,0:Mute,1:Low,2:Medium,3:High
Movie Cycle time=[3];movie cycle time,0:3 minutes,1:5 minutes,2:10 minutes,3:20 minutes
Movie Loop Recording=[0];set loop recording on or off, 0:off, 1:on
Movie Rotate=[0];set movie rotate,0:No,1:Inverted,2:90 degrees Right,3:90 degrees Left
Movie Time stamp=[1];set date/time stamp on or off,0:off,1:on
Movie Bitstream Algorithm=[0];set video bitstream,constant-bit-rate(CBR) or variable-bit-rate(VBR),0:CBR,1:VBR
Movie quality=[3];set movie quality,0:Highest,1:Higher,2:High,3:Standard,4:Low ,5:Lower,6:Lowest
Movie Codec=[1];set video codec,0:H265 HEVC,1:H264 AVC
Movie WDR =[0];set Wide Dynamic Range,0:Off,1:On

PHOTO MODE
Photo Mode Capture Size=[0];set photo size,0:1920x1080,1:1280x720,2:848x480
Photo Rotate=[0];set Photo rotate,0:No,1:Inverted,2:90 degrees Right,3:90 degrees Left
Photo Time stamp=[1];set date/time stamp on or off,0:off,1:on
Set Time Lapse Shooting=[0];0:off,1:0.25s,2:0.5s,3:1s,4:2s,5:5s,6:10s,7:30s,8 :60s

System Setting
Auto Power off=[0];set system auto power off time when system pending,0:off,1:30 seconds,2:1 minutes,3:2 minutes
Power off=[0];set system power off time,0:delay,1:fast
Power on=[0];set system power on time,0:delay,1:fast
Auto Record with External Power=[0];set connect with power to start video recording automatically,0:off,1:on
One Power Button to Auto Record=[0];set press power key to start video recording automatically,0:off,1:on
LED=[1];set LED flicker when recording,0:off,1:on
Charge from USB Host=[0];when connecting with USB host, charge camera or not,0:on,1:off
Light frequency=[0];set light source frequency,0:50 HZ,1:60 HZ
TV out=[1];set Tv out,0:NTSC,1:PAL

Motion Detect=[0];set motion detect,0:off,1:on
Motion Detect Timeout=[0];set motion detect timeout,0:5s,1:15s,2:30s,3:60s
Motion Detect Sensitivity=[0];set motion detect Sensitivity,0:high,1:nomal,2:low

Image Quality Setting
Enable Manual AE Lock or AWB Lock = [0]; 0: Not enabled; 1: AE Lock and AWB Lock; 2: AE Lock only; 3: AWB Lock only.
(Long 3 sec. Mode button press required to turn AEL or AWBL on)
White Balance=[0];Set White Balance,0:Auto,1:Sunny,2:Cloudy,3:Tungsten,4:Fluor escent,5:Snow,6:Diving,7:Custom WB1,8:Custom WB2,9:Custom WB3
Sunny(4800-5500K) used for sunny with clear sky(Rgain=484,Ggain=256,Bgain=416);
Cloudy(7000-9000K) used for shade or heavily overcast sky(Rgain=484,Ggain=256,Bgain=341);
Tungsten(2500-3200K) used for Tungsten bulb (or called Incandescent light)(Rgain=332,Ggain=256,Bgain=627);
Fluorescent(3800-4500K) used for fluorescent lamps(Rgain=370,Ggain=256,Bgain=577);
Snow used for snow day(Rgain=476,Ggain=256,Bgain=406)
Diving used for dive water(Rgain=495,Ggain=256,Bgain=368)
Customized White Balance 1 Red Gain=[256],Green Gain=[256],Blue Gain=[256];
Customized White Balance 2 Red Gain=[256],Green Gain=[256],Blue Gain=[256];
Customized White Balance 3 Red Gain=[256],Green Gain=[256],Blue Gain=[256];
Set red ,green,blue gain,256 is 1x gain,value from 100 to 999;

Exposure Value=[0];Exposure compensation,values from -128 to +128,In 1 increments,default value is 0
Exposure Strategy Mode=[0];set exposure strategy mode,0:exposure high light prior,1:exposure low light prior
Exposure Metering=[2];set exposure Metering,0:center weighted,1:center spot,2:multi-spot,3:upper weighted,4:down weighted

Color Effect=[6];Set Color Effect,0:Standard,1:Mono,2:Cool,3:Cooler,4:Warm,5: Warmer,6:Vivid
Contrast=[0];Set Contrast,values from -128 to +128,In 1 increments,default value is 0
Saturation=[10];Set Image Saturation,values from -128 to +128,In 1 increments,default value is 0
Sharpness=[0];Set Image Sharpness,values from -128 to +128,In 1 increments,default value is 0

kernel version:1.0.6
rootfs version:1.10
software version: 2.03
`
    var expected = [
      {
        "type": "config",
        "name": "Date format",
        "value": "2",
        "description": "set date format",
        "options": [
          {
            "id": "0",
            "value": "YYYY/MM/DD"
          },
          {
            "id": "1",
            "value": "DD/MM/YYYY"
          },
          {
            "id": "2",
            "value": "MM/DD/YYYY"
          }
        ]
      },
      {
        "type": "comment",
        "value": "Note: \"Date time\" must be in accordance with the date format specified otherwise unable to set the date"
      },
      {
        "type": "config",
        "name": "Date time",
        "value": "02/10/2017-18:49:18",
        "description": "date time setting",
        "options": [
          {
            "value": "yyyy/mm/dd-hh:mm:ss"
          },
          {
            "value": "dd/mm/yyyy-hh:mm:ss"
          },
          {
            "value": "mm/dd/yyyy-hh:mm:ss"
          }
        ]
      },
      {
        "type": "config",
        "name": "Modify datetime",
        "value": "0",
        "description": "date time setting comfirm",
        "options": [
          {
            "id": "0",
            "value": "not set"
          },
          {
            "id": "1",
            "value": "modify"
          }
        ]
      },
      {
        "type": "line"
      },
      {
        "type": "config",
        "name": "Default Mode",
        "value": "0",
        "description": "set power-on default mode",
        "options": [
          {
            "id": "0",
            "value": "Video Mode 1"
          },
          {
            "id": "1",
            "value": "Video Mode 2"
          },
          {
            "id": "2",
            "value": "Photo Mode"
          }
        ]
      },
      {
        "type": "line"
      },
      {
        "type": "heading",
        "value": "VIDEO MODE 1"
      },
      {
        "type": "config",
        "name": "Movie Resolution",
        "value": "1",
        "description": "0:1080p",
        "options": [
          {
            "id": "1",
            "value": "720p"
          },
          {
            "id": "2",
            "value": "wvga"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Frame Rate",
        "value": "5",
        "description": "0:120fps",
        "options": [
          {
            "id": "1",
            "value": "60fps"
          },
          {
            "id": "2",
            "value": "30fps"
          },
          {
            "id": "3",
            "value": "100fps"
          },
          {
            "id": "4",
            "value": "50fps"
          },
          {
            "id": "5",
            "value": "25fps"
          },
          {
            "id": "Note",
            "value": "120fps and 100fps only for 720P and WVGA."
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Sound",
        "value": "3",
        "description": "set movie sound",
        "options": [
          {
            "id": "0",
            "value": "Mute"
          },
          {
            "id": "1",
            "value": "Low"
          },
          {
            "id": "2",
            "value": "Medium"
          },
          {
            "id": "3",
            "value": "High"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Cycle time",
        "value": "3",
        "description": "movie cycle time",
        "options": [
          {
            "id": "0",
            "value": "3 minutes"
          },
          {
            "id": "1",
            "value": "5 minutes"
          },
          {
            "id": "2",
            "value": "10 minutes"
          },
          {
            "id": "3",
            "value": "20 minutes"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Loop Recording",
        "value": "0",
        "description": "set loop recording on or off",
        "options": [
          {
            "id": "0",
            "value": "off"
          },
          {
            "id": "1",
            "value": "on"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Rotate",
        "value": "0",
        "description": "set movie rotate",
        "options": [
          {
            "id": "0",
            "value": "No"
          },
          {
            "id": "1",
            "value": "Inverted"
          },
          {
            "id": "2",
            "value": "90 degrees Right"
          },
          {
            "id": "3",
            "value": "90 degrees Left"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Time stamp",
        "value": "1",
        "description": "set date/time stamp on or off",
        "options": [
          {
            "id": "0",
            "value": "off"
          },
          {
            "id": "1",
            "value": "on"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Bitstream Algorithm",
        "value": "0",
        "description": "set video bitstream, constant-bit-rate(CBR) or variable-bit-rate(VBR)",
        "options": [
          {
            "id": "0",
            "value": "CBR"
          },
          {
            "id": "1",
            "value": "VBR"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie quality",
        "value": "3",
        "description": "set movie quality",
        "options": [
          {
            "id": "0",
            "value": "Highest"
          },
          {
            "id": "1",
            "value": "Higher"
          },
          {
            "id": "2",
            "value": "High"
          },
          {
            "id": "3",
            "value": "Standard"
          },
          {
            "id": "4",
            "value": "Low"
          },
          {
            "id": "5",
            "value": "Lower"
          },
          {
            "id": "6",
            "value": "Lowest"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Codec",
        "value": "1",
        "description": "set video codec",
        "options": [
          {
            "id": "0",
            "value": "H265 HEVC"
          },
          {
            "id": "1",
            "value": "H264 AVC"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie WDR ",
        "value": "0",
        "description": "set Wide Dynamic Range",
        "options": [
          {
            "id": "0",
            "value": "Off"
          },
          {
            "id": "1",
            "value": "On"
          }
        ]
      },
      {
        "type": "line"
      },
      {
        "type": "heading",
        "value": "VIDEO MODE 2"
      },
      {
        "type": "config",
        "name": "Movie Resolution",
        "value": "1",
        "description": "0:1080p",
        "options": [
          {
            "id": "1",
            "value": "720p"
          },
          {
            "id": "2",
            "value": "wvga"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Frame Rate",
        "value": "5",
        "description": "0:120fps",
        "options": [
          {
            "id": "1",
            "value": "60fps"
          },
          {
            "id": "2",
            "value": "30fps"
          },
          {
            "id": "3",
            "value": "100fps"
          },
          {
            "id": "4",
            "value": "50fps"
          },
          {
            "id": "5",
            "value": "25fps"
          },
          {
            "id": "Note",
            "value": "120fps and 100fps only for 720P and WVGA."
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Sound",
        "value": "3",
        "description": "set movie sound",
        "options": [
          {
            "id": "0",
            "value": "Mute"
          },
          {
            "id": "1",
            "value": "Low"
          },
          {
            "id": "2",
            "value": "Medium"
          },
          {
            "id": "3",
            "value": "High"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Cycle time",
        "value": "3",
        "description": "movie cycle time",
        "options": [
          {
            "id": "0",
            "value": "3 minutes"
          },
          {
            "id": "1",
            "value": "5 minutes"
          },
          {
            "id": "2",
            "value": "10 minutes"
          },
          {
            "id": "3",
            "value": "20 minutes"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Loop Recording",
        "value": "0",
        "description": "set loop recording on or off",
        "options": [
          {
            "id": "0",
            "value": "off"
          },
          {
            "id": "1",
            "value": "on"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Rotate",
        "value": "0",
        "description": "set movie rotate",
        "options": [
          {
            "id": "0",
            "value": "No"
          },
          {
            "id": "1",
            "value": "Inverted"
          },
          {
            "id": "2",
            "value": "90 degrees Right"
          },
          {
            "id": "3",
            "value": "90 degrees Left"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Time stamp",
        "value": "1",
        "description": "set date/time stamp on or off",
        "options": [
          {
            "id": "0",
            "value": "off"
          },
          {
            "id": "1",
            "value": "on"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Bitstream Algorithm",
        "value": "0",
        "description": "set video bitstream, constant-bit-rate(CBR) or variable-bit-rate(VBR)",
        "options": [
          {
            "id": "0",
            "value": "CBR"
          },
          {
            "id": "1",
            "value": "VBR"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie quality",
        "value": "3",
        "description": "set movie quality",
        "options": [
          {
            "id": "0",
            "value": "Highest"
          },
          {
            "id": "1",
            "value": "Higher"
          },
          {
            "id": "2",
            "value": "High"
          },
          {
            "id": "3",
            "value": "Standard"
          },
          {
            "id": "4",
            "value": "Low"
          },
          {
            "id": "5",
            "value": "Lower"
          },
          {
            "id": "6",
            "value": "Lowest"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie Codec",
        "value": "1",
        "description": "set video codec",
        "options": [
          {
            "id": "0",
            "value": "H265 HEVC"
          },
          {
            "id": "1",
            "value": "H264 AVC"
          }
        ]
      },
      {
        "type": "config",
        "name": "Movie WDR ",
        "value": "0",
        "description": "set Wide Dynamic Range",
        "options": [
          {
            "id": "0",
            "value": "Off"
          },
          {
            "id": "1",
            "value": "On"
          }
        ]
      },
      {
        "type": "line"
      },
      {
        "type": "heading",
        "value": "PHOTO MODE"
      },
      {
        "type": "config",
        "name": "Photo Mode Capture Size",
        "value": "0",
        "description": "set photo size",
        "options": [
          {
            "id": "0",
            "value": "1920x1080"
          },
          {
            "id": "1",
            "value": "1280x720"
          },
          {
            "id": "2",
            "value": "848x480"
          }
        ]
      },
      {
        "type": "config",
        "name": "Photo Rotate",
        "value": "0",
        "description": "set Photo rotate",
        "options": [
          {
            "id": "0",
            "value": "No"
          },
          {
            "id": "1",
            "value": "Inverted"
          },
          {
            "id": "2",
            "value": "90 degrees Right"
          },
          {
            "id": "3",
            "value": "90 degrees Left"
          }
        ]
      },
      {
        "type": "config",
        "name": "Photo Time stamp",
        "value": "1",
        "description": "set date/time stamp on or off",
        "options": [
          {
            "id": "0",
            "value": "off"
          },
          {
            "id": "1",
            "value": "on"
          }
        ]
      },
      {
        "type": "config",
        "name": "Set Time Lapse Shooting",
        "value": "0",
        "description": "0:off",
        "options": [
          {
            "id": "1",
            "value": "0.25s"
          },
          {
            "id": "2",
            "value": "0.5s"
          },
          {
            "id": "3",
            "value": "1s"
          },
          {
            "id": "4",
            "value": "2s"
          },
          {
            "id": "5",
            "value": "5s"
          },
          {
            "id": "6",
            "value": "10s"
          },
          {
            "id": "7",
            "value": "30s"
          },
          {
            "id": "8 ",
            "value": "60s"
          }
        ]
      },
      {
        "type": "line"
      },
      {
        "type": "heading",
        "value": "System Setting"
      },
      {
        "type": "config",
        "name": "Auto Power off",
        "value": "0",
        "description": "set system auto power off time when system pending",
        "options": [
          {
            "id": "0",
            "value": "off"
          },
          {
            "id": "1",
            "value": "30 seconds"
          },
          {
            "id": "2",
            "value": "1 minutes"
          },
          {
            "id": "3",
            "value": "2 minutes"
          }
        ]
      },
      {
        "type": "config",
        "name": "Power off",
        "value": "0",
        "description": "set system power off time",
        "options": [
          {
            "id": "0",
            "value": "delay"
          },
          {
            "id": "1",
            "value": "fast"
          }
        ]
      },
      {
        "type": "config",
        "name": "Power on",
        "value": "0",
        "description": "set system power on time",
        "options": [
          {
            "id": "0",
            "value": "delay"
          },
          {
            "id": "1",
            "value": "fast"
          }
        ]
      },
      {
        "type": "config",
        "name": "Auto Record with External Power",
        "value": "0",
        "description": "set connect with power to start video recording automatically",
        "options": [
          {
            "id": "0",
            "value": "off"
          },
          {
            "id": "1",
            "value": "on"
          }
        ]
      },
      {
        "type": "config",
        "name": "One Power Button to Auto Record",
        "value": "0",
        "description": "set press power key to start video recording automatically",
        "options": [
          {
            "id": "0",
            "value": "off"
          },
          {
            "id": "1",
            "value": "on"
          }
        ]
      },
      {
        "type": "config",
        "name": "LED",
        "value": "1",
        "description": "set LED flicker when recording",
        "options": [
          {
            "id": "0",
            "value": "off"
          },
          {
            "id": "1",
            "value": "on"
          }
        ]
      },
      {
        "type": "config",
        "name": "Charge from USB Host",
        "value": "0",
        "description": "when connecting with USB host, charge camera or not",
        "options": [
          {
            "id": "0",
            "value": "on"
          },
          {
            "id": "1",
            "value": "off"
          }
        ]
      },
      {
        "type": "config",
        "name": "Light frequency",
        "value": "0",
        "description": "set light source frequency",
        "options": [
          {
            "id": "0",
            "value": "50 HZ"
          },
          {
            "id": "1",
            "value": "60 HZ"
          }
        ]
      },
      {
        "type": "config",
        "name": "TV out",
        "value": "1",
        "description": "set Tv out",
        "options": [
          {
            "id": "0",
            "value": "NTSC"
          },
          {
            "id": "1",
            "value": "PAL"
          }
        ]
      },
      {
        "type": "line"
      },
      {
        "type": "config",
        "name": "Motion Detect",
        "value": "0",
        "description": "set motion detect",
        "options": [
          {
            "id": "0",
            "value": "off"
          },
          {
            "id": "1",
            "value": "on"
          }
        ]
      },
      {
        "type": "config",
        "name": "Motion Detect Timeout",
        "value": "0",
        "description": "set motion detect timeout",
        "options": [
          {
            "id": "0",
            "value": "5s"
          },
          {
            "id": "1",
            "value": "15s"
          },
          {
            "id": "2",
            "value": "30s"
          },
          {
            "id": "3",
            "value": "60s"
          }
        ]
      },
      {
        "type": "config",
        "name": "Motion Detect Sensitivity",
        "value": "0",
        "description": "set motion detect Sensitivity",
        "options": [
          {
            "id": "0",
            "value": "high"
          },
          {
            "id": "1",
            "value": "nomal"
          },
          {
            "id": "2",
            "value": "low"
          }
        ]
      },
      {
        "type": "line"
      },
      {
        "type": "heading",
        "value": "Image Quality Setting"
      },
      {
        "type": "heading",
        "value": "Enable Manual AE Lock or AWB Lock = [0]; 0: Not enabled; 1: AE Lock and AWB Lock; 2: AE Lock only; 3: AWB Lock only."
      },
      {
        "type": "heading",
        "value": "(Long 3 sec. Mode button press required to turn AEL or AWBL on)"
      },
      {
        "type": "config",
        "name": "White Balance",
        "value": "0",
        "description": "Set White Balance",
        "options": [
          {
            "id": "0",
            "value": "Auto"
          },
          {
            "id": "1",
            "value": "Sunny"
          },
          {
            "id": "2",
            "value": "Cloudy"
          },
          {
            "id": "3",
            "value": "Tungsten"
          },
          {
            "id": "4",
            "value": "Fluor escent"
          },
          {
            "id": "5",
            "value": "Snow"
          },
          {
            "id": "6",
            "value": "Diving"
          },
          {
            "id": "7",
            "value": "Custom WB1"
          },
          {
            "id": "8",
            "value": "Custom WB2"
          },
          {
            "id": "9",
            "value": "Custom WB3"
          }
        ]
      },
      {
        "type": "heading",
        "value": "Sunny(4800-5500K) used for sunny with clear sky(Rgain=484,Ggain=256,Bgain=416);"
      },
      {
        "type": "heading",
        "value": "Cloudy(7000-9000K) used for shade or heavily overcast sky(Rgain=484,Ggain=256,Bgain=341);"
      },
      {
        "type": "heading",
        "value": "Tungsten(2500-3200K) used for Tungsten bulb (or called Incandescent light)(Rgain=332,Ggain=256,Bgain=627);"
      },
      {
        "type": "heading",
        "value": "Fluorescent(3800-4500K) used for fluorescent lamps(Rgain=370,Ggain=256,Bgain=577);"
      },
      {
        "type": "heading",
        "value": "Snow used for snow day(Rgain=476,Ggain=256,Bgain=406)"
      },
      {
        "type": "heading",
        "value": "Diving used for dive water(Rgain=495,Ggain=256,Bgain=368)"
      },
      {
        "type": "balance",
        "value": "NOT IMPLEMENTED",
        "raw": "Customized White Balance 1 Red Gain=[256],Green Gain=[256],Blue Gain=[256];"
      },
      {
        "type": "balance",
        "value": "NOT IMPLEMENTED",
        "raw": "Customized White Balance 2 Red Gain=[256],Green Gain=[256],Blue Gain=[256];"
      },
      {
        "type": "balance",
        "value": "NOT IMPLEMENTED",
        "raw": "Customized White Balance 3 Red Gain=[256],Green Gain=[256],Blue Gain=[256];"
      },
      {
        "type": "heading",
        "value": "Set red ,green,blue gain,256 is 1x gain,value from 100 to 999;"
      },
      {
        "type": "line"
      },
      {
        "type": "config",
        "name": "Exposure Value",
        "value": "0",
        "description": "Exposure compensation,values from -128 to +128,In 1 increments,default value is 0",
        "options": []
      },
      {
        "type": "config",
        "name": "Exposure Strategy Mode",
        "value": "0",
        "description": "set exposure strategy mode",
        "options": [
          {
            "id": "0",
            "value": "exposure high light prior"
          },
          {
            "id": "1",
            "value": "exposure low light prior"
          }
        ]
      },
      {
        "type": "config",
        "name": "Exposure Metering",
        "value": "2",
        "description": "set exposure Metering",
        "options": [
          {
            "id": "0",
            "value": "center weighted"
          },
          {
            "id": "1",
            "value": "center spot"
          },
          {
            "id": "2",
            "value": "multi-spot"
          },
          {
            "id": "3",
            "value": "upper weighted"
          },
          {
            "id": "4",
            "value": "down weighted"
          }
        ]
      },
      {
        "type": "line"
      },
      {
        "type": "config",
        "name": "Color Effect",
        "value": "6",
        "description": "Set Color Effect",
        "options": [
          {
            "id": "0",
            "value": "Standard"
          },
          {
            "id": "1",
            "value": "Mono"
          },
          {
            "id": "2",
            "value": "Cool"
          },
          {
            "id": "3",
            "value": "Cooler"
          },
          {
            "id": "4",
            "value": "Warm"
          },
          {
            "id": "5",
            "value": " Warmer"
          },
          {
            "id": "6",
            "value": "Vivid"
          }
        ]
      },
      {
        "type": "config",
        "name": "Contrast",
        "value": "0",
        "description": "Set Contrast,values from -128 to +128,In 1 increments,default value is 0",
        "options": []
      },
      {
        "type": "config",
        "name": "Saturation",
        "value": "10",
        "description": "Set Image Saturation,values from -128 to +128,In 1 increments,default value is 0",
        "options": []
      },
      {
        "type": "config",
        "name": "Sharpness",
        "value": "0",
        "description": "Set Image Sharpness,values from -128 to +128,In 1 increments,default value is 0",
        "options": []
      },
      {
        "type": "line"
      },
      {
        "type": "version",
        "name": "kernel version",
        "value": "1.0.6"
      },
      {
        "type": "version",
        "name": "rootfs version",
        "value": "1.10"
      },
      {
        "type": "heading",
        "value": "software version: 2.03"
      },
      {
        "type": "line"
      }
    ];
    result = parser.parse(sampleConfig);
    for(var i = 0; i < expected.length; i++) {
      assert.deepEqual(result[i], expected[i]);
    }
  });
});
