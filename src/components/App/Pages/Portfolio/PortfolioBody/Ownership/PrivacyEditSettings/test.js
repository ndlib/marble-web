import React from 'react'
import { shallow } from 'enzyme'
import PrivacyEditSettings from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'
import VisibilitySettings from '../../PortfolioEditSettings/PortfolioSettingsContent/VisibilitySettings'

test('PrivacyEditSettings', () => {
  const callBack = jest.fn()
  const wrapper = shallow(<PrivacyEditSettings callBack={callBack} />)
  expect(wrapper.find(SaveOrCancelButtons).exists()).toBeTruthy()
  expect(wrapper.find(VisibilitySettings).exists()).toBeTruthy()
})
