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

const location = {}

test('Footer', () => {
  useStaticQuery.mockImplementationOnce(() => {
    return sq
  })

  const wrapper = shallow(<Footer location={location} />)
  expect(wrapper.find(Menu).props().variant).toEqual('menuFooter')
})
