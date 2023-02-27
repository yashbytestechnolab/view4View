import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
// import MapboxGL from '@react-native-mapbox-gl/maps';
import ReturnIcon from '../../constants/DummyJson.ts/JsonFile';
import {Location} from '../../assets/icons/Location';
import {Colour} from '../../theme';

interface DistanceProps {
  startCoordinate: any;
  endCoordinate: any;

  iconName: any;
}

const DistanceMap = (props: DistanceProps) => {
  const {startCoordinate, endCoordinate, iconName} = props;
  const GeoJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {  type: "@turf"},

        geometry: {
          type: 'LineString',
          coordinates: [startCoordinate, endCoordinate],
        },
      },
    ],
  };
  const setIconInMap = (Icon: any) => {
    console.log('Icon', Icon);
    return (
      <View>
        <Icon color={Colour.primaryGreen} BGcolor={Colour.PrimaryBlue} />
      </View>
    );
  };
  return (
    <View
      style={{
        height: 198,
        overflow: 'hidden',
      }}>
      {/* <MapboxGL.MapView
        style={style.map}
        zoomEnabled={true}
        styleURL={'mapbox://styles/mapbox/streets-v11'}>
        <MapboxGL.Camera
          defaultSettings={{
            centerCoordinate: [0, 0],
            zoomLevel: 14,
          }}
          zoomLevel={4}
          followUserLocation={true}
          centerCoordinate={startCoordinate}
        />
        <MapboxGL.UserLocation
          visible={true}
         
        />

        <MapboxGL.PointAnnotation
          selected={true}
          key="key1"
          id="id1"
          coordinate={startCoordinate}>
        

        </MapboxGL.PointAnnotation>

        <MapboxGL.PointAnnotation
          selected={true}
          key="key2"
          id="id2"
          coordinate={endCoordinate}>
          <View>
            {setIconInMap(ReturnIcon(iconName))}
          </View>
        </MapboxGL.PointAnnotation>

        <MapboxGL.ShapeSource id="mapbox-directions-source" shape={GeoJson}>
          <MapboxGL.LineLayer
          
            id="route"
            
            style={{
              lineColor: 'orange',
              lineWidth: 2,
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView> */}
    </View>
  );
};
export default DistanceMap;
const style = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '10%',
  },
});


// import React, {useState, useEffect } from "react";
// import { View } from "react-native";
// import MapboxGL from '@react-native-mapbox-gl/maps';
// import {lineString as makeLineString} from '@turf/helpers';
// import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
// import { Colour } from "../../theme";

// const accessToken:any = MapboxGL.setAccessToken(
//   'sk.eyJ1IjoiY2VudGF2aXplciIsImEiOiJjbDZlb3ZjbTEwMWszM2twbWV0dTNuaTRvIn0.khHqf8vfS27qcoDFEm0j0w',
// );



// const directionsClient = MapboxDirectionsFactory({accessToken});
// interface DistanceProps {
//   startCoordinate: any;
//   endCoordinate: any;
//   coordinate: any;
//   iconName: any;
// }
// const DistanceMap = (props: DistanceProps)  =>{
//   const {startCoordinate, endCoordinate, coordinate, iconName} = props;
//   // const startCoordinate = [3.3362400, 6.5790100];
//   // const endCoordinate = [ 3.3750014, 6.5367877 ];

//   const [route, setRoute] = useState(null);

//   const startDestinationPoints = [startCoordinate,  endCoordinate]

//   useEffect(() => {
//     fetchRoute();
//   })
  
//   const fetchRoute = async () => {
//     const reqOptions:any = {
//       waypoints: [
//         {coordinates: startCoordinate},
//         {coordinates: endCoordinate},
//       ],
//       profile: 'driving-traffic',
//       geometries: 'geojson',
//     };

//     const res:any = await directionsClient.getDirections(reqOptions).send();

//     const newRoute:any = makeLineString(res.body.routes[0].geometry.coordinates);
//     setRoute(newRoute);
//   };

//   const renderAnnotations = () => {
//     return (
//       startDestinationPoints.map((point, index) => (
//         <MapboxGL.PointAnnotation
//             key={`${index}-PointAnnotation`}
//             id={`${index}-PointAnnotation`}
//             coordinate={point}> 
//             <View style={{
//               height: 30, 
//               width: 30, 
//               backgroundColor: '#00cccc', 
//               borderRadius: 50, 
//               borderColor: '#fff', 
//               borderWidth: 3
//             }} 
//           />
//         </MapboxGL.PointAnnotation>
//       ))
//     );
//   }

//   const setIconInMap = (Icon: any) => {
//     console.log('Icon', Icon);
//     return (
//       <View>
//         <Icon color={Colour.primaryGreen} BGcolor={Colour.PrimaryBlue} />
//       </View>
//     );
//   };
//   return (
//     <View style={{flex: 1, height: "100%", width: "100%" }}>
//       <MapboxGL.MapView
//         styleURL={MapboxGL.StyleURL.Street}
//         //zoomLevel={11}
//         //centerCoordinate={startingPoint}
//         style={{flex: 1}}>
//           <MapboxGL.Camera
//             zoomLevel={11}
//             centerCoordinate={startCoordinate}
//             animationMode={'flyTo'}
//             animationDuration={0}
//           >
//           </MapboxGL.Camera>
//           {renderAnnotations()}
//           {
//           route && (
//            <MapboxGL.ShapeSource id='shapeSource' shape={route}>
//               <MapboxGL.LineLayer id='lineLayer' style={{lineWidth: 5, lineJoin: 'bevel', lineColor: '#ff0000'}} />
//             </MapboxGL.ShapeSource>
//           )
//         }
//       </MapboxGL.MapView>
//     </View>
//   )
// }
// export default DistanceMap