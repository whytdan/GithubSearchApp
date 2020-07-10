import React, { useContext, useEffect } from 'react'
import { GithubContext } from '../context/github/githubContext'
import { Link } from 'react-router-dom'
import { Repos } from '../components/Repos'
import cx from 'classnames'

import classes from './styles/Profile.module.css'
import Loader from '../components/UI/Loader'

export const Profile = ({match}) => {

  const {getUser, getRepos, loading, user, 
        repos, getUserFollowers} = useContext(GithubContext)
  const urlName = match.params.name

  useEffect(() => {
    getUser(urlName)
    getRepos(urlName)
    getUserFollowers(urlName)
    // eslint-disable-next-line
  }, [])

  if(loading){
    return(
      <div className="row">
        <Loader/>
      </div>
    ) 
  }

  const {
    name, company, avatar_url,
    location, bio, blog, login, 
    html_url, followers, public_repos,
    public_gists, following
  } = user

  return (
    <React.Fragment>
    <Link to="/" className="btn btn-link">Main Page</Link>
    
    <div className="card mb-4">
      <div className="card-body">
        <div className="row">
          <div className={cx("col-lg-3", "text-center", classes.imgWrapper)}>
            <img
             src={avatar_url} 
             alt={name}
             style={{width: '200px'}}
             />
            <h4 className="mt-3">{name}</h4>
            {location && <p>Location: {location}</p>}
          </div>
          <div className="col">
            {
              bio && <React.Fragment>
                <h4>BIO</h4>
                <p style={{maxWidth: "600px"}}>{bio}</p>
              </React.Fragment>
            }

            <a 
            href={html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-success mb-3"
            >
            Open profile
            </a>

            <ul className={classes.profileListInfo}>
              {login && <li>
                <strong>Username: </strong> {login}
              </li>}

              {company && <li>
                <strong>Company: </strong> {company}
              </li>}

              {blog && <li>
                <strong>Website: </strong>
                <a href={blog}>{blog}</a> 
              </li>}
            </ul>
            
            <div className={cx("badge", "badge-success", "mr-2", classes.userInfoLink)}>
              <Link to={'/profile/' + login + '/followers'}>Followers: {followers}</Link>
            </div>

            <div className={cx("badge", "badge-primary", "mr-2", classes.userInfoLink)}>
              <Link to={'/profile/' + login + '/following'}>Following: {following}</Link>
            </div>

            <div className="badge badge-info mr-2">
              Repos: {public_repos}
            </div>

            <div className="badge badge-dark mr-2">
              Gists: {public_gists}
            </div>
          </div>
        </div>
      </div>
    </div>

    <Repos repos={repos}/>

    </React.Fragment>
  )
}