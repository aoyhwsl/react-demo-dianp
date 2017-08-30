import * as actionTyps from '../constants/homeInfo'
import axios from 'axios'
import HOST from '../constants/host'

export const setCity = (cityName) => ({
  type: actionTyps.USER_SET_CITY,
  cityName
})

const requestHomeInfo = () => ({
  type: actionTyps.REQUEST_HOME_INFO,
})

const receiveHomeInfo = () => ({
  type: actionTyps.RECEIVE_HOME_INFO
})

const requestHomeInfoFailure = () => ({
  type: actionTyps.REQUEST_HOME_INFO_FAILURE
})

const getActivity = (data) => ({
  type: actionTyps.GET_ACTIVITY,
  data
})

const getRb = (data) => ({
  type: actionTyps.GET_RB,
  data
})

export const getHomeInfo = () => {
  return async dispatch => {
    dispatch(requestHomeInfo())
    try {
      const res = await axios(`${HOST}/assets/json/homeInfo.json`)
      setTimeout(() => {
        if (res.data.code === 200) {
          const modules = analyse(res.data.data.moduleInfoList)
          dispatch(receiveHomeInfo())
          dispatch(getActivity(modules['xyhzq']))
          dispatch(getRb(modules['rb']))
        } else {
          dispatch(requestHomeInfoFailure())
        }
      }, 2000)
    } catch (e) {
      dispatch(requestHomeInfoFailure())
    }
  }
}

const analyse = (moduleInfoList) => {
  return moduleInfoList.reduce((obj, module) => {
    return {
      ...obj,
      [module.moduleName]: module
    }
  }, {})
}