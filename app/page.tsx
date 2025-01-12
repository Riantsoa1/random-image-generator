'use client'

import { useState } from "react";

interface UnsplashImage {
  urls: {
    small: string;
    full: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
}

const unsplash_access_key = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!;

export default function Page() {

  const [imagedata, setImageData] = useState<UnsplashImage | null>(null);
  const [error, setError] = useState(null);

  async function fetchRandomPhoto() {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?client_id=${unsplash_access_key}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      setImageData(result);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setImageData(null);
    }
  }


  return (
    <main >
      <div>
      <p>Pull a random photo</p>
      <div>
        {error && <p className="text-red-500">{error}</p>}
        {imagedata && (
          <div  className="flex items-center">
            <img src={imagedata.urls.small} alt={imagedata.alt_description || "Random Unsplash"} className="mt-4" />
            <p>Photo by {imagedata.user.name}</p>
          </div>
        )}
      </div>
      <button onClick={fetchRandomPhoto}>Pull</button>
      </div>    
    </main>
  );
}
