import React from 'react'
import { useSelector } from 'react-redux'
const ProfileImg = ({images, id}) => {
    const { theme } = useSelector(state => state)

    return (
        <div >
            <div >
                {
                    images.map(img => (
                                <img src={img.url} alt={img.url}
                                style={{width:"150px", height:"120px",filter: theme ? 'invert(1)' : 'invert(0)'}} /> 
                    ))
                }
                
            </div>
        </div>
    )
}

export default ProfileImg