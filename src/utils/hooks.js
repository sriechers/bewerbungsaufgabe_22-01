import { useState, useEffect } from "react";

export const useSearchParams = () => {
  const [params, setParams] = useState({
    page: null,
    limit: null,
    id: null,
  });

  useEffect(() => {
    if (typeof window == undefined) return;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    setParams(() => ({
      page: urlParams.get("offset") || null,
      limit: urlParams.get("limit") || null,
      id: urlParams.get("id") || null,
    }));
  }, []);

  return params;
};
