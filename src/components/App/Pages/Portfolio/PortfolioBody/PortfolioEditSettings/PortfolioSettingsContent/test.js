import React from 'react'
import { shallow } from 'enzyme'
import PortfolioSettingsContent from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import VisibilitySettings from './VisibilitySettings'
import LayoutSettings from './LayoutSettings'
import DangerDelete from './DangerDelete'

test('PortfolioSettingsContent', () => {
  jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
    return {
      portfolio: {
        title: 'My Title',
      },
    }
  })
  const wrapper = shallow(<PortfolioSettingsContent onChangeLayout={jest.fn()} onChangePrivacy={jest.fn()} />)
  expect(wrapper.find(VisibilitySettings).exists()).toBeTruthy()
  expect(wrapper.find(LayoutSettings).exists()).toBeTruthy()
  expect(wrapper.find(DangerDelete).exists()).toBeTruthy()
})
