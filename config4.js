// example howto use additional features as 
// - clocks
// - auto load svg 
// - enable mouse moving html element with show his coordination for easer position html elemen into web page.

// for time from domirequire:
//  1. domoticz
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

	var clocks=[
		{
			"id": "clock1",		// identification on html page (by attribute id)
			"idx": 7,			// identification number of device in  domoticz system, for "relaTime": "yes" is not obligatory
			"styleX": "style1", // currently fro styleX is aviable style1 and style2 
			"type": "create",	// type of represantation
			"realTime": "yes",	// "yes" - show client real time, "no" - show time from domoticz forwarded by text device value in format: hh:mm:ss or hh:mm or hh
		},
		{
			"id": "clock2",
			//"idx": 7,
			"styleX": "style2",
			"type": "create",
			"realTime": "yes",
		}
	];

  	var setPoints=[];		// array may be empty bat must exists
  	var temperatures=[];	// array may be empty bat must exists
  	var switchs=[];			// array may be empty bat must exists
  	var temperatures=[]; 	// array may be empty bat must exists
  	var linestatus=
    {
		"id": "off-on-line",					// id of on/off line image
		"image_on_line": "img/online.png", 		// image for on_line status
		"image_off_line": "img/offline.png",	// image for off_line status
    };   
