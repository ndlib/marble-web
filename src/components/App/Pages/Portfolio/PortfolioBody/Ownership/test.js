import React from 'react'
import { shallow } from 'enzyme'
import Ownership from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import VisibilityLabel from '@ndlib/gatsby-theme-marble/src/components/Shared/VisibilityLabel'
import UserCartouche from '@ndlib/gatsby-theme-marble/src/components/Shared/UserCartouche'

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
