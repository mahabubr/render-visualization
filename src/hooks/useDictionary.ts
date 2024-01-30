import { useEffect, useState } from "react";
import { useScrollPosition } from "./useScrollPosition";

export type Dictionary = string[];

const fetchDictionary = async (
  offset: number,
  limit: number
): Promise<Dictionary> => {
  const response = await fetch(
    `https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt`
  );
  const text = await response.text();
  const slicedData = text.split("\r\n").slice(offset, offset + limit);
  return slicedData;
};

export const useDictionary = () => {
  const [dictionary, setDictionary] = useState<Dictionary>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const json = await fetchDictionary(offset, 30);
        // await new Promise((resolve) => setTimeout(resolve, 500));
        setDictionary((prevDictionary) => [...prevDictionary, ...json]);
        // setLoading(false);
      } catch (error) {
        console.error(error);
        // setLoading(false);
      }
    };

    fetchData();

    const handleScroll = () => {
      const listElement = document.getElementById("inner-scroll");

      if (!listElement) {
        return;
      }

      const scrollHeight = listElement.scrollHeight;
      const currentHeight = listElement.scrollTop + listElement.clientHeight;

      if (currentHeight + 1 >= scrollHeight) {
        setOffset((prevOffset) => prevOffset + 30);
      }
    };

    const listElement = document.getElementById("inner-scroll");
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [offset]);

  return { dictionary, loading };
};
