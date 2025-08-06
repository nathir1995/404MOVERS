import { useContext } from "react";
import { IntlContext } from "utility/context/Internationalization";

const useDictionary = () => {
  return useContext(IntlContext).state.messages;
};

export default useDictionary;
