import React from "react";
import { IntlProvider } from "react-intl";
import { menu_messages } from "../../configs/languageConfig";

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  // state = {
  //   locale: localStorage.getItem("locale") || "en",
  //   messages: menu_messages[localStorage.getItem("locale") || "en"],
  // };
  state = {
    locale: "en",
    messages: menu_messages["en"],
  };

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;
    return (
      <Context.Provider
        value={{
          state: this.state,
          switchLanguage: (language) => {
            localStorage.setItem("locale", language);
            this.setState({
              locale: language,
              messages: menu_messages[language],
            });
          },
        }}
      >
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale="en"
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    );
  }
}

export { IntlProviderWrapper, Context as IntlContext };
