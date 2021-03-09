// @ts-ignore
import React from "react";

const useRefCallback = <T extends any[]>(
  value: ((...args: T) => void) | undefined,
  deps?: React.DependencyList
): (...args: T) => void => {
  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  }, deps ?? [value]);

  return React.useCallback((...args: T) => {
    ref.current?.(...args);
  }, []);
};

export { useRefCallback };