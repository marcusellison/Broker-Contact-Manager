//Setting up the popup
//0 means disabled; 1 means enabled;

var popupStatus = 0;

//Code that loads popup

var loadPopup = function() {
	//loads popup only if it is disabled
	if (popupStatus === 0) {
		$(".backgroundPopup").css({"opacity":"0.7"});
		$(".backgroundPopup").fadeIn("slow");
		$(".popup").fadeIn("slow");
		popupStatus = 1;
	}
};

//Function that disables popup

var disablePopup = function() {
	// disables popup only if it is enabled
	if (popupStatus === 1) {
		$(".backgroundPopup").fadeOut("slow");
		$(".popup").fadeOut("slow");
		popupStatus = 0;
	}
};

//centering popup  
var centerPopup = function(){  
	//request data for centering  
	var windowWidth = document.documentElement.clientWidth;  
	var windowHeight = document.documentElement.clientHeight;  
	var popupHeight = $("#popup").height();  
	var popupWidth = $("#popup").width();  
	//centering  
	$("#popup").css({  
		"position": "absolute",
		"top": windowHeight/2-popupHeight/2,
		"left": windowWidth/2-popupWidth/2
	});
  
	//only need force for IE6  
	$("#backgroundPopup").css({  
		"height": windowHeight  
	});  
 
}  

//document ready

$(document).ready(function(){
	$("#button").click(function(){
		centerPopup();
		loadPopup();
	});
	//closing popup
	//click the x event
	$("#popupClose").click(function(){
		disablePopup();
	});
	// Click out event
	$(".backgroundPopup").click(function() {
		disablePopup();
	});
	
});

