import React from 'react'
import { shallow } from 'enzyme'
import Footer from './'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import { useStaticQuery } from 'gatsby'

const sq = {
  menusJson: {
    label: 'footer',
    id: 'footer',
    items: [
      {
        id: 'footer',
        label: 'label',
        link: 'link',
      },
    ],
  },
}

test('Footer', () => {
  useStaticQuery.mockImplementationOnce(() => {
    return sq
  })

  const wrapper = shallow(<Footer />)
  expect(wrapper.find('.footer-email').at(0).text()).toEqual('sniteart@nd.edu')
  expect(wrapper.find('.footer-email').at(1).text()).toEqual('asklib@nd.edu')
  expect(wrapper.find(Menu).props().variant).toEqual('footer')
})
