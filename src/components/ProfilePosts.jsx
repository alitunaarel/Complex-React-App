import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const ProfilePosts = () => {
    const { username } = useParams()
    const [isLoading, setIsloading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await Axios.get(`/profile/${username}/posts`)
                setPosts(response.data)
                setIsloading(false)
            } catch (e) {
                console.log("there's a problem")
            }
        }
        fetchPosts()
    }, [])

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="list-group">
            {posts.map(post => {
                return (
                    <a key={post._id} href="#" className="list-group-item list-group-item-action">
                        <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>{' '}
                        <span className="text-muted small">on 2/10/2020 </span>
                    </a>
                )
            })}
13,12

        </div>
    )
}

export default ProfilePosts
