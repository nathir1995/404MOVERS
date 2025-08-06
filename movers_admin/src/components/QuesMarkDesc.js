import React from "react";
import { Tooltip } from "reactstrap";
import PropTypes from "prop-types";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const QuesMarkDesc = ({ id, children, iconProps }) => {
  const ID = `description_tooltip_${id}`;
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleTooltip = React.useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <HelpOutlineIcon id={ID} {...iconProps} />
      <Tooltip
        placement="right"
        isOpen={isOpen}
        target={ID}
        toggle={toggleTooltip}
        // style={tooltipStyle}
      >
        {children}
      </Tooltip>
    </>
  );
};

export default QuesMarkDesc;

QuesMarkDesc.propTypes = {
  id: PropTypes.string.isRequired,
  iconProps: PropTypes.object,
};

QuesMarkDesc.defaultProps = {
  iconProps: {
    style: {
      fontSize: "18px",
      marginBottom: "2px",
    },
  },
};
