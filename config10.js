
 

  // Create a client instance
  var connection = {
  	host: "10.10.103.221",
  	//host: "localhost",
  	port: 8083,
  	options: {
    useSSL: false,
  	}
  }


  	var switchs=[
    {
      "id": "body",
      "idx": 10,
      "type": "style",
      "style": "background-image",
      "value_on": "url('img/background_DAY.svg')",
      "value_off": "url('img/background_NIGHT.svg')",
      "value_offline": "url('img/background_DAY.svg')",
      "status": null,
    },
    {
      "id": "cerpadlo",
      "idx": 1,
      "status": 0,
      "type": "image",
      "image_on": "img/pump_grunfos_ON.svg",
      "image_off": "img/pump_grunfos_OFF.svg",
      "image_offline": "img/pump_grunfos.svg",
    },
    {
      "id": "cerpadlo_cirkuace",
      "idx": 16,
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
    {
      "id": "moon",
      "idx": 10,
      "status": 0,
      "type": "image",
      "image_on": "img/moon-and-stars_OFF.svg",
      "image_off": "img/moon-and-stars_ON.svg",
      "image_offline": "img/moon-and-stars_OFF.svg",
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
    // nastaveni animace cirkulace teple vody
    {
      "id": "path3281",
      "idx": 16,
      "type": "style",
      "style": "stroke-dasharray",
      "value_on": 20,
      "value_off": 0,
      "value_offline": 0,
      "status": null,
    },
    {
      "id": "path3281",
      "idx": 16,
      "type": "animate_stroke",
      "from": 0,
      "to": 80,
      "dur": "2s",
      "status": null,
    },
    // nastaveni animace sprchy (animace je dopredu pripravan toto jen povoli nebo zakaze zobrazeni
    {
      "id": "g4120",
      "idx": 16,
      "type": "style",
      "style": "display",
      "value_on": "block",
      "value_off": "none",
      "value_offline": "none",
      "status": null,
    },
    ];
    
  	var temperatures=[
  	//teplota trubky privod do plyn. kotle
   {
      "id": "plyn_in",
      "idx": 14,
      "status": "0",
      "type": "create",
      "styleX": "style1"
    },
    //teplta trubky vystup z plyn kotle
   {
      "id": "plyn_out",
      "idx": 15,
      "status": "0",
      "type": "create",
      "styleX": "style1"
    },
    //teplota boileru nahore
   {
      "id": "boiler1",
      "idx": 3,
      "status": "0",
      "type": "create",
      "styleX": "style1"
    },
    //teplota boileru dole
   {
      "id": "boiler2",
      "idx": 12,
      "status": "0",
      "type": "create",
      "styleX": "style1"
    },
    // teplota panelu
   {
      "id": "panel",
      "idx": 4,
      "status": "0",
      "type": "create",
      "styleX": "style1"
    },
    // teplota cirkulace1
   {
      "id": "cirkulace1",
      "idx": 17,
      "status": "0",
      "type": "create",
      "styleX": "style1"
    },
    // teplota cirkulace2
   {
      "id": "cirkulace2",
      "idx": 18,
      "status": "0",
      "type": "create",
      "styleX": "style1"
    },
    // teplota vstupu do panelu
   {
      "id": "panel_in",
      "idx": 19,
      "status": "0",
      "type": "create",
      "styleX": "style1"
    },
   // barva trubky vystup z panelu
   {
      "id": "path9854",
      "idx": 4,
      "status": "0",
      "type": "color",
      "style": "stroke"
    },
    // barva trubky vstup do panelu
    {
      "id": "path9835",
      "idx": 19,
      "status": "0",
      "type": "color",
      "style": "stroke"
    },
    // barva horni casti boileru
    {
      "id": "stop4109",
      "idx": 3,
      "status": "0",
      "type": "color",
      "style": "stop-color"
    },
    // barva spodni casti boileru
    {
      "id": "stop4107",
      "idx": 12,
      "status": "0",
      "type": "color",
      "style": "stop-color"
    },
    // aktualni spotreba vody - cislo v l/min.
    {
      "id": "water",
      "idx": 11,
      "status": "0",
      "type": "text",
    },
    // barva teploty trubku do plyn. kotle
    {
      "id": "path9814",
      "idx": 14,
      "status": "0",
      "type": "color",
      "style": "stroke"
    },
    // barva teploty trubku z plyn. kotle
    {
      "id": "path9816",
      "idx": 15,
      "status": "0",
      "type": "color",
      "style": "stroke"
    },
	// barva trubky cirkulace teple vody (slozeno ze 3 samostatnych path)
    {
      "id": "path3281",
      "idx": 17,
      "status": "0",
      "type": "color",
      "style": "stroke"
    },
    {
      "id": "path3302",
      "idx": 17,
      "status": "0",
      "type": "color",
      "style": "stroke"
    },
    {
      "id": "path3286",
      "idx": 17,
      "status": "0",
      "type": "color",
      "style": "stroke"
    },
    ];

  	var setPoints=[
   {
      "id": "thermostat_boiler",
      "idx": 6,
      "styleX": "style1",
      "status": "0",
      "type": "create",
      "min": 0,
      "max": 90,
      "unit": "C",
      "flay": "off"
    },
   {
      "id": "sun",
      "idx": 8,
      "status": "0",
      "type": "value",
      "attr": "height",
      "min": 0,
      "max": 1100,
      "from": 0,
      "to": 300,
      "unit": "px"
    },
   {
      "id": "sun",
      "idx": 8,
      "status": "0",
      "type": "value",
      "attr": "width",
      "min": 0,
      "max": 1100,
      "from": 0,
      "to": 300,
      "unit": "px"
    }];
    //];

  	var linestatus=
    {
      "id": "off-on-line",
      "image_on_line": "img/online.png",
      "image_off_line": "img/offline.png",
    };   

  	var clocks=
    [{
		"id": "clock1",
		"idx": 7,
		"styleX": "style2",
		"type": "create",
		"realTime": "no",
    }];   
