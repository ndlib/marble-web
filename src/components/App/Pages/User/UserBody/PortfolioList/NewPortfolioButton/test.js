import React from 'react'
import { mount } from 'enzyme'
import { NewPortfolioButton } from './'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'
import * as userContext from '@ndlib/gatsby-theme-marble/src/context/UserContext'

describe('NewPortfolioButton', () => {
  test('layout', () => {
    jest.spyOn(userContext, 'useUserContext').mockImplementation(() => {
      return {
        portfolioUser: { portfolioUserId: 'captainuser' },
        isPorfolioOwner: () => true,
      }
    })

    const props = {
      loginReducer: {
        user: { uuid: 'asdf', userName: 'myUserName' },
      },
    }
    const wrapper = mount(<NewPortfolioButton {...props} i18n={i18n} />)
    expect(wrapper.find('button').exists()).toBeTruthy()
  })

  test('returns false if the portfolio user does not own the portfolio', () => {
    jest.spyOn(userContext, 'useUserContext').mockImplementation(() => {
      return {
        portfolioUser: { portfolioUserId: 'captainuser' },
        isPorfolioOwner: () => false,
      }
    })

    const props = {
      loginReducer: {
        user: { uuid: 'asdf', userName: 'myUserName' },
      },
    }
    const wrapper = mount(<NewPortfolioButton {...props} i18n={i18n} />)
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
