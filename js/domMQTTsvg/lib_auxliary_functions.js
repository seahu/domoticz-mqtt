/*!
* domMQTTsvg.js - It is additionl library for Domoticz (www.domoticz.com home automation system) and MQTT brouker
* 				who help easy create professional live visualization html page of home automation system.
* @version 1.0.1
* https://svgdotjs.github.io/
*
* @copyright Ing. Ondrej Lycka <info@seahu.cz>
* @license GNU General Public License 
*/;

    //--- AUXLIARY FUNCION --------

	/**
	 * Checks to see if a value is set.
	 *
	 * @param {Function} accessor Function that returns our value
	 */
	function isset (accessor) {
	  try {
	    // Note we're seeing if the returned value of our function is not
	    // undefined
	    //return typeof accessor() !== 'undefined'
	    if (typeof(accessor)=="undefined" ) return false
	    else return true
	  } catch (e) {
	    // And we're able to catch the Error it would normally throw for
	    // referencing a property of undefined
	    return false
	  }
	}
	
	
	/**
	 * Funkce ktera vrati prvni parametr pokud je platnou hodnotou nebo vychozi hodnotu 
	 */
	function setIs (accesor, default_value) {
		if (!isset (accesor)) return  default_value;
    	else return accesor;
    }

    // vypocet barvy z teploty
    function get_color_from_therm( therm ){
    	console.log("color for temp:"+ therm);
    	//therm=((therm/1000)+30)*2;
    	//therm=((therm/100)+30)*2;
    	//therm=20;
    	therm=((Number(therm))+30)*2;
    	blue=255-therm;
    	red=0+therm;
    	green=0;
    	if ( blue<0 ) {
    		green=0-blue;
    		red=255;
    	}
    	if (red > 255) {
    		green=green+red-255;
    		red=255;
    	}
    	if ( red < 0 ) red=0;
    	if ( green < 0 ) green=0;
    	if ( blue < 0 ) blue=0;
    	if ( red > 255 ) red=255;
    	if ( green > 255 ) green=255;
    	if ( blue > 255 ) blue=255;
    	//string="#"+Math.floor(red).toString(16)+" "+green.toString(16)+" "+blue.toString(16);
    	//rgb(255, 255, 255)
    	string="rgb("+Math.floor(red)+","+Math.floor(green)+", "+Math.floor(blue)+")";
    	console.log("color:"+ string);
    	return string;
    }    
    
    
    function get_size_of_value(temp, min, max) {
    	return Math.round( (temp-min)/(max-min)*100 );
    } 
