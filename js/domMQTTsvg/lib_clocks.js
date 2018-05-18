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
function log_clocks(message){
	console.log("clocks: "+message);
}

/*--------------------------------------------------------------------------------------------------------
 *-------------------------------- CLOCK FUNCTIONS ---------------------------------------------------
 *--------------------------------------------------------------------------------------------------------
 */
 
/*
* note in czech language:
* slouzi pro zobrazovani hodin. Toto jsem vytvoril hlavne pro ucely tvorby presentacnich schemat topeni
* kde jsem domonstrativne zrychlil cas a toto zrychleni jse chtel przumne presentovat.
* Typ zarizeni hodiny v domoticzcu nejsou, proto jsou
* hodiny jsou v domoticzu svazane s virtualnim textovym zarizenim.
* Format casu musi byt 24 nebo 24:59 nebo 24:59:59 (hour:min:sec)
* Dlasi moznosti je hodiny vubec nespojovat s domotickem a necha je zobrazovat aktualni cas
* hodiny se umistiji do danaho mista pomoci tagu <div id="idName"> nebo <span id="idName">
* s tim ze idName odkazuje do konfiguracniho souboru sekce clock.
* Po nacteni stranky bude to tohoto mista pomoci javascritpu vepsany potrebne casti pro vykresleni hodin.
*/

/*
 * Funkce ktera vlozi zdrojovy kod vzhledu hodin na clove misto ve webove strance
 * @ idName -  je budouci identifikator hodin ve strance
 * @ i - zatim nema vyznam
 * @ styleX - je nazev pouziteho stylu, zatim jsou k dipozici dva styly hodin style1 a style2
 */
