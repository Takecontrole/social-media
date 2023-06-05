import React, { useState, useEffect } from 'react'
import PostThumb from '../PostThumb'
import VideoThumb from '../VideoThumb'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Saved = ({auth, dispatch}) => {
    const [savePosts, setSavePosts] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(2)
    const [load, setLoad] = useState(false)
   
    const [saveVideos, setSaveVideos] = useState([])
    const [resultVideos, setResultVideos] = useState(9)
    const [pageVideos, setPageVideos] = useState(2)
    const [loadVideos, setLoadVideos] = useState(false)

    useEffect(() => {
        setLoad(true)
        getDataAPI('getSavePosts', auth.token)
        .then(res => {
            setSavePosts(res.data.savePosts)
            setResult(res.data.result)
            setLoad(false)
        })
        .catch(err => {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        })

        return () => setSavePosts([])
    },[auth.token, dispatch])
    
    useEffect(() => {
        setLoadVideos(true)
        getDataAPI('getSaveVideos', auth.token)
        .then(res => {
            setSaveVideos(res.data.saveVideos)
            setResultVideos(res.data.result)
            setLoadVideos(false)
        })
        .catch(err => {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        })

        return () => setSaveVideos([])
    },[auth.token, dispatch])

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token)
        setSavePosts(res.data.savePosts)
        setResult(res.data.result)
        setPage(page + 1)
        setLoad(false)
    }
    const handleLoadMoreVideos = async () => {
        setLoad(true)
        const res = await getDataAPI(`getSaveVideos?limit=${page * 9}`, auth.token)
        setSaveVideos(res.data.saveVideos)
        setResultVideos(res.data.result)
        setPageVideos(page + 1)
        setLoadVideos(false)
    }
    

    return (
        <div>
            <PostThumb posts={savePosts} result={result} />
            <VideoThumb videos={saveVideos} result={resultVideos} />

            {
                load && <img style={{width: "100px",
    height:"100px"}} src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            
            <LoadMoreBtn result={result} page={page}
            load={load} handleLoadMore={handleLoadMore} />
            
            <LoadMoreBtn result={resultVideos} page={pageVideos}
            load={loadVideos} handleLoadMore={handleLoadMoreVideos} />
            
        </div>
    )
}

export default Saved
