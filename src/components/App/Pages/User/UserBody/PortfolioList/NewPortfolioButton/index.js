/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { savePortfolioCollectionQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const NewPortfolioButton = ({ portfolios, addFunc, loginReducer }) => {
  const { t } = useTranslation()
  const { portfolioUser, isPorfolioOwner } = useUserContext()
  const [creating, setCreating] = useState(false)

  if (!isPorfolioOwner()) {
    return null
  }

  return (
    <Button
      onClick={() => {
        setCreating(true)
        savePortfolioCollectionQuery({
          loginReducer: loginReducer,
          portfolio: {
            title: 'My Portfolio',
            description: null,
            imageUri: null,
            layout: 'default',
            privacy: 'private',
            portfolioUserId: portfolioUser.portfolioUserId,
          } })
          .then((data) => {
            console.log('BIG RESULT', data)
            setCreating(false)
          })
          .catch((e) => {
            console.error(e)
          })
      }}
      variant='light'
      disabled={creating}
    >{t('common:button.createPortfolio')}
    </Button>
  )
}

NewPortfolioButton.propTypes = {
  addFunc: PropTypes.func,
  portfolios: PropTypes.array,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(
  mapStateToProps,
)(NewPortfolioButton)

export const successFunc = ({ data, portfolios, addFunc, setCreating, userName }) => {
  const ps = [...portfolios]
  ps.unshift(data)
  addFunc(ps)
  setCreating(false)
  navigate(`/user/${userName}/${data.uuid}`)
}
