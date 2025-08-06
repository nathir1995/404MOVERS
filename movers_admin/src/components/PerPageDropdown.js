import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { ChevronDown } from "react-feather";
import PropTypes from "prop-types";
import { useTranslation } from "utility/language";

const perPageNumbers = [10, 15, 20, 30, 50];

const PerPageDropdown = ({ per_page, handlePerPage, ...props }) => {
  const t = useTranslation();
  return (
    <UncontrolledDropdown {...props} className="per_page_dropdown">
      <DropdownToggle tag="div">
        {per_page} {t("rows")}
        <ChevronDown className="ml-50" size={15} />
      </DropdownToggle>
      <DropdownMenu right>
        {perPageNumbers.map((num) => (
          <DropdownItem key={num} tag="div" onClick={() => handlePerPage(num)}>
            {num}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default PerPageDropdown;

PerPageDropdown.propTypes = {
  per_page: PropTypes.number.isRequired,
  handlePerPage: PropTypes.func.isRequired,
};
