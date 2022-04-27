import { useState } from "react";
function LazyImage({ src, alt, height, width, className, ...rest }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      loading="lazy"
      className={`${className ? className : ""} ${loaded ? "loaded" : ""}`}
      onLoad={() => setLoaded(true)}
      height={height}
      width={width}
      src={src}
      alt={alt}
      {...rest}
    />
  );
}

export default LazyImage;
