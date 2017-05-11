console.log("Fuckers");

var arr = [];
var online = [];
var offline = [];
var basura = [];
// for(var x = 0; x < 5; x++){
//     var channels = {};
//     channels.logo = 'Logo no. '+ (x + 1);
//     channels.name = "name "+ (x + 1);
//     arr[x] = channels;
// }
// var a = "freecodecamp";
// arr.[a] = {code: 'code',free: 'free',camp: 'camp'};
// arr.push();
$(document).ready(function(){

var channel = ["OgamingSC2", "freecodecamp", "cretetion", "p4wnyhof", "comster404", "sanzillion"];
var channels = ["OgamingSC2", "freecodecamp","comster404"];

channel.forEach(checkstream); //for every channels get data

    function checkstream(name, index){
        console.log(index + " " + (channel.length-1));
        var name = name;
        var index = index;
        $.ajax({ 
            type:"GET",
            url: "https://api.twitch.tv/kraken/channels/" + name,
            headers:{
            "Client-ID": "ljvzlno3ci0iq7l7dl0hxww9dx0j0b",
            },
            success: function(data){
                arr[index] = [];
                arr[index].names = name;
                arr[index].logo = data.logo;
                arr[index].url = data.url;
                checkchannel(name, index);

                if(index === channel.length-1) {
                    processing(arr);
                }
            },
            error: function(){
                arr[index] = [];
                arr[index].names = name;
                arr[index].stat = "Nonexistent";

                if(index === channel.length-1) {
                    processing(arr);
                }
            }
        });
    }

    function checkchannel(name, index){
        var name = name;
        var index = index;
        $.ajax({ 
            type:"GET",
            url: "https://api.twitch.tv/kraken/streams/" + name,
            headers:{
            "Client-ID": "ljvzlno3ci0iq7l7dl0hxww9dx0j0b",
            },
            success: function(data){
                if(data.stream === null){
                    arr[index].stat = "NotStreaming";
                }
                else{
                    arr[index].stat = "Streaming";
                    arr[index].stream = data.stream.game;
                }
                return true;
            }
        });
    }

    function processing(array){

        for(var x = 0; x < array.length; x++){
            console.log("No. " + x);
            if(arr[x].stat === "Streaming"){
                online.push(arr[x]);
            }
            else if(arr[x].stat === "NotStreaming"){
                offline.push(arr[x]);
            }
            else{
                basura.push(arr[x]);
            }
        }

        console.log(online);
        console.log(offline);
        console.log(basura);
    }



   var box = $('.bg-green');
   $('.out').css("opacity", "0");
   //box.css("height", "0px"); //set property
   //box.animate({height: "420px"}, 1000);

   $('li').on("click", function(){
        var id = $(this).attr('id');
        var element = $('#'+id);
        if(id){
            element.addClass('focus');
            element.siblings().removeClass();
        }


   });
   //console.log($('.flex-container').height());
});

var test = "http://www.zacharydurland.com/twitch-app/";
var link = "https://wind-bow.glitch.me/twitch-api/channels/ogamingsc2?callback=?";
    