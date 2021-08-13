
import React from 'react'
import { shallow } from 'enzyme'
import PageWrapper from './'
import FeedbackModal from '../../Shared/FeedbackModal'
import NDBrandLayout from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Layout'

test('PageWrapper', () => {
  const children = <span className='kids'>Stuff Goes Here</span>
  const location = { my: 'location' }
  const wrapper = shallow(<PageWrapper location={location}>{children}</PageWrapper>)
  expect(wrapper.find(FeedbackModal).exists()).toBeTruthy()
  expect(wrapper.find('.kids').text()).toEqual('Stuff Goes Here')
  expect(wrapper.find(NDBrandLayout).exists()).toBeTruthy()
})
