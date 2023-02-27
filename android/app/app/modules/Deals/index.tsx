export * from './Deals'



// useEffect(() => {
//     axios
//       .get(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${'Coffee'}.json?proximity=${72.5302907},+${23.0301461}5&access_token=${token}`,
//       )
//       .then((response0: any) => {
//         let featureCollection = response0?.data?.features?.map((item: any) => {
//           return [item?.geometry?.coordinates];
//         });
//         setCoffeeIcon(featureCollection);
//         console.log('featureCollection', featureCollection);
//       })

//       .catch(function (error) {
//         //console.log(error);
//       });
//   }, []);