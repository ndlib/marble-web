import React from 'react'
import { mount } from 'enzyme'
import { DangerDelete } from './'
import { navigate } from 'gatsby'
import * as UserContext from '@ndlib/gatsby-theme-marble/src/context/UserContext'

describe('DangerDelete', () => {
  console.log = jest.fn()
  const props = {
    portfolio: {
      portfolioUserId: 'my-id',
      title: 'Portfolio Title',
    },
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  test.skip('confirm', () => {
    jest.spyOn(UserContext, 'useUserContext').mockImplementation(() => {
      return {
        removeUserPortfolio: () => {
          return new Promise((resolve, reject) => {
            resolve()
          })
        },
      }
    })

    jest.spyOn(window, 'confirm').mockImplementationOnce(() => true)
    const wrapper = mount(<DangerDelete {...props} />)

    wrapper.find('button').simulate('click')
    expect(navigate).toHaveBeenCalled()
  })

  test('cancel', () => {
    jest.spyOn(UserContext, 'useUserContext').mockImplementation(() => {
      return {
        removeUserPortfolio: () => {
          return new Promise((resolve, reject) => {
            resolve()
          })
        },
      }
    })
    jest.spyOn(window, 'confirm').mockImplementationOnce(() => false)
    const wrapper = mount(<DangerDelete {...props} />)

    wrapper.find('button').simulate('click')
    expect(navigate).not.toHaveBeenCalled()
  })
})
