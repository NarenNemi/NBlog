import { useLocation } from "react-router-dom"
import "./singlePost.css"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { Context } from "../../context/Context"

export default function SinglePost() {
  const location = useLocation()
  const path = location.pathname.split("/")[2]
  const [post, setPost] = useState({})
  const { user } = useContext(Context);
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [updateMode, setUpdateMode] = useState(false)
  const PF = "http://localhost:5000/images/"

  useEffect(() => {
    const getPost = async () => {
    const res = await axios.get("/posts/" + path)
    setPost(res.data)
    setTitle(res.data.title)
    setDesc(res.data.desc)
    }
    getPost()
    console.log(path)
  },[path])

  const handleDelete = async() => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      })
      window.location.replace("/");
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
       username: user.username,
        title,
        desc,
      })
      setUpdateMode(false)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="singlePost">
    <div className="singlePostWrapper">
    {post.photo && (
      <img className="singlePostImg" 
      src={PF + post.photo}
      alt=""
      />
    )}
    {
      updateMode ? (
      <input type="text" value={title} className="singlePostTitleInput" onChange={(e)=>setTitle(e.target.value)}/>
    ) : (
      <h1 className="singlePostTitle">
      {title}
      {post.username === user?.username && (
        <div className="singlePostEdit">
        <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
        <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
        </div>
        )}
      </h1>
      )
    }
      <div className="singlePostInfo">
      <span className="singlePostAuthor">
       Author:
       <Link className="link" to={`/?user=${post.username}`}>
       <b>{post.username}</b>
       </Link> 
      </span>
      <span className="singlePostDate">
       Date: <b>{new Date(post.createdAt).toDateString()}</b> 
      </span>
      </div>
      {
      updateMode ? (
      <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)} /> 
      ) : (
      <p className="singlePostDesc">{post.desc}</p>
      )}
      {updateMode && ( 
      <button className="singlePostButton" onClick={handleUpdate}>Update</button>
      )}
    </div>
    </div>
  )
}
