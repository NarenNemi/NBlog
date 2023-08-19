import { useEffect, useState } from "react"
import "./sidebar.css"
import axios from "axios"
import { Link } from "react-router-dom"

export default function SideBar() {
  const [cats,setCats] = useState([])

  useEffect(() => {  
  const getCats = async () => {
    const res = await axios.get("/categories")
    setCats(res.data)
  }
  getCats()
  },[])
  return (
    <div className="sidebar">
        <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>   
        <img 
        src="https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" 
        alt="">
        </img>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ipsum mi, vestibulum in quam vel,
         aliquam ornare ligula. Cras ultrices, felis at hendrerit auctor, est sapien feugiat sem, eget posuere.
        </p>
        </div>
        <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
        {cats.map(c => (
          <Link className='link' to={`/?cat=${c.name}`}>
          <li className="sidebarListItem">{c.name}</li>
          </Link>
        ))}
        </ul>
        </div>
        <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
        </div>
    </div>
  )
}
