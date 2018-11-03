export const setToLocalCollection = ({ collection, key, payload }) => {
  let getCollection = JSON.parse(localStorage.getItem(collection)) || {};
  if (!key) {
    getCollection = payload;
  } else {
    getCollection[key] = payload;
  }
  localStorage.setItem(collection, JSON.stringify(getCollection));
};

export const filters = {
  distance: (hotel, filter = null) => hotel <= filter || !filter,
  rating: (hotel, filter = null) => hotel >= filter || !filter,
  priceCategory: (hotel, filter = "") => hotel === filter || !filter,
  amenities: (hotel, filter = []) =>
    filter.every(a => hotel.includes(a)) || filter.length === 0
};

export const getMinMaxOf = (arr, prop) => {
  let nums = arr.reduce((a, b) => [...a, b[prop]], []);
  return {
    min: Math.round(Math.min(...nums)),
    max: Math.round(Math.max(...nums))
  };
};
