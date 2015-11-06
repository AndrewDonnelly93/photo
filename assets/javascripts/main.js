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

function openGallery() {
  $(".gallery").find(".small-img").on("click",function() {
    $(".small-img").removeClass("active");
    $(this).addClass("active");
    var imgRefString = $(this).attr("src");
    $(this).parents(".gallery").find(".big-img").attr("src",imgRefString);
    if ($(this).hasClass("vertical")) {
      $(this).parents(".gallery").find(".big-img").addClass("vertical");
    } else {
      $(this).parents(".gallery").find(".big-img").removeClass("vertical");
    }
  });
  $(".gallery").each(function() {
    var galleryLength = 0;
    var marginWidth = 5;
    var newMargin = marginWidth - 1;
    $(this).find("li").each(function() {
      galleryLength += $(this).width();
    });
    galleryLength += ($(this).find("li").length - 1) * marginWidth;
    if (galleryLength > $(this).width()) {
      $(this).find("li").css("margin-right",newMargin + "px");
    }
  });
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

  if ($(".gallery").length) {
    openGallery();
    $(window).resize(function() {
      openGallery();
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
   /* $lg.on('onBeforeOpen.lg',function(event){
      $(".lg-outer .lg-thumb-item").css("width","auto");
      $(".lg-outer .lg-thumb-item").html("yo");
    });*/
  }

  if ($(".owl-carousel").length) {
    $(".owl-carousel").owlCarousel();
  }
});