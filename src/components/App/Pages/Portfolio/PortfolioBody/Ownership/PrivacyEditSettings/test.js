import React from 'react'
import { shallow } from 'enzyme'
import PrivacyEditSettings from './'
import VisibilitySettings from '../../PortfolioEditSettings/PortfolioSettingsContent/VisibilitySettings'

test('PrivacyEditSettings', () => {
  const wrapper = shallow(<PrivacyEditSettings onPrivacyChange={jest.fn()} />)
  expect(wrapper.find(VisibilitySettings).exists()).toBeTruthy()
})
