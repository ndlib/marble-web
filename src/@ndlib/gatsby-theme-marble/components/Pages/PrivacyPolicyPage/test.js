import React from 'react'
import { shallow } from 'enzyme'
import PrivacyPolicyPage from './'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

test('PrivacyPolicyPage', () => {
  const wrapper = shallow(<PrivacyPolicyPage i18n={i18n}/>)
  expect(wrapper.find('h2').text()).toEqual('privacyPolicyPage.title')
})
