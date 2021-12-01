import React from 'react'
import { mount } from 'enzyme'
import { navigate } from 'gatsby'
import EditUserButton from './'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'
import * as userContext from '@ndlib/gatsby-theme-marble/src/context/UserContext'

test('EditUserButton', () => {
  jest.spyOn(userContext, 'useUserContext').mockImplementation(() => {
    return {
      portfolioUser: { portfolioUserId: 'captainuser' },
      isPortfolioOwner: () => true,
    }
  })
  const wrapper = mount(<EditUserButton userName='captainuser' i18n={i18n} />)
  expect(wrapper.find('button').html()).toContain('Edit Bio')
  wrapper.find('button').simulate('click')
  expect(navigate).toHaveBeenCalledWith('/user/captainuser/edit')
})
