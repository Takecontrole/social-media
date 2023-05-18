       <div className="status my-3 d-flex">
            <Avatar src={auth.user.avatar} size="big-avatar" />
            
            <button className="statusBtn flex-fill"
            onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}>
                {auth.user.username} что у вас нового?
            </button>
        </div>
        
               <TextareaAutosize 
       onClick={() => setInputOpen(true)}
         style={{
            width: "100%",
            marginLeft:"1rem", 
            border:"transparent",
       "&:focus": { outline: "transparent !important"}
             }}
  minRows={inputOpen ? 3 : 1}
  placeholder="Что у вас нового?"
/>

        <Box display="flex"
        color="#C2C2C2">
        <CameraAltOutlinedIcon/>
        <PlayCircleOutlinedIcon/>
        <MusicNoteOutlinedIcon/>
        </Box>
        
                    <PostThumb posts={posts} result={result} />
                    
                    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token)
        const newData = {...res.data, page: page + 1, _id: id}
        dispatch({type: PROFILE_TYPES.UPDATE_POST, payload: newData})
        setLoad(false)
    }



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