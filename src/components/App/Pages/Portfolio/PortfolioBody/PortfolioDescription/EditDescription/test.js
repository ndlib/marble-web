import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { EditDescription } from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'

test('EditDescription', () => {
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
  const input = wrapper.find('EmotionCssPropInternal#portfolioDescription')

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
