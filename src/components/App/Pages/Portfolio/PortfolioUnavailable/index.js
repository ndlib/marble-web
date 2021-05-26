import React from 'react'
import VisibilityLabel from '@ndlib/gatsby-theme-marble/src/components/Shared/VisibilityLabel'
import * as style from './style.module.css'

export const title = `Portfolio Unavailable`
const PortfolioUnavailable = () => {
  return (
    <div className={style.contentArea}>
      <p>This portfolio is not available either because it is <VisibilityLabel visibility='private' /> or it does not exist.</p>
    </div>
  )
}

export default PortfolioUnavailable
