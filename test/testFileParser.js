var assert = require('chai').assert;
var parser = require('../');

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
});
