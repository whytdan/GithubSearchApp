import React, {useReducer} from 'react'
import axios from 'axios'
import { GithubContext } from './githubContext';
import { githubReducer } from './githubReducer';
import { SEARCH_USERS, 
    GET_USER, 
    GET_REPOS, 
    CLEAR_USERS, 
    SET_LOADING, 
    GET_USER_FOLLOWERS, 
    GET_USER_FOLLOWING } 
    from '../types';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

const withCreds = url => {
  return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}

export const GithubState = ({children}) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repos: [],
    user_followers: [],
    user_following: [],
  }
  
  const [state, dispatch] = useReducer(githubReducer, initialState)
  
  const search = async value => {
    setLoading()
    
    const response = await axios.get(
      withCreds(`https://api.github.com/search/users?q=${value}&`)
    ) 

    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items
    })
  }

  const getUser = async name => {
    setLoading()

    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}?`)
    )
    
    dispatch({
      type: GET_USER,
      payload: response.data
    })
  }

  const getUserFollowers = async name => {
    setLoading()

    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}/followers?&`)
    )

    dispatch({
      type: GET_USER_FOLLOWERS,
      payload: response.data
    })
  }

  const getUserFollowing = async name => {
    setLoading()

    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}/following?&`)
    )

    dispatch({
      type: GET_USER_FOLLOWING,
      payload: response.data
    })
  }

  const getRepos = async name => {
    setLoading()
    
    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}/repos?&`)
    )

    dispatch({
      type: GET_REPOS,
      payload: response.data
    })
  }

  const clearUsers = () => dispatch({type: CLEAR_USERS})

  const setLoading = () => dispatch({type: SET_LOADING})

  const {user, users, repos, loading, user_followers, user_following} = state

  return (
    <GithubContext.Provider value={{
      setLoading, search, getRepos, getUser, getUserFollowers,
      getUserFollowing, user_following, 
      clearUsers, user, users, repos, loading, user_followers
    }}>
      {children}
    </GithubContext.Provider>
  )
}
