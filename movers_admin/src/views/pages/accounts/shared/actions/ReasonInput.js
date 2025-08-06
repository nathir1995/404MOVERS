import React from "react";
import { FormGroup, Input } from "reactstrap";

const ReasonInput = ({ reason, setReason }) => {
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current?.focus?.();
  }, []);

  return (
    <FormGroup className="w-100">
      <h6>Reason</h6>
      <Input
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="form-control"
        type="textarea"
        innerRef={inputRef}
        placeholder="Reason"
      />
    </FormGroup>
  );
};

export default ReasonInput;
