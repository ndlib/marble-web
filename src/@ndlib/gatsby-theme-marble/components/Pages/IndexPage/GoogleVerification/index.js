import React from 'react';
import Helmet from 'react-helmet'

export const GoogleVerification = () => {
  return (
    <Helmet>
      <meta 
        name='google-site-verification' 
        content='i5bUlLd7k9T3I_XoLupYuPOrZGkJ8BMSX9EIcEXjU0w'
        userId='pw'
      />
    </Helmet>
  )
}

export default GoogleVerification
