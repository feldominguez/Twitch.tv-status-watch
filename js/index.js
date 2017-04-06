///// INTERACTIVITY SECTION

$('#announce span').on('click', function() {
  window.open("http://codepen.io/philgetz/")
});

$('.status_change_button_all').on('click', function() {

  $('#title_container').hasClass('green-gradient') ? $('#title_container').removeClass('green-gradient') : $('#title_container').addClass('green-gradient');
  
  $(this).text() == 'ALL' ? $(this).text('LIVE') : $(this).text('ALL');
  $(this).toggleClass('green');
  $('.offline').closest('.stream').toggle();

})
///// INTERACTIVITY - NO API CALLS ABOVE THIS COMMENT





var users = ["codesmithio", "freecodecamp", 'williamchyr', 'adam13531', 'soulfoam', 'thorshand11', 'programmingarchon', "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "sheevergaming", "TR7K", "leveluplive",'elotrixlivestream','gronie7','tommey','scufjumpn','kevinho9','sevnh','azerondesigns','zyphal','sensitive_lover','moonmoon_ow','wtcnn','wyld','bacon_donut','soaryn'];

function getContent() {
  var clientId = 'fm5rldgi8vyb8cakcv65hci2z2d9sry';
  var count = 0;
  var streamStatus = 'https://api.twitch.tv/kraken/streams/';
  var channelInfo = 'https://api.twitch.tv/kraken/channels/';
  var noLogo = 'https://res.cloudinary.com/philgetz/image/upload/v1470130038/plainicon.com-46949-256px-353_u9tjhg.png';

users.map(function(value) {
     
 $.ajax({
 type: 'GET',
 url: channelInfo + value,
 headers: {
   'Client-ID': clientId
 },
 success: function(infoData){
   
      var channelName = infoData.name;
      var channelLogo = infoData.logo === null ? noLogo : infoData.logo;
      var channelLink = infoData.url;
        
   
   
   $.ajax({
 type: 'GET',
 url: streamStatus + value,
 headers: {
   'Client-ID': clientId
 },
 success: function(streamData){
   
   if (streamData.stream === null) {
          $('#streams_container').append("<div class='stream' onclick='window.open("+"\""+ channelLink +"\"" +")' id=" + count++ + "><div class='stream_user'><div class='stream_user_img' style='background-image:url(" + channelLogo + ")'></div><div class='stream_user_name'>" + channelName + "</div></div><div class='stream_title'>Not Live</div><div class='stream_status'><div class='stream_status_icon offline'></div></div></div>");
         // $('.stream').click(function() {
           // window.open(channelLink);
          //})

        } else {
          $('#streams_container').append("<div class='stream' onclick='window.open("+"\""+ channelLink +"\"" +")' id=" + count++ + "><div class='stream_user'><div class='stream_user_img' style='background-image:url(" + channelLogo + ")'></div><div class='stream_user_name'>" + channelName + "</div></div><div class='stream_title'>" + streamData.stream.game + "</div><div class='stream_status'><div class='stream_status_icon online'></div></div></div>");

         // $('.stream').click(function() {
           // window.open(channelLink);
          //})
        }
      }
   })

     
   
 }
}); 

  });
}


getContent();