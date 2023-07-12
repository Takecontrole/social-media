import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

import AlertSuccess from '../AlertSuccess'
import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
    const { alert } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
            {alert.loading && <Loading />}

            {
                alert.error && 
                <AlertSuccess msg={alert.error} handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})} bgColor="linear-gradient(90deg, #FF0000 0%, #FF7878 100%)"/>
            }

            {
                alert.success && 
                <AlertSuccess msg={alert.success} handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})}
                bgColor="linear-gradient(90deg, #56ab2f 0%, #a8e063 100%)"/>
                /*
                <Toast msg={{title: 'Успешно', body: alert.success}} 
                handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})}
                bgColor="bg-success" />
                */
            }
        </div>
    )
}

export default Notify
