export function fetchProductsBySearchQuery(searchQuery, sort, pagination) {
  let queryString = "";
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      `/products/search/${searchQuery}?${queryString}`
    );
    const data = await response.json();
    const searchTotalItems = await response.headers.get("X-Total-Count");
    resolve({
      data: { searchResults: data, searchTotalItems: +searchTotalItems },
    });
  });
}
