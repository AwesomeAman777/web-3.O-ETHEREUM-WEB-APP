import { useEffect, useState } from "react";

const TEN_API_KEY='%20AIzaSyB9mhTIj3iR0WlNOzozwZ3TiQ5VoWllUBs%20'

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      const response = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${keyword.split(" ").join("")}&key=${TEN_API_KEY}&limit=1`
      );
      const { results } = await response.json();

      if (results.length > 0) {
        const { media_formats } = results[0];
        const gifFormat = media_formats?.gif;

        if (gifFormat && gifFormat.url) {
          setGifUrl(gifFormat.url);
        } else {
          // If gif format is not available, set a default URL
          setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284');
        }
      } else {
        // Set a default URL if no results are found
        setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284');
      }
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      // Set a default URL in case of error
      setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284');
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetch;
