var stardefault = 'silver';
var starhover = 'red';
var starset = 'purple';
var starconsensus = 'black';
var rating = '0';
var posturl = '';
var saction = '';
var gaction = '';
var rid = 0;
var uid = 0;
var aupdate = true;

function getStars() {
    url = posturl + '/' + gaction + '/' + rid + '/' + uid;
    //alert(url);

    $.ajax({
        type: 'GET',
        url: url,
        data: '',
        async: true,
        success: function ( data ) {
            var response = $.parseJSON(data);

            console.log(response);

            if(typeof response.error !== "undefined") {
                alert(response.error);
                return false;
            }

            /* set the rating if necessary */
            setRating(response['rating']);
            rating = response['rating'];
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function rateInit(url, routeid, userid, getaction, setaction, autoupdate) {
    posturl = url;
    rid = routeid;
    uid = userid;
    gaction = getaction;
    saction = setaction;
    if(typeof autoupdate !== 'undefined') {
        aupdate = autoupdate;
    }
    aupdate = autoupdate;
}

function setStars(rated) {
    url = posturl + '/' + saction + '/' + rid + '/' + uid + '/' + rated;
    //alert(url);

    if(aupdate == false) {
        setRating('0');
        rating = rated;
        $('#user_rating').val(rated);
        setRating(rated);
        return true;
    }

    $.ajax({
        type: 'GET',
        url: url,
        data: '',
        async: true,
        success: function ( data ) {
            var response = $.parseJSON(data);
            if(typeof response.error !== "undefined") {
                alert(response.error);
                return false;
            }
            setRating('0'); //reset coloring
            rating = rated;
            setRating(rated);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    return true;
}

function setRating(rated) {
    switch(rated) {
        case '5':
        case 5:
            $('#star5').css('color', starset);
        case '4':
        case 4:
            $('#star4').css('color', starset);
        case '3':
        case 3:
            $('#star3').css('color', starset);
        case '2':
        case 2:
            $('#star2').css('color', starset);
        case '1':
        case 1:
            $('#star1').css('color', starset);
            break;
        case '0':
        case 0:
            $('#star5').css('color',  stardefault);
            $('#star4').css('color',  stardefault);
            $('#star3').css('color',  stardefault);
            $('#star2').css('color',  stardefault);
            $('#star1').css('color',  stardefault);
            break;
        default:
            alert('Rating not valid: ' + rated);
            return false;
    }
    return true;
}

function setConsensusRating(rated, obj) {
    rated = roundToHalf(rated);
    if(typeof(obj) === 'undefined') {
        obj = '';
    }
    switch(rated) {
        case '5':
        case 5:
            $('#consensusstar5'+obj).css('color', starconsensus);
        case '4.5':
        case 4.5:
            if(rated == 4.5) {
                $('#consensusstar5'+obj).css('color', starconsensus).addClass('fa-star-half').removeClass('fa-star');
            }

        case '4':
        case 4:
            $('#consensusstar4'+obj).css('color', starconsensus);

        case '3.5':
        case 3.5:
            if(rated == 3.5) {
                $('#consensusstar4'+obj).css('color', starconsensus).addClass('fa-star-half').removeClass('fa-star');
                $('#consensusstar5'+obj).addClass('hide');
            }
        case '3':
        case 3:
            $('#consensusstar3'+obj).css('color', starconsensus);
        case '2.5':
        case 2.5:
            if(rated == 2.5) {
                $('#consensusstar3'+obj).css('color', starconsensus).addClass('fa-star-half').removeClass('fa-star');
                $('#consensusstar4'+obj).addClass('hide');
                $('#consensusstar5'+obj).addClass('hide');
            }
        case '2':
        case 2:
            $('#consensusstar2'+obj).css('color', starconsensus);
        case '1.5':
        case 1.5:
            if(rated == 1.5) {
                $('#consensusstar2'+obj).css('color', starconsensus).addClass('fa-star-half').removeClass('fa-star');
                $('#consensusstar3'+obj).addClass('hide');
                $('#consensusstar4'+obj).addClass('hide');
                $('#consensusstar5'+obj).addClass('hide');
            }
        case '1':
        case 1:
            $('#consensusstar1'+obj).css('color', starconsensus);
            break;
        case '.5':
        case .5:
            if(rated == .5) {
                $('#consensusstar1'+obj).css('color', starconsensus).addClass('fa-star-half').removeClass('fa-star');
                $('#consensusstar2'+obj).addClass('hide');
                $('#consensusstar3'+obj).addClass('hide');
                $('#consensusstar4'+obj).addClass('hide');
                $('#consensusstar5'+obj).addClass('hide');
            }
        case '0':
        case 0:
            $('#consensusstar5'+obj).css('color',  stardefault).addClass('fa-star').removeClass('fa-star-half').removeClass('hide');
            $('#consensusstar4'+obj).css('color',  stardefault).addClass('fa-star').removeClass('fa-star-half').removeClass('hide');
            $('#consensusstar3'+obj).css('color',  stardefault).addClass('fa-star').removeClass('fa-star-half').removeClass('hide');
            $('#consensusstar2'+obj).css('color',  stardefault).addClass('fa-star').removeClass('fa-star-half').removeClass('hide');
            $('#consensusstar1'+obj).css('color',  stardefault).addClass('fa-star').removeClass('fa-star-half').removeClass('hide');
            //<i class="fa fa-star-half"></i>
            break;
        default:
            alert('Rating not valid: ' + rated);
            return false;
    }
    return true;
}

$('#star5').hover(function() {
    $('#star5').css('color', starhover);
    $('#star4').css('color', starhover);
    $('#star3').css('color', starhover);
    $('#star2').css('color', starhover);
    $('#star1').css('color', starhover);
}, function() {
    $('#star5').css('color', stardefault);
    $('#star4').css('color', stardefault);
    $('#star3').css('color', stardefault);
    $('#star2').css('color', stardefault);
    $('#star1').css('color', stardefault);
    setRating(rating);
});
$('#star5').click(function() {
    setStars('5');
});

$('#star4').hover(function() {
    $('#star4').css('color', starhover);
    $('#star3').css('color', starhover);
    $('#star2').css('color', starhover);
    $('#star1').css('color', starhover);
}, function() {
    $('#star4').css('color', stardefault);
    $('#star3').css('color', stardefault);
    $('#star2').css('color', stardefault);
    $('#star1').css('color', stardefault);
    setRating(rating);
});
$('#star4').click(function() {
    setStars('4');
});

$('#star3').hover(function() {
    $('#star3').css('color', starhover);
    $('#star2').css('color', starhover);
    $('#star1').css('color', starhover);
}, function() {
    $('#star3').css('color', stardefault);
    $('#star2').css('color', stardefault);
    $('#star1').css('color', stardefault);
    setRating(rating);
});
$('#star3').click(function() {
    setStars('3');
});

$('#star2').hover(function() {
    $('#star2').css('color', starhover);
    $('#star1').css('color', starhover);
}, function() {
    $('#star2').css('color', stardefault);
    $('#star1').css('color', stardefault);
    setRating(rating);
});
$('#star2').click(function() {
    setStars('2');
});

$('#star1').hover(function() {
    $('#star1').css('color', starhover);
}, function() {
    $('#star1').css('color', stardefault);
    setRating(rating);
});
$('#star1').click(function() {
    setStars('1');
});

function roundToHalf(value) {
    var converted = parseFloat(value); // Make sure we have a number
    var decimal = (converted - parseInt(converted, 10));
    decimal = Math.round(decimal * 10);
    if (decimal == 5) { return (parseInt(converted, 10)+0.5); }
    if ( (decimal < 3) || (decimal > 7) ) {
        return Math.round(converted);
    } else {
        return (parseInt(converted, 10)+0.5);
    }
}

/******** Used to control pages that need to contain multiple star ratings/routes */
var thisrating = 0;
var routeid = 0;

function setParams(star) {
    /* pick up the route */
    var arry = star.id.split('-');
    routeid = arry[1];
    /* pick up the current value */
    if($('#rating'+routeid).val() == '') {
        thisrating = 0;
    } else {
        thisrating = $('#rating'+routeid).val();
    }
}

$('.star5').hover(function() {
    setParams(this);
    $('#star5-' + routeid).css('color', starhover);
    $('#star4-' + routeid).css('color', starhover);
    $('#star3-' + routeid).css('color', starhover);
    $('#star2-' + routeid).css('color', starhover);
    $('#star1-' + routeid).css('color', starhover);
}, function() {
    $('#star5-' + routeid).css('color', stardefault);
    $('#star4-' + routeid).css('color', stardefault);
    $('#star3-' + routeid).css('color', stardefault);
    $('#star2-' + routeid).css('color', stardefault);
    $('#star1-' + routeid).css('color', stardefault);
    setRatingByRoute(0, routeid); //clear previous rating
    setRatingByRoute(thisrating, routeid);
});
$('.star5').click(function() {
    thisrating = 5;
    $('#rating' + routeid).val(thisrating);
});

$('.star4').hover(function() {
    setParams(this);
    $('#star4-' + routeid).css('color', starhover);
    $('#star3-' + routeid).css('color', starhover);
    $('#star2-' + routeid).css('color', starhover);
    $('#star1-' + routeid).css('color', starhover);
}, function() {
    $('#star4-' + routeid).css('color', stardefault);
    $('#star3-' + routeid).css('color', stardefault);
    $('#star2-' + routeid).css('color', stardefault);
    $('#star1-' + routeid).css('color', stardefault);
    setRatingByRoute(0, routeid); //clear previous rating
    setRatingByRoute(thisrating, routeid);
});
$('.star4').click(function() {
    thisrating = 4;
    $('#rating' + routeid).val(thisrating);
});

$('.star3').hover(function() {
    setParams(this);
    $('#star3-' + routeid).css('color', starhover);
    $('#star2-' + routeid).css('color', starhover);
    $('#star1-' + routeid).css('color', starhover);
}, function() {
    $('#star3-' + routeid).css('color', stardefault);
    $('#star2-' + routeid).css('color', stardefault);
    $('#star1-' + routeid).css('color', stardefault);
    setRatingByRoute(0, routeid); //clear previous rating
    setRatingByRoute(thisrating, routeid);
});
$('.star3').click(function() {
    thisrating = 3;
    $('#rating' + routeid).val(thisrating);
});

$('.star2').hover(function() {
    setParams(this);
    $('#star2-' + routeid).css('color', starhover);
    $('#star1-' + routeid).css('color', starhover);
}, function() {
    $('#star2-' + routeid).css('color', stardefault);
    $('#star1-' + routeid).css('color', stardefault);
    setRatingByRoute(0, routeid); //clear previous rating
    setRatingByRoute(thisrating, routeid);
});
$('.star2').click(function() {
    thisrating = 2;
    $('#rating' + routeid).val(thisrating);
});

$('.star1').hover(function() {
    setParams(this);
    $('#star1-' + routeid).css('color', starhover);
}, function() {
    $('#star1-' + routeid).css('color', stardefault);
    setRatingByRoute(0, routeid); //clear previous rating
    setRatingByRoute(thisrating, routeid);
});
$('.star1').click(function() {
    thisrating = 1;
    $('#rating' + routeid).val(thisrating);
});

function setRatingByRoute(rated, routeid) {
    switch(parseInt(rated)) {
        case 5:
            $('#star5-'+routeid).css('color', starset);
        case 4:
            $('#star4-'+routeid).css('color', starset);
        case 3:
            $('#star3-'+routeid).css('color', starset);
        case 2:
            $('#star2-'+routeid).css('color', starset);
        case 1:
            $('#star1-'+routeid).css('color', starset);
            break;
        case 0:
            $('#star5-'+routeid).css('color', stardefault);
            $('#star4-'+routeid).css('color', stardefault);
            $('#star3-'+routeid).css('color', stardefault);
            $('#star2-'+routeid).css('color', stardefault);
            $('#star1-'+routeid).css('color', stardefault);
            break;
        default:
            alert('Rating not valid: ' + rated);
            return false;
    }
    return true;
}