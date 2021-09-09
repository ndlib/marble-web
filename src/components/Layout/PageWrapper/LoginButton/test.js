import React from 'react'
import { mount } from 'enzyme'
import { LoginButton } from './'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

describe('LoginButton', () => {
  test('no button', () => {
    process.env.AUTH_CLIENT_ID = null
    process.env.AUTH_CLIENT_ISSUER = null
    process.env.AUTH_CLIENT_URL = null
    const loginReducer = { status: 'STATUS NOT LOGGED IN' }
    const wrapper = mount(<LoginButton loginReducer={loginReducer} i18n={i18n} />)
    expect(wrapper.find('.loginButton').exists()).toBeFalsy()
  })

  test('logged in', () => {
    process.env.AUTH_CLIENT_ID = 'abc'
    process.env.AUTH_CLIENT_ISSUER = 'def'
    process.env.AUTH_CLIENT_URL = 'ghi'
    const loginReducer = {
      status: 'STATUS_LOGGED_IN',
      user: {
        fullName: 'Johnny Logged In',
        netid: 'jloggedin',
      },
    }
    const wrapper = mount(<LoginButton loginReducer={loginReducer} i18n={i18n} />)
    expect(wrapper.find(Link).length).toEqual(2)
    expect(wrapper.find(Link).at(0).props().to).toEqual('/user/jloggedin')
    expect(wrapper.find(Link).at(1).props().to).toEqual('/user/logout')
  })

  test('not logged in', () => {
    process.env.AUTH_CLIENT_ID = 'abc'
    process.env.AUTH_CLIENT_ISSUER = 'def'
    process.env.AUTH_CLIENT_URL = 'ghi'
    const loginReducer = { status: 'STATUS NOT LOGGED IN' }
    const wrapper = mount(<LoginButton loginReducer={loginReducer} i18n={i18n} />)
    expect(wrapper.find(Link).at(1).props().to).toEqual('/user')
    expect(wrapper.find(Link).at(0).props().to).toEqual('/user')
  })
})
