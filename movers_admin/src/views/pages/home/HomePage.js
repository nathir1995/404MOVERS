import React from "react";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";

import links from "./links";
import { NavLink } from "react-router-dom";

import classes from "./HomePage.module.scss";

const HomePage = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const searchInputRef = React.useRef(null);
  React.useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const filteredData = React.useMemo(() => {
    if (!searchValue || searchValue === "") return links;
    return links.filter((link) =>
      link.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }, [searchValue]);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-1 mb-2">
        <SearchInput
          onChange={setSearchValue}
          placeholder="Search"
          style={{ borderRadius: "6px", width: "240px" }}
          innerRef={searchInputRef}
        />
      </div>

      <div className={classes.container}>
        {filteredData.map((link) => (
          <NavLink to={link.navLink} key={link.title}>
            <Card className={classes.card}>
              <CardBody className={classes.body}>
                {link.icon}
                <p className="m-0">{link.title}</p>
              </CardBody>
            </Card>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default HomePage;
