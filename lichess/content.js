var whiteClock = "<div class=\"time\" title=\"white clock\">" ;
var blackClock =  "<div class=\"time\" title=\"black clock\">" ;
var sepEnd = "</sep>";
var divEnd = "<";

var User = {
    profilename: '',
    top_username: '' ,
    bottom_username: '' // 'top' or 'bottom'
};
var Time = { hours : 0, minutes: 0, seconds: 0 };

function start(){

    console.log("We are running content.js wohoooo");
    getUserName();

    //if we are playing. set a function to play audio alert.
    //otherwise, do not output any audio.
    if(User.profilename === User.top_username ||
        User.profilename === User.bottom_username ) {
        console.log("Low time alert is enabled.");
        setInterval(  runLowClockAlert , 250);
    }
}

function getUserName(){
    var elem = document.getElementById('user_tag');
    var bottom_user = document.getElementsByClassName("ruser-bottom");
    var top_user = document.getElementsByClassName("ruser-top");

    var profile_name = elem.innerHTML;
    User.profilename = profile_name;

    if( bottom_user && top_user ){

        bottom_user = bottom_user.item(0).innerHTML;
        top_user = top_user.item(0).innerHTML;

        User.bottom_username = parseUserName( bottom_user );
        User.top_username = parseUserName( top_user ) ;
    }
}
function parseUserName(elem){
    var i1, i2;
    i1 = elem.indexOf("<a ");
    i1 = elem.indexOf(">", i1);
    i2 = elem.indexOf("</a>", i1);
    return elem.substring(i1+1, i2);
}

function runLowClockAlert(){


    if(User.profilename === User.bottom_username ){ 
        parseTime(document.getElementsByClassName('rclock-bottom'));  
    }
    else if(User.profilename === User.top_username ) { 
        parseTime( document.getElementsByClassName('rclock-top'));
    }
    else {console.log("something is wrong"); return;} // do not play any audio. The user is not playing.
    //console.log("Time : " + Time.minutes +":"+Time.seconds);

    //play audio when it is low.
    if(Time.minutes ==0 && Time.seconds ==0 ) return;
    if( Time.seconds <= 10 &&  Time.minutes <1 ){
        chrome.runtime.sendMessage({ type: "play", file: Time.seconds });
    }

}
function parseTime( elem ){
    //we need the 'hour' time parsing. missing.

    if( elem === null || elem === undefined ) return;
    if( elem.item(0) === null || elem.item(0) === undefined ) return;
    var html = elem.item(0).innerHTML;  
    var length;
    var index1 = html.indexOf(whiteClock);
    if(index1 < 0 ){
        index1 = html.indexOf(blackClock);
        if(index1 < 0  ){ return;}
        else length = blackClock.length;
    }else length = whiteClock.length;

    var index2 = html.indexOf("<sep ");
    if(index2 < 0 ) return;

    Time.minutes = Number( html.substring(index1+length, index2) );

    index1 = html.indexOf(sepEnd);
    index2 = html.indexOf( divEnd, index1+sepEnd.length );
    var seconds_str = html.substring(index1 + sepEnd.length, index2);

    Time.seconds = Number( seconds_str );
}

start();

