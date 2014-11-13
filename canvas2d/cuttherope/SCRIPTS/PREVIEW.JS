//ïëàâàþùèé ñîö. áëîê
var col_li = $("#slides>ul li").length;
var socialFixed = function () {
    $(function () {
        var offset = $(".hd #social").offset();
        if (offset != null) {
            $(window).scroll(function () {
                if ($(window).scrollTop() > offset.top) {
                    $(".hd #social").stop().animate({top: $(window).scrollTop() - offset.top + 53});
                } else {
                    $(".hd #social").stop().animate({top: 53});
                }
                ;
            });
        }
    });
    //$("#fixed").css("visibility","visible");
}

//ïåðåêëþ÷åíèå hd è sd
var change = function (type, obj) {
    if ($(obj).hasClass('open')) {
        return false;
    } else if (type == 'sd') {
        //$('.loading').fadeIn(500);
        setTimeout(function () {
            $('body').removeClass('hd').addClass('sd');
            $('#game_content .hd').removeClass('open');
            $('#game_content .sd').addClass('open');
            $('#social').css({left: 585, top: 10});
            //$('.loading').fadeOut(1000);
        }, 500);
    } else if (type == 'hd') {
        //$('.loading').fadeIn(500);
        setTimeout(function () {
            $('body').removeClass('sd').addClass('hd');
            $('#game_content .sd').removeClass('open');
            $('#game_content .hd').addClass('open');
            $('#social').css({left: 5, top: 53});
            //$('.loading').fadeOut(1000);
            socialFixed();
        }, 500);
    }

    return false;
}

function checkMail() {
    var elem = $("#subscribed input");
    if (elem.val().length != 0) {
        var email = elem.val().replace(/^\s+|\s+$/g, '');
        if ((/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(email)) {
            $("#subscribed .result_on").css("display", "block");
            $("#subscribed .result_off").css("display", "none");
            elem.removeClass("error");
        }
        else {
            $("#subscribed .result_off").css("display", "block");
            elem.addClass("error")
        }
    } else {
        $("#subscribed .result_off").css("display", "none");
        elem.removeClass("error");
    }
}


//ïëååð
function updateHTML(elmId, value) {
    document.getElementById(elmId).innerHTML = value;
}

// Loads the selected video into the player.
function loadVideo() {
    var selectBox = document.getElementById("videoSelection");
    var videoID = selectBox.options[selectBox.selectedIndex].value

    if (ytplayer) {
        ytplayer.loadVideoById(videoID);
    }
}

// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
    alert("An error occured of type:" + errorCode);
}

function onPlayerStateChange(newState) {
    if (newState == 0) {
        var elem, tec_elem = $("#slides .active").text() * 1;
        //alert("dddd "+(tec_elem+1)+" "+col_li);
        if (col_li == tec_elem) elem = $("#slides>ul li").eq(0).find("a"); else elem = $("#slides>ul li").eq(tec_elem + 1).find("a");
        $("#play").css("display", "block");
        $("#videoblock img").css("display", "block");
        click_vid_prev(elem);

        //play_video("not_hide");
        //pauseVideo();
    }
}

// 2. This code loads the IFrame Player API code asynchronously.
//var tag = document.createElement('script');
//tag.src = "//www.youtube.com/iframe_api";
//var firstScriptTag = document.getElementsByTagName('script')[0];
//firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
//var ytplayer;
//function onYouTubeIframeAPIReady() {

  //var videoId = $("#slides .active").parent().attr("href");

  //ytplayer = new YT.Player('videoDiv', {
  //    height: '353',
   //   width: '627',
    //  videoId: videoId,
    //  events: {
     //     'onStateChange': onPlayerStateChange
     // }
  //});
//}

function setVideoVolume() {
    var volume = parseInt(document.getElementById("volumeSetting").value);
    if (isNaN(volume) || volume < 0 || volume > 100) {
        alert("Please enter a valid volume between 0 and 100.");
    }
    else if (ytplayer) {
        ytplayer.setVolume(volume);
    }
}

function playVideo() {
    if (ytplayer) {
        ytplayer.playVideo();
    }
}

function pauseVideo() {
    if (ytplayer) {
        ytplayer.pauseVideo();
    }
}

function muteVideo() {
    if (ytplayer) {
        ytplayer.mute();
    }
}

function unMuteVideo() {
    if (ytplayer) {
        ytplayer.unMute();
    }
}

function play_video(par) {
    par = par || "hide"
    var videoID = $("#slides .active").parent().attr("href");
    if (ytplayer) {
        ytplayer.loadVideoById(videoID);
    }
    if (par == "hide") {
        $("#play").css("display", "none");
        $("#videoblock img").css("display", "none");
    }
    //return false;
}

function click_vid_prev(elem) {
//alert("click_vid_prev");
    if (elem.find(".active").lengtn != 0) {
        $("#slides .active").remove();
        $("#slides .selected").removeClass("selected");
        elem.append("<em class='active'>" + elem.parent().index() + "</em>");
        elem.parent().addClass("selected");
        appendImg(elem);
        pauseVideo();
        play_video("not_hide");
        pauseVideo();


    }
}

function appendImg(elem) {
    $("#videoblock img").remove();
    if (elem.attr("href")) {
        var src = elem.find("img").eq(0).attr("src").replace("GALLERY/INDEX.HTM", "/gallery/big_")
        $("#videoblock").append('<img src="' + src + '" width="128" height="65" alt="">');
        $("#play").css("display", "block")
        $("#soclink_onvideo").css("z-index", "5");
    } else {
        $("#videoblock").append('<img src="images/gallery/soon.jpg" width="128" height="65" alt="">');
        $("#soclink_onvideo").css("z-index", "100");
        $("#play").css("display", "none")
    }
    $("#videoblock img").css("display", "block");
}

$(document).ready(
    function () {
        $("#soclink_onvideo").css("visibility", "visible");
        if ($("body").hasClass("hd")) {
            socialFixed();
        }
        $("#game_top .width").css("visibility", "visible");

        $("#wallpapers").megamenu({"show_method": "slideDown", "hide_method": "slideUp"});
        $("#wallpapers .wallp").live("click", function () {
            return false
        })

        $("#subscribed input").val("");

        var $container = $(".container");


//êëèê íà êàðòèíêó
        $("#slides ul a").live("click", function (e) {
            e.preventDefault();
            click_vid_prev($(this));
        });


        $("#subscribed .ok").live("click", function () {
            checkMail();
            return false
        });
        $("#subscribed input").live("keypress", function (A) {
            if (A.which == "13") {
                checkMail();
                return false;
            }
        });


        appendImg($("#slides a").eq(0));

        /*
         $container.wtScroller({
         num_display:4,
         slide_width:670,
         slide_height:98,
         slide_margin:1,
         button_width:17,
         ctrl_height:17,
         margin:5,
         auto_scroll:false,
         delay:4000,
         scroll_speed:1000,
         easing:"",
         auto_scale:false,
         move_one:false,
         ctrl_type:"scrollbar",
         display_buttons:true,
         mouseover_buttons:false,
         display_caption:true,
         mouseover_caption:false,
         caption_effect:"slide",
         caption_align:"bottom",
         caption_position:"inside",
         cont_nav:false,
         shuffle:false,
         mousewheel_scroll:true
         });

         */

        $('.menu-item.active').hover(
            function () {
                $(this).stop().animate({opacity: 1}, 500);
            },
            function () {
                $(this).stop().animate({opacity: 0}, 500);
            }
        );

    });