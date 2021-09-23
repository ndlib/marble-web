import React from 'react'
import PropTypes from 'prop-types'
import CreateForm from './CreateForm'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import { NDBrandBreadcrumbs } from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'

const CreateAccount = ({ location }) => {
  return (
    <NDBrandSectionLeftNav location={location}>
      <NDBrandSection variant='sidebar'>&nbsp;</NDBrandSection>
      <NDBrandSection variant='fullBleedWithSidebar'>
        <NDBrandBreadcrumbs
          currentPageTitle='Finalize Account'
          breadcrumbs={[]}
        />
        <CreateForm />
      </NDBrandSection>
    </NDBrandSectionLeftNav>

  )
}

CreateAccount.propTypes = {
  location: PropTypes.object.isRequired,
}

export default CreateAccount
