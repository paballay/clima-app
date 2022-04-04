export function getIconWeather(iconCode: string) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export const APP_ID = process.env.REACT_APP_APP_ID;
export const EXCLUDE = process.env.REACT_APP_EXCLUDE;

export const CITIES = [
  { id: 'barcelona', name: 'Barcelona' },
  { id: 'manchester', name: 'Manchester' },
  { id: 'new york', name: 'New York' },
  { id: 'sydney', name: 'Sydney' },
];

export const HEADER_ITEMS = [
  { id: 1, url: '/', name: 'HOME' },
  { id: 2, url: '/city', name: 'BY CITY' },
  { id: 3, url: '/day', name: 'BY DAY' },
];

export const COORDS_DEFAULT = {
  latitude: -34.6083,
  longitude: -58.3712,
}
