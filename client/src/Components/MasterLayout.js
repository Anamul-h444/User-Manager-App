import React, { useRef } from "react";
import "../assets/css/sidebar.css";
import { Link } from "react-router-dom";
import {
  AiOutlineMenuUnfold,
  AiFillDashboard,
  AiOutlineLogout,
  AiOutlineAlignRight,
} from "react-icons/ai";
import { FaUserEdit, FaTasks } from "react-icons/fa";
import { BsUiChecks } from "react-icons/bs";
import { GiCancel, GiProgression } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";


function Sidebar(props) {
  // For Sidebar and content
  let sidebarRef = useRef;
  let contentRef = useRef;
  const sidebarHandler = () => {
    let sidebar = sidebarRef;
    let content = contentRef;

    if (sidebar.classList.contains("sidebar-open")) {
      sidebar.classList.add("sidebar-close");
      sidebar.classList.remove("sidebar-open");
      content.classList.add("content");
      content.classList.remove("content-expend");
    } else {
      sidebar.classList.remove("sidebar-close");
      sidebar.classList.add("sidebar-open");
      content.classList.remove("content");
      content.classList.add("content-expend");
    }
  };
  // For dropdown menu
  let itemRef = useRef();
  const MenuBarClickHandler = () => {
    let item = itemRef;
    if (item.classList.contains("item-section")) {
      item.classList.add("hide");
      item.classList.remove("item-section");
    } else {
      item.classList.remove("hide");
      item.classList.add("item-section");
    }
  };
  

  return (
    <main className="main ">
      <header className="header">
        <div className="header-toggle" onClick={sidebarHandler}>
          <AiOutlineMenuUnfold />
        </div>
        <div className="header-name-section">
          <AiOutlineAlignRight className="header-name-icon" />
          <h6 className="header-name">Task Manager</h6>
        </div>
      </header>

      <aside
        className="sidebar-open expandSidebar"
        ref={(div) => {
          sidebarRef = div;
        }}
      >
        <nav className="nav">
          <div>
            <div className="nav-list">
              <Link to="/" className=" nav-link">
                <p>
                  <AiFillDashboard className="nav-logo-icon" />
                </p>
                <span className=" nav-link-name"> Item One</span>
              </Link>

              <Link to="/UserProfilePage" className="nav-link">
                <FaUserEdit className="nav-logo-icon" />
                <span className="nav-link-name"> User Profile</span>
              </Link>

              <Link to="/NewPage" className="nav-link">
                <FaTasks className="nav-logo-icon" />
                <span className="nav-link-name"> Demo</span>
              </Link>

              <Link to="/ProgressPage" className="nav-link">
                <GiProgression className="nav-logo-icon" />
                <span className="nav-link-name"> Demo</span>
              </Link>

              <Link to="/CompletedPage" className="nav-link">
                <BsUiChecks className="nav-logo-icon" />
                <span className="nav-link-name"> Demo</span>
              </Link>

              <Link to="/CanceledPage" className="nav-link">
                <GiCancel className="nav-logo-icon" />
                <span className="nav-link-name"> Demo</span>
              </Link>

              <Link to="/ProfilePage" className="nav-link">
                <CgProfile className="nav-logo-icon" />
                <span className="nav-link-name"> Profile</span>
              </Link>

              <Link to="/log-out"  className="nav-link">
                <AiOutlineLogout className="nav-logo-icon" />
                <span className="nav-link-name"> Log-out</span>
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      <div
        className="content-expend"
        ref={(div) => {
          contentRef = div;
        }}
      >
        
        {props.children}
      </div>
    </main>
  );
}

export default Sidebar;
