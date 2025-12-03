import { useEffect, useState } from "react";

const useFetchImage = (path: string | undefined) => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (path) {
        setLoading(true);
        try {
          // Fix the URL construction
          const imageUrl = path.startsWith("http")
            ? path
            : `${process.env.NEXT_PUBLIC_BASE_URL}/get-image/${path
                .split("/")
                .pop()}`;

          const response = await fetch(imageUrl);
          if (!response.ok) {
            throw new Error(`Error fetching image: ${response.statusText}`);
          }
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          setImage(objectUrl);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [path]);

  return { image, loading, error };
};

export default useFetchImage;
