// example howto visualizate switch from domoticz help by mqtt brouker
// require:
//  1. in domoticz create virtal switch or use real temerature sensor find his "idx"
// 		idx you find in domoticz table by menu setup->divices
//  2. domoticz must have set "MQTT Client Gateway with LAN interface" into your MQTT brouker
// 	3. MQTT brouker must support websocket connection.

 

  // Create a client instance
  var connection = {
  	host: "10.10.103.221",		//change to your address mqtt brouker
  	port: 8083,
  	options: {
    useSSL: false,
  	}
  }


  	var temperatures=[];

  	var switchs=[
  	// active type IMAGE (change only on/off image)
  	// contain image for on,off and off-line status (path to image file can be absolute or relative behand to main html file)
  	{
		"id": "sw_1",		// identification on html page (by attribute id)
		"idx": 16,			// identification number of device in  domoticz system (first column in device table on domotic device list)
		"type": "image",		// type of represantation (text, color, value %, value 100-%, create )
		"image_on": "img/bulb_on.svg",
		"image_off": "img/bulb_off.svg",
		"image_offline": "img/bulb.svg",
		"status": null,		// place for store last value
	},
	// pasive change CSS style by different value for on, off and offline switch status
  	{
		"id": "sw_2",
		"idx": 16,
		"type": "style",
		"style": "width",
		"value_on": "100px",
		"value_off": "50px",
		"value_offline": "10px",
		"status": null,
	},
	// pasive CSS style by different value for on, off and offline switch status
  	{
		"id": "sw_3",
		"idx": 16,
		"type": "animate_stroke",
		"from": "0", // stroke dash offset from
		"to": "40", // stroke dash offset to
		"dur": "2", // duration one cycle of animation
		"status": null,
	},
	// Combine more setting into one graphic element
	// first set some CSS style
	// stroke dash
	{
		"id": "sw_4",
		"idx": 16,
		"type": "style",
		"style": "stroke-dasharray",
		"value_on": 20,
		"value_off": 0,
		"value_offline": 0,
		"status": null,
	},
	// stroke color
	{
		"id": "sw_4",
		"idx": 16,
		"type": "style",
		"style": "stroke",
		"value_on": "green",
		"value_off": "red",
		"value_offline": "black",
		"status": null,
	},
	// stroke width
	{
		"id": "sw_4",
		"idx": 16,
		"type": "style",
		"style": "stroke-width",
		"value_on": 10,
		"value_off": 2,
		"value_offline": 1,
		"status": null,
	},
	//second set animation
  	{
		"id": "sw_4",
		"idx": 16,
		"type": "animate_stroke",
		"from": "0", // stroke dash offset from
		"to": "40", // stroke dash offset to
		"dur": "1", // duration one cycle of animation
		"status": null,
	},
	
	
   	];
  	
  	var temperatures=[]; // array may be empty bat must exists
  	var setPoints=[]; // array may be empty bat must exists
	var clocks=[]; // array may be empty bat must exists
  	var linestatus=
    {
		"id": "off-on-line",
		"image_on_line": "img/online.png",
		"image_off_line": "img/offline.png",
    };   
