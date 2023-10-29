import React, { useEffect, useRef } from 'react';

function LazyImage({ src, alt }) {
  const imgRef = useRef();
  const classes = img.getAttribute('className');

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          observer.unobserve(img); // Stop observing once loaded
        }
      });
    });

    observer.observe(imgRef.current);

    return () => {
      observer.unobserve(imgRef.current);
    };
  }, [src]);

  return <img className={classes} ref={imgRef} src={src} alt={alt} />;
}

export default LazyImage;
