import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { Heading } from 'theme-ui'
import PortfolioTitle from './'
import TitleEdit from './TitleEdit'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import EditButton from '../EditButton'

test('PortfolioTitle', () => {
  jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
    return {
      portfolio: {
        title: 'My Title',
      },
    }
  })
  let wrapper
  act(() => {
    wrapper = shallow(<PortfolioTitle isOwner />)
  })

  expect(wrapper.find(Heading).text()).toContain('My Title')
  expect(wrapper.find(EditButton).exists()).toBeTruthy()

  act(() => wrapper.find(EditButton).props().setEditFunc())

  expect(wrapper.find(TitleEdit).exists()).toBeTruthy()
})
