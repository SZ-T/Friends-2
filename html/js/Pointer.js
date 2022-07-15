// SVGs to reduce server requests
var options = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-dots-vertical' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cdesc%3EDownload more icon variants from https://tabler-icons.io/i/dots-vertical%3C/desc%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Ccircle cx='12' cy='12' r='1' /%3E%3Ccircle cx='12' cy='19' r='1' /%3E%3Ccircle cx='12' cy='5' r='1' /%3E%3C/svg%3E";
var pin = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-map-pin' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cdesc%3EDownload more icon variants from https://tabler-icons.io/i/map-pin%3C/desc%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Ccircle cx='12' cy='11' r='3' /%3E%3Cpath d='M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z' /%3E%3C/svg%3E";
var pin_o = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-map-pin-off' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cdesc%3EDownload more icon variants from https://tabler-icons.io/i/map-pin-off%3C/desc%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cline x1='3' y1='3' x2='21' y2='21' /%3E%3Cpath d='M9.44 9.435a3 3 0 0 0 4.126 4.124m1.434 -2.559a3 3 0 0 0 -3 -3' /%3E%3Cpath d='M8.048 4.042a8 8 0 0 1 10.912 10.908m-1.8 2.206l-3.745 3.744a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 0 1 -.48 -10.79' /%3E%3C/svg%3E";

class Pointer {
    
    constructor(username, image, p, i='pointer.svg'){
        this.username = username;
        this.isVisible = true;
        // Create and position pointer overlay
        this.vectorLayer = new ol.layer.Vector({
            source:new ol.source.Vector({
                features: [new ol.Feature({
                    // Map position
                    geometry: new ol.geom.Point(ol.proj.fromLonLat(p)),
                    // Details for popup
                    desc: username,
                    src: image,
                })],
            }),
            // Pointer styling
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    scale: 0.8,
                    src: './images/' + i
                })
            })
        });
        
        map.addLayer(this.vectorLayer); 
    }
    
    // Move pointer to given location
    movePointer(p){
        this.vectorLayer.getSource().getFeatures()[0].setGeometry(new ol.geom.Point(ol.proj.fromLonLat(p)))
    }

    // Set whether pointer is hidden
    setVisible(t){
        this.vectorLayer.setVisible(t);
        this.isVisible = t;
    }

    // Toggle pointer visibility
    toggleVisibility(){
        if(this.isVisible){
            this.setVisible(false);
        } else {
            this.setVisible(true);
        }
    }
}


// Initialise popup
var overlay = new ol.Overlay({
    element: document.getElementById('popup'),
    positioning: 'bottom-center',
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});
map.addOverlay(overlay);

// Show popup on click of markers
map.on('singleclick', function (event) {
    // Check a marker exists at the clicked location, otherwise close the popup
    if (map.hasFeatureAtPixel(event.pixel)) {
        // Get the user properties
        let user = map.getFeaturesAtPixel(event.pixel)[0].getProperties();
        
        // Get the clicked location to place the popup
        let coordinate = event.coordinate;
        
        // Insert username and image into the popup
        document.getElementById('popup-content').innerHTML = '<b>'+user['desc']+'</b><br /><figure class="image is-64x64"><img class="is-rounded" src="'+user['src']+'"></figure>';
        overlay.setPosition(coordinate);
    } else {
        overlay.setPosition(undefined);
    }
});

// Close popup on map zoom
map.on('moveend', function (event) {
    overlay.setPosition(undefined);
});



// function recenter() {
//     map.getView().animate({
//         center: ol.proj.fromLonLat([-2.24, 53.475]),
//         zoom: map.getView().setZoom(5)
//     })
// }

// let positions = [[-2.24, 53.475], [-2.24, 55.475], [-0.24, 53.475]];
// var max_lon = 0;
// var max_lat = 0;
// var min_lon = 0;
// var min_lat = 0;
// for (let i = 0; i < positions.length; i++) {
//     new Pointer(positions[i])
//     if (positions[i][0] > max_lon) {
//     max_lon = positions[i][0];
//     }
//     if (positions[i][1] > max_lat) {
//     max_lat = positions[i][1];
//     }
//     if (positions[i][0] < min_lon) {
//     min_lon = positions[i][0];
//     }
//     if (positions[i][1] < min_lat) {
//     min_lat = positions[i][1];
//     }
// }