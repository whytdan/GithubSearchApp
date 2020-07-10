import React, { useContext, useEffect } from 'react'
import { GithubContext } from '../context/github/githubContext'
import Loader from '../components/UI/Loader'
import { Card } from '../components/Card'


export const UserFollowing = ({ match }) => {
  const { getUserFollowing, user_following, loading } = useContext(GithubContext)
  const urlName = match.params.name

  useEffect(() => {
    getUserFollowing(urlName)
  }, [])

  return (
    <div className="row">
      {loading
        ? <Loader />
        : user_following.map(user => (
          <div className="col-sm-4 mb-4" key={user.id}>
            <Card user={user} />
          </div>
        ))
      }
    </div>
  )
}
