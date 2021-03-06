import React from 'react'
import { shallow } from 'enzyme'
import { UserLayout } from './'
import * as Auth from '@ndlib/gatsby-theme-marble/src/utils/auth'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Gravatar from '@ndlib/gatsby-theme-marble/src/components/Shared/Gravatar'
import EditUserButton from './EditUserButton'

describe('UserLayout', () => {
  test('ownsPage', () => {
    const props = {
      user: {
        userName: 'person_user',
        email: 'me@email.web',
        fullName: 'Person User',
        bio: 'some bio',
      },
      location: {},
      loginReducer: {
        user: {
          userName: 'person_user',
        },
      },
    }
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    const wrapper = shallow(<UserLayout {...props}><div className='childContent' /></UserLayout>)
    expect(wrapper.find(Seo).props().title).toEqual('person_user')
    expect(wrapper.find(Gravatar).props().email).toEqual('me@email.web')
    expect(wrapper.find('h1').html()).toContain('Person User')
    expect(wrapper.find('h2').html()).toContain('person_user')
    expect(wrapper.find('.childContent').exists()).toBeTruthy()
    expect(wrapper.find('#bio').html()).toContain('some bio')
    // different for ownership status
    expect(wrapper.find(EditUserButton).props().userName).toEqual('person_user')
  })
  test('does not ownsPage', () => {
    const props = {
      user: {
        userName: 'person_user',
        email: 'me@email.web',
        fullName: 'Person User',
        bio: 'some bio',
      },
      location: {},
      loginReducer: {},
    }
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => false)
    jest.spyOn(Auth, 'isLoggedIn').mockImplementationOnce(() => false)
    const wrapper = shallow(<UserLayout {...props}><div className='childContent' /></UserLayout>)
    expect(wrapper.find(Seo).props().title).toEqual('person_user')
    expect(wrapper.find(Gravatar).props().email).toEqual('me@email.web')
    expect(wrapper.find('h1').html()).toContain('Person User')
    expect(wrapper.find('h2').html()).toContain('person_user')
    expect(wrapper.find('.childContent').exists()).toBeTruthy()
    expect(wrapper.find('#bio').html()).toContain('some bio')
    // different for ownership status
    expect(wrapper.find(EditUserButton).exists()).toBeFalsy()
  })
})
