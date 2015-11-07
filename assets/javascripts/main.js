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

function owlGallery($this) {
  $this.find(".owl-item.active").find(".small-img").removeClass("current");
  var $thisImageRef = $this.find(".owl-item.active").eq(1).find(".small-img").addClass("current");
  var imgRefString = $thisImageRef.attr("src");
  $thisImageRef.parents(".gallery").find(".big-img").attr("src", imgRefString);
  if ($thisImageRef.hasClass("vertical")) {
    $thisImageRef.parents(".gallery").find(".big-img").addClass("vertical");
  } else {
    $thisImageRef.parents(".gallery").find(".big-img").removeClass("vertical");
  }
}

function addActiveToImage($this) {
  $(".small-img").removeClass("current");
  $this.addClass("current");
  var imgRefString = $this.attr("src");
  $this.parents(".gallery").find(".big-img").attr("src", imgRefString);
  if ($this.hasClass("vertical")) {
    $this.parents(".gallery").find(".big-img").addClass("vertical");
  } else {
    $this.parents(".gallery").find(".big-img").removeClass("vertical");
  }
}

function openGallery() {
  $(document).on("click", ".small-img", function () {
    var $this = $(this);
    addActiveToImage($this);
  });
}

function openLightGallery() {
  $(document).on("click", ".big-img", function () {
    var $this = $(this);
    var imgRefString = $this.attr("src");
    $this.parents(".gallery").find(".small-img").each(function() {
      if ($(this).attr("src") == imgRefString) {
        $(this).click();
      }
    });
  });
}

$(function () {

  if ($(".fancybox").length) {
    $(".fancybox").fancybox({
      openEffect: 'none',
      closeEffect: 'none'
    });
  }

  if ($.fn.carouFredSel && ($(".slider").length)) {
    sliderInitialise();
    $(window).resize(function () {
      sliderInitialise();
    });
  }

  if ($("#lightgallery").length) {
    var $lg = $("#lightgallery");
    $lg.lightGallery({
      thumbnail: true,
      thumbMargin: 5,
      autoplay: true
    });
  }


  if ($(".owl-carousel").length) {
    openLightGallery();
    var owl = $(".owl-carousel");
    owl.each(function () {
      var $this = $(this);
        $this.owlCarousel({
          margin: 5,
          autoplay: true,
          autoplaySpeed: 1000,
          autoWidth: true,
          stopOnHover: true,
          autoplayHoverPause: true,
          loop: true,
          items: 8
        })
          .on("changed.owl.carousel", function () {
        owlGallery($this);
      })
        .lightGallery({
          thumbnail: true,
          thumbMargin: 5,
          autoplay: true
        });
      $this.parents(".gallery").hover(function () {
        $this.trigger("stop.owl.autoplay");
      }, function () {
        $this.trigger("play.owl.autoplay");
      });
    });
    var bottomOwl = $("#owl-carousel");
    bottomOwl.owlCarousel({
      margin: 5,
      autoplay: true,
      autoplaySpeed: 1000,
      autoWidth: true,
      stopOnHover: true,
      autoplayHoverPause: true,
      loop: true,
      items: 20
    })
      .on("changed.owl.carousel", function () {
        owlGallery(bottomOwl);
      })
      .lightGallery({
        thumbnail: true,
        thumbMargin: 5,
        autoplay: true
      });
    bottomOwl.parents(".large-gallery").hover(function () {
      bottomOwl.trigger("stop.owl.autoplay");
    }, function () {
      bottomOwl.trigger("play.owl.autoplay");
    });
  }
});