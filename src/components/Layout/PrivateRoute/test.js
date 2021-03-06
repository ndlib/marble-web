import React from 'react'
import { shallow } from 'enzyme'
import { PrivateRoute } from './'
import * as Gatsby from 'gatsby'
import * as auth from '@ndlib/gatsby-theme-marble/src/utils/auth'

describe('PrivateRoute', () => {
  test('it renders the page if we are not testing login', () => {
    jest.spyOn(auth, 'isLoggedIn').mockImplementation(() => false)
    const wrapper = shallow(<PrivateRoute location={{}} requireLogin={false} loginReducer={{}}>TEXT</PrivateRoute>)

    expect(wrapper.text()).toEqual('TEXT')
  })

  test('it renders the page if they are logged in and we are testing logins', () => {
    jest.spyOn(auth, 'isLoggedIn').mockImplementation(() => true)

    const wrapper = shallow(<PrivateRoute location={{}} requireLogin loginReducer={{}}>TEXT</PrivateRoute>)

    expect(wrapper.text()).toEqual('TEXT')
  })

  test('it navigates to the login page if they are not logged in and we are testing logins', () => {
    jest.spyOn(auth, 'isLoggedIn').mockImplementation(() => false)

    shallow(<PrivateRoute location={{}} requireLogin loginReducer={{}}>TEXT</PrivateRoute>)

    expect(Gatsby.navigate).toHaveBeenCalledWith('/user')
  })

  test('it does not navigage to the login page if they are already on it even if they are not logged in', () => {
    jest.spyOn(auth, 'isLoggedIn').mockImplementation(() => false)

    const wrapper = shallow(<PrivateRoute location={{ pathname: '/user' }} requireLogin loginReducer={{}}>TEXT</PrivateRoute>)

    expect(wrapper.text()).toEqual('TEXT')
  })
})
