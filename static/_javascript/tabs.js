



$(document).ready(function(){
		// Tabs displaying and hiding tabs:
		$("#mytab").click(function () {
			$("#contacts").hide();
			$("#payment").show("slow");
			console.log("this Works");
		});

		$("#mytaba").click(function () {
			$("#payment").hide();
			$("#contacts").show("slow");
			console.log("this Works");
		});
		
});