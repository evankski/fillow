// mapboxgl.accessToken = 'pk.eyJ1IjoiZXZhbmtza2kiLCJhIjoiY2wwNXQwcTd3MXBnbDNqcWczNjhmdWdlcSJ9.D3iVd4cxcndnRxuyAc1KcQ';
//     const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
//     mapboxClient.geocoding
//         .forwardGeocode({
//             query: '209 w country club dr, brentwood ca',
//             autocomplete: false,
//             limit: 1
//         })
//         .send()
//         .then((response) => {
//             if (
//                 !response ||
//                 !response.body ||
//                 !response.body.features ||
//                 !response.body.features.length
//             ) {
//                 console.error('Invalid response:');
//                 console.error(response);
//                 return;
//             }
//             const feature = response.body.features[0];

//             const map = new mapboxgl.Map({
//                 container: 'map',
//                 style: 'mapbox://styles/mapbox/streets-v11',
//                 center: feature.center,
//                 zoom: 14
//             });

//             // Create a marker and add it to the map.
//             new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
//         });
