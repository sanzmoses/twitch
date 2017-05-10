console.log("Fuckers");
$(document).ready(function(){
	var channel = "OgamingSC2";
   $.ajax({ 
        type:"GET",
        url: "https://api.twitch.tv/kraken/streams/" + channel,
        headers:{
            "Client-ID": "ljvzlno3ci0iq7l7dl0hxww9dx0j0b",
        },
        success: function(data){
            console.log(data);
        }});

   var box = $('.bg-green');
   box.css("height", "0px"); //set property
   box.animate({height: "420px"}, 1000);

   $('li').on("click", function(){
        var id = $(this).attr('id');
        var element = $('#'+id);
        if(id){
            element.addClass('focus');
            element.siblings().removeClass();
        }


   });

});

var test = "http://www.zacharydurland.com/twitch-app/";
var link = "https://wind-bow.glitch.me/twitch-api/channels/ogamingsc2?callback=?";
    