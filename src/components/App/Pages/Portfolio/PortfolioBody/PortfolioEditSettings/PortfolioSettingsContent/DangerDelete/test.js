import React from 'react'
import { mount } from 'enzyme'
import { DangerDelete } from './'
import { navigate } from 'gatsby'

describe('DangerDelete', () => {
  console.log = jest.fn()
  const props = {
    portfolio: {
      id: 'my-id',
      title: 'Portfolio Title',
    },
    loginReducer: {},
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  test.skip('confirm', () => {
    jest.spyOn(window, 'confirm').mockImplementationOnce(() => true)
    const wrapper = mount(<DangerDelete {...props} />)

    wrapper.find('button').simulate('click')
    expect(navigate).toHaveBeenCalled()
  })
  test('cancel', () => {
    jest.spyOn(window, 'confirm').mockImplementationOnce(() => false)
    const wrapper = mount(<DangerDelete {...props} />)

    wrapper.find('button').simulate('click')
    expect(navigate).not.toHaveBeenCalled()
  })
})
