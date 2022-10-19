import { useEffect, useRef } from "react";

export const useObserver = (ref, canload, isLoading, callback) => {
  const observer = useRef();

  // entries - массив элементов, за которыми мы наблюдаем + можно получить информацию (target - сам наблюдаемый элемент, IsIntersecting - элемент в зоне видимости или нет?)
  useEffect(() => {
    // var options = {
    //   root: document.querySelector("#scrollArea"),
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    if (isLoading) return;
    // Если обсервер за чем-то наблюдает, отключаем наблюдение
    if (observer.current) observer.current.disconnect();
    var cb = function (entries, observer) {
      /* Content excerpted, show below */
      if (entries[0].isIntersecting && canload) {
        callback();
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current);
  }, [isLoading]);
};
