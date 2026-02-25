import { useCallback, useState } from "react";

const MAX_Z = 10000;
let globalZ = 10;

export default function useMaxZIndex(): [number, () => void] {
  const [zIndex, setZIndex] = useState(() => ++globalZ);
  const updateZIndex = useCallback(() => {
    globalZ = Math.min(globalZ + 1, MAX_Z);
    setZIndex(globalZ);
  }, []);
  return [zIndex, updateZIndex];
}
