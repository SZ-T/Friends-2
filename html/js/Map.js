// Initialise map
var map = new ol.Map({
    controls: ol.control.defaults().extend([
        new ol.control.FullScreen()
    ]),
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([-2.24, 53.475]),
        // zoom: 11.9
        zoom: 1
    })
});