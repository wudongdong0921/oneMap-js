function mapAssist(obj) {
    this.parent = obj
    obj.parent.mapTop.getSource('assist') || obj.parent.mapTop.addSource('assist', {
        'type': 'geojson',
        'data': obj.data
    });

    obj.parent.mapTop.getLayer('park-boundary') || obj.parent.mapTop.addLayer({
        'id': 'park-boundary',
        'type': 'line',
        'source': 'assist',
        'paint': {
            'line-color': '#888888',
        },
        'filter': ['==', '$type', 'LineString']
    });

    // obj.parent.mapTop.addLayer({
    //     'id': 'park-volcanoes',
    //     'type': 'circle',
    //     'source': 'assist',
    //     'paint': {
    //         'circle-radius': 6,
    //         'circle-color': '#B42222'
    //     },
    //     'filter': ['==', '$type', 'Point']
    // });
}
mapAssist.prototype.removeMapAssist = function() {
    this.parent.parent.mapTop.getLayer('park-boundary') && this.parent.parent.mapTop.removeLayer('park-boundary')
    this.parent.parent.mapTop.getSource('assist') && this.parent.parent.mapTop.removeSource('assist')
}
export default mapAssist