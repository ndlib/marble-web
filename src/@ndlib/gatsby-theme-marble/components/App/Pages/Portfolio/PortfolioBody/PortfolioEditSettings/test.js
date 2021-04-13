import React from 'react'
import { shallow } from 'enzyme'
import PortfolioEditSettings from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Shared/MaterialButton'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'

test('PortfolioEditSettings', () => {
  jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
    return {
      portfolio: {
        title: 'My Title',
      },
    }
  })
  const wrapper = shallow(<PortfolioEditSettings />)
  expect(wrapper.find(MaterialButton).exists()).toBeTruthy()
  expect(wrapper.find(ActionModal).props().contentLabel).toContain('My Title')
})
