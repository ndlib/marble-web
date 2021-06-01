import React from 'react'
import { shallow } from 'enzyme'
import CornerBanner from './'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'

test('CornerBanner', () => {
  const wrapper = shallow(<CornerBanner />)
  expect(wrapper.find('div').text()).toEqual('This is a beta preview of the Marble website.')
})
