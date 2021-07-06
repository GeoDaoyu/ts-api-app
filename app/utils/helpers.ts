type Coord = number[] | __esri.Point;

export function bearing(start: Coord, end: Coord): number {
  const coordinates1 = getCoord(start);
  const coordinates2 = getCoord(end);

  const lon1 = degreesToRadians(coordinates1[0]);
  const lon2 = degreesToRadians(coordinates2[0]);
  const lat1 = degreesToRadians(coordinates1[1]);
  const lat2 = degreesToRadians(coordinates2[1]);
  const a = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const b =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

  return Math.atan2(a, b);
}

/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
export function degreesToRadians(degrees: number): number {
  const radians = degrees % 360;
  return (radians * Math.PI) / 180;
}

/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
export function radiansToDegrees(radians: number): number {
  const degrees = radians % (2 * Math.PI);
  return (degrees * 180) / Math.PI;
}

export function getCoord(coord: __esri.Point | number[]): number[] {
  if (Array.isArray(coord)) {
    return coord;
  } else {
    return [coord.longitude, coord.latitude, coord.z];
  }
}
