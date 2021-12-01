import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import EditButton from './'
import * as userContext from '@ndlib/gatsby-theme-marble/src/context/UserContext'

describe('EditButton', () => {
  const setEditFunc = jest.fn()
  test('not isOwner', () => {
    jest.spyOn(userContext, 'useUserContext').mockImplementation(() => {
      return {
        portfolioUser: { portfolioUserId: 'captainuser' },
        isPortfolioOwner: () => false,
      }
    })

    const wrapper = mount(<EditButton isOwner={false} setEditFunc={setEditFunc} />)
    expect(wrapper.find('button').exists()).toBeFalsy()
  })
  test('isOwner', () => {
    let wrapper
    jest.spyOn(userContext, 'useUserContext').mockImplementation(() => {
      return {
        portfolioUser: { portfolioUserId: 'captainuser' },
        isPortfolioOwner: () => true,
      }
    })

    act(() => {
      wrapper = mount(<EditButton isOwner setEditFunc={setEditFunc} />)
      wrapper.find('button').props().onClick()
      expect(setEditFunc).toHaveBeenCalled()
    })
  })
})
