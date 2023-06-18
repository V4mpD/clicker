import { useState, FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "./store";

const LINK_LIST = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Log in",
    path: "/login",
  },
  {
    label: "Create Account",
    path: "/register",
  },
];

const Header: FC = () => {
  const localId = useAppSelector((state) => state.auth.data?.localId);
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="global-header">
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-xl">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button className="navbar-toggler" type="button" onClick={onClick}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 global-header__nav">
            {LINK_LIST.map((item, idx) => (
              <li key={idx} className="nav-item">
                {(item.label === "Create Account" || item.label === "Log in") &&
                localId ? null : (
                  <Link className="nav-link active" to={item.path}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          {isOpen ? (
            <div className="navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {LINK_LIST.map((item, idx) => (
                  <li key={idx} className="nav-item">
                    <Link className="nav-link active" to={item.path}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Header;
