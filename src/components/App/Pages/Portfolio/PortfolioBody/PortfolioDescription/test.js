import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import PortfolioDescription from './'
import * as PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import EditButton from '../EditButton'
import EditDescription from './EditDescription'
import * as UserContext from '@ndlib/gatsby-theme-marble/src/context/UserContext'

describe('PortfolioDescription', () => {
  test('isOwner, blank description', () => {
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        portfolio: {
          description: '',
        },
      }
    })
    jest.spyOn(UserContext, 'useUserContext').mockImplementationOnce(() => {
      return {
        isPorfolioOwner: () => true,
      }
    })
    let wrapper
    act(() => {
      wrapper = shallow(<PortfolioDescription isOwner />)
    })
    expect(wrapper.dive().dive().find('button').exists()).toBeTruthy()
    expect(wrapper.find(EditButton).exists()).toBeFalsy()

    act(() => wrapper.dive().dive().find('button').props().onClick())

    expect(wrapper.find(EditDescription).exists()).toBeTruthy()
  })

  test('isOwner, description', () => {
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        portfolio: {
          description: 'Some text',
        },
      }
    })
    let wrapper
    act(() => {
      wrapper = shallow(<PortfolioDescription isOwner />)
    })
    expect(wrapper.find(EditButton).exists()).toBeTruthy()
    expect(wrapper.find('button').exists()).toBeFalsy()
    act(() => wrapper.find(EditButton).props().setEditFunc())

    expect(wrapper.find(EditDescription).exists()).toBeTruthy()
  })

  test('not isOwner, blank description', () => {
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        portfolio: {
          description: '',
        },
      }
    })
    let wrapper
    act(() => {
      wrapper = shallow(<PortfolioDescription />)
    })
    expect(wrapper.find('div').exists()).toBeFalsy()
    expect(wrapper.find('button').exists()).toBeFalsy()
    expect(wrapper.find(EditButton).exists()).toBeFalsy()
  })
})
