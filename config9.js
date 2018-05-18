
 

  // Create a client instance
  var connection = {
  	host: "10.10.103.221",
  	port: 8083,
  	options: {
    useSSL: false,
  	}
  }


  	var switchs=[
    {
      "id": "cerpadlo",
      "idx": 1,
      "status": 0,
      "type": "image",
      "image_on": "img/pump_wilo_ON.svg",
      "image_off": "img/pump_wilo_OFF.svg",
      "image_offline": "img/pump_wilo.svg",
    },
    {
      "id": "plynovy_kotel",
      "idx": 5,
      "status": 0,
      "type": "image",
      "image_on": "img/fire.svg",
      "image_off": "img/no_img.svg",
      "image_offline": "img/fire.svg",
    },
    // nastaveni animace trubky vystupu ze solarka
    {
      "id": "path9854",
      "idx": 1,
      "type": "style",
      "style": "stroke-dasharray",
      "value_on": 20,
      "value_off": 0,
      "value_offline": 0,
      "status": null,
    },
    {
      "id": "path9854",
      "idx": 1,
      "type": "animate_stroke",
      "from": 0,
      "to": 80,
      "dur": "1s",
      "status": null,
    },
    // nastaveni animace vstupni trubky do solarka
    {
      "id": "path9835",
      "idx": 1,
      "type": "style",
      "style": "stroke-dasharray",
      "value_on": 20,
      "value_off": 0,
      "value_offline": 0,
      "status": null,
    },
    {
      "id": "path9835",
      "idx": 1,
      "type": "animate_stroke",
      "from": 80,
      "to": 0,
      "dur": "1s",
      "status": null,
    },
    // nastaveni animace vytupni trubky z kotle
    {
      "id": "path9816",
      "idx": 5,
      "type": "style",
      "style": "stroke-dasharray",
      "value_on": 20,
      "value_off": 0,
      "value_offline": 0,
      "status": null,
    },
    {
      "id": "path9816",
      "idx": 5,
      "type": "animate_stroke",
      "from": 0,
      "to": 80,
      "dur": "2s",
      "status": null,
    },
    // nastaveni animace vstupni trubky do kotle
    {
      "id": "path9814",
      "idx": 5,
      "type": "style",
      "style": "stroke-dasharray",
      "value_on": 20,
      "value_off": 0,
      "value_offline": 0,
      "status": null,
    },
    {
      "id": "path9814",
      "idx": 5,
      "type": "animate_stroke",
      "from": 80,
      "to": 0,
      "dur": "2s",
      "status": null,
    },
    ];
    
  	var temperatures=[
   {
      "id": "boiler1",
      "idx": 3,
      "status": "0",
      "type": "create",
      "styleX": "style1"
    },
   {
      "id": "boiler2",
      "idx": 11,
      "status": "0",
      "type": "create",
      "styleX": "style1"
    },
   {
      "id": "panel",
      "idx": 4,
      "status": "0",
      "type": "create",
      "styleX": "style1"
    },
   {
      "id": "path9854",
      "idx": 4,
      "status": "0",
      "type": "color",
      "style": "stroke"
    },
    {
      "id": "path9835",
      "idx": 3,
      "status": "0",
      "type": "color",
      "style": "stroke"
    },
    {
      "id": "stop4109",
      "idx": 3,
      "status": "0",
      "type": "color",
      "style": "stop-color"
    },
    {
      "id": "stop4107",
      "idx": 11,
      "status": "0",
      "type": "color",
      "style": "stop-color"
    }];

  	var setPoints=[

   {
      "id": "setPoint1",
      "idx": 6,
      "styleX": "style1",
      "status": "0",
      "type": "create",
      "min": -30,
      "max": 90,
      "unit": "Kg",
      "flay": "off"
    }];
    //];

  	var linestatus=
    {
    	"name": "off-on-line",
      "image_on": "img/online.png",
      "image_off": "img/offline.png",
    };   

