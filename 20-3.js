const container = document.querySelector(".image-container");

document.querySelector(".next").onclick = () => {
    container.scrollLeft += 300;
}

document.querySelector(".prev").onclick = () => {
    container.scrollLeft -= 300;
}

function zoomImage(img){
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("zoomed").src = img.src;
}

function closeZoom(){
    document.getElementById("overlay").style.display = "none";
}