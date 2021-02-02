
import React from 'react'
import { shallow } from 'enzyme'
import PageWrapper from './'
import SkipToMain from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/SkipToMain'
import BrandingHeader from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/BrandingHeader'
import NavigationHeader from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/NavigationHeader'
import FeedbackModal from '../../Internal/FeedbackModal'
import Footer from '@ndlib/gatsby-theme-marble/components/Layout/PageWrapper/Footer'

test('PageWrapper', () => {
  const children = <span className='kids'>Stuff Goes Here</span>
  const location = { my: 'location' }
  const wrapper = shallow(<PageWrapper location={location}>{children}</PageWrapper>)
  expect(wrapper.find(SkipToMain).exists()).toBeTruthy()
  expect(wrapper.find(BrandingHeader).exists()).toBeTruthy()
  expect(wrapper.find(FeedbackModal).exists()).toBeTruthy()
  expect(wrapper.find(NavigationHeader).props().location).toEqual({ my: 'location' })
  expect(wrapper.find('.kids').text()).toEqual('Stuff Goes Here')
  expect(wrapper.find(Footer).exists()).toBeTruthy()
})
