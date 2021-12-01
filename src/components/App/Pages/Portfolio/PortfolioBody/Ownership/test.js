import React from 'react'
import { shallow } from 'enzyme'
import { Ownership } from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import * as UserContext from '@ndlib/gatsby-theme-marble/src/context/UserContext'
import VisibilityLabel from '@ndlib/gatsby-theme-marble/src/components/Shared/VisibilityLabel'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'
import PrivacyEditSettings from './PrivacyEditSettings'
import SaveOrCancelButtons from '../SaveOrCancelButtons'

describe('Ownership', () => {
  const portfolio = {
    privacy: 'public',
  }

  test.skip('isOwner', () => {
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        updatePortfolio: jest.fn(),
      }
    })
    jest.spyOn(UserContext, 'useUserContext').mockImplementation(() => {
      return {
        portfolioUser: {
          portfolioUserId: 'pete',
        },
        isPortfolioOwner: () => true,
      }
    })
    const wrapper = shallow(<Ownership portfolio={portfolio} />)
    expect(wrapper.find(VisibilityLabel).props().visibility).toEqual('public')
    expect(wrapper.find(PrivacyEditSettings).exists()).toBeTruthy()
    const modal = wrapper.find(ActionModal)
    expect(modal.exists()).toBeTruthy()
    const modalFooter = shallow(modal.props().footer)
    expect(modalFooter.find(SaveOrCancelButtons).exists()).toBeTruthy()
  })

  test.skip('not isOwner', () => {
    const portfolio = {
      userPortfolioId: 'pete',
      privacy: 'shared',
    }
    jest.spyOn(UserContext, 'useUserContext').mockImplementation(() => {
      return {
        portfolioUser: {
          portfolioUserId: 'pete',
        },
        isPortfolioOwner: () => false,
      }
    })
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        updatePortfolio: jest.fn(),
      }
    })
    const wrapper = shallow(<Ownership portfolio={portfolio} />)
    expect(wrapper.find(VisibilityLabel).exists()).toBe(false)
  })
})
