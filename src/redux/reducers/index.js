import {
    IS_OVERLAY_LOADING,
  } from '../types'
  
  const initialState = {
    isLoading: false,
    policyAccepted: false,
  }
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case IS_OVERLAY_LOADING:
        return { ...state, isLoading: payload }
      default:
        return state
    }
  }
  