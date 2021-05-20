import React from 'react'
import { shallow } from 'enzyme'
import { Heading } from 'theme-ui'
import DisclaimerPage from './'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

test('DisclaimerPage', () => {
  const wrapper = shallow(<DisclaimerPage i18n={i18n} />)
  expect(wrapper.find(Heading).text()).toEqual('disclaimerPage.title')
})
