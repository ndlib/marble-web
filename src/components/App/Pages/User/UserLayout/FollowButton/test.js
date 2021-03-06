import React from 'react'
import { mount } from 'enzyme'
import FollowButton from './'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

describe('FollowButton', () => {
  console.log = jest.fn()
  jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: key => key }) }))
  test('!showButton', () => {
    const props = {
      showButton: false,
      userName: 'lieutenant_user',
    }
    const wrapper = mount(<FollowButton {...props} i18n={i18n} />)
    expect(wrapper.find(Link).props().to).toEqual('/user')
  })

  test('following', () => {
    const props = {
      showButton: true,
      userName: 'lieutenant_user',
      following: true,
    }
    const wrapper = mount(<FollowButton {...props} i18n={i18n} />)
    expect(wrapper.find('button').html()).toContain('userMenu.unfollow')
    wrapper.find('button').simulate('click')
  })

  test('default', () => {
    const props = {
      showButton: true,
      userName: 'lieutenant_user',
    }
    const wrapper = mount(<FollowButton {...props} i18n={i18n} />)
    expect(wrapper.find('button').html()).toContain('userMenu.follow')
    wrapper.find('button').simulate('click')
  })
})
