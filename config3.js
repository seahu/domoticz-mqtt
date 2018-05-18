// example howto visualizate setpoint device (e.g. thermostat) from domoticz help by mqtt brouker
// require:
//  1. in domoticz create virtal device or use real device with analog value e.g.: temerature, set point termostat, light sensor sensor,... And find his "idx"
// 		idx you find in domoticz table by menu setup->divices
//  2. domoticz must have set "MQTT Client Gateway with LAN interface" into your MQTT brouker
// 	3. MQTT brouker must support websocket connection.
//
// PS: this use is not limit only for set point devices, can be used for  every domotics device who sending value croos svalue parameter
 

  // Create a client instance
  var connection = {
  	host: "10.10.103.221",		//change to your address mqtt brouker
  	port: 8083,
  	options: {
    useSSL: false,
  	}
  }

  	
  	var setPoints=[
  	// CREATE type, create slider, by this you can change device values
	{
		"id": "sval_1",		// identification on html page (by attribute id)
		"idx": 8,			// identification number of device in  domoticz system (first column in device table on domotic device list)
		"styleX": "style1",	// currently fro styleX is aviable only style1
		"status": "0",		// place for store last value
		"type": "create",	// type
		"min": 0,			// min., max. define range of valid values from domoticz 
		"max": 200,
		"unit": "Watt/m2",	// suffix with unit
		"flay": "off",		// on/off - on->flouly send new values during slider moving (!not recommend!, so slowly) off->send new value after end of slider moving
	},
  	// type TEXT (change only tex to actual value)
  	{
		"id": "sval_2",		
		"idx": 8,			
		"type": "text",		
		"status": null,		
	},
	// type COLOR (but calc value to color is sutable for range -40 to +150)
	{
	  "id": "sval_3", 
	  "idx": 8,
	  "status": null,
	  "type": "color",
	  "style": "color", // CSS atribute who will be changed by actual value
	},
	// type VALUE %
	{
	  "id": "sval_4", 
	  "idx": 8,
	  "status": null,
	  "type": "value %",
	  "style": "width", // CSS atribute who will be changed by actual value
	  "min": -20,		// min., max. define range of valid values from domoticz 
	  "max": 150,
	},
	// type VALUE 100-%
	{
	  "id": "sval_5", 
	  "idx": 8,
	  "status": null,
	  "type": "value 100-%",
	  "style": "width", // CSS atribute who will be changed by actual value
	  "min": -20,		// min., max. define range of valid values from domoticz 
	  "max": 150,
	},
	// type VALUE
	{
	  "id": "sval_6", 
	  "idx": 8,
	  "status": null,
	  "type": "value",
	  "style": "width", // CSS atribute who will be changed by actual value
	  "min": 0,		// min., max. define range of valid values from domoticz 
	  "max": 200,
      "from": 10,		// from, to define corespond range for values use in CSS or attribute value
      "to": 500,
      "unit": "px"		// unit used in CSSor attribute values
	},
	
	// example HOWTO COBINE MORE SETTING TO ONE graphic element
  	// change text by actual value
  	{
		"id": "sval_7",
		"idx": 8,
		"type": "text",
		"status": null,
	},
	// change color by actual temperature value
	{
	  "id": "sval_8", 
	  "idx": 8,
	  "status": null,
	  "type": "color",
	  "style": "background-color", 
	},
	// change size of % by actual temperature value
	{
	  "id": "sval_8", 
	  "idx": 8,
	  "status": null,
	  "type": "value",
	  "style": "width", 
	  "min": 0,
	  "max": 200,
	  "from": 0,
	  "to": 100,
	  "unit": "%"
	},

  	];
  	var temperatures=[];	// array may be empty bat must exists
  	var switchs=[];			// array may be empty bat must exists
  	var temperatures=[]; 	// array may be empty bat must exists
	var clocks=[]; 			// array may be empty bat must exists
  	var linestatus=
    {
		"id": "off-on-line",
		"image_on_line": "img/online.png",
		"image_off_line": "img/offline.png",
    };   
