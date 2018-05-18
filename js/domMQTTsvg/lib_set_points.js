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
function log_set_points(message){
	console.log("set_points: "+message);
}

    /*--------------------------------------------------------------------------------------------------------
     *-------------------------------- SETPOINTS FUNCTIONS ---------------------------------------------------
     *--------------------------------------------------------------------------------------------------------
     */
     
    /*
    * note in czech language:
    * funkce ma mit nastarosti vykresleni posuvniktka pomoci vepsanim html kodu do daneho mista
    * daneho tagem <span id="idName"></span>
    * tato funkce je volana v okamziku nacteni cele stranky opakovne z funkce start_temperatures() pro 
    * vsechny automaticky tvorene teplomery  
    */
    function setPoint_create(idName, i, unit, flay, v_min, v_max, styleX){
    	style1="\
				<span id='slider_text_"+idName+"'> -- "+unit+" </span><br>\
				<div id='slider_"+idName+"' style='position: relative; top: 0px; left: 0px;'>\
					<svg  id='slider_img_"+idName+"' xmlns='http://www.w3.org/2000/svg' style='width: 130px; height: 40px;' viewBox='0 0 130 40' >\
						<path stroke='black' stroke-width='2' fill='white' d='M 15 2\
							A 13 13 0 0 0 15 28\
							L 115 28\
							A 13 13 0 0 0 115 2\
						Z'>\
					</svg>\
					<div  style='position: absolute; top: -5px; left: 0px; z-index: +1'>\
						<svg id='slider_pointer_"+idName+"' xmlns='http://www.w3.org/2000/svg' style='width: 20px; height: 40px; position: relative;' viewBox='0 0 20 40' >\
							<path stroke='black' stroke-width='2' fill='white' d='M 18,10\
								A 4 4 0 0 0 2 10\
								L 2 30\
								A 4 4 0 0 0 18 30\
								Z\
								M 10 8\
								L 10 32\
							'>\
						</svg>\
					</div>\
				</div>\
			";
		log_set_points("----------------------- styleX="+styleX);
		switch(styleX) {
			case "style1":
				$("#"+idName).html(style1);
		      document.getElementById("slider_pointer_"+idName).isEditable=true; // poznacim si ze se objek prave upravuje (po dobu uprav nebudu reagovat na zmeny pres mqtt)
				break;
			default:
				$("#"+idName).html(style1);

		}
		document.getElementById("slider_pointer_"+idName).onmousedown = function(event) {
			log_set_points("--- posuvnik ------ ");
			//let startX = slider.getBoundingClientRect().left;
			//let shiftX = event.clientX - slider_pointer.getBoundingClientRect().left;
			let startX = $("#slider_"+idName).offset().left;
	      let shiftX = event.clientX -$("#slider_pointer_"+idName).offset().left;
	      let widthX=$("#slider_img_"+idName).width()-$("#slider_pointer_"+idName).width();
	 		let min=v_min;
	 		let max=v_max;
	      document.getElementById("slider_pointer_"+idName).i=i; // uloz si "i" index configuracniho pole setPoints 
	      document.getElementById("slider_pointer_"+idName).isEditable=false; // poznacim si ze se objek prave upravuje (po dobu uprav nebudu reagovat na zmeny pres mqtt)
	      document.getElementById("slider_pointer_"+idName).flay=flay; // pokud je flay="on" tak se posila do mqtt kazda zmena pouvniku, jinak se posila pouze konecna honota posuvniku (po ovolneni tlacitka mysi)
	      

	      moveAt(event.pageX, event.pageY);

	      function moveAt(pageX, pageY) {
	      	pageX=pageX-startX;
				if ((pageX- shiftX) < 0) pageX=shiftX;
	      	if (((pageX- shiftX))>widthX) pageX=shiftX+widthX;
	      	deltaX=pageX-shiftX;
	      	newX=pageX - shiftX + 'px';
				//document.getElementById("slider_pointer_"+idName).style.left = pageX - shiftX + 'px';
				//posuvnik.style.top = pageY - shiftY + 'px';
				//log_set_points("$('#slider_pointer_'"+idName+').css({left: '+newX+'px}););');
				$("#slider_pointer_"+idName).css({left: newX});
				
				//val=procent=Math.round((deltaX/widthX)*100);
				val=Math.round(min + (deltaX/widthX)*(max-min));
				$("#slider_text_"+idName).text(val+" "+unit);
				$("#x").text("startX="+startX+" shiftX="+shiftX+" pageX="+pageX+" event.pageX="+event.pageX+" widthX="+widthX);
				if (document.getElementById("slider_pointer_"+idName).flay=="on") {
					send_new_value(val);
				}

			}

			function send_new_value(val) {
				log_set_points("Click into switch list index:");
				i=document.getElementById("slider_pointer_"+idName).i;
				//log_set_points("Actual status:"+setPoints[i].status);
				str_message = "{ \"idx\" : "+setPoints[i].idx+", \"nvalue\" : 0, \"svalue\" : \""+val+"\" }";
				log_set_points(str_message);
				message = new Paho.MQTT.Message(str_message);
				message.destinationName = "domoticz/in";
				client.send(message); 				
			}
			
		   function onMouseMove(event) {
				moveAt(event.pageX, event.pageY);
	      }

     		document.addEventListener('mousemove', onMouseMove);

			document.onmouseup = function() { //spustu cvasu jsem stratil nat tim mez jsem zjistil ze odebrani eventu musim provest nad celym documnetem a ne nad posovanym objektem, protoze se obcas kurzor posune mimo objekt a to by se potom posovani nikdy neukoncilo
	      	log_set_points("--- posuvnik off------ ");
	      	//endX = slider_pointer.getBoundingClientRect().left;
	      	endX = $("#slider_pointer_"+idName).offset().left;
	      	deltaX=endX-startX;
				widthX=$("#slider_img_"+idName).width()-$("#slider_pointer_"+idName).width();
				//procent=Math.round((deltaX/widthX)*100);
				val=Math.round(min + (deltaX/widthX)*(max-min));
				// poznacim si ze se objek uz neupravuje (tj. povolim reagovat na zmeny pres mqtt)
				document.getElementById("slider_pointer_"+idName).isEditable=true; 
	        
				document.removeEventListener('mousemove', onMouseMove);
				document.getElementById("slider_pointer_"+idName).onmouseup = null;
				
				send_new_value(val);
				
			};

			document.getElementById("slider_pointer_"+idName).ondragstart = function() {
				return false;
			};
		}

    }

    /*
    * funkce ma mit nastarosti aktulalizaci vykresleni posuvniku pomoci upravy atributu jiz exisyujiciho html kodu
    * urceno hlvne pro posuvniky definiovane html tagem <span id="idName"></span>
    * tato funkce by mela byt volana programem obsluhujici prichozi mqtt zpravy
    * @idName - udava html identifikator teplomeru
    * @styleX - nazev pouziteho stylu pro dany teplomer
    * @min, @max - merici rozsah teplomeru 
    */
   function setPoint_update(new_value, idName, unit, styleX, min, max){
   	new_value=Number(new_value);
   	max=Number(max);
   	min=Number(min);
		log_set_points("style:"+styleX);
		log_set_points("idName:"+idName);
		log_set_points("min:"+min);
		log_set_points("max:"+max);
 		switch(styleX) {
			case "style1":
				log_set_points("upravuji style1");
					if (document.getElementById("slider_pointer_"+idName).isEditable!=true) break;
      			//startX = $("#slider_"+idName).offset().left;
      			startX = 0;
      			log_set_points("startX:"+startX);
      			widthX=$("#slider_img_"+idName).width()-$("#slider_pointer_"+idName).width();
					log_set_points("widthX:"+widthX);
					imgX=((new_value-min)/(max-min))*widthX; // spocitani nove X-ove souradnice obrazku posuvniku
					newX=startX+imgX;
					log_set_points("newX:"+newX);
					//slider_pointer.style.left = imgX + 'px'; // posunitu posuvniku
					$("#slider_pointer_"+idName).css({left: newX});
					$("#slider_text_"+idName).text(new_value+" "+unit); // prepsani textu
	 				break;
		}
	}

	/*
	 * funkce 
	 */
    function refresh_sendPoints(message){
    	log_set_points("refresh sendPoints");
    	var s = JSON.parse(message);
    	log_set_points("idx:"+s.idx);
    	$.each(setPoints, function(i, item) {
    		if ( item.idx==s.idx ) {
	    		log_set_points("id:"+item.id);
    			log_set_points("shodne idex:"+item.idx);
    			log_set_points("New setPoint: "+s.svalue1);
    			item.status=s.svalue1;
    			log_set_points("SetPoint type: " + item.type);
    			if ( item.type=="text" ){
    				$("#"+item.id).text(s.svalue1);
    			}    			
    			if ( item.type=="color" ){
    				RGB=get_color_from_therm(s.svalue1);
    				log_set_points("setPoint color: "+RGB);
    				//$("#"+item.name).css( "color", RGB );
    				log_set_points("New setPoint: "+s.svalue1);
    				log_set_points("New setPoint color: "+RGB);
    				$("#"+item.id).css( item.style, RGB );
    			}    			
    			if( item.type=="value %" ){
    				log_set_points("Value.");
    				console .log("s.svalue1:"+s.svalue1);
    				console .log("Min:"+item.min);    				
    				console .log("Max:"+item.max);
    				val=get_size_of_value(Number(s.svalue1), Number(item.min), Number(item.max));
    				//$("#"+item.name).height(val+'%');
    				//$("#"+item.name).attr('height','val'+'%');
    				//$("#"+item.name).attr('width', val);
    				//log_set_points("New height:"+val+"%");
    				$("#"+item.id).css( item.style, val+'%' );
    				log_set_points("New "+item.style+": "+val+"%");
    			}
    			if( item.type=="value 100-%" ){
    				log_set_points("Value 100-%.");
    				val=100-get_size_of_value(s.svalue1, Number(item.min), Number(item.max));
    				//$("#"+item.name).height(val+'%');
    				//$("#"+item.name).height('20');
    				//$("#"+item.name).attr('height',val+'%');
    				//log_set_points("New height:"+val);
    				//log_set_points("Oreginal height:"+$("#"+item.name).height());
    				$("#"+item.id).css( item.style, val+'%' );
    				log_set_points("New "+item.style+": "+val+"%");
    			}
    			if( item.type=="value" ){
    				log_set_points("Value.");
    				var from=Number(setIs ( item.from, 0));
    				var to=Number(setIs ( item.to, 1));
    				var min=Number(setIs ( item.min, from));
    				var max=Number(setIs ( item.max, to));
    				var unit=setIs (item.unit, "");
    				console .log("s.svalue1:"+s.svalue1);
    				console .log("Min:"+min);    				
    				console .log("Max:"+max);
    				console .log("From:"+from);    				
    				console .log("To:"+to);
    				var val=( ( (Number(s.svalue1)-min)/ (max-min) )*(to-from))+from;
    				log_set_points("New value:"+val);
    				if (isset(item.style)) {
						$("#"+item.id).css( item.style, val+unit );
						log_set_points("New "+item.style+": "+val+unit);
					}
					if (isset(item.attr)) {
						$("#"+item.id).attr( item.attr, val+unit );
						log_set_points("New "+item.attr+": "+val+unit);
					}
    			}
    			if( item.type=="create" ){
    				log_set_points("craete ");
    				if (!isset (() => item.min)) var min=0;
					else var min=item.min;
    				if (!isset (() => item.max)) var max=100;
					else var max=item.max;
    				if (!isset (() => item.styleX)) var styleX="style1";
					else var styleX=item.styleX;
					if (!isset (() => item.unit)) var unit="";
					else var unit=item.unit;
					log_set_points("--- OK ------ ");
					log_set_points("styleX="+styleX);
					setPoint_update(s.svalue1, item.id, unit, styleX, min, max);
    			}
    		}
		});
    }




    /*
    * funkce z konfigurace posuvniku ve tvaru JSON vyhleda a vytvori vsechny posuvniky s atribytem type="create"
    * tato funkce by mela byt zavolana  okamzite po nacteni cele stranky 
    */
    function start_setPoints(){
    	log_set_points("start create setPoints");
    	$.each(setPoints, function(i, item) {
 			if( item.type=="create" ){
 				log_set_points("craete ");
 				if (!isset (() => item.idx)) return; // pokud neni zname idx tak polozku ignoruj
 				else var idx=item.idx;
 				if (!isset (() => item.min)) var min=-30;
				else var min=item.min;
 				if (!isset (() => item.max)) var max=90;
				else var max=item.max;
 				if (!isset (() => item.styleX)) var styleX="style1";
				else var styleX=item.styleX;
				if (!isset (() => item.unit)) var unit="";
				else var unit=item.unit;
				if (!isset (() => item.flay)) var flay="no";
				else var flay=item.flay;

				log_set_points("--- OK ------ ");
				log_set_points("styleX="+styleX);
				setPoint_create(item.id, i, unit, flay, min, max, styleX)
 			}
		});
    }

	/*
	 * set setpoints to offline status
	 */
    function set_setPoints_offline(){
		log_set_points("Set setPoints offline");
    	$.each(setPoints, function(i, item) {
			if ( item.type=="text" ){
				log_set_points("Set setPoint offline - text");
    			$("#"+item.id).text("--");
    		}
 			if ( item.type=="color" ){
				log_set_points("Set setPoint offline - color");
				$("#"+item.id).css( item.style, "#CECECE" );
    		}
			if( item.type=="value %" ){
					log_set_points("Set setPoint offline - value %");
    				$("#"+item.id).css( item.style, '0%' );
    		}  			
			if( item.type=="value 100-%" ){
					log_set_points("Set setPoint offline - value 100-%");
    				$("#"+item.id).css( item.style, '100%' );
    		}
			if ( item.type=="create" ){
				log_set_points("Set etPoint offline - create");
 				if (!isset (() => item.idx)) return; // pokud neni zname idx tak polozku ignoruj
 				else var idx=item.idx;
 				if (!isset (() => item.min)) var min=-30;
				else var min=item.min;
 				if (!isset (() => item.max)) var max=90;
				else var max=item.max;
 				if (!isset (() => item.styleX)) var styleX="style1";
				else var styleX=item.styleX;
				if (!isset (() => item.unit)) var unit="";
				else var unit=item.unit;
				if (!isset (() => item.flay)) var flay="no";
				else var flay=item.flay;
				setPoint_update(min, item.id, unit, styleX, min, max)
				$("#"+item.id+"-text").text("--"+unit);
				//$("#"+item.id).find("path").css( "fill", '#CECECE' );
				$("#"+item.id).find("path").attr('fill','#CECECE');
			}
		});    		

	}
