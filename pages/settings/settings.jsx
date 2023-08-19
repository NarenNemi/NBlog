import SideBar from "../../components/sidebar/SideBar"
import "./settings.css"
import { useContext, useState } from "react"
import axios from "axios"
import { Context } from "../../context/Context"

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user} = useContext(Context)
  const PF = "http://localhost:5000/images/"
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user.id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.put("/users" + user._id, updatedUser);
    } catch (err) {}
  };


  return (
    <div className="settings">
    <div className="settingsWrapper">
      <div className="settingsTitle">
        <span className="settingsUpdateTitle">Update your Account</span>
        <span className="settingsDeleteTitle">Delete your Account</span>
      </div>
      <form action="" className="settingsForm" onSubmit={handleSubmit}>
        <label>Profile Picture</label>
        <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : PF+user.profilePic}
            alt="">
            </img>
            <label htmlFor="fileInput">
            <i class="settingsPPIcon fa-solid fa-circle-user"></i>   
            </label>
            <input type="file" id="fileInput" style={{display: "none" }} onChange={(e) => setFile(e.target.files[0])}></input>
        </div>
        <label>Username</label>
        <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)}></input>
        <label>Email</label>
        <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)}></input>
        <label>Password</label>
        <input type="password" onChange={e => setPassword(e.target.value)}></input>
        <button className="settingsSubmitButton" type="submit">Update</button>
      </form>
    </div>   
    <SideBar/>
    </div>
  )
}
