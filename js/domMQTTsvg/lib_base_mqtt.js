/*!
* domMQTTsvg.js - It is additionl library for Domoticz (www.domoticz.com home automation system) and MQTT brouker
* 				who help easy create professional live visualization html page of home automation system.
* @version 1.0.1
* https://svgdotjs.github.io/
*
* @copyright Ing. Ondrej Lycka <info@seahu.cz>
* @license GNU General Public License 
*/;

//debug log
function log_mqtt(message){
	console.log("mqtt: "+message);
}

// BASE MQTT FUNCTION FOR DOMTICZ

  	function refresh(message){
  		refresh_switchs(message);
  		refresh_temperatures(message);
  		refresh_sendPoints(message);
  		refresh_clocks(message);
  	}

	function get_devices_info(devices){
    	log_mqtt("send request for info");
    	$.each(devices, function(i, item) {
  			log_mqtt("name:"+item.id);
  			//{"command": "getdeviceinfo", "idx": 2450 }
  			str_message = "{\"command\": \"getdeviceinfo\", \"idx\":"+item.idx+"}";
			message = new Paho.MQTT.Message(str_message);
			message.destinationName = "domoticz/in";
			client.send(message);
  		});
	}
	
	function get_all_devices_info(){
		log_mqtt("send request for swiths info");
		get_devices_info(switchs);
		log_mqtt("send request for temperatures info");
		get_devices_info(temperatures);
		log_mqtt("send request for setPoints info");
		get_devices_info(setPoints);
		log_mqtt("send request for clocks info");
		get_devices_info(clocks);
	}  
  
	
	function tryConnect(){
		log_mqtt("Tarying connect with optinos:"+JSON.stringify(connection.options));
		if (connectStatus==0) {
			var opt = jQuery.extend(true, {}, connection.options);
			//opt=options;
			//client = new Paho.MQTT.Client("localhost", 8083, "web_" + parseInt(Math.random() * 100, 10));
			client.connect({useSSL: false, onSuccess:onConnect, onFailure:doFail });
			//client.connect(opt);
		}
	}

	// EXAMPLE FROM https://www.cloudmqtt.com/docs-websocket.html
	/*
	var connection = {
		host: "m21.cloudmqtt.com",
		port: 38062,
		options: {
		useSSL: true,
		userName: "fwpaiuuo",
		password: "jPTgaN2J4aWb",
		onSuccess:onConnect,
		onFailure:doFail
	}
	*/
	//--- START OR RECONNECT CONNECTION ----
	connection.options.onSuccess=onConnect;
	connection.options.onFailure=doFail;
  
	var client = new Paho.MQTT.Client(connection.host, connection.port, "web_" + parseInt(Math.random() * 100, 10));
	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;
	//client.connect(options); // connect by function tryConnect who strated by setInterval after load page
	var connectStatus=0;
	var reconnect = setInterval(tryConnect ,1000); // start connection (if problem then repeatly)
	var refresh_timer;  // declare global variable for refresh timer who will be refresh all status all devices (is nessery if breake domoticz)(czech: kdyz spadne domoticz tak porad fungujer mqtt takze prio nabehu javascriptu korekne posle dotazy na aktani stavy, ale poduk domotic nebezi tak se nic nevrati a stav cidel se nezmeni ani pote co domotic nabehne protoze zpravy o zaslani aktualniho stavu jsou davno zahozeny, proto je potreba pravidelne po nejake dobe vse zaktualizovat)


  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
	 log_mqtt("onConnect");
	 connectStatus=1;
	 clearInterval(reconnect); // stop reconect interval
	 log_mqtt("Set refresh timer.");
	 refresh_timer = setInterval(get_all_devices_info ,30000); // set refresh timer
	 $("#"+linestatus.id).attr("src",linestatus.image_on_line); // set online icon
	 //$("#off-on-line").attr("src","img/online.png"); // set online icon
	 // subscribe domoticz topic
    client.subscribe("domoticz/out");
    message = new Paho.MQTT.Message("Hello CloudMQTT");
    message.destinationName = "domoticz/in";
    client.send(message); 
    //get actual info
    get_all_devices_info();
  }

  function doFail(e){
    log_mqtt(e);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      log_mqtt("onConnectionLost:"+responseObject.errorMessage);
      connectStatus=0;
      log_mqtt("Stop refresh timer.");
      clearInterval(refresh_timer); // stop refresh timer
      reconnect = setInterval(tryConnect ,1000); // start reconnect interval
      $("#"+linestatus.id).attr("src",linestatus.image_off_line); // set offline icon 
      set_switchs_offline();
      set_temperatures_offline();
      set_clocks_offline();
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    log_mqtt("onMessageArrived:"+message.payloadString);
    refresh(message.payloadString);
  }


    // prirazeni klikacich funkci k obrazkum at je nemusim zadavat rucne pri jejich definici
    $(document).ready(function(){
    	log_mqtt("Load svg images.");
		load_all_svg_images();
		start_switchs();
		log_mqtt("Start Temperatures, setPoints and switchs.");
		start_temperatures();
		start_setPoints();
		start_getPosition();
		start_clocks();
    	log_mqtt("Start add click events.");
    });
