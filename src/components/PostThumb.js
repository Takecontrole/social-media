import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CardHeader from './home/post_card/CardHeader'

const PostThumb = ({posts, result}) => {
    const { theme } = useSelector(state => state) 
    const [readMore, setReadMore] = useState(false)

    if(result === 0) return <h2 className="text-center text-danger">No Post</h2>

    return (
        <div >
            {
                posts.map(post => (                    <div className="card my-3">                           <CardHeader post={post} /> 
                           <div className="card_body-content" 
            style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'white' : '#111',
            }}>
                <span>
                    {
                        post.content.length < 60 
                        ? post.content 
                        : readMore ? post.content + ' ' : post.content.slice(0, 60) + '.....'
                    }
                </span>
                {
                    post.content.length > 60 &&
                    <span className="readMore" onClick={() => setReadMore(!readMore)}>
                        {readMore ? 'Hide content' : 'Read more'}
                    </span>
                }

            </div>
                    <Link key={post._id} to={`/post/${post._id}`}> 
                        <div className="post_thumb_display">

                            {
                                post.images[0].url.match(/video/i)
                                ?<video controls src={post.images[0].url} alt={post.images[0].url}
                                style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />

                                :<img src={post.images[0].url} alt={post.images[0].url}
                                style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
                            }

                            <div className="post_thumb_menu">
                                <i className="far fa-heart">{post.likes.length}</i>
                                <i className="far fa-comment">{post.comments.length}</i>
                            </div>
                        </div>

                    </Link>
                        </div>
                ))
            }
        </div>
    )
}

export default PostThumb
