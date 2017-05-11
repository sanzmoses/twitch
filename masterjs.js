"use strict";

console.log("Fuckers");
var g = "global fuckers";
var counter;
var arr = [];
var online = [];
var offline = [];
var basura = [];
var tb = $('.tb');
var load = $('.trans');
var track = '';
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

   var box = $('.bg-green');
   tb.css("opacity", "0");
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

channel.forEach(checkstream); //for every channels get data
counter = channel.length;

    function checkstream(name, index){
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

                setTimeout(function() {
                    console.log(index + ': ' + counter);
                    counter -= 1;
                    if ( counter === 0){
                        processing(arr);
                    }
                }, counter);
            },
            error: function(){
                arr[index] = [];
                arr[index].names = name;
                arr[index].stat = "Nonexistent";

                setTimeout(function() {
                    console.log(index + ': ' + counter);
                    counter -= 1;
                    if ( counter === 0){
                        processing(arr);
                    }
                }, counter);
            }
        });
    }

    var checkchannel = function(name, index){

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

    var processing = function(array){
        //console.log(g);
        
        for(var x = 0; x < array.length; x++){
            console.log(x +" "+arr[x].stat);
            if(arr[x].stat == "Streaming"){
                online.push(arr[x]);
            }
            else if(arr[x].stat == "NotStreaming"){
                offline.push(arr[x]);
            }
            else{
                basura.push(arr[x]);
            }
        }
        //this try catch block is for getting the right results
        //bcoz I honestly dont know why sometimes my code does not work
        try{
            console.log(online[0].names);
            console.log(online[0].logo);
            console.log(online[1].names);
            output();
        }
        catch(err){
            location.reload();
        }

    }

    var output = function(){
        var rm = function(){
            load.remove();
            tb.animate({opacity: "1"});
        };
        load.animate({opacity: "0"}, rm);
        tb.empty();
        for(var y = 0; y < online.length; y++){
            tb.append('<tr class="online"><td width="20%"><img src="'+online[y].logo+'" class="img"></td><td width="70%" id="td"><a href="'+online[y].url+'" target="_blank"><b>'+online[y].names+'</b></a><br><a href="'+online[y].url+'" target="_blank">Streaming: '+online[y].stream+'</a></td><td width="10%"><i class="fa fa-check"></i><a href="#"></a></td></tr><hr>');
        }

        for(var y = 0; y < offline.length; y++){
            tb.append('<tr class="offline"><td width="20%"><img src="'+offline[y].logo+'" class="img"></td><td width="70%" id="td"><a href="'+offline[y].url+'" target="_blank"><b>'+offline[y].names+'</b></a><br><p>Not Streaming</p></td><td width="10%"><i class="fa fa-close"></i><a href="#"></a></td></tr><hr>');
        }

        for(var y = 0; y < basura.length; y++){
            tb.append('<tr class="nada"><td width="20%"><img src="x.jpg" class="img"></td><td width="70%" id="td"><p><b>'+basura[y].names+'</b></p><p>Account dont exist!</p></td><td width="10%"><i class="fa fa-exclamation-circle"></i><a href="#"></a></td></tr><hr>');
        }
    }

    var output1 = function(){
        console.log("online output");
        tb.animate({opacity: "1"});
        for(var y = 0; y < online.length; y++){
                tb.append('<tr class="online"><td width="20%"><img src="'+online[y].logo+'" class="img"></td><td width="70%" id="td"><a href="'+online[y].url+'" target="_blank"><b>'+online[y].names+'</b></a><br><a href="'+online[y].url+'" target="_blank">Streaming: '+online[y].stream+'</a></td><td width="10%"><i class="fa fa-check"></i><a href="#"></a></td></tr><hr>');
        }
    }

    var output2 = function(){
        console.log("offline output");
        tb.animate({opacity: "1"});
        for(var y = 0; y < offline.length; y++){
                tb.append('<tr class="offline"><td width="20%"><img src="'+offline[y].logo+'" class="img"></td><td width="70%" id="td"><a href="'+offline[y].url+'" target="_blank"><b>'+offline[y].names+'</b></a><br><p>Not Streaming</p></td><td width="10%"><i class="fa fa-close"></i><a href="#"></a></td></tr><hr>');
        }
    }

    $('#ol').on('click', function(){
        if(track == "ol"){
            // do nothing
        }
        else{
          track = "ol";
            console.log("online");
            tb.animate({opacity: "0"}, 100, function(){
                console.log("Trying to empty");
                tb.empty();
                output1();
            });  
        }        
    });

    $('#of').on('click', function(){
        if(track == "of"){
            //do nothing
        }
        else{
            track = "of";
            console.log("offline");
            tb.animate({opacity: "0"}, 100, function(){
                console.log("trying to empty");
                tb.empty();
                output2();
            });
        }
    });

    $('#al').on('click', function(){
        if(track == "al"){
            //do nothing
        }
        else{
           track = "al";
            tb.animate({opacity: "0"}, 100, function(){
                tb.empty();
                output();
            }); 
        }
    });


});

var test = "http://www.zacharydurland.com/twitch-app/";
var link = "https://wind-bow.glitch.me/twitch-api/channels/ogamingsc2?callback=?";
    