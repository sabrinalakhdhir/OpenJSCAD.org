initializeScreen();

var canvas = document.getElementById('humanBody');
	ctx = canvas.getContext('2d');

    var textCanvas = document.getElementById('userSelections');
    textctx = textCanvas.getContext('2d');

    var alertsCanvas = document.getElementById('alerts');
    alertsctx = alertsCanvas.getContext('2d');

	var circles = [];
    var alerts = [];
    var selectedPlacements = [];
    var selectedDevices = [];
    var selectedMechanisms = [];

    // List of counters for each body part
    var headCount = 0;
    var neckCount = 0;
    var upperarmCount = 0;
    var torsoCount = 0;
    var wristCount = 0;
    var fingersCount = 0;
    var upperlegCount = 0;
    var ankleCount = 0;

    var alertlabel = 0;
    var alertOffset = 0;
    
	var canvasW = canvas.offsetWidth;
	var canvasH = canvas.offsetHeight;

    var loginUser = sessionStorage.getItem('usertype');

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Step 1: Select preferred monitor placements.", 0, 20);

	canvas.addEventListener('click', function(e){
		var clickedX = e.pageX - this.offsetLeft;
		var clickedY = e.pageY - this.offsetTop;
		var allP =[];


		   for (var i = 0; i < circles.length; i++) {
		       if (clickedX > circles[i].left && clickedY > circles[i].top1 && clickedX < circles[i].right && clickedY < circles[i].bottom) {
                    switch(i) {
                        // In each case: 
                        // 1. Add the selected body part to the list of potential placements
                        // 2. Change the colour of the selected body part indicator to red to visualize that it has already been selected
		               case 0:
                            if (headCount % 2 == 0) {
                                ctx.fillStyle = "red";
                                ctx.fill();
                                drawCircle(ctx, 125, 60, 5); // top of head
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                selectedPlacements.push("Head");
                            }
                            else {
                                ctx.fillStyle = "black";
                                ctx.fill();
                                drawCircle(ctx, 125, 60, 5); // top of head
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                let index = selectedPlacements.indexOf("Head");
                                if (index > -1) { // only splice array when item is found
                                    selectedPlacements.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            headCount = headCount + 1;
		                    break;

		               case 1:
                            if (neckCount % 2 == 0) {
                                ctx.fillStyle = "red";
                                ctx.fill();
                                drawCircle(ctx, 128, 145, 5); // neck/Necklace
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                selectedPlacements.push("Neck");
                                //drawAlerts(ctx, 120, 100, 70, 50);
                            }
                            else {
                                ctx.fillStyle = "black";
                                ctx.fill();
                                drawCircle(ctx, 128, 145, 5); // neck/Necklace
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                let index = selectedPlacements.indexOf("Neck");
                                if (index > -1) { // only splice array when item is found
                                    selectedPlacements.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            neckCount = neckCount + 1;
		                    break;

                       case 2:
                            if (upperarmCount % 2 == 0) {
                                ctx.fillStyle = "red";
                                ctx.fill();
                                drawCircle(ctx, 68, 210, 5); //  upper arm
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                selectedPlacements.push("Upperarm");
                            }
                            else {
                                ctx.fillStyle = "black";
                                ctx.fill();
                                drawCircle(ctx, 68, 210, 5); //  upper arm
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                let index = selectedPlacements.indexOf("Upperarm");
                                if (index > -1) { // only splice array when item is found
                                    selectedPlacements.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            upperarmCount = upperarmCount + 1;
		                    break;

                        case 3:
                            if (torsoCount % 2 == 0) {
                                ctx.fillStyle = "red";
                                ctx.fill();
                                drawCircle(ctx, 128, 290, 5); // torso
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                        	    selectedPlacements.push("Torso");
                            }
                            else {
                                ctx.fillStyle = "black";
                                ctx.fill();
                                drawCircle(ctx, 128, 290, 5); // torso
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                let index = selectedPlacements.indexOf("Torso");
                                if (index > -1) { // only splice array when item is found
                                    selectedPlacements.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            torsoCount = torsoCount + 1;
		                    break;

                        case 4:
                            if (wristCount % 2 == 0) {
                                ctx.fillStyle = "red";
                                ctx.fill();
                                drawCircle(ctx, 40, 320, 5); //  lower arm
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                selectedPlacements.push("Wrist");
                                //drawWatchAlerts(alertsctx, true);
                            }
                            else {
                                ctx.fillStyle = "black";
                                ctx.fill();
                                drawCircle(ctx, 40, 320, 5); //  lower arm
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                let index = selectedPlacements.indexOf("Wrist");
                                if (index > -1) { // only splice array when item is found
                                    selectedPlacements.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            wristCount = wristCount + 1;
		                    break;

                        case 5:
                            if (fingersCount % 2 == 0) {
                                ctx.fillStyle = "red";
                                ctx.fill();
                                drawCircle(ctx, 20, 380, 5); //  fingers
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                selectedPlacements.push("Fingers");
                                //drawFingerAlerts(alertsctx, true);
                            }
                            else {
                                ctx.fillStyle = "black";
                                ctx.fill();
                                drawCircle(ctx, 20, 380, 5); //  fingers
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                let index = selectedPlacements.indexOf("Fingers");
                                if (index > -1) { // only splice array when item is found
                                    selectedPlacements.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            fingersCount = fingersCount + 1;
		                    break;

                        case 6:
                            if (upperlegCount % 2 == 0) {
                                ctx.fillStyle = "red";
                                ctx.fill();
                                drawCircle(ctx, 160, 420, 5); //  upper leg
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                selectedPlacements.push("Upperleg");
                            }
                            else {
                                ctx.fillStyle = "black";
                                ctx.fill();
                                drawCircle(ctx, 160, 420, 5); //  upper leg
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                let index = selectedPlacements.indexOf("Upperleg");
                                if (index > -1) { // only splice array when item is found
                                    selectedPlacements.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            upperlegCount = upperlegCount + 1;
		                    break;
                       
                        case 7:
                            if (ankleCount % 2 == 0) {
                                ctx.fillStyle = "red";
                                ctx.fill();
                                drawCircle(ctx, 172, 540, 5); //  ankle
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                selectedPlacements.push("Ankle");
                            }
                            else {
                                ctx.fillStyle = "black";
                                ctx.fill();
                                drawCircle(ctx, 172, 540, 5); //  ankle
                                drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
                                let index = selectedPlacements.indexOf("Ankle");
                                if (index > -1) { // only splice array when item is found
                                    selectedPlacements.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            ankleCount = ankleCount + 1;
		                    break;

 		                default:
                            drawCircle(ctx, 600, 600, 1);
		           }
    
                   alertsctx.clearRect(0, 0, alertsCanvas.width, alertsCanvas.height);

                   
                   // After a selection has been made, update the list of selected placements in real time
                   textctx.clearRect(0, 0, 300, 30);
                   textctx.font = "14px Arial";
		           textctx.fillText("Preferred Placements: " + selectedPlacements, 0, 20);

                   alertsctx.fillStyle = "black";
                    alertsctx.font = "16px Arial";
                    alertsctx.fillText("Step 2: Select preferred device style.", 0, 20);
                   
                    // If the user has selected a placement, draw the alerting mechanism options
                    showDevices(selectedPlacements);
                   return
		       }
		   }
	})

    // Setting up a similar system for the alerts canvas to handle selections for types of alert
    var alertsCanvasW = canvas.offsetWidth;
	var alertsCanvasH = canvas.offsetHeight;

    var vibrateCount = 0;
    var soundCount = 0;
    var lightCount = 0;
    var graphCount = 0;
    var numbersCount = 0;

    var device1count = 0;
    var device2count = 0;
    var device3count = 0;
    var device4count = 0;
    var device5count = 0;
    var device6count = 0;

    var mechanism1count = 0;
    var mechanism2count = 0;
    var mechanism3count = 0;
    var mechanism4count = 0;
    var mechanism5count = 0;

    var mechanism = "";
    var phase;

	alertsCanvas.addEventListener('click', function(e){
		var clickedX = e.pageX - this.offsetLeft;
		var clickedY = e.pageY - this.offsetTop;
		var allP =[];
        var device = "";

        for (var i = 0; i < alerts.length; i++) {
            if (clickedX > alerts[i].left && clickedY > alerts[i].top1 && clickedX < alerts[i].right && clickedY < alerts[i].bottom) {
                        switch(i) {                    
                            case 0: 
                            device = deviceOrder[0];
                            console.log(device);
                            if (device1count % 2 == 0) {
                                alertsctx.lineWidth = 2;
                                alertsctx.strokeStyle = "red";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100);
                                selectedDevices.push(device);
                                showMechanisms();
                            }
                            else {
                                alertsctx.lineWidth = 0;
                                alertsctx.strokeStyle = "white";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100); 
                                let index = selectedDevices.indexOf(device);
                                if (index > -1) { // only splice array when item is found
                                    selectedDevices.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            if (selectedDevices.length === 0) {
                                alertsctx.clearRect(300, 0, 250, 800);
                            }
                            device1count = device1count + 1;
                                break;

                            case 1:
                            device = deviceOrder[1];
                            console.log(device);
                            if (device2count % 2 == 0) {
                                alertsctx.lineWidth = 2;
                                alertsctx.strokeStyle = "red";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100); //alerts[i].bottom);
                                //alertsctx.strokeRect(600, 600, 1, 1);
                                selectedDevices.push(device);
                                showMechanisms();
                            }
                            else {
                                alertsctx.lineWidth = 0;
                                alertsctx.strokeStyle = "white";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100); //alerts[i].bottom);
                                //alertsctx.strokeRect(600, 600, 1, 1);
                                let index = selectedDevices.indexOf(device);
                                if (index > -1) { // only splice array when item is found
                                    selectedDevices.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            if (selectedDevices.length === 0) {
                                alertsctx.clearRect(300, 0, 250, 800);
                            }
                            device2count = device2count + 1;
                                break;

                            case 2:
                            device = deviceOrder[2];
                            console.log(device);
                            if (device3count % 2 == 0) {
                                alertsctx.lineWidth = 2;
                                alertsctx.strokeStyle = "red";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100);// alerts[i].bottom);
                                selectedDevices.push(device);
                                showMechanisms();
                                //console.log("Device 1 count: " + device1count);
                            }
                            else {
                                alertsctx.lineWidth = 0;
                                alertsctx.strokeStyle = "white";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100); //alerts[i].bottom);
                                //alertsctx.strokeRect(600, 600, 1, 1);
                                let index = selectedDevices.indexOf(device);
                                if (index > -1) { // only splice array when item is found
                                    selectedDevices.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            if (selectedDevices.length === 0) {
                                alertsctx.clearRect(300, 0, 250, 800);
                            }
                            device3count = device3count + 1;
                                break;

                            case 3:
                            device = deviceOrder[3];
                            console.log(device);
                            if (device4count % 2 == 0) {
                                alertsctx.lineWidth = 2;
                                alertsctx.strokeStyle = "red";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100); // alerts[i].bottom);
                                selectedDevices.push(device);
                                showMechanisms();
                            }
                            else {
                                alertsctx.lineWidth = 0;
                                alertsctx.strokeStyle = "white";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100);// alerts[i].bottom);
                                let index = selectedDevices.indexOf(device);
                                if (index > -1) { // only splice array when item is found
                                    selectedDevices.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            if (selectedDevices.length === 0) {
                                alertsctx.clearRect(300, 0, 250, 800);
                            }
                            device4count = device4count + 1;
                                break;

                            case 4:
                            device = deviceOrder[4];
                            console.log(device);
                            if (device5count % 2 == 0) {
                                alertsctx.lineWidth = 2;
                                alertsctx.strokeStyle = "red";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100); //alerts[i].bottom);
                                selectedDevices.push(device);
                                showMechanisms();
                            }
                            else {
                                alertsctx.lineWidth = 0;
                                alertsctx.strokeStyle = "white";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100);//alerts[i].bottom);
                                let index = selectedDevices.indexOf(device);
                                if (index > -1) { // only splice array when item is found
                                    selectedDevices.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            if (selectedDevices.length === 0) {
                                alertsctx.clearRect(300, 0, 250, 800);
                            }
                            device5count = device5count + 1;

                            case 5:
                            device = deviceOrder[5];
                            console.log(device);
                            if (device6count % 2 == 0) {
                                alertsctx.lineWidth = 2;
                                alertsctx.strokeStyle = "red";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100); //alerts[i].bottom);
                                selectedDevices.push(device);
                                showMechanisms();
                            }
                            else {
                                alertsctx.lineWidth = 0;
                                alertsctx.strokeStyle = "white";
                                alertsctx.strokeRect(alerts[i].left, alerts[i].top1, alerts[i].right - 5, 100);//alerts[i].bottom);
                                let index = selectedDevices.indexOf(device);
                                if (index > -1) { // only splice array when item is found
                                    selectedDevices.splice(index, 1); // 2nd parameter means remove one item only
                                }
                            }
                            if (selectedDevices.length === 0) {
                                alertsctx.clearRect(300, 0, 250, 800);
                            }
                            device6count = device6count + 1;
                                break;

                            default:
                                break;
                        }
                        textctx.clearRect(0, 25, 300, 50);
                        textctx.font = "14px Arial";
                        textctx.fillText("Selected Devices: " + selectedDevices, 0, 40);

                        alertsctx.clearRect(270, 0, 300, 50);
                        alertsctx.fillStyle = "black";
                        alertsctx.font = "16px Arial";
                        alertsctx.fillText("Step 3: Select preferred alert style.", 300, 20);
                    }
        }

        for (var i = 0; i < mechanisms.length; i++) {
            if (clickedX > mechanisms[i].left && clickedY > mechanisms[i].top1 && clickedX < mechanisms[i].right && clickedY < mechanisms[i].bottom) {
                        switch(i) {                    
                            case 0: 
                                mechanism = mechanismOrder[0];

                                if (mechanism1count % 2 == 0) {
                                    alertsctx.lineWidth = 2;
                                    alertsctx.strokeStyle = "red";
                                    alertsctx.strokeRect(310, mechanisms[i].top1, 180, 100);
                                    selectedMechanisms.push(mechanism);
                                }
                                else {
                                    alertsctx.lineWidth = 0;
                                    alertsctx.strokeStyle = "white";
                                    alertsctx.strokeRect(310, mechanisms[i].top1, 180, 100); 
                                    let index = selectedMechanisms.indexOf(mechanism);
                                    if (index > -1) { // only splice array when item is found
                                        selectedMechanisms.splice(index, 1); // 2nd parameter means remove one item only
                                    }
                                } 
                                
                                mechanism1count = mechanism1count + 1;
                                break;

                            case 1:
                                mechanism = mechanismOrder[1];
                                
                                if (mechanism2count % 2 == 0) {
                                    alertsctx.lineWidth = 2;
                                    alertsctx.strokeStyle = "red";
                                    alertsctx.strokeRect(310, mechanisms[i].top1, 180, 100);
                                    selectedMechanisms.push(mechanism);
                                }
                                else {
                                    alertsctx.lineWidth = 0;
                                    alertsctx.strokeStyle = "white";
                                    alertsctx.strokeRect(310, mechanisms[i].top1, 180, 100); 
                                    let index = selectedMechanisms.indexOf(mechanism);
                                    if (index > -1) { // only splice array when item is found
                                        selectedMechanisms.splice(index, 1); // 2nd parameter means remove one item only
                                    }
                                } 
                                
                                mechanism2count = mechanism2count + 1;
                            
                                break;

                            case 2: 
                                mechanism = mechanismOrder[2];
                                if (mechanism3count % 2 == 0) {
                                    alertsctx.lineWidth = 2;
                                    alertsctx.strokeStyle = "red";
                                    alertsctx.strokeRect(310, mechanisms[i].top1, 180, 100);
                                    selectedMechanisms.push(mechanism);
                                }
                                else {
                                    alertsctx.lineWidth = 0;
                                    alertsctx.strokeStyle = "white";
                                    alertsctx.strokeRect(310, mechanisms[i].top1, 180, 100); 
                                    let index = selectedMechanisms.indexOf(mechanism);
                                    if (index > -1) { // only splice array when item is found
                                        selectedMechanisms.splice(index, 1); // 2nd parameter means remove one item only
                                    }
                                } 
                                
                                mechanism3count = mechanism3count + 1;
                            
                                break;

                            case 3:
                                mechanism = mechanismOrder[3];
                                if (mechanism4count % 2 == 0) {
                                    alertsctx.lineWidth = 2;
                                    alertsctx.strokeStyle = "red";
                                    alertsctx.strokeRect(310, mechanisms[i].top1, 180, 100);
                                    selectedMechanisms.push(mechanism);
                                }
                                else {
                                    alertsctx.lineWidth = 0;
                                    alertsctx.strokeStyle = "white";
                                    alertsctx.strokeRect(310, mechanisms[i].top1, 180, 100); 
                                    let index = selectedMechanisms.indexOf(mechanism);
                                    if (index > -1) { // only splice array when item is found
                                        selectedMechanisms.splice(index, 1); // 2nd parameter means remove one item only
                                    }
                                } 
                                
                                mechanism4count = mechanism4count + 1;
                            
                                break;

                            case 4:
                                mechanism = mechanismOrder[4];
                                if (mechanism5count % 2 == 0) {
                                    alertsctx.lineWidth = 2;
                                    alertsctx.strokeStyle = "red";
                                    alertsctx.strokeRect(310, mechanisms[i].top1, 180, 100);
                                    selectedMechanisms.push(mechanism);
                                }
                                else {
                                    alertsctx.lineWidth = 0;
                                    alertsctx.strokeStyle = "white";
                                    alertsctx.strokeRect(310, mechanisms[i].top1, 180, 100); 
                                    let index = selectedMechanisms.indexOf(mechanism);
                                    if (index > -1) { // only splice array when item is found
                                        selectedMechanisms.splice(index, 1); // 2nd parameter means remove one item only
                                    }
                                } 
                                
                                mechanism5count = mechanism5count + 1;
                            
                                break;

                            default:
                                break;
                        }
                    textctx.clearRect(0, 50, 300, 50);
                    textctx.font = "14px Arial";
                    textctx.fillText("Selected Mechanisms: " + selectedMechanisms, 0, 60);

                    // Only disable the generate model button is at least one selection has been made from each section
                    if (selectedPlacements != "" && selectedDevices != "" && selectedMechanisms != "" ) {
                        console.log("All selections made");
                        var savePrefs = document.getElementById('saveButton');
                        savePrefs.disabled = false;
                        console.log("button enabled");
                        // Function to switch screens to 3d model page when save button is clicked
                        savePrefs.onclick = function() {
                            phase = 2;
                            sessionStorage.setItem("placements", selectedPlacements);
                            sessionStorage.setItem("devices", selectedDevices);
                            sessionStorage.setItem("mechanisms", selectedMechanisms);
                            sessionStorage.setItem("phase", phase);
                            //location.replace("designer.html");
                            location.replace("demo.html");
			    localStorage.setItem("placements", JSON.stringify(selectedPlacements));
			    localStorage.setItem("devices", JSON.stringify(selectedDevices));
			    localStorage.setItem("mechanisms", JSON.stringify(selectedMechanisms));
			    localStorage.setItem("phase", phase);
                        }
                    }
                    else {
                        var savePrefs = document.getElementById('saveButton');
                        savePrefs.disabled = true;
                    }


                }
        }
    });
        
		function drawImage(onLoad) {
			// When the image is loaded, draw it
			if(onLoad){
				img.onload = function () {
				    ctx.drawImage(img, 0, 40);
                    console.log("image drawn");
				}
			} else {
				ctx.drawImage(img, 0, 0);
			}
			
		}

		function draw(ctx, x, y, radius) {
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI*2, true); 
			ctx.closePath();
			ctx.fill();
        }

		var circle = function(x, y, radius) {
			this.left = x - radius;
		    this.top1 = y - radius;
		    this.right = x + radius;
		    this.bottom = y + radius;
		}

        var alert = function(x, y, width, height) {
            this.left = x;
            this.top1 = y;
            this.right = x + width;
            this.bottom = y + height;
        }

		function drawCircle(ctx, x, y, radius) {
			draw(ctx, x, y, radius);
			var circleCtx = new circle(x, y, radius);

			circles.push(circleCtx);
			ctx.save();
		}


        var imageWidth = 200;
        var imageHeight = 100;
        var hashmap = new Map();
        var hashmapAlphas = new Map();
        var deviceOrder = [];
        var deviceAlphas = [];
        function showDevices(placements) {

            var alertctx;

            // Hashmap setup for device ordeRing based on placements
            hashmap.set("Head", ["Necklace", "Cuff", "Create your own", "Belt", "Watch", "Ring"]);
            hashmap.set("Neck", ["Necklace", "Create your own", "Cuff", "Belt", "Watch", "Ring"]);
            hashmap.set("Upperarm", ["Cuff", "Watch", "Create your own", "Belt", "Necklace", "Ring"]);
            hashmap.set("Torso", ["Belt", "Cuff", "Create your own", "Necklace", "Watch", "Ring"]);
            hashmap.set("Wrist", ["Watch", "Cuff", "Create your own", "Ring", "Belt", "Necklace"]);
            hashmap.set("Fingers", ["Ring", "Create your own", "Watch", "Cuff", "Belt", "Necklace"]);
            hashmap.set("Upperleg", ["Cuff", "Create your own", "Watch", "Belt", "Necklace", "Ring"]);
            hashmap.set("Ankle", ["Cuff", "Create your own", "Watch", "Belt", "Necklace", "Ring"]);

            hashmapAlphas.set("Head", [1.0, 1.0, 1.0, 0.5, 0.25, 0.25]);
            hashmapAlphas.set("Neck", [1.0, 1.0, 0.5, 0.25, 0.25, 0.25]);
            hashmapAlphas.set("Upperarm", [1.0, 1.0, 1.0, 0.5, 0.25, 0.25]);
            hashmapAlphas.set("Torso", [1.0, 1.0, 1.0, 0.25, 0.25, 0.25]);
            hashmapAlphas.set("Wrist", [1.0, 1.0, 1.0, 0.25, 0.25, 0.25]);
            hashmapAlphas.set("Fingers", [1.0, 1.0, 0.5, 0.5, 0.25, 0.25]);
            hashmapAlphas.set("Upperleg", [1.0, 1.0, 0.5, 0.5, 0.25, 0.25]);
            hashmapAlphas.set("Ankle", [1.0, 1.0, 0.5, 0.5, 0.25, 0.25]);

            // Call the getByValue function to get the device order based on selected placements
            if (selectedPlacements != "") {
                for (let i = 0; i <selectedPlacements.length; i++) {
                    deviceOrder = getByValue(hashmap, selectedPlacements[i]);
                    deviceAlphas = hashmapAlphas.get(selectedPlacements[i]);
                    console.log(deviceOrder);
                    console.log("Alphas: " + deviceAlphas);
                }
            }

            // Draw device images onto the screen based on the device order obtained from the hashmap
            var offset = 0;
            let device = "";
            var nextdevice;
            var nextdeviceAlpha;
            for (let i = 0; i < deviceOrder.length; i++) {
                device = deviceOrder[i];
                device = device.toLowerCase();
                nextdeviceAlpha = deviceAlphas[i];
                nextdevice = document.createElement('IMG');
                nextdevice.src = deviceOrder[i] + ".png";
                nextdevice.value = deviceOrder[i];
                nextdevice.onload = drawDevice(nextdevice, offset, nextdeviceAlpha);
                offset = offset + 110;
            }

            // If there are no selected placements, clear the alerts canvas
            if (selectedPlacements.length === 0) {
                alertsctx.clearRect(0, 0, alertsCanvas.width, alertsCanvas.height);
            }

        }

        // Function to draw the device based on the inputting device (from device order from hashmap) and the above-defined offset for the image placement
        function drawDevice(device, offset, nextdeviceAlpha) {
            alertctx = new alert(0, 40 + offset, imageWidth, imageHeight);
            alertsctx.globalAlpha = nextdeviceAlpha;
            alertsctx.drawImage(device, 0, 40 + offset, imageWidth, imageHeight);
            alertsctx.globalAlpha = 1.0;
            alerts.push(alertctx);
        }


        // Function to search the hashmap and pull out the respective device ordeRing based on placement selection that is made by the user
        function getByValue(map, searchValue) {
            // Use hashmap to get device order based on selected placements and draw device images onto the screen
            for (let [key, value] of hashmap.entries()) {
                if (key === searchValue)
                    return value;
            }
        }

        var mechanisms = [];
        var mechanismOrder = [];
        function showMechanisms() {
            mechanisms = [];
            mechanismOrder = [];
            var alertctx;
            var vibrate = document.createElement('IMG');
            vibrate.src = "vibrate.png";

            var sound = document.createElement('IMG');
            sound.src = "sound.png";

            var light = document.createElement('IMG');
            light.src = "light.png";

            var graph = document.createElement('IMG');
            graph.src = "graph.png";

            var numbers = document.createElement('IMG');
            numbers.src = "number.png";

            vibrate.onload = function() {
                alertctx = new alert(300, 40, imageWidth, imageHeight);
                alertsctx.drawImage(vibrate, 300, 40, imageWidth, imageHeight);
                mechanisms.push(alertctx);
                mechanismOrder.push("Vibration");
            }
            sound.onload = function() {
                alertctx = new alert(300, 160, imageWidth, imageHeight);
                alertsctx.drawImage(sound, 300, 160, imageWidth, imageHeight);
                mechanisms.push(alertctx);
                mechanismOrder.push("Sound");
            }
            light.onload = function() {
                alertctx = new alert(300, 270, imageWidth, imageHeight);
                alertsctx.drawImage(light, 300, 270, imageWidth, imageHeight);
                mechanisms.push(alertctx);
                mechanismOrder.push("Light or Colour");
            }
            graph.onload = function() {
                alertctx = new alert(300, 380, imageWidth, imageHeight);
                alertsctx.drawImage(graph, 300, 380, imageWidth, imageHeight);
                mechanisms.push(alertctx);
                mechanismOrder.push("Graph Representation");
            }
            numbers.onload = function() {
                alertctx = new alert(300, 490, imageWidth, imageHeight);
                alertsctx.drawImage(numbers, 300, 490, imageWidth, imageHeight);
                mechanisms.push(alertctx);
                mechanismOrder.push("Exact Numbers");
            }
            console.log(mechanisms);
        }

        function hideMechanisms() {
            alertsctx.clearRect(300, 0, 250, 800);
        }

        function removeAlerts(ctx, x, y, width, height) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function removeMechanisms(ctx, x, y, width, height) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Create an image element
		    var img = document.createElement('IMG');

            // Specify the src to load the image
            img.src = "256px-Human_body_silhouette.svg.png";

        function initialize() {
            
            // Initialize the points of interest that the user may select
            drawCircle(ctx, 125, 60, 5); // top of head
            drawCircle(ctx, 128, 145, 5); // neck/Necklace
            drawCircle(ctx, 68, 210, 5); // left upper arm
            drawCircle(ctx, 128, 290, 5); // torso
            drawCircle(ctx, 40, 320, 5); // left lower arm
            drawCircle(ctx, 20, 380, 5); // left fingers
            drawCircle(ctx, 160, 420, 5); // right upper leg
            drawCircle(ctx, 172, 540, 5); // right ankle
            drawCircle(ctx, 600, 600, 1); // default circle to prevent errors when clicking on the canvas
            drawImage(true);
        
        }
        initialize();

        function initializeScreen() {
            var humanBody = document.createElement("canvas");
            humanBody.id = "humanBody";
            humanBody.width = 350;
            humanBody.height = 800;
            humanBody.style.position = "relative";
            humanBody.style.left = "10px";
            humanBody.style.top = "10px";

            var userSelections = document.createElement("canvas");
            userSelections.id = "userSelections";
            userSelections.width = 300;
            userSelections.height = 100;
            userSelections.style.position = "absolute";
            userSelections.style.left = "1000px";
            userSelections.style.top = "20px";

            var savePreferences = document.createElement("button");
            savePreferences.id = "saveButton";
            savePreferences.innerHTML = "Generate Model";
            savePreferences.style.position = "absolute";
            savePreferences.style.left = "1000px";
            savePreferences.style.top = "100px";
            savePreferences.disabled = true;
            savePreferences.style.zIndex = "1";

            var alerts = document.createElement("canvas");
            alerts.id = "alerts";
            alerts.width = 1000;
            alerts.height = 700;
            alerts.style.position = "relative";
            alerts.style.left = "10px";
            alerts.style.top = "10px";

            document.getElementsByTagName("body")[0].appendChild(humanBody);
            document.getElementsByTagName("body")[0].appendChild(userSelections);
            document.getElementsByTagName("body")[0].appendChild(savePreferences);
            document.getElementsByTagName("body")[0].appendChild(alerts);
        }


