import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDiscoverPosts, DISCOVER_TYPES } from '../redux/actions/discoverAction'
import LoadIcon from '../images/loading.gif'
import DiscoverThumb from '../components/DiscoverThumb'
import LoadMoreBtn from '../components/LoadMoreBtn'
import { getDataAPI} from '../utils/fetchData'

const Discover = () => {
    const { auth, discover } = useSelector(state => state)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)

    useEffect(() => {
        if(!discover.firstLoad){
            dispatch(getDiscoverPosts(auth.token))
        }
    },[dispatch, auth.token, discover.firstLoad])

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`post_discover?num=${discover.page * 9}`, auth.token)
        dispatch({type: DISCOVER_TYPES.UPDATE_POST, payload: res.data})
        setLoad(false)
    }

    return (
        <div>
            {
                discover.loading 
                ? <img style={{width: "100px",
    height:"100px"}} src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
                : <DiscoverThumb posts={discover.posts} result={discover.result} />
            }

            {
                load && <img style={{width: "100px",
    height:"100px"}} src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            {
                !discover.loading &&
                <LoadMoreBtn result={discover.result} page={discover.page}
                load={load} handleLoadMore={handleLoadMore} />
            }
            
        </div>
    )
}

export default Discover