function clock_create(idName, i, styleX){
	style1="\
		<svg id='clock_"+idName+"' viewBox='0 0 100 100px'>\
		  <circle id='clock_face_"+idName+"' class='face_offline' cx='50' cy='50' r='45'/>\
		  <g id='hands'>\
			<rect id='clock_hour_"+idName+"' class='hour' x='47.5' y='12.5' width='5' height='40' rx='2.5' ry='2.55' />\
			<rect id='clock_min_"+idName+"' class='min' x='48.5' y='12.5' width='3' height='40' rx='2' ry='2'/>\
			<line id='clock_sec_"+idName+"' class='sec' x1='50' y1='50' x2='50' y2='16' />\
		  </g>\
		<style>\
			body {\
			  margin: 0;\
			  //background: midnightblue;\
			}\
			#clock-container {\
			  display: inline-block;\
			  position: relative;\
			  width: 20%;\
			  padding-bottom: 100%;\
			  vertical-align: middle;\
			  overflow: hidden;\
			  background: midnightblue;\
			} \
			.face { stroke-width: 2px; stroke: #000; fill: #fff;}\
			.face_offline { stroke-width: 2px; stroke: #000; fill: #CECECE;}\
			.hour, .min, .sec {\
			  stroke-width: 1px;\
			  fill: #333;\
			  stroke: #555;\
			}\
			.sec { stroke: #f55; visibility: hidden; }\
		</style>\
		</svg>\
	";
	style2="\
		<?xml version='1.0' encoding='UTF-8' standalone='no'?>\
		<!-- Created with Inkscape (http://www.inkscape.org/) -->\
		<!-- Modified with Notepad by Erik Baas -->\
		<svg xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' \
		 xmlns:xlink='http://www.w3.org/1999/xlink' version='1.0' \
		 width='101px' height='100px' viewBox='-2 -1 802 801' \
		 id='svg2'>\
		  <defs id='defs4'/>\
		  <g transform='translate(85.7143, -78.0765)' id='layer1' style='display: inline;'>\
			<path d='M 796.16782,429.51929 A 384.03629,372.48679 0 1 1 28.095245,429.51929 A 384.03629,372.48679 0 1 1 796.16782,429.51929 z' transform='matrix(1.04487, 0, 0, 1.07065, -116, 17.5453)' id='path3288' style='overflow: visible; marker: none; opacity: 1; fill: rgb(255, 255, 255); fill-opacity: 1; fill-rule: evenodd; stroke: rgb(0, 0, 0); stroke-width: 0.121965; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0pt; stroke-opacity: 1; visibility: visible; display: inline;'/>\
			<g id='g3180'>\
			  <rect width='13.745957' height='35.259808' x='356.12924' y='88.684883' transform='matrix(0.996096, 0.0882794, -0.0882794, 0.996096, 0, 0)' id='rect2400' style='overflow: visible; marker: none; opacity: 1; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: evenodd; stroke: none; stroke-width: 0.5; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0pt; stroke-opacity: 1; visibility: visible; display: inline;'/>\
			  <rect width='13.74596' height='35.259808' x='402.14154' y='41.126842' transform='matrix(0.97767, 0.210144, -0.210144, 0.97767, 0, 0)' id='rect3172' style='overflow: visible; marker: none; opacity: 1; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: evenodd; stroke: none; stroke-width: 0.5; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0pt; stroke-opacity: 1; visibility: visible; display: inline;'/>\
			  <rect width='13.745959' height='35.259808' x='441.40332' y='-0.64356124' transform='matrix(0.952779, 0.303664, -0.303664, 0.952779, 0, 0)' id='rect3174' style='overflow: visible; marker: none; opacity: 1; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: evenodd; stroke: none; stroke-width: 0.5; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0pt; stroke-opacity: 1; visibility: visible; display: inline;'/>\
			  <rect width='13.74596' height='35.259808' x='472.91574' y='-81.153206' transform='matrix(0.887771, 0.460285, -0.460285, 0.887771, 0, 0)' id='rect3176' style='overflow: visible; marker: none; opacity: 1; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: evenodd; stroke: none; stroke-width: 0.5; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0pt; stroke-opacity: 1; visibility: visible; display: inline;'/>\
			  <rect width='27.705935' height='85.763885' x='498.01544' y='-104.13171' transform='matrix(0.865233, 0.50137, -0.50137, 0.865233, 0, 0)' id='rect3178' style='overflow: visible; marker: none; opacity: 1; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: evenodd; stroke: none; stroke-width: 0.5; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0pt; stroke-opacity: 1; visibility: visible; display: inline;'/>\
			</g>\
			<use transform='matrix(0.862442, 0.506156, -0.506156, 0.862442, 282.195, -98.3657)' id='use3187' x='0' y='0' width='744.09448' height='1052.3622' xlink:href='#g3180'/>\
			<use transform='matrix(-0.0316159, 0.9995, -0.9995, -0.0316159, 807.789, 161.136)' id='use3193' x='0' y='0' width='744.09448' height='1052.3622' xlink:href='#g3180'/>\
			<use transform='matrix(-0.495114, 0.868828, -0.868828, -0.495114, 884.22, 435.129)' id='use3195' x='0' y='0' width='744.09448' height='1052.3622' xlink:href='#g3180'/>\
			<use transform='matrix(0.468833, -0.883287, 0.883287, 0.468833, -246.475, 525.918)' id='use3199' x='0' y='0' width='744.09448' height='1052.3622' xlink:href='#g3180'/>\
			<use transform='matrix(-0.00102917, -0.999999, 0.999999, -0.00102917, -163.621, 795.901)' id='use3201' x='0' y='0' width='744.09448' height='1052.3622' xlink:href='#g3180'/>\
			<g id='g3246'>\
			  <rect width='13.745956' height='35.259808' x='83.825287' y='207.74258' transform='matrix(0.906092, -0.42308, 0.42308, 0.906092, 0, 0)' id='rect3231' style='overflow: visible; marker: none; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: evenodd; stroke: none; stroke-width: 0.5; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0pt; stroke-opacity: 1; visibility: visible; display: inline;'/>\
			  <rect width='13.745959' height='35.259804' x='146.55168' y='192.7778' transform='matrix(0.951256, -0.308404, 0.308404, 0.951256, 0, 0)' id='rect3233' style='overflow: visible; marker: none; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: evenodd; stroke: none; stroke-width: 0.5; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0pt; stroke-opacity: 1; visibility: visible; display: inline;'/>\
			  <rect width='13.745957' height='35.259804' x='201.66933' y='175.0033' transform='matrix(0.976612, -0.215009, 0.215009, 0.976612, 0, 0)' id='rect3235' style='overflow: visible; marker: none; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: evenodd; stroke: none; stroke-width: 0.5; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0pt; stroke-opacity: 1; visibility: visible; display: inline;'/>\
			  <rect width='13.74596' height='35.259808' x='262.70715' y='141.97794' transform='matrix(0.996824, -0.0796395, 0.0796395, 0.996824, 0, 0)' id='rect3237' style='overflow: visible; marker: none; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: evenodd; stroke: none; stroke-width: 0.5; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0pt; stroke-opacity: 1; visibility: visible; display: inline;'/>\
			  <rect width='26.694605' height='106.97702' x='303.15683' y='119.95148' transform='matrix(1, -5.49364e-05, 5.49364e-05, 1, 0, 0)' id='rect3239' style='overflow: visible; marker: none; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: evenodd; stroke: none; stroke-width: 0.5; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0pt; stroke-opacity: 1; visibility: visible; display: inline;'/>\
			</g>\
			<use transform='matrix(0.0228643, 0.999739, -0.999739, 0.0228643, 787.641, 152.916)' id='use3253' x='0' y='0' width='744.09448' height='1052.3622' xlink:href='#g3246'/>\
			<use transform='matrix(-0.999127, 0.041777, -0.041777, -0.999127, 638.761, 938.788)' id='use3255' x='0' y='0' width='744.09448' height='1052.3622' xlink:href='#g3180'/>\
			<use transform='matrix(-1, 0, 0, -1, 630.998, 955.506)' id='use3257' x='0' y='0' width='744.09448' height='1052.3622' xlink:href='#g3246'/>\
			<use transform='matrix(-0.881807, -0.471611, 0.471611, -0.881807, 360.298, 1044.22)' id='use3259' x='0' y='0' width='744.09448' height='1052.3622' xlink:href='#g3180'/>\
			<use transform='matrix(0, -1, 1, 0, -164.928, 795.78)' id='use3261' x='0' y='0' width='744.09448' height='1052.3622' xlink:href='#g3246'/>\
			<path id='clock_hour_"+idName+"' d='m 298.30393,545.1992 35.7654,0.26717 1.33264,-301.29786 -17.59578,-18.80779 -18.5546,20.62006 -0.94766,299.21842 z' style='fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0.5;marker:none;visibility:visible;display:inline;overflow:visible' inkscape:connector-curvature='0' inkscape:transform-center-x='-1.527041' inkscape:transform-center-y='-84.60861'><title id='title3008'>hour</title></path>\
			<path id='clock_min_"+idName+"' d='m 324.77446,560.83356 -24.14806,1.49236 3.36467,-433.06606 15.32723,-12.70704 14.53823,14.30311 -9.08207,429.97763 z' style='fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0.5;marker:none;visibility:visible;display:inline;overflow:visible' inkscape:connector-curvature='0' inkscape:transform-center-x='-0.4495604' inkscape:transform-center-y='-126.87274'><title id='title3010'>min</title></path>\
			<path id='clock_sec_"+idName+"' d='m 322.44231,567.7779 0.37333,-246.46205 c 0.98575,-0.10524 1.95342,-0.22309 2.94425,-0.40065 22.69476,-4.0672 37.81847,-25.82647 33.73923,-48.58861 -3.35021,-18.69411 -18.60863,-32.2797 -36.5264,-34.28178 l 0.15486,-104.54171 -2.62606,-3.84709 -2.99629,3.29903 -2.55413,104.97169 c -1.31442,0.1086 -2.64605,0.28372 -3.97035,0.52105 -22.69477,4.06715 -37.7822,25.85174 -33.70297,48.61385 3.29775,18.40141 18.12408,31.82238 35.67704,34.14827 l -5.96668,246.60725 15.45417,-0.0392 z m -1.4306,-269.28296 c -10.52188,1.88566 -20.59845,-5.10447 -22.47792,-15.59186 -1.87946,-10.48741 5.14803,-20.51102 15.66992,-22.39667 10.5219,-1.88566 20.56219,5.07922 22.44165,15.56662 1.87948,10.4874 -5.11176,20.53627 -15.63365,22.42191 z' style='fill:#a40000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0.5;marker:none;visibility:hidden;display:inline;overflow:visible' inkscape:connector-curvature='0' inkscape:transform-center-x='-2.1510926' inkscape:transform-center-y='-120.74146'><title id='title3012'>sec</title></path>\
		  </g>\
		</svg>\
	";
	switch(styleX) {
		case "style1":
			log_clocks("insert html id: "+idName+" styele: "+styleX)
			$("#"+idName).html(style1);
			break;
		case "style2":
			log_clocks("insert html id: "+idName+" styele: "+styleX)
			$("#"+idName).html(style2);
			break;
		default:
			$("#"+idName).html(style1);
	}
}

