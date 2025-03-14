var eventPath = new String(document.location);
var eventHost = window.location.host;
var eventId = "";
var testEventPath = "";
pathArray = eventPath.split("?");
images = new Array()
var cdnpath = "//dln0s0v92ab5h.cloudfront.net/gps/client/ver20181107/";
var isgpxseuranta = false;
var hideallmenus = false;
var langu = 0;

var sessionid="";
var issessioned = false;
var sessioneventPath = new String(document.location);
var sessionpathArray = sessioneventPath.split("?");
if(sessionpathArray.length > 1) {
	var sessionparams =  sessionpathArray[1];
	var sessionpathArray2 = sessionparams.split("&");
	for(sii=0;sii<sessionpathArray2.length;sii++) {
		if(sessionpathArray2[sii].indexOf("GpsSeurantaSessionID=")==0) {
			sessionid =  sessionpathArray2[sii].substring(21);
			issessioned = true;
			break;
		}
	}
}
window.addEventListener("message", function(event) {
	kasky = event.data;
	if(kasky.startsWith("center:")) {
		trevent.centercompetitorid(mapHeight, kasky.substring(7));
	}
});
var forceMapSystem =0;
if(pathArray.length > 1) {
   var params =  pathArray[1];
	if(params.indexOf("map=MML2")>-1) {
	forceMapSystem =5;
	eventPath = eventPath.replace("&map=MML2","");
	eventPath = eventPath.replace("map=MML2","");
	pathArray = eventPath.split("?");
   }
   else if (params.indexOf("map=MML3")>-1) {
	forceMapSystem =6;
	eventPath = eventPath.replace("&map=MML3","");
	eventPath = eventPath.replace("map=MML3","");
	pathArray = eventPath.split("?");
  }


   else if(params.indexOf("map=MML")>-1) {
	forceMapSystem =5;
	eventPath = eventPath.replace("&map=MML","");
	eventPath = eventPath.replace("map=MML","");
	pathArray = eventPath.split("?");
   }
   else if (params.indexOf("map=NOR")>-1) {
	forceMapSystem =2;
	eventPath = eventPath.replace("&map=NOR","");
	eventPath = eventPath.replace("map=NOR","");
	pathArray = eventPath.split("?");
   } else if (params.indexOf("map=OSM")>-1) {
	forceMapSystem =3;
	eventPath = eventPath.replace("&map=OSM","");
	eventPath = eventPath.replace("map=OSM","");
	pathArray = eventPath.split("?");
   } else if (params.indexOf("map=OTM")>-1) {
	forceMapSystem =7;
	eventPath = eventPath.replace("&map=OTM","");
	eventPath = eventPath.replace("map=OTM","");
	pathArray = eventPath.split("?");
   } else if (params.indexOf("map=SWE")>-1) {
	forceMapSystem =8;
	eventPath = eventPath.replace("&map=SWE","");
	eventPath = eventPath.replace("map=SWE","");
	pathArray = eventPath.split("?");
   } else if (params.indexOf("map=OTH")>-1) {
	forceMapSystem =9;
	eventPath = eventPath.replace("&map=OTH","");
	eventPath = eventPath.replace("map=OTH","");
	pathArray = eventPath.split("?");
   }

  if(params.indexOf("hidemenus=1")>-1) {
		 hideallmenus = true;
		 eventPath = eventPath.replace("&hidemenus=1","");
		 eventPath = eventPath.replace("hidemenus=1","");
		 pathArray = eventPath.split("?");
  }

}



var appMode = "";
var compColArray = [];

var timeeventhost = "//gps.virekunnas.fi";

// http://stackoverflow.com/questions/19012135/ios-7-ipad-safari-landscape-innerheight-outerheight-layout-issue
if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && !window.navigator.standalone) {
    $('html').addClass('ios7-fix');
}

// lataa kuvat ennakkoon
function preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image()
		images[i].src = preload.arguments[i]
	}
}
preload(
	cdnpath+"images/arrowRi.png", cdnpath+"images/arrowLe.png",
	cdnpath+"images/arrowDown.png", cdnpath+"images/arrowDown2.png",
	cdnpath+"images/arrowUp.png", cdnpath+"images/arrowUp2.png",
	cdnpath+"images/btnPlay.png", cdnpath+"images/btnPaused.png"
)
delete images;

//var eventId = pathArray[pathArray.length - 2]; // haetaan taulukon viimeinen ei tyhjä alkio joka sisältää ID:n
//if(pathArray.length > 1) {
	//eventId = pathArray[0];
	//var last = eventId.length;

	//if(eventId.charAt(last) == "/") eventId = eventId.substr(3, last-1);
	//else eventId = eventId.substr(3, last);

	var pathparts = eventPath.split('/');
	var last = pathparts.length;
	eventId = pathparts[last-2];
	var eventpathalku = eventPath.substr(0, eventPath.indexOf(eventId));

	testEventPath = eventpathalku  + eventId+"/";
	timeeventhost = "//"+pathparts[2];
	console.log("teh: "+timeeventhost);
delete pathArray;

console.log("PATH " + eventPath + " HOST " + eventHost + " ID " + eventId);

// hae oikea CSS filu ennen index sivun body tagia
// Keksien hallintaa ja sovellustilan asettaminen käynnistäessä ohjelmaa
if (document.cookie.search(/(^|;)gpsAppMode=/) < 0) {
	if (/Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		document.cookie = "gpsAppMode=mobile";
	} else {
		document.cookie = "gpsAppMode=desktop";
	}
}
// hae keksi
function getCookie(name) {
	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : null;
}
var appMode = getCookie("gpsAppMode");
