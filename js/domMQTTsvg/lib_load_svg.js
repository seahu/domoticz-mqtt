/*
* librray for insert svg images into html as native html
* If svg is part of hlml code will be more easy control from javascript
* than image in separatly file 
*/

/*
* load source code of svg image into place defined by tag div with defined id
* @id is div tag identificator where image will be placed
* @filename is filename nad path to svg image prom brovser perspective
*/
function load_svg(id,filename){
	xhr = new XMLHttpRequest();
	xhr.open("GET",filename,false);
	// Following line is just to be on the safe side;
	// not needed if your server delivers SVG with correct MIME type
	xhr.overrideMimeType("image/svg+xml");
	xhr.send("");
	document.getElementById(id).appendChild(xhr.responseXML.documentElement);
}

/*
* load source code of svg images into html source code 
* svg images will be loaded into div tag with attribute type="svg" and attribute src="path/name.svg"
* example: <div type="svg" src="img/example.svg"></div>
* this function may be call after all page will be loaded
*/
function load_all_svg_images(){
	//nsole.log("Tu jsem");
	$("#pok*").text("ahoj");
	$.each($("[type=svg]"), function(i, item) {
		if ( $(item).attr('src') ) {
			load_svg( $(item).attr('id'),$(item).attr('src') );
			if (isset ($(item).attr('width'))==true) {
				$(item).children().css( "width", $(item).attr('width') );
			}
			if (isset ($(item).attr('height'))==true) {
				$(item).children().css( "height", $(item).attr('height') );
			}
		}
	});
}
