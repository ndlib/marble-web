import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { TitleEdit } from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import TextField from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextField'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'

test('TitleEdit', () => {
  const closeFunc = jest.fn()
  jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
    return {
      portfolio: {
        title: 'My Title',
      },
    }
  })
  let wrapper
  act(() => {
    wrapper = shallow(<TitleEdit closeFunc={closeFunc} loginReducer={() => {}} />)
  })
  expect(wrapper.find('label').text()).toContain('Title')
  const input = wrapper.find(TextField)

  expect(input.props().defaultValue).toEqual('My Title')
  expect(wrapper.find(SaveOrCancelButtons).exists()).toBeTruthy()
  expect(wrapper.find('em').exists()).toBeFalsy()

  act(() => {
    const e = {
      target: {
        value: '',
      },
    }
    input.props().onChange(e)
  })
  expect(wrapper.find('em').text()).toContain('blank')
})
