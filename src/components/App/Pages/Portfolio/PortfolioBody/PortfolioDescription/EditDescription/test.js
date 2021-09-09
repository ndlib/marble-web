import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { EditDescription } from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import TextArea from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextArea'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'

test('TitleEdit', () => {
  const closeFunc = jest.fn()
  jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
    return {
      portfolio: {
        description: 'I wrote something.',
      },
    }
  })
  let wrapper
  act(() => {
    wrapper = shallow(<EditDescription closeFunc={closeFunc} loginReducer={() => {}} />)
  })
  const input = wrapper.find(TextArea)

  expect(input.props().defaultValue).toEqual('I wrote something.')
  expect(wrapper.find(SaveOrCancelButtons).exists()).toBeTruthy()

  act(() => {
    const e = {
      target: {
        value: '',
      },
    }
    input.props().onChange(e)
  })
})
