var command=[];

function reload_Light() {
	$.get('http://localhost:8090/smarthome/measurements/light/latest?num=5').done(function(data) {
		$('#Light').html(render_Light(data));
		$('#Light-messages').html(render_messages(data.messages));
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#Light-messages').html(render_messages(data.messages));
	});
}
function reload_Temp() {
	$.get('http://localhost:8090/smarthome/measurements/temperature/latest?num=5').done(function(data) {
		$('#Temp').html(render_Temp(data));
		$('#Temp-messages').html(render_messages(data.messages));
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#Temp-messages').html(render_messages(data.messages));
	});
}
function reload_Command(){
	$.get('http://localhost:8090/smarthome/device/state').done(function(data) {
		$('#command').html(render_Getcommand(data));
		$('#command-messages').html(render_messages(data.messages));
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#command-messages').html(render_messages(data.messages));
	});
}
function reload_History() {
	$.get('http://localhost:8090/smarthome/device/command/history?num=15').done(function(data) {
		$('#history').html(render_History(data));
		$('#history-messages').html(render_messages(data.messages));
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#history-messages').html(render_messages(data.messages));
	});
}
function reload_Button() {
		$('#button').html(render_button_form());
}
$(document).ready(function() {
	setTimeout(function(){
		reload_Light();
		reload_Temp();
		reload_Command();
		reload_History();
		reload_Button();
		
		$(document).on('click', 'button.command', function() {
		    var getVal =$( "#myselect" ).val();
			 // var getVal = $("#MyInputId").val();
            // $("p").append(getVal);
			 //var command_post = $('form').attr('input');
			var commandJson = { command: getVal};
			console.log( getVal);
			$.postJSON('http://localhost:8090/smarthome/device/command', commandJson).done(function(data) {
					$('#commandJson').html('');
					$('#commandJson-messages').html(render_messages(data.messages));
					reload_Command();
			}).fail(function(response) {
					var data = response.responseJSON;
					$('#commandJson-messages').html(render_messages(data));
			});
			return false;
	     });
	},400);
});