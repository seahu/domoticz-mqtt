// example howto visualizate temperature from domoticz help by mqtt brouker
// require:
//  1. in domoticz create virtal temperature or use real temerature sensor find his "idx"
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


  	var temperatures=[
  	// type TEXT (change only tex to actual value)
  	{
		"id": "temp_1",		// identification on html page (by attribute id)
		"idx": 18,			// identification number of device in  domoticz system (first column in device table on domotic device list)
		"type": "text",		// type of represantation (text, color, value %, value 100-%, create )
		"status": null,		// place for store last value
	},
	// type COLOR
	{
	  "id": "temp_2", 
	  "idx": 18,
	  "status": null,
	  "type": "color",
	  "style": "color", // CSS atribute who will be changed by actual temperature
	},
	// type VALUE %
	{
	  "id": "temp_3", 
	  "idx": 18,
	  "status": null,
	  "type": "value %",
	  "style": "width", // CSS atribute who will be changed by actual value
	  "min": -20,		// min., max. define range of valid values from domoticz 
	  "max": 150,
	},
	// type VALUE 100-%
	{
	  "id": "temp_4", 
	  "idx": 18,
	  "status": null,
	  "type": "value 100-%",
	  "style": "width", // CSS atribute who will be changed by actual value
	  "min": -20,		// min., max. define range of valid values from domoticz 
	  "max": 150,
	},
	// type CREATE styleX1
	{
	  "id": "temp_5", 
	  "idx": 18,
	  "status": "0",
	  "type": "create",
	  "styleX": "style1", // currently fro styleX is aviable style1 and style2 
	},
	// type CREATE styleX2
	{
	  "id": "temp_6", 
	  "idx": 18,
	  "status": "0",
	  "type": "create",
	  "styleX": "style2",
	},

	// example HOWTO COBINE MORE SETTING TO ONE graphic element
  	// change text by actual value
  	{
		"id": "temp_7",
		"idx": 18,
		"type": "text",
		"status": null,
	},
	// change color by actual temperature value
	{
	  "id": "temp_8", 
	  "idx": 18,
	  "status": null,
	  "type": "color",
	  "style": "background-color", 
	},
	// change size of % by actual temperature value
	{
	  "id": "temp_8", 
	  "idx": 18,
	  "status": null,
	  "type": "value %",
	  "style": "width", 
	  "min": -20,
	  "max": 150,
	},
	];

  	var switchs=[]; // array may be empty bat must exists
  	var setPoints=[]; // array may be empty bat must exists
	var clocks=[]; // array may be empty bat must exists
  	var linestatus=
    {
		"id": "off-on-line",
		"image_on_line": "img/online.png",
		"image_off_line": "img/offline.png",
    };   
