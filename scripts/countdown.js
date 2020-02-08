var $ = require('jquery');

var countdownTime = new Date("00:20:00").getTime();

console.log('conneted')

var x = setInterval(function() {
    var time = countdownTime

    var hours = Math.floor((time % (1000 * 60 * 60 *24)) / (1000 * 60 * 60));
    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((time % (1000 * 60)) / 1000);

    $('#countDown').html(function() {
        hours + "h:" + minutes + "m:" + seconds + "s";
    });
}, 1000);