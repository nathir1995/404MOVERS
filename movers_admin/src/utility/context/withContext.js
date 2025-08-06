import React from "react";
import { ContextLayout } from "./Layout";
import { IntlContext } from "./Internationalization";

export const withContextLayout = (Component) => {
  return (props) => {
    return (
      <ContextLayout.Consumer>
        {(contextLayout) => {
          return <Component contextLayout={contextLayout} {...props} />;
        }}
      </ContextLayout.Consumer>
    );
  };
};

export const withIntlContxt = (Component) => {
  return (props) => {
    return (
      <IntlContext.Consumer>
        {(intlContext) => {
          return <Component intlContext={intlContext} {...props} />;
        }}
      </IntlContext.Consumer>
    );
  };
};
