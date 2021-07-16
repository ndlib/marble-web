import React from 'react'
import { mount } from 'enzyme'
import { navigate } from 'gatsby'
import { NewPortfolioButton, successFunc } from './'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

describe('NewPortfolioButton', () => {
  test('layout', () => {
    const props = {
      addFunc: jest.fn(),
      loginReducer: {
        user: { uuid: 'asdf', userName: 'myUserName'},
      },
      portfolios: [],
    }
    const wrapper = mount(<NewPortfolioButton {...props} i18n={i18n} />)
    expect(wrapper.find('button').exists()).toBeTruthy()
  })

  test('successFunc', () => {
    const data = {
      uuid: 'asdf',
    }
    const addFunc = jest.fn()
    const portfolios = [{ uuid: '1' }, { uuid: '2' }]
    successFunc({
      data: data,
      portfolios: portfolios,
      addFunc: addFunc,
      setCreating: jest.fn(),
    })
    expect(navigate).toBeCalledWith('/user/myUserName/asdf')
    expect(addFunc).toBeCalledWith([{ uuid: 'asdf' }, { uuid: '1' }, { uuid: '2' }])
  })
})
