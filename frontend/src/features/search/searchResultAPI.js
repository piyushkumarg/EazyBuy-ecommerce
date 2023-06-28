export function fetchProductsBySearchQuery(searchQuery) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "http://localhost:8080/products?q=" + searchQuery
    );
    const data = await response.json();
    resolve({ data });
  });
}