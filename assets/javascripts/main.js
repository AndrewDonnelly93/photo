function sliderInitialise() {
  $(".slider").carouFredSel({
    responsive: true,
    items: {
      visible: 1,
      height: 1080,
      width: 1920
    },
    scroll: {
      fx: "crossfade",
      duration: 1000,
      timeoutDuration: 3000,
      pauseOnHover: true
    },
    auto: {
      delay: 3000
    },
    pagination: ".pagination",
    cookie: true
  });
 /* $(".slider").hover(
    function () {
      $(".slider").trigger("stop");
    },
    function () {
      $(".slider").trigger("play", true);
    }
  );*/
}

function owlGallery() {
  $(".owl-item").find(".small-img").removeClass("current");
  var $this = $(".owl-item.active").eq(1).find(".small-img");
  $this.addClass("current");
  var imgRefString = $this.attr("src");
  $this.parents(".gallery").find(".big-img").attr("src",imgRefString);
  if ($this.hasClass("vertical")) {
    $this.parents(".gallery").find(".big-img").addClass("vertical");
  } else {
    $this.parents(".gallery").find(".big-img").removeClass("vertical");
  }
}

function addActiveToImage($this) {
  $(".small-img").removeClass("current");
  if ($this === ".small-img") {
    $this.addClass("current");
  } else {
    $this.find(".small-img").addClass("current");
  }
  var imgRefString = $this.attr("src");
  $this.parents(".gallery").find(".big-img").attr("src",imgRefString);
  if ($this.hasClass("vertical")) {
    $this.parents(".gallery").find(".big-img").addClass("vertical");
  } else {
    $this.parents(".gallery").find(".big-img").removeClass("vertical");
  }
}

function openGallery() {
  $(document).on("click",".small-img",function() {
    var $this = $(this);
    addActiveToImage($this);
  });
}

function getLastCurrentSlide(currentSlide) {
 // console.log(currentSlide);
 // var photoName = "big"; //photoName contains "big" and number, for ex. big11
//  var photoNameLastSymPosition = $this.lastIndexOf(photoName) + photoName.length;
  //var currentSlideNumber = $this.slice(photoNameLastSymPosition);
  //currentSlideNumber = currentSlideNumber.slice(0,currentSlideNumber.lastIndexOf("."));

 // var currentSlideNumber = currentSlide.index();
//  e.preventDefault();
  //console.log(currentSlideNumber);
  //carousel.to(carousel.relative($this.index()));
 // addActiveToImage($(currentSlide));
  return currentSlide.index() + 1;
}

$(function() {

  if ($(".fancybox").length) {
    $(".fancybox").fancybox({
      openEffect: 'none',
      closeEffect: 'none'
    });
  }

  if ($.fn.carouFredSel && ($(".slider").length)) {
   sliderInitialise();
   $(window).resize(function() {
     sliderInitialise();
   });
  }

  if ($("#lightgallery").length) {
    var $lg = $("#lightgallery");
    $lg.lightGallery({
      thumbnail: true,
      thumbMargin: 5,
      autoplay: true
      //showThumbByDefault: true
    });
  }

  if ($(".owl-carousel").length) {
    var owl = $(".owl-carousel");
    owl.each(function () {
      var currentSlide = 0;
      var currentSlideNumber = 0;
      $(this).owlCarousel({
        margin: 5,
        autoplay: true,
        autoplaySpeed: 1000,
        autoWidth: true,
        stopOnHover: true,
        autoplayHoverPause: true,
        loop: true,
        items: 10
      }).on("changed.owl.carousel", function () {
        owlGallery();
      })
        .parents(".gallery").hover(function () {
          console.log("gallery");
        //  owl.trigger("stop.owl.autoplay");
          openGallery();
        }, function () {
          currentSlide = $(this).find(".current").parents(".owl-item");
            //.attr("src");
          currentSlideNumber = getLastCurrentSlide(currentSlide);
          console.log(currentSlideNumber);
          console.log("gallery out");
          owl
            .trigger("to.owl.carousel",currentSlideNumber);
          addActiveToImage($(currentSlide));
            //.trigger("stop.owl.autoplay");
           // .trigger("play.owl.autoplay");
        });
    });
  }
});