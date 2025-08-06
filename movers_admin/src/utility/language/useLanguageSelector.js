import { useContext, useEffect } from "react";
import { IntlContext } from "utility/context/Internationalization";
import { ContextLayout } from "utility/context/Layout";
import languageConfig from "configs/languageConfig";

const useLanguageSelector = () => {
  const contextLayout = useContext(ContextLayout);
  const intlContext = useContext(IntlContext);

  //   useEffect(() => {
  //     const oldDir = contextLayout.state.direction;
  //     const newDir = languageConfig[intlContext.state.locale].dir;
  //     if (oldDir !== newDir) {
  //       contextLayout.switchDir(newDir);
  //     }
  //   }, [contextLayout, contextLayout.state.direction, intlContext.state.locale]);

  useEffect(() => {
    contextLayout.switchDir(languageConfig[intlContext.state.locale].dir);
    //eslint-disable-next-line
  }, [intlContext.state.locale]);

  return {
    activeLanguage: intlContext.state.locale,
    switchLanguage: intlContext.switchLanguage,
  };
};

export default useLanguageSelector;
