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
function log_temperatures(message){
	console.log("temperatures: "+message);
}

    /*--------------------------------------------------------------------------------------------------------
     *-------------------------------- TEMPERATURE FUNCTIONS ------------------------------------------------
     *--------------------------------------------------------------------------------------------------------
     */
     
    /*
    * funkce ma mit nastarosti vykresleni teplomeru pomoci vepsanim html kodu do daneho mista
    * daneho tagem <span id="id"></span>
    * tato funkce je volana v okamziku nacteni cele stranky opakovne z funkce start_temperatures() pro 
    * vsechny automaticky tvorene teplomery  
    */
    function temperature_create(id, styleX){
    	style1="\
    		<svg id='svg-"+id+"' xmlns='http://www.w3.org/2000/svg' style='width: 100px; height: 42px' >\
				<clipPath id='shape1'>\
  					<circle id='circle1' r='5' cx='5' cy='5' />\
  					<rect x='4' y='2' rx='1' ry='1' width='38' height='6' />\
  				</clipPath>\
				<clipPath id='shape2'>\
  					<circle id='circle1' r='4' cx='5' cy='5' />\
  					<rect x='5' y='3' rx='1' ry='1' width='36' height='4'  />\
  				</clipPath>\
  				\
				\
				<clipPath id='shape11'>\
  					<circle id='circle1' r='5' cx='5' cy='37' />\
  					<rect x='2' y='0' rx='1' ry='1' width='6' height='38' />\
  				</clipPath>\
				<clipPath id='shape22'>\
  					<circle id='circle1' r='4' cx='5' cy='37' />\
  					<rect x='3' y='1' rx='1' ry='1' width='4' height='36'  />\
  				</clipPath>\
  				\
  				<g>\
	  				<rect width='100%' height='100%' clip-path='url(#shape11)' style='fill: black'/>\
	  				<rect id='"+id+"-color' width='100%' height='100%' clip-path='url(#shape22)' style='fill: red'/>\
	  				<rect id='"+id+"-size' width='100%' height='30%' clip-path='url(#shape22)' style='fill: white'/>\
  				</g>\
  				<text id='"+id+"-text' x='10' y='25' fill='black' font-size='10'>--</text>\
			\
			</svg>\
			";
		style2="\
			<svg id='svg-"+id+"' xmlns='http://www.w3.org/2000/svg' style='width: 40px; height: 40px;' viewBox='0 0 100 100' >\
  				<g>\
  					<polygon points='0,60 100,60 100,10' style='fill:white;stroke:black;stroke-width:1' />\
					<polygon id='"+id+"-color' points='0,60 50,60 50,35' style='fill:red;stroke:black;stroke-width:0'/>\
					<text id='"+id+"-text' x='0' y='18' fill='black' font-size='25'>--</text>\
  				</g>\
			</svg>\
			";
		log_temperatures("----------------------- styleX="+styleX);
		switch(styleX) {
			case "style1":
				$("#"+id).html(style1);
				break;
			case "style2":
				$("#"+id).html(style2);
				break;
			default:
				$("#"+id).html(style1);
		}
    }

    /*
    * funkce ma mit nastarosti aktulalizaci vykresleni teploty teplomeru pomoci upravy atributu jiz exisyujiciho html kodu
    * urceno hlvne pro teplomery definiovane html tagem <span id="id"></span>
    * tato funkce by mela byt volana programem obsluhujici prichozi mqtt zpravy
    * @id - udava html identifikator teplomeru
    * @styleX - nazev pouziteho stylu pro dany teplomer
    * @min, @max - merici rozsah teplomeru 
    */
   function temperature_update(new_value, id, styleX, min, max){
   	new_value=Number(new_value);
   	max=Number(max);
   	min=Number(min);
   	
 		switch(styleX) {
			case "style1":
	 				RGB=get_color_from_therm(new_value);
	 				val=100-get_size_of_value(new_value, min, max);
	 				log_temperatures("$('#"+id+"-size').attr('height',"+val+"'%');");
	 				$("#"+id+"-color").css( 'fill', RGB );
	 				$("#"+id+"-size").attr('height',val+'%');
	 				$("#"+id+"-text").text(new_value+" °C");
	 				log_temperatures("set tetx: "+"#"+id+"-text");
	 				//$("#"+item.name+"-text").textContent="50";
	 				log_temperatures("New height:"+val);
	 				log_temperatures("Oreginal height:"+$("#"+id).height());
	 				break;
			case "style2":
	 				RGB=get_color_from_therm(new_value);
	 				val_w=get_size_of_value(new_value, min, max);
	 				val_h=60-val_w*0.01*50;
	 				log_temperatures("$('#"+id+"-size').attr('height',"+val+"'%');");
	 				$("#"+id+"-color").css( 'fill', RGB );
	 				$("#"+id+"-color").attr('points','0,60 '+val_w+',60 '+val_w+','+val_h);
	 				$("#"+id+"-text").text(new_value+" °C");
	 				log_temperatures("set tetx: "+"#"+id+"-text");
	 				//$("#"+item.name+"-text").textContent="50";
	 				log_temperatures("New height:"+val);
	 				log_temperatures("Oreginal height:"+$("#"+id).height());
	 				break;							
		}
	}	

    

    function refresh_temperatures(message){
    	log_temperatures("refresh temperatures");
    	var s = JSON.parse(message);
    	log_temperatures("idx:"+s.idx);
    	$.each(temperatures, function(i, item) {
    		if ( item.idx==s.idx ) {
	    		log_temperatures("name:"+item.id);
    			log_temperatures("shodne idex:"+item.idx);
    			log_temperatures("New temerature: "+s.svalue1);
    			item.status=s.svalue1;
    			log_temperatures("Temperature type: " + item.type);
    			if ( item.type=="text" ){
    				$("#"+item.id).text(s.svalue1);
    			}    			
    			if ( item.type=="color" ){
    				RGB=get_color_from_therm(s.svalue1);
    				log_temperatures("temerature color: "+RGB);
    				//$("#"+item.name).css( "color", RGB );
    				log_temperatures("New temerature: "+s.svalue1);
    				log_temperatures("New temerature color: "+RGB);
    				$("#"+item.id).css( item.style, RGB );
    			}    			
    			if( item.type=="value %" ){
    				log_temperatures("Value.");
    				console .log("s.svalue1:"+s.svalue1);
    				console .log("Min:"+item.min);    				
    				console .log("Max:"+item.max);
    				val=get_size_of_value(Number(s.svalue1), Number(item.min), Number(item.max));
    				//$("#"+item.name).height(val+'%');
    				//$("#"+item.name).attr('height','val'+'%');
    				$("#"+item.id).css( item.style, val+'%' );
    				//$("#"+item.name).attr('width', val);
    				log_temperatures("New "+item.style+": "+val+"%");
    			}
    			if( item.type=="value 100-%" ){
    				log_temperatures("Height 100-%.");
    				val=100-get_size_of_value(s.svalue1, Number(item.min), Number(item.max));
    				//$("#"+item.name).height(val+'%');
    				//$("#"+item.name).height('20');
    				//$("#"+item.name).attr('height',val+'%');
    				//$("#"+item.name).attr(item.attr,val+'%');
    				$("#"+item.id).css( item.style, val+'%' );
    				log_temperatures("New "+item.style+": "+val);
    				log_temperatures("Oreginal height:"+$("#"+item.name).height());
    			}
    			if( item.type=="create" ){
    				log_temperatures("craete ");
    				min=setIs (item.min, -30);
    				max=setIs (item.max, 90);
    				styleX=setIs (item.styleX, "style1");
    				//if (!isset (item.min)) var min=-30;
					//else var min=item.min;
    				//if (!isset (item.max)) var max=90;
					//else var max=item.max;
    				//if (!isset (item.styleX)) var styleX="style1";
					//else var styleX=item.styleX;
					log_temperatures("--- OK ------ ");
					log_temperatures("styleX="+styleX);
					temperature_update(s.svalue1, item.id, styleX, min, max);
    			}
    		}
		});
    }

    /*
    * funkce z konfigurace teplomery ve tvaru JSON vyhleda a vytvori vsechny teplomery s atribytem type="crete"
    * tato funkce by mela byt zavolana  okamzite po nacteni cele stranky 
    */
    function start_temperatures(){
    	log_temperatures("start create temperatures");
    	$.each(temperatures, function(i, item) {
 			if( item.type=="create" ){
 				log_temperatures("craete ");
 				if (!isset (() => item.min)) var min=-30;
				else var min=item.min;
 				if (!isset (() => item.max)) var max=90;
				else var max=item.max;
 				if (!isset (() => item.styleX)) var styleX="style1";
				else var styleX=item.styleX;
				log_temperatures("--- OK ------ ");
				log_temperatures("styleX="+styleX);
				temperature_create(item.id, styleX);
 			}
		});
    }

	/*
	 * set temperatures to offline status
	 */
    function set_temperatures_offline(){
		log_temperatures("Set temperatures offline");
    	$.each(temperatures, function(i, item) {
			if ( item.type=="text" ){
				log_temperatures("Set temperatures offline - text");
    			$("#"+item.id).text("--");
    		}
    		if ( item.type=="color" ){
				log_temperatures("Set temperatures offline - color");
				$("#"+item.id).css( item.style, "#CECECE" );
    		}
			if( item.type=="value %" ){
					log_temperatures("Set temperatures offline - value %");
    				$("#"+item.id).css( item.style, '0%' );
    		}  			
			if( item.type=="value 100-%" ){
					log_temperatures("Set temperatures offline - value 100-%");
    				$("#"+item.id).css( item.style, '100%' );
    		}
			if ( item.type=="create" ){
				log_temperatures("Set temperatures offline - create");
				if (!isset (() => item.min)) var min=-30;
				else var min=item.min;
				if (!isset (() => item.max)) var max=90;
				else var max=item.max;
				if (!isset (() => item.styleX)) var styleX="style1";
				else var styleX=item.styleX;
				temperature_update(min, item.id, styleX, min, max);
				$("#"+item.id+"-text").text("--°C");
			}
    	});
    }
