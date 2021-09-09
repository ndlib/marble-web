import React from 'react'
import { shallow } from 'enzyme'
import { Ownership } from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import * as UserContext from '@ndlib/gatsby-theme-marble/src/context/UserContext'
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
    jest.spyOn(UserContext, 'useUserContext').mockImplementation(() => {
      return {
        portfolioUser: {
          portfolioUserId: 'pete',
        },
        isPorfolioOwner: () => true,
      }
    })
    const wrapper = shallow(<Ownership loginReducer={{}} />)
    expect(wrapper.find(VisibilityLabel).props().visibility).toEqual('public')
    expect(wrapper.find(PrivacyEditSettings).exists()).toBeTruthy()
    const modal = wrapper.find(ActionModal)
    expect(modal.exists()).toBeTruthy()
    const modalFooter = shallow(modal.props().footer)
    expect(modalFooter.find(SaveOrCancelButtons).exists()).toBeTruthy()
  })

  test('not isOwner', () => {
    jest.spyOn(UserContext, 'useUserContext').mockImplementation(() => {
      return {
        portfolioUser: {
          portfolioUserId: 'pete',
        },
        isPorfolioOwner: () => false,
      }
    })
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        portfolio: {
          userPortfolioId: 'pete',
          privacy: 'shared',
        },
      }
    })
    const wrapper = shallow(<Ownership loginReducer={{}} />)
    expect(wrapper.find(VisibilityLabel).exists()).toBe(false)
  })
})
