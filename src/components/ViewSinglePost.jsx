import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Page from './Page'
import Axios from 'axios'
import LoadingDotsIcon from './LoadingDotsIcon'
import ReactMarkdown from 'react-markdown'
import ReactTooltip from 'react-tooltip'

const ViewSinglePost = () => {
    const { id } = useParams()
    const [isloading, setIsLoading] = useState(true)
    const [post, setPost] = useState()

    useEffect(() => {
        const ourRequest = Axios.CancelToken.source()
        async function fetchPosts() {
            try {
                const response = await Axios.get(`/post/${id}`, { cancelToken: ourRequest.token })
                setPosts(response.data)
                setIsloading(false)
            } catch (e) {
                console.log("there's a problem")
            }
        }
        fetchPosts()
        return () => {
            ourRequest.cancel()
        }
    }, [])


    if (isloading) return (<Page title="...">
        <LoadingDotsIcon />
    </Page>)
    const date = new Date(post.createdDate)
    const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    return (
        <Page title={post.title}>
            <div className="d-flex justify-content-between">
                <h2>{post.title}</h2>
                <span className="pt-2">
                    <a href="#" data-tip="Edit" data-for="edit" className="text-primary mr-2" ><i className="fas fa-edit"></i></a>
                    <ReactTooltip id="edit" className="custom-tooltip" />
                    <a className="delete-post-button text-danger" title="Delete"><i className="fas fa-trash"></i></a>
                </span>
            </div>

            <p className="text-muted small mb-4">
                <Link to={`/profile/${post.author.username}`}>
                    <img className="avatar-tiny" src={post.author.avatar} />
                </Link>
                Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
            </p>

            <div className="body-content">
                <ReactMarkdown source={post.body} allowedTypes={["paragraph", "strong", "emphasis", "heading", "list", "listItem"]} />
            </div>
3:56////∑46video
        </Page>
    )
}

export default ViewSinglePost
