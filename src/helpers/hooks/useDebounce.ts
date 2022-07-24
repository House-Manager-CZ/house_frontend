import { useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";
import useIsMounted from "./useIsMounted";

function useDebounce(cb: Function, delay: number) {
  const options = {
    leading: false,
    trailing: true,
  };

  const inputsRef = useRef<{ cb: Function; delay: number }>({ cb, delay });
  const isMounted = useIsMounted();

  useEffect(() => {
    inputsRef.current = { cb, delay };
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    debounce(
      (...args) => {
        if (inputsRef.current.delay === delay && isMounted())
          inputsRef.current.cb(...args);
      },
      delay,
      options
    ),
    [delay, debounce]
  );
}

export default useDebounce;
