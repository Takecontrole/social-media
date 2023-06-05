import React, { useState } from 'react'
import Carousel from '../../Carousel'
import { useSelector } from 'react-redux'
const VideoCardBody = ({video}) => {
    const [readMore, setReadMore] = useState(false)
const { theme } = useSelector(state => state)
    
    return (
        <div className="card_body">
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
            {
                video.images.length > 0 && <Carousel images={video.images} id={video._id} />
            }
        </div>
    )
}

export default VideoCardBody
