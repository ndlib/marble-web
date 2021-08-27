import React from 'react'
import { shallow } from 'enzyme'
import PortfolioEditSettings from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'
import PortfolioSettingsContent from './PortfolioSettingsContent'
import SaveOrCancelButtons from '../SaveOrCancelButtons'

test('PortfolioEditSettings', () => {
  jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
    return {
      portfolio: {
        title: 'My Title',
      },
    }
  })
  const wrapper = shallow(<PortfolioEditSettings />)
  expect(wrapper.find('.edit-settings').exists()).toBeTruthy()
  expect(wrapper.find(ActionModal).props().contentLabel).toContain('My Title')
  expect(wrapper.find(PortfolioSettingsContent).exists()).toBeTruthy()
  const modal = wrapper.find(ActionModal)
  expect(modal.exists()).toBeTruthy()
  const modalFooter = shallow(modal.props().footer)
  expect(modalFooter.find(SaveOrCancelButtons).exists()).toBeTruthy()
})
