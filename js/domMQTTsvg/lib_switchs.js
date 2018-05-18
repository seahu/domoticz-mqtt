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
function log_switchs(message){
	console.log("switchs: "+message);
}

// SWITCHS

    function refresh_switchs(message){
    	log_switchs("refresh svithes");
    	var s = JSON.parse(message);
    	var idx=s.idx;
    	var nvalue=s.nvalue;
    	log_switchs("idx:"+idx);
    	$.each(switchs, function(i, item) {
    		if ( item.idx==s.idx ) {
    			log_switchs("id:"+item.id);
    			log_switchs("shodne idex:"+item.idx);
    			item.status=s.nvalue;
    			if ( item.type=="image" ){
					if (s.nvalue==1){
						log_switchs("zapinam obr");
						if ($("#"+item.id).attr("src")!=item.image_on) {
							$("#"+item.id).attr("src",item.image_on);
							//item.status=1;
						}
					}
					else {
						log_switchs("vypinam obr");
						if ($("#"+item.id).attr("src")!=item.image_off) {
							$("#"+item.id).attr("src",item.image_off);
							//item.status=0;
						}
					}
    			}    			
    			if ( item.type=="style" ){
					if (s.nvalue==1){
						log_switchs("ON by css "+item.style+":"+item.value_on);
						$("#"+item.id).css( item.style, item.value_on );
					}
					else {
						log_switchs("OFF by css "+item.style+":"+item.value_off);
						$("#"+item.id).css( item.style, item.value_off );
					}
				}
    			if ( item.type=="animate_stroke"){
					if (s.nvalue==1){
						log_switchs("Animated stroke ON");
						html_element="<animate "+
						"attributeType='CSS' "+
						"attributeName='stroke-dashoffset' "+
						"from="+item.from+" "+
						"to="+item.to+" "+
						"dur="+item.dur+" "+
						"fill='freeze' "+
						"repeatCount='indefinite' />"
						$("#"+item.id).html(html_element);
					}
					else {
						log_switchs("Animated stroke OFF");
						$("#"+item.id).find("animate").remove();
					}
				}
    		}
         //   alert(item.name);
		});
    }

	// click = send nee message to MQTT
	function click_switch(i){
		log_switchs("Click into switch list index:"+i);
		log_switchs("Actual status:"+switchs[i].status);
		if (switchs[i].status==0){
			str_message = "{ \"idx\" : "+switchs[i].idx+", \"nvalue\" : 1, \"svalue\" : \"0\" }";
		}
		else {
			str_message = "{ \"idx\" : "+switchs[i].idx+", \"nvalue\" : 0, \"svalue\" : \"0\" }";
		}
		log_switchs(str_message);
		message = new Paho.MQTT.Message(str_message);
		message.destinationName = "domoticz/in";
		client.send(message); 
	}    

	/*
	 * ini switch by config switchs array
	 */
    function start_switchs(){
		log_switchs("Start add switchs");
    	$.each(switchs, function(i, item) {
			if ( item.type=="image" ){
				log_switchs("Add click event into:"+item.name);
				$("#"+item.id).attr('onClick', 'click_switch('+i+');');
				//$("#"+item.name).click(click_switch(i));
			}
    	});
    }

	/*
	 * set switch to offline status
	 */
    function set_switchs_offline(){
		log_switchs("Set switchs offline");
    	$.each(switchs, function(i, item) {
			if ( item.type=="image" ){
				$("#"+item.id).attr("src",item.image_offline);
			}
			if ( item.type=="style" ){
				$("#"+item.id).css( item.style, item.value_offline );
			}
			if ( item.type=="animate_stroke"){
				$("#"+item.id).find("animate").remove();
			}
    	});
    }
