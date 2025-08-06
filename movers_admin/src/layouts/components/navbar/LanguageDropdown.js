// import React, { useState } from "react";
// import ReactCountryFlag from "react-country-flag";
// import languageConfig from "configs/languageConfig";
// import useLanguageSelector from "utility/language/useLanguageSelector";
// import PropTypes from "prop-types";
// import {
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   DropdownToggle,
// } from "reactstrap";

// const LanguageDropdown = ({ menuDirection = "right", ...props }) => {
//   const { activeLanguage, switchLanguage } = useLanguageSelector();
//   const [langDropdown, setLangDropdown] = useState(false);

//   const handleLangDropdown = () => setLangDropdown(!langDropdown);

//   return (
//     <Dropdown
//       // tag="li"
//       {...props}
//       className="dropdown-language nav-item"
//       isOpen={langDropdown}
//       toggle={handleLangDropdown}
//       data-tour="language"
//     >
//       <DropdownToggle tag="a" className="nav-link">
//         <ReactCountryFlag
//           className="country-flag"
//           countryCode={languageConfig[activeLanguage].countryCode}
//           svg
//         />
//         <span className="d-sm-inline-block d-none text-capitalize align-middle ml-50">
//           {languageConfig[activeLanguage].name}
//         </span>
//       </DropdownToggle>
//       <DropdownMenu right={menuDirection === "right"}>
//         {Object.keys(languageConfig).map((locale) => {
//           const langObj = languageConfig[locale];

//           return (
//             <DropdownItem
//               key={locale}
//               tag="a"
//               onClick={(e) => switchLanguage(locale)}
//             >
//               <ReactCountryFlag
//                 className="country-flag"
//                 countryCode={langObj.countryCode}
//                 svg
//               />
//               <span className="ml-1">{langObj.name}</span>
//             </DropdownItem>
//           );
//         })}
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

// LanguageDropdown.propTypes = {
//   menuDirection: PropTypes.oneOf(["right", "left"]),
// };

// export default LanguageDropdown;

const LanguageDropdown = () => {
  return null;
};

export default LanguageDropdown;
