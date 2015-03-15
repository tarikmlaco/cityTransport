    var map;

    $(document).ready(function(){
      map = new GMaps({
        el: '#map',
        lat: 43.84248732,
        lng: 18.31453474
      });
    var socket = io.connect(window.location.host/* + ':3000'*/);
    socket.on('welcome', function(data) {
                $('#messages').append('<p>' + data.message + '</p>');

                socket.emit('i am client', {data: 'foo!'});
            });
      socket.on('time', function(data) {
                console.log(data);
                $('#messages').append('<p>' + data.time + '</p>');
            });
      socket.on('error', function() { console.error(arguments) });
      socket.on('message', function() { console.log(arguments) });    
    
     setInterval(function(){
      $.post(window.location +"api/messages",
      {
          longitude: 43.84248732,
          latitude: 18.31453474
      },
      function(data, status){
//        console.log("Data: " + data + "\nStatus: " + status);
          if(data!=undefined){
              $('#messages').html('');
              data.forEach(function(message){
                  $('#messages').append('<p id="'+message._id+'">' + '<p class="user">'+message.user  +'</p>'+ '<p class="messagebody">' + message.message + '</p><button class="messageremove">X</button>');
              });
          }
      });}, 5000);
    setInterval(function(){
        $.post(window.location + "api/buses",
            {
                longitude: 43.84248732,
                latitude: 18.31453474
            },
            function(data, status){
                map.setCenter(43.84248732, 18.31453474);
                map.addMarker({lat: 43.84248732, lng: 18.31453474});
                console.log("Data: " + data + "\nStatus: " + status);
                if(data!=undefined){
                    map.removeMarkers();
                    data.forEach(function(point){
                        console.log(point.line + ' ' + point.location[1] + ' ' + point.location[0] + '\n');
                        if(point.transport_type == "bus")
                        map.addMarker({
                            title: 'Bus ' + point.line.toString(),
                            lng: point.location[1],
                            lat: point.location[0],
                            icon: 'bus.png'
                        });
                        if(point.transport_type=="tram")
                            map.addMarker({
                                title: 'Tram ' + point.line.toString(),
                                lng: point.location[1],
                                lat: point.location[0],
                                icon: 'tram.png'
                            });
                    });
                }
                setInterval(function(){
                    //console.log('Timeout ended!');
                }, 5000);
//    console.log(data.coords.lat);
//    console.log(data.coords.long);
            });
    }, 5000);


  $('#myButton2').click(function(e) {
      
    e.preventDefault();
  


    
    });

        $('form').submit(function(e){
            e.preventDefault();
            var contents = $('#usermsg').val();
            if(contents!=""&&contents!=undefined){
                socket.emit('publicmsg', {sender: 'anonymous', message: contents});
            }
            $('#usermsg').val("");
        });



    });