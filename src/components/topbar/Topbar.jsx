import { Link, useNavigate } from "react-router-dom";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { authActions } from "../store/Auth-slice";

export default function Topbar() {
  const dispatch = useDispatch();
  const History = useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    History("/");
  };
  const loggedIn = localStorage.getItem("enteredemail");

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">SocialApp</span>
        <span className="email">{loggedIn}</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link
            to="/Home"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <span className="topbarLink">Homepage</span>
          </Link>

          <span
            className="topbarLink"
            style={{ fontWeight: "bolder" }}
            onClick={logoutHandler}
          >
            Logout
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to="/profile">
          <img src="/assets/person/virat.jpg" alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}
