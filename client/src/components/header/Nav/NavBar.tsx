import { FC } from "react";
import {
  IoNotificationsSharp,
  IoPerson,
  IoChatboxEllipses,
  IoSearchSharp,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBar: FC = () => {
  return (
    <nav className="header-nav">
      <div className="navbar-left">
        <span className="logo">kINdLY!</span>
      </div>
      <div className="navbar-center">
        <div className="navbar-search">
          <input type="text" name="" id="" />
          <IoSearchSharp />
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-icons">
          <div className="navbar-icon">
            <IoChatboxEllipses />
            <span className="icon-badge">1</span>
          </div>
          <div className="navbar-icon">
            <IoNotificationsSharp />
            <span className="icon-badge">1</span>
          </div>
          <div className="navbar-icon">
            <IoPerson />
          </div>
        </div>
        <div className="navbar-links">
          <span>
            <Link to="/auth/login">Login</Link>
          </span>
          <span>
            <Link to="/auth/register">Sign Up</Link>
          </span>
        </div>
        <div className="menu-icon">
          <input id="hamburger" className="hamburger" type="checkbox" />
          <label className="hamburger" htmlFor="hamburger">
            <i></i>
          </label>
          <section className="drawer-list">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/auth/register">Sign Up</Link>
              </li>
              <li>
                <Link to="/auth/login">login</Link>
              </li>
            </ul>
          </section>
        </div>
        <img src="" alt="avatar" style={{ display: "none" }} />
      </div>
    </nav>
  );
};

export default NavBar;
