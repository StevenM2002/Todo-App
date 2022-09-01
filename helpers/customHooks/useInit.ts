import {useEffect, useState} from "react";

const useInit: (callback: () => void) => void = callback => {
  const [isUsed, setIsUsed] = useState(false);
  useEffect(() => {
    if (!isUsed) {
      callback();
      setIsUsed(true);
    }
  }, [callback, isUsed]);
};

export default useInit;