/*
 * Funkce ktera aktualizuje vybrane hodiny
 * @ new_value - nova hodnota ve formatu 00 nebo 00:00 nebo 00:00:00
 * @ idName -  identifikuje editivane hodiny
 * @ styleX - je nazev pouziteho stylu, v kazdem stylu je potreba edtpovat jine polozky proto je potreba predat informaci i o pouzitem stylu v hodinach
 */
function clock_update(new_value, idName, styleX){
	new_value=new_value.split(":");
	//postupne podle postu kolne 00 nebo 00:00 nebo 00:00:00 zpracuj hodiny minuty a sekundy
	if (new_value.length==0) return;
	min=0;
	sec=0;
	if (new_value.length>=1) hour=new_value[0];
	if (new_value.length>=2) min=new_value[1];
	if (new_value.length>=3) sec=new_value[2];
	log_clocks("style:"+styleX);
	log_clocks("idName:"+idName);
	log_clocks("new_value:"+new_value);
	log_clocks("hour:"+hour+" min:"+min+" sec:"+sec);
	switch(styleX) {
		case "style1":
			log_clocks("upravuji style1");
			//$("#clock_face_"+idName).attr('fill','#FFFFFF');
			//$("#clock_face_"+idName).attr('stroke-width','2');
			//$("#clock_face_"+idName).attr('stroke','#000000');
			$("#clock_face_"+idName).attr('class','face');
			clock_set(idName,hour, min, sec, styleX);
			break;
		case "style2":
			log_clocks("upravuji style2");
			clock_set(idName,hour, min, sec, styleX);
			break;
	}
}


