import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TopBar.css";

interface TopBarProps {
  username: string | null;
  profilePath: string;
  breadcrumb: string[];
}

const TopBar: React.FC<TopBarProps> = ({ username, profilePath, breadcrumb }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // back to login
  };

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <h2 className="logo">Green Health Care Portal</h2>
        <nav className="breadcrumb">
          {breadcrumb.map((crumb, index) => (
            <span key={index} className="crumb">
              {crumb}
              {index < breadcrumb.length - 1 && " > "}
            </span>
          ))}
        </nav>
      </div>

      <div className="top-bar-right">
        <span className="signed-in">
          Signed in as{" "}
          <a onClick={() => navigate(profilePath)} className="profile-link">
            {username}
          </a>
        </span>
        <span className="separator">|</span>
        <a onClick={handleLogout} className="logout-link">Logout</a>
      </div>
    </header>
  );
};

export default TopBar;
