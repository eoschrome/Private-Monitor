function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: {
        lat: 37.57000000000001,
        lng: 126.7521
      },
      styles: [
        {elementType: 'geometry', stylers: [{color: '#113156'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#ffffff'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
        blockProducerList.map(function(location,i){
        loctn=location.location.split(",");
        console.log(loctn);
        var image= 'https://image.winudf.com/v2/image/Y29tLndpa2ltYS50cnVtcF9pY29uXzBfODlkNWQ3Nzg/icon.png?w=30&fakeurl=1&type=.png';
        $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+loctn[0]+'&key=AIzaSyAe5WiXSHL5HJ54Ewdt0_eAuhcN-r_AA2o',function(data,status){
            return new google.maps.Marker({
                position:{
                    lat:data.results[0].geometry.location.lat,
                    lng:data.results[0].geometry.location.lng
                },
                map:map,
                icon:image,
                label:location
            });
        });
    });
}