/*
 * Funkce ktera zpracovava zpravy od domoticku a pokud tam najde zpravu tykajici se hodin tak jej na zaklade toho aktualizauje
 * Funkce je volana z funkce referesh() v lib_base_mqtt.js
 * @ massage - zprava z domoticzku
 */
function refresh_clocks(message){
	log_clocks("refresh analogClocks");
	var s = JSON.parse(message);
	log_clocks("idx:"+s.idx);
	$.each(clocks, function(i, item) {
		if ( item.idx==s.idx ) {
			if ( item.realTime!="yes" ) { // pokud je pozadovan realny cas tak se necte z mqtt zprav
				clock_update(s.svalue1, item.id, item.styleX);
			}
		}
	});
    }


/*
 * Pomocna funkce, ktera aktualizuje stav rucicky hodin
 * @ idName - identfikace rucicky hodin ve webove strance
 * @ deg - stupne na ktere se ma rucicka hodin otocit
 * @ styleX - styl pouzite pro bykreselni hodin (v kazedem stylu je minimalne stred otaceni rucicek jinde, proto je potreba ke kazdemu stylu pristupovat zvlast)
 */
function clock_r(idName, deg, styleX) {
	switch(styleX) {
		case "style1":
			document.getElementById(idName).setAttribute('transform', 'rotate('+ deg +' 50 50)');
			break;
		case "style2":
			document.getElementById(idName).setAttribute('transform', 'rotate('+ deg +' 316 480)');
			break;
	}
}

/*
 * Funkce, ktera nastavi rucicky hodin na zadany cas
 * @ idName - je identifikace hodin na webve strance
 * @ hour, min, sec - je predany cas
 * @ styleX - styl pouzity pro vykresleni hodin (kazdy styl se edituje jinak proto se informace o pouzitem stylu musi predavat)
 */
function clock_set(idName,hour, min, sec, styleX){
  clock_r("clock_sec_"+idName, 6*sec, styleX);
  clock_r("clock_min_"+idName, 6*min, styleX);
  clock_r("clock_hour_"+idName, 30*hour + min/2, styleX);
}

/*
 * Funkce, ktera nastavi casovac hodin a casne zobrazovat aktualni cas podle hodin na klientskem PC
 * Tato funkce se spousti na zaklade konfiguracniho parametru realTime="yes"
 * @ idName - je identifikace hodin na webve strance
 * styleX - styl pouzity pro vykresleni hodin (kazdy styl se edituje jinak proto se informace o pouzitem stylu musi predavat)
 */
function real_Clock_start(idName, styleX){
	setInterval(function() {
		var d = new Date();
		clock_set(idName,d.getHours()%12, d.getMinutes(), d.getSeconds(), styleX);
	}, 1000);
}



/*
* funkce z konfigurace hodin ve tvaru JSON vyhleda a vytvori vsechny hodiny s atribytem type="create"
* tato funkce by mela byt zavolana  okamzite po nacteni cele stranky 
*/
function start_clocks(){
	log_clocks("start create analogClock");
	$.each(clocks, function(i, item) {
		log_clocks("i: "+i+" item: "+item);
		if( item.type=="create" ){
			log_clocks("craete ");
			if (!isset (() => item.idx)) return; // pokud neni zname idx tak polozku ignoruj
			else var idx=item.idx;
			if (!isset (() => item.styleX)) var styleX="style1";
			else var styleX=item.styleX;

			log_clocks("--- OK ------ ");
			log_clocks("styleX="+styleX);
			clock_create(item.id, i, styleX);
			if ( item.realTime=="yes" ) real_Clock_start(item.id, styleX);
		}
	});
}


/*
 * set clocks to offline status
 * Offline clock have another color style than online clock - do this by css style
 * This function is call from lib_base_mqtt.js file
 */
function set_clocks_offline(){
	log_clocks("Set setClocks offline");
	$.each(clocks, function(i, item) {
		if ( item.type=="create" ){
			if ( item.realTime!="yes" ) {
				log_clocks("Set clock offline - create");
				if (!isset (() => item.idx)) return; // pokud neni zname idx tak polozku ignoruj
				else var idx=item.idx;
				if (!isset (() => item.styleX)) var styleX="style1";
				else var styleX=item.styleX;
				
				clock_update("0:0:0", item.id, styleX)
				log_clocks("clock offline - nastaveni sedeho pozadi pro :"+item.id);
				$("#clock_face_"+item.id).attr('class','face_offline');
			}
		}
	});    		

}
