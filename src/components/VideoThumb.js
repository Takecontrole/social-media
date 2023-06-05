import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import VideoCardHeader from './home/video_card/VideoCardHeader'

const VideoThumb = ({videos, result}) => {
    const { theme } = useSelector(state => state) 
    const [readMore, setReadMore] = useState(false)

    if(result === 0) return <h2 className="text-center text-danger">No Post</h2>

    return (
        <div >
            {
                videos.map(video => (                    <div className="card border-0 my-3">                           <VideoCardHeader video={video} /> 
                           <div className="card_body-content" 
            style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'white' : '#111',
            }}>
                <span>
                    {
                        video.content.length < 60 
                        ? video.content 
                        : readMore ? video.content + ' ' : video.content.slice(0, 60) + '.....'
                    }
                </span>
                {
                    video.content.length > 60 &&
                    <span className="readMore" onClick={() => setReadMore(!readMore)}>
                        {readMore ? 'Hide content' : 'Read more'}
                    </span>
                }

            </div>
                    <Link key={video._id} to={`/video/${video._id}`}> 
                        <div className="post_thumb_display">

                            {
                                video.images[0].url.match(/video/i)
                                ?<video controls src={video.images[0].url} alt={video.images[0].url}
                                style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />

                                :<img src={video.images[0].url} alt={video.images[0].url}
                                style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
                            }

                            <div className="post_thumb_menu">
                                <i className="far fa-heart">{video.likes.length}</i>
                                <i className="far fa-comment">{video.comments.length}</i>
                            </div>
                        </div>

                    </Link>
                        </div>
                ))
            }
        </div>
    )
}

export default VideoThumb
