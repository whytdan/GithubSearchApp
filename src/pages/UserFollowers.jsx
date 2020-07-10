import React, { useContext, useEffect } from 'react'
import { GithubContext } from '../context/github/githubContext'
import Loader from '../components/UI/Loader'
import { Card } from '../components/Card'


export const UserFollowers = ({ match }) => {
  const { getUserFollowers, user_followers, loading } = useContext(GithubContext)
  const urlName = match.params.name

  useEffect(() => {
    getUserFollowers(urlName)
  }, [])

  return (
    <div className="row">
      {loading
        ? <Loader />
        : user_followers.map(user => (
          <div className="col-sm-4 mb-4" key={user.id}>
            <Card user={user} />
          </div>
        ))
      }
    </div>
  )
}