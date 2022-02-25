export const fetchSearchResults = async (query) => {
  const API_URL = "https://api.skypack.dev/v1";
  if (query && query.length > 0) {
    /* replaces all whitespaces in the query with + symbol in order to 
    send it as a query param in the GET request */
    const parsedQuery = query.replaceAll(" ", "+");
    const url = `${API_URL}/search?q=${parsedQuery}`;
    const res = await fetch(url);
    const resJson = res.json();
    return resJson;
  } else {
    return [];
  }
};
