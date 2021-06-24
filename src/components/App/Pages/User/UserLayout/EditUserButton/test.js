import React from 'react'
import { mount } from 'enzyme'
import { navigate } from 'gatsby'
import EditUserButton from './'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

test('EditUserButton', () => {
  const wrapper = mount(<EditUserButton userName='captainuser' i18n={i18n} />)
  expect(wrapper.find('button').html()).toContain('button.userEdit')
  wrapper.find('button').simulate('click')
  expect(navigate).toHaveBeenCalledWith('/user/captainuser/edit')
})
