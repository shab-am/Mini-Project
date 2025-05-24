import * as turf from '@turf/turf';

export const calcDistance = function (altitude, velocity) {
  altitude = altitude * 1000.0;
  velocity = (velocity * 5.0) / 18.0;
  return velocity * Math.sqrt(altitude / 4.9);
};

export const creepyLineMotion = function (poly, len) {
  let shortLen = len;
  let list = [];
  let point = turf.destination(turf.point(poly[0][1]), shortLen, 90);
  let grid = turf.polygon(poly);
  let from = turf.point(poly[0][1]);
  let to = turf.point(poly[0][2]);

  let longLen = turf.distance(from, to) - 2 * shortLen;

  let dest = point;
  while (turf.booleanPointInPolygon(dest, grid)) {
    //1
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, shortLen, 180);
    if (!turf.booleanPointInPolygon(dest, grid))
      break;

    //2
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, longLen, 90);
    if (!turf.booleanPointInPolygon(dest, grid))
      break;

    //3
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, shortLen, 180);
    if (!turf.booleanPointInPolygon(dest, grid))
      break;

    //4
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, longLen, -90);
  }

  return turf.polygon([list]);
}

export const spiralMotion = function (poly, len) {
  let distance = len;
  let list = [];
  let grid = turf.polygon(poly);
  let point = turf.centroid(grid);

  let dest = point;
  while (turf.booleanPointInPolygon(dest, grid)) {
    //1
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, distance, 0);
    if (!turf.booleanPointInPolygon(dest, grid))
      break;

    //2
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, distance, 90);
    if (!turf.booleanPointInPolygon(dest, grid))
      break;

    distance += len;
    //3
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, distance, 180);
    if (!turf.booleanPointInPolygon(dest, grid))
      break;

    //4
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, distance, -90);

    distance += len;
  }

  return turf.polygon([list]);
}

export const addProperties = function (rescueTeam, poly) {
  let length = turf.length(poly);
  let time = length / rescueTeam.speed;

  return {
    speed: rescueTeam.speed,
    fieldofview: rescueTeam.fieldofview,
    distance: length,
    time: time
  }
}

export const calcSquareJson = function (newLatLon, side, direction, cellSide) {
  side = side / 100.0;

  let latlon1 = [newLatLon[0] + side, newLatLon[1] + side / 2];
  let latlon2 = [newLatLon[0] + side, newLatLon[1] - side / 2];
  let latlon3 = [newLatLon[0] - side, newLatLon[1] - side / 2];
  let latlon4 = [newLatLon[0] - side, newLatLon[1] + side / 2];

  let poly = turf.polygon([
    [
      [latlon1[1], latlon1[0]],
      [latlon2[1], latlon2[0]],
      [latlon3[1], latlon3[0]],
      [latlon4[1], latlon4[0]],
      [latlon1[1], latlon1[0]],
    ],
  ]);
  let options = { pivot: [newLatLon[1], newLatLon[0]] };
  let rotatedPoly = turf.transformRotate(poly, direction, options);
  let area = turf.area(poly) / 1000000;

  const { coordinates } = rotatedPoly.geometry;

  var features = turf.featureCollection([
    turf.point(coordinates[0][0], { name: 'A' }),
    turf.point(coordinates[0][1], { name: 'B' }),
    turf.point(coordinates[0][2], { name: 'C' }),
    turf.point(coordinates[0][3], { name: 'D' }),
  ]);

  var bigRec = turf.envelope(features);
  let squareGrid = turf.squareGrid(bigRec.bbox, cellSide);

  let filteredGrid = {
    type: 'FeatureCollection',
    features: squareGrid.features.filter((obj) => {
      let poly2 = turf.polygon(obj.geometry.coordinates);
      let centroid = turf.centroid(poly2);
      return turf.booleanPointInPolygon(centroid, rotatedPoly);
    })
  };

  return {
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: crypto.randomUUID(),
          center: [newLatLon[0].toPrecision(8), newLatLon[1].toPrecision(8)],
          properties: {
            type: 'land',
            area: area.toFixed(2) + ' sq km',
            shape: 'rectangle',
            description: 'this area is very dangerous.',
            crashPoint: `${newLatLon[0].toPrecision(8)} , ${newLatLon[1].toPrecision(8)}`,
          },
          geometry: {
            type: 'Polygon',
            coordinates: [coordinates[0]],
          },
        },
      ],
    },
    filteredGrid,
  };
};

export const calcLatLon = function (latitude, longitude, direction, distance) {
  let radius = 6371e3; // (Mean) radius of earth

  let toRadians = function (v) {
    return (v * Math.PI) / 180;
  };
  let toDegrees = function (v) {
    return (v * 180) / Math.PI;
  };

  let δ = Number(distance) / radius; // angular distance in radians
  let θ = toRadians(Number(direction));

  let φ1 = toRadians(Number(latitude));
  let λ1 = toRadians(Number(longitude));

  let sinφ1 = Math.sin(φ1),
    cosφ1 = Math.cos(φ1);
  let sinδ = Math.sin(δ),
    cosδ = Math.cos(δ);
  let sinθ = Math.sin(θ),
    cosθ = Math.cos(θ);

  let sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ;
  let φ2 = Math.asin(sinφ2);
  let y = sinθ * sinδ * cosφ1;
  let x = cosδ - sinφ1 * sinφ2;
  let λ2 = λ1 + Math.atan2(y, x);

  return [toDegrees(φ2), ((toDegrees(λ2) + 540) % 360) - 180]; // normalise to −180..+180°
};
