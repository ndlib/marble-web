import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import { UserBasePathContent } from './'
import LoginArea from './LoginArea'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'

describe('UserBasePathContent', () => {
  test('STATUS_NOT_LOGGED_IN', () => {
    const props = {
      loginReducer: {
        status: 'STATUS_NOT_LOGGED_IN',
      },
    }
    const wrapper = shallow(<UserBasePathContent {...props} />)
    expect(wrapper.find(LoginArea).exists()).toBeTruthy()
  })

  test('STATUS_TRYING_AUTHENTICATION', () => {
    const props = {
      loginReducer: {
        status: 'STATUS_TRYING_AUTHENTICATION',
      },
    }
    const wrapper = shallow(<UserBasePathContent {...props} />)
    expect(wrapper.find(Loading).exists()).toBeTruthy()
  })

  test.skip('STATUS_AUTHENTICATION_FAILED', () => {
    const props = {
      loginReducer: {
        status: 'STATUS_AUTHENTICATION_FAILED',
      },
    }
    const wrapper = shallow(<UserBasePathContent {...props} />)
    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  test('STATUS_AUTHENTICATED_TRYING_LOGIN', () => {
    const props = {
      loginReducer: {
        status: 'STATUS_AUTHENTICATED_TRYING_LOGIN',
      },
    }
    const wrapper = shallow(<UserBasePathContent {...props} />)
    expect(wrapper.find(Loading).exists()).toBeTruthy()
  })

  test('STATUS_LOGGED_IN', () => {
    // expect navigate to be called
    const props = {
      loginReducer: {
        status: 'STATUS_LOGGED_IN',
        user: {
          netid: 'corporal_user',
        },
      },
    }
    shallow(<UserBasePathContent {...props} />)
    expect(navigate).toHaveBeenCalledWith('/user/corporal_user')
  })

  test.skip('DEFAULT', () => {
    const props = {
      loginReducer: {
        status: '????',
      },
    }
    const wrapper = shallow(<UserBasePathContent {...props} />)
    expect(wrapper.find('.error').exists()).toBeTruthy()
  })
})
