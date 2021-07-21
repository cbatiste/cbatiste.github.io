/*** Utility Functions ***/

function map(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function constrain(num, min, max) {
  return Math.max(Math.min(num, max), min);
}

/*** DOM Modification Functions ***/

function expandSidebar() {
  $("#sidebar .sidebar-content").slideDown();
}

function collapseSidebar() {
  $("#sidebar .sidebar-content").slideUp();
}

function toggleSidebar() {
  if ($("#sidebar .sidebar-content").css("display") == "none") expandSidebar();
  else collapseSidebar();
}

function showInfoPull(asset_id) {
  if ($(window).width() <= 640) {
    $("body").css("overflow", "hidden");
  }

  $("#info-pull .info-box").hide();
  $("#info-pull ." + asset_id).show();

  $("#info-pull").show();
  expandInfoPull();
}

function hideInfoPull() {
  $("body").css("overflow", "auto");

  collapseInfoPull(0, () => {
    $("#info-pull").hide();
  });
}

function expandInfoPull(time=400, callback) {
  $("#info-pull").animate({
    right: 0
  }, time, callback);

  $("#info-pull .info-pull-collapse").attr("onclick", "collapseInfoPull()");
  $("#info-pull .info-pull-collapse i").removeClass("flip");
}

function collapseInfoPull(time=400, callback) {
  $("body").css("overflow", "auto");

  let boxWidth = $("#info-pull").width();
  $("#info-pull").animate({
    right: -boxWidth
  }, time, callback);

  $("#info-pull .info-pull-collapse").attr("onclick", "expandInfoPull()");
  $("#info-pull .info-pull-collapse i").addClass("flip");
}

/*** Window Event Handlers ***/

$(window).on("load", () => {
  hideInfoPull();
  $(window).trigger("resize");
  $(window).trigger("scroll");
});

let lastWidth = 0;
$(window).on("resize", () => {
  let width = $(window).width();
  if (lastWidth <= 640 && width > 640) {
    $("#sidebar .sidebar-content").show();
  } else if (lastWidth > 640 && width <= 640) {
    $("#sidebar .sidebar-content").hide();
  }

  lastWidth = width;
});
