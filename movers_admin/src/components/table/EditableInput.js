import React from "react";
import Select from "react-select";
import { Input } from "reactstrap";

const EditableInput = ({
  value,
  valueToRender,
  options,
  onChange,
  type = "text",
  ...props
}) => {
  const [editing, setEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOptionChange = (selectedOption) => {
    setInputValue(selectedOption.value);
  };

  const handleBlur = () => {
    setEditing(false);
    onChange(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const renderInput = () => {
    if (type === "select") {
      return (
        <Select
          ref={inputRef}
          options={options}
          value={options.find((option) => option.value === inputValue)}
          onChange={handleOptionChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="React w-100"
          classNamePrefix="select"
          menuPortalTarget={document.body}
          {...props}
        />
      );
    }

    return (
      <Input
        innerRef={inputRef}
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  };

  const renderValue = () => {
    if (!["", null, undefined].includes(valueToRender)) {
      return valueToRender;
    }
    if (!["", null, undefined].includes(value)) {
      return value;
    }
    return (
      <span style={{ opacity: 0.5, fontStyle: "italic" }}>
        Click to add a value
      </span>
    );
  };

  return (
    <div className="w-100">
      {editing ? (
        renderInput()
      ) : (
        <span onClick={() => setEditing(true)}>{renderValue()}</span>
      )}
    </div>
  );
};

export default EditableInput;
