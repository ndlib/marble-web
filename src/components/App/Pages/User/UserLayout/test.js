import React from 'react'
import { shallow } from 'enzyme'
import { UserLayout } from './'
import * as Auth from '@ndlib/gatsby-theme-marble/src/utils/auth'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Gravatar from '@ndlib/gatsby-theme-marble/src/components/Shared/Gravatar'
import EditUserButton from './EditUserButton'
import * as userContext from '@ndlib/gatsby-theme-marble/src/context/UserContext'

describe('UserLayout', () => {
  test('ownsPage', () => {
    jest.spyOn(userContext, 'useUserContext').mockImplementation(() => {
      return {
        portfolioUser: {
          portfolioUserId: 'person_user',
          email: 'me@email.web',
          fullName: 'Person User',
          bio: 'some bio',

        },
      }
    })

    const props = {
      location: {},
      loginReducer: {
        user: {
          netid: 'person_user',
        },
      },
    }
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    const wrapper = shallow(<UserLayout {...props}><div className='childContent' /></UserLayout>)
    expect(wrapper.find(Seo).props().title).toEqual('person_user')
    expect(wrapper.find(Gravatar).props().email).toEqual('me@email.web')
    expect(wrapper.find('[as="h1"]').html()).toContain('Person User')
    expect(wrapper.find('#bio').html()).toContain('some bio')
    // different for ownership status
    expect(wrapper.find(EditUserButton).exists()).toBeTruthy()
  })
})
