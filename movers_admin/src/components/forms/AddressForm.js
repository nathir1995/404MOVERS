import React from "react";

import { Col, Row } from "reactstrap";

import { useFormikContext } from "formik";
import { ValidatedField } from "components/input/ValidatedField";
import CountrySelectFeild from "views/components/selectFields/CountrySelectField";
import CountryStateSelectFeild from "views/components/selectFields/CountryStateSelectField";

const AddressForm = () => {
  const formik = useFormikContext();

  return (
    <>
      <Row xs={1} sm={1} md={2} lg={3} xl={3}>
        <Col>
          <CountrySelectFeild
            onChange={(opt) => {
              formik.setFieldValue("state_id", "");
            }}
          />
        </Col>
        <Col>
          <CountryStateSelectFeild country_id={formik.values.country_id} />
        </Col>
        <Col>
          <ValidatedField name="city" label="City" placeholder="City" />
        </Col>
      </Row>
      <Row xs={1} sm={1} md={1} lg={3} xl={3}>
        <Col lg={5} xl={5}>
          <ValidatedField
            name="street1"
            label="Street 1"
            placeholder="Street 1"
          />
        </Col>
        <Col lg={5} xl={5}>
          <ValidatedField
            name="street2"
            label="Street 2"
            placeholder="Street 2"
          />
        </Col>
        <Col lg={2} xl={2}>
          <ValidatedField
            name="zip_code"
            label="Zip Code"
            placeholder="Zip Code"
          />
        </Col>
      </Row>
    </>
  );
};

export default AddressForm;
