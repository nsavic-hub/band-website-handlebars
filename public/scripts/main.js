/* eslint-env jquery */
var speed = 500
var pageNo = 1

// random data
var data = {
  'shirt' : {
    'name' : 'chor u sevcav t-shirt',
    'desc' : 'Printed Wild Ones "Chor U sevcav" album cover art on black t-shirt, 100% preshrunk cotton, 4.5 oz, fine knit jersey',
    'price' : 35,
    'image' : 'shirt.JPG'
  },
  'phone' : {
    'name' : 'mobilskal',
    'desc' : 'Aussie manufactured Eco freindly Silicone cases printed with the most vibrant and unique images.',
    'price' : 10,
    'image' : 'phone.JPG'
  },
  'jumper' : {
    'name' : 'hoppare',
    'desc' : `Keep things simple with this beautifully presented sweater in rich fabric. Thanks to the easy, straight cut and stylized graphic, it's versatile enough to go with all your favorite jeans.`,
    'price' : 45,
    'image' : 'jumper.JPG'
  },
  'hat' : {
    'name' : 'hattUo',
    'desc' : `A short, flexible brim makes it easy to style. While the great fit and breathable fabric mean it sits comfortably all-day long.`,
    'price' : 25,
    'image' : 'hat.JPG'
  },
  'record1' : {
    'name' : 'There will be wolves vinyl',
    'desc' : 'Vinyl record from the first feature album',
    'price' : 35,
    'image' : 'record1.JPG'
  },
  'record2' : {
    'name' : 'Buildings of nature vinyl',
    'desc' : 'Vinyl record from the second studio feature album',
    'price' : 35,
    'image' : 'record2.JPG'
  },
  'record3' : {
    'name' : 'If these trees could talk vinyl',
    'desc' : 'Vinyl record from the third feature album',
    'price' : 35,
    'image' : 'record3.JPG'
  },
  'record4' : {
    'name' : 'Red sky vinyl',
    'desc' : 'Vinyl record from the final feature album',
    'price' : 35,
    'image' : 'record4.JPG'
  }
}

// next page
$(document).on("click", 'img[alt="Next"]', function(){
  pageNo++
  if (pageNo > 5){
    pageNo = 1
    lastPage()
    return
  }
  
  var page = '#page' + pageNo
  var template = $(page).html()
  
  $('.page').after(template)
  
  var target = $('.page:eq(1)');
  
  if( target.length ) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: target.offset().top
    }, speed)
  }
  
  setTimeout(() => {
    $('.page:eq(0)').remove()
  }, speed);
})

function lastPage(){
  var template = $('#page1').html()
  $('.page').before(template)

  var target = $('.page:eq(0)')
  target.addClass('fixed')
  target.css( "top", "-100%" )

  target.animate({
    top: "0%"
  }, speed)
  $('.page:eq(1)').animate({
    marginTop: "100%"
  }, speed, function(){
    target.removeClass('fixed')
    $('.page:eq(1)').remove()
  })
}

// display menu
$(document).on("click", 'img[alt="Menu"]', function(){
  var target = $('.page:eq(0)');
  target.animate({
    opacity: 0.25,
    marginLeft: "100%"
  }, speed, function() {
    target.addClass('d-none');
  });
  
  var menu = $('.menu');
  menu.animate({
    right: "0%"
  }, speed)
})

//exit menu
$(document).on("click", 'img[alt="Exit"]', function(){
  exitMenu()
})

function exitMenu(){
  var menu = $('.menu')
  menu.animate({
    right: "100%"
  }, speed)
  
  var target = $('.page:eq(0)')
  target.removeClass('d-none')
  target.animate({
    opacity: 1,
    marginLeft: "0%"
  }, speed)
}

// item size select
$(document).on("click", '.list-group-item-2', function(){
  var active = $('.active')
  active.removeClass('active')
  $(this).addClass('active')
})

// display item
$(document).on("click", 'img[alt="Item"]', function(){
  var item = this.name
  var source = $('#item').html()
  var template = Handlebars.compile(source)
  $('.page').after(template(data[item]))

  var target = $('.page:eq(0)');
  target.addClass('fixed')

  target.animate({
    opacity: 0.25,
    right: "100%"
  }, speed, function() {
    target.addClass('d-none');
  });
  
  item = $('.item');
  item.animate({
    left: "0%"
  }, speed)
})

// exit item
$(document).on("click", 'img[alt="ExitAlt"]', function(){
  var item = $('.item');
  item.animate({
    left: "100%"
  }, speed, function() {
    item.remove();
  });
  
  var target = $('.page:eq(0)');
  target.removeClass('d-none');
  target.animate({
    opacity: 1,
    right: "0%"
  }, speed, function() {
    target.removeClass('fixed')
  })
})

// image slider
function restartSlider(){
  $('.slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
  })
}

$(document).on("click", 'img[alt="Next"]', function(){
  restartSlider()
})

// menu option click
$(document).on("click", '.menu-option', function(){
  pageNo = $(this).attr("value")

  var page = '#page' + pageNo
  var template = $(page).html()
  
  $('.page').after(template)
  
  $('.page:eq(0)').remove()
  var target = $('.page:eq(0)')
  target.css("marginLeft", "100%")
  target.addClass('d-none');
  restartSlider()
  
  exitMenu()
})