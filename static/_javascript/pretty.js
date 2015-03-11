/* 
NOTE: The Trello client library has been included as a Managed Resource.  To include the client library in your own code, you would include jQuery and then

<script src="https://api.trello.com/1/client.js?key=your_application_key">...

See https://trello.com/docs for a list of available API URLs

The API development board is at https://trello.com/api

The &dummy=.js part of the managed resource URL is required per http://doc.jsfiddle.net/basic/introduction.html#add-resources
*/
//practice javascript

//Document Ready:
$(document).ready(function(){
	
	//onAuthorize function : runs when users accepts connection
	var onAuthorize = function() {
		updateLoggedIn();
		$("#output").empty();
		
		//This code creates a table that populates with the right info
		Trello.get("/lists/4f451d52c768041268b87b08/cards", {}, function(list) {
			$.each(list, function(x , card) {
				$("#contacttable").find("tbody").append(
					$("<tr>").append(
						$("<th>").text(card.name),
						$("<th>").text(card.desc)
					)
				);
			});
		});

		//This code creates a new contact
		$("#submit").click(function() {
			var $marcus = $("#name").val();
			var $email = $("#email").val();
			Trello.post("lists/4f451d52c768041268b87b08/cards",
				{ name: $marcus, desc: $email }
			);
			// Hide popup...
			alert("You just created a new contact!");
			return false;
		});
		
		//Create a date for each created contact
		
		//Get the name of the member logged in
		Trello.members.get("me", function(member) {
			$("#fullName").text(member.fullName);		
		});
		
	};
	
	//Tell the document if it should show loggedin or loggedout using
	//the trello boolean returned from Trello.authorized
	var updateLoggedIn = function() {
		var isLoggedIn = Trello.authorized();
		$("#loggedout").toggle(!isLoggedIn);
		$("#loggedin").toggle(isLoggedIn);
	};

	//logout function using Trello's logout
	var logOut = function() {
		Trello.deauthorize();
		updateLoggedIn();
	};

	//Run the logout function when the user clicks the disconnect id
	// empty the output id
	$("#disconnect").click(function() {
		logOut();
		$("#output").empty();
	});
	
	// Tabs displaying and hiding things:
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
	
	

	//Not sure what this code does:
	Trello.authorize({interactive:false, success:onAuthorize});

	//Code to run when the connection link is pressed
	$("#connectLink").click(function(){
    	Trello.authorize({
       		type: "popup",
			scope: {read:true, write:true},
        	success: onAuthorize
    	})
	});

//closing document ready

});