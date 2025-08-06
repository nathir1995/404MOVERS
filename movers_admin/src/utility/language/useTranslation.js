import { useCallback } from "react";
import useDictionary from "./useDictionary";

export const useTranslation = () => {
  const dictionary = useDictionary();

  const getNestedTranslation = useCallback(
    (keys) => {
      return keys.reduce((obj, key) => {
        return obj?.[key];
      }, dictionary);
    },
    [dictionary]
  );

  const translate = useCallback(
    (key) => {
      const keys = key.split(".");
      return getNestedTranslation(keys) ?? key;
    },
    [getNestedTranslation]
  );

  return translate;
};

// const useTranslation = (words) => {
//   const dictionary = useDictionary();

//   return useMemo(() => {
//     if (!Array.isArray(words)) {
//       return dictionary[words] === undefined ? words : dictionary[words];
//     }

//     const obj = {};
//     words.forEach((word) => {
//       obj[word] = dictionary[word] === undefined ? word : dictionary[word];
//     });
//     return obj;
//   }, [dictionary, words]);
// };

// export default useTranslation;
