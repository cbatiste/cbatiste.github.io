function loadMusic() {
  MUSIC.forEach((asset, id) => {
    let releaseDate = asset.released ? `${asset.released}` : "";
    let descriptionHTML = typeof asset.description == "string" ? `<p>${asset.description}</p>` : `<p>${asset.description.join("</p><p>")}</p>`;
    let assetID = `music-${id}`;

    let photoSquare = `
      <div class="photo-square grow ${assetID}">
        <img class="photo" src="${asset.imageURL}">
        <div class="photo-overlay row no-gutters" onclick="showInfoPull('${assetID}');">
          <div class="col align-self-center">
            <h4>${asset.title}</h4>
            <p>${releaseDate}</p>
          </div>
        </div>
      </div>
    `;

    let infoContent = `
      <div class="info-box ${assetID}">
        <h4>${asset.title}</h4>
        <p>${asset.artist}${releaseDate ? "," : ""} ${releaseDate}</p>
        <div class="section">
          ${descriptionHTML}
        </div>
        <a href="${asset.spotify}" target="_blank" style="font-size:16px;${asset.link ? "" : "display:none;"}"><i class="fab fa-spotify mr-1"></i> Listen on Spotify</a>
      </div>
    `;

    $("#page-music .music-container").append(photoSquare);
    $("#info-pull .content").append(infoContent);
  });
}

function loadPhotos() {
  LIBRARY.forEach((photo, index) => {
    let size = "";
    if (photo.level == 2) size = "grid-item--width2";

    $("#photo-library").append(`<div class="grid-item ${size}"><img src="${LIBRARY_ROOT}${photo.path}" /></div>`);
  });

  arrangePhotos();
  $("#photo-library").imagesLoaded(arrangePhotos);
}

function arrangePhotos() {
  $("#photo-library").masonry({
    columnWidth: ".grid-sizer",
    percentPosition: true,
    itemSelector: ".grid-item"
  });
}

function loadVideos() { }

function initialisePage() {
  loadMusic();
  loadPhotos();
  loadVideos();
}

function showPage(element, selector) {
  $(element).addClass("active");
  $(element).siblings().removeClass("active");
  $(".page").hide();
  $(selector).show();

  hideInfoPull();

  if (selector == "#page-photos") {
    arrangePhotos();
  }

  if ($(window).width() <= 640) {
    collapseSidebar();
  }
}

$(window).on("load", () => {
  showPage("#sidebar .item.page-me", "#page-me");
  initialisePage();
})