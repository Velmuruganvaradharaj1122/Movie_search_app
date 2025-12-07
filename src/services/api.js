const API_KEY = "f56d9819";  
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (title, type, page = 1) => {
  const typeParam = type ? `&type=${type}` : "";
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${title}${typeParam}&page=${page}`
    );
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return { Response: "False", Error: "Network Error" };
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};