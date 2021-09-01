import React from 'react'
import { shallow } from 'enzyme'
import Ownership from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import VisibilityLabel from '@ndlib/gatsby-theme-marble/src/components/Shared/VisibilityLabel'
import UserCartouche from '@ndlib/gatsby-theme-marble/src/components/Shared/UserCartouche'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'
import PrivacyEditSettings from './PrivacyEditSettings'
import SaveOrCancelButtons from '../SaveOrCancelButtons'

describe('Ownership', () => {
  test('isOwner', () => {
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        portfolio: {
          privacy: 'public',
        },
      }
    })
    const wrapper = shallow(<Ownership isOwner />)
    expect(wrapper.find(VisibilityLabel).props().visibility).toEqual('public')
    expect(wrapper.find(PrivacyEditSettings).exists()).toBeTruthy()
    const modal = wrapper.find(ActionModal)
    expect(modal.exists()).toBeTruthy()
    const modalFooter = shallow(modal.props().footer)
    expect(modalFooter.find(SaveOrCancelButtons).exists()).toBeTruthy()
  })

  test('not isOwner', () => {
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        portfolio: {
          userId: 'pete',
        },
      }
    })
    const wrapper = shallow(<Ownership />)
    expect(wrapper.find(UserCartouche).props().user).toEqual({ uuid: 'pete' })
  })
})
