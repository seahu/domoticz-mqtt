/*!
* domMQTTsvg.js - It is additionl library for Domoticz (www.domoticz.com home automation system) and MQTT brouker
* 				who help easy create professional live visualization html page of home automation system.
* @version 1.0.1
* https://svgdotjs.github.io/
*
* @copyright Ing. Ondrej Lycka <info@seahu.cz>
* @license GNU General Public License 
*/;

    /*--------------------------------------------------------------------------------------------------------
     *-------------------------------- GET POSITIN FUNCTIONS ---------------------------------------------------
     *--------------------------------------------------------------------------------------------------------
     */
     
    /*
     * note in czech language:
     * tato funkce ma mit na strarosti upravu html tagu s id="idName" tak aby reagovala na onmoudedown
     * a nasledne pousovala svuj podobjekt zaroven s myskou a ukazovala souradnice na kterych se objek aktualni nachazi
     * to proto, abych mnel nejaky nastroj pomoci ktereho zjistim souradnice umisteni prvku do obrazku se schematem do ktereho chi prvek graficky zakomponovat
     * posuvatelne budou vsechny objekty s atribute setLocation='yes' a protoze dovnitr tohoto atributu vkladam text
     * je dobre aby byl uzavreny v tagu <div>.
     * Take je vice nez vhodne aby hlavni obrazek byl umisten take v divu s nastavenym stylem position:relative
     * a vsechny ostatni obrazky umisteny take v tomto divu. Napr.:
     * <div style='position: relative;'>
     * 	<img src="hlavni_obr_schematu">
     * 	<div setLocation='yes' style='position: absolute; left: 0px(hodnotu_pozdeji_upravit); top:0px(hodnotu_pozdeji_upravit)' >
     * 		<img src="posouvany_obrazek">
     * 	</div>
     * </div>
     */
    function setGetPosition(item){
		console.log("--- pridavam get point down event ------ "+$(item).attr('id'));
		
		//console.log("seGetPositin: "+idName);
		//document.getElementById(idName).onmousedown = function(event) {
		$(item).mousedown ( function(event) {
			console.log("--- pridavam get point events ------ ");
			let iitem=item;
			let startRX = $(item).position().left;
			let startRY = $(item).position().top;
			let shiftX = event.pageX -$(item).position().left;
			let shiftY = event.pageY -$(item).position().top;

			//if ($(item).find("div.get_position").length == 0){
			if ($(item).find("div.get_position").length == 0){
				$(item).append( "<div class='get_position'></div>");
			}
	      
		   function onMouseMove(event) {
				RnewX = Math.round(event.pageX-shiftX);
				RnewY = Math.round(event.pageY-shiftY);
				
				newX = RnewX + 'px';
				newY = RnewY + 'px';

				$(iitem).css({left: newX});
				$(iitem).css({top: newY});
				$(iitem).find("div.get_position").text("left: "+RnewX+"px; top: "+RnewY+"px");
				
				
	      }

     		document.addEventListener('mousemove', onMouseMove);

			document.onmouseup = function() { //spustu cvasu jsem stratil nat tim mez jsem zjistil ze odebrani eventu musim provest nad celym documnetem a ne nad posovanym objektem, protoze se obcas kurzor posune mimo objekt a to by se potom posovani nikdy neukoncilo
				console.log("--- posuvnik off------ ");
				document.removeEventListener('mousemove', onMouseMove);
				//document.getElementById(idName).onmouseup = null;
				$(iitem).mousedown ( null);
			};
		
			//document.getElementById(idName).ondragstart = function() {
			$(iitem)[0].ondragstart = function() {
				return false;
			};
		});

    }




    /*
    * funkce z konfigurace posuvniku ve tvaru JSON vyhleda a vytvori vsechny posuvniky s atribytem type="create"
    * tato funkce by mela byt zavolana  okamzite po nacteni cele stranky 
    */
    function start_getPosition(){
    	console.log("--- start get Location ----");
    	$("[setLocation='yes']").each(function(i, item) {
				var idName = $(item).attr("id");
				console.log("--- SET POINT ------ ");
				setGetPosition(item);
				//setPoint_create(item.name, i, unit, flay, min, max, styleX)
		});
    }

