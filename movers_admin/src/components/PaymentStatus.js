import React from "react";
import { Badge } from "reactstrap";
import { useTranslation } from "utility/language";

import PropTypes from "prop-types";

const PaymentStatus = ({ payment_status }) => {
    const t = useTranslation();
    const all = {
        pending: { color: "secondary" },
        paid: { color: "success" },

    }


    return (
        <Badge color={all[payment_status].color}>
            {t(payment_status)}
        </Badge>
    );
};

PaymentStatus.propTypes = {
    payment_status: PropTypes.string.isRequired,
};

export default PaymentStatus;
