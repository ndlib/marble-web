import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserLayout from './UserLayout'
import UserBody from './UserBody'
import NoUser from './NoUser'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import { getPortfolioUser } from '@ndlib/gatsby-theme-marble/src/utils/api'

const User = ({ loginReducer, userName, location, edit }) => {
  const [user, setUser] = useState({ portfolioUserId: userName })
  const [content, setContent] = useState(<Loading />)

  useEffect(() => {
    const abortController = new AbortController()

    if (loginReducer.token) {
      console.log('token!')
      getPortfolioUser({ loginReducer: loginReducer })
        .then((data) => {
          console.log('BIGD', data)
          setUser(data)
          setContent(<UserBody
            user={data}
            edit={edit}
            location={location}
          />)
        }
        )
        .catch(() => {
          setContent(<NoUser userName={userName} />)
        }
        )
    }
    return () => {
      abortController.abort()
    }
  }, [loginReducer, userName, edit, location])

  return (
    <UserLayout
      user={user}
      location={location}
    >
      {content}
    </UserLayout>
  )
}
User.propTypes = {
  userName: PropTypes.string,
  edit: PropTypes.bool,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(User)
