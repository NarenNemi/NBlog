import { Link } from 'react-router-dom';
import './TopBar.css'
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function Topbar() {
const { user, dispatch } = useContext(Context)

const handleLogout = () => {
  dispatch({type:'LOGOUT'})
}

    return (
      <div className="top">
        <div className="topLeft">
          <i className="topIcon fab fa-facebook-square"></i>
          <i className="topIcon fab fa-instagram-square"></i>
          <i className="topIcon fab fa-pinterest-square"></i>
          <i className="topIcon fab fa-twitter-square"></i>
        </div>
        <div className='topCenter'>
        <ul className='topList'>
        <Link className='topListItem' style={{textDecoration: "none", color:'inherit'}} to={"/"}>Home</Link>
        <Link className='topListItem' style={{textDecoration: "none", color:'inherit'}} to={"/"}>About</Link>
        <Link className='topListItem' style={{textDecoration: "none", color:'inherit'}} to={"/"}>Contact</Link>
        <Link className='topListItem' style={{textDecoration: "none", color:'inherit'}} to={"/write"}>Write</Link>
        <Link className='topListItem' style={{textDecoration: "none", color:'inherit'}} onClick={handleLogout} to={"/"}>{user && "Logout"}</Link>
        </ul>
        </div>
        <div className='topRight'>
        {user ? (
        <Link to="/settings">
        <img className='topImg'
        src={user.profilePic}
        alt=''
        />
        </Link>
        ) : (
          <>
          <Link className='topListItem' style={{textDecoration: "none", color:'inherit'}} to={"/login"}>Login</Link>
          <Link className='topListItem' style={{textDecoration: "none", color:'inherit'}} to={"/register"}>Register</Link>
          </>
        )
        }
        <i className='topSearchIcon fas fa-search'></i>
        </div>
        </div>
    )
}
       
