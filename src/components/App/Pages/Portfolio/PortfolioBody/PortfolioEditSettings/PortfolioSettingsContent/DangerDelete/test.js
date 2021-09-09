import React from 'react'
import { mount } from 'enzyme'
import { DangerDelete } from './'
import { navigate } from 'gatsby'
import * as api from '@ndlib/gatsby-theme-marble/src/utils/api'

describe('DangerDelete', () => {
  console.log = jest.fn()
  const props = {
    portfolio: {
      id: 'my-id',
      title: 'Portfolio Title',
    },
    loginReducer: { user: { netid: 'jhartzle' } },
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  test.skip('confirm', () => {
    jest.spyOn(api, 'removeCollection').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve()
      })
    })

    jest.spyOn(window, 'confirm').mockImplementationOnce(() => true)
    const wrapper = mount(<DangerDelete {...props} />)

    wrapper.find('button').simulate('click')
    expect(navigate).toHaveBeenCalled()
  })
  test('cancel', () => {
    jest.spyOn(api, 'removeCollection').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve()
      })
    })
    jest.spyOn(window, 'confirm').mockImplementationOnce(() => false)
    const wrapper = mount(<DangerDelete {...props} />)

    wrapper.find('button').simulate('click')
    expect(navigate).not.toHaveBeenCalled()
  })
})
