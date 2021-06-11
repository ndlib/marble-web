import React from 'react'
import { shallow } from 'enzyme'
import { Heading, Button } from 'theme-ui'
import { useStaticQuery } from 'gatsby'
import ItemListModal from '../../Shared/ItemListModal'
import StatsPage from './'

let wrapper

describe('StatsPage', () => {
  const items = [
    {
      marbleId: '123',
      slug: 'item/123',
      title: 'My item is super awesome and stuff',
      description: '',
      collection: '001234567',
      copyrightRestricted: false,
      partiallyDigitized: null,
      childrenMarbleFile: [],
      metadata: [
        {
          label: 'Campus Location',
          value: ['Group #1'],
        },
      ],
    },
    {
      marbleId: '456',
      slug: 'item/456',
      title: 'Mine is better',
      description: 'I have a description',
      collection: '007654321',
      copyrightRestricted: false,
      partiallyDigitized: null,
      childrenMarbleFile: [
        {
          fileType: 'image',
          iiif: {
            default: 'some_path.tif',
            thumbnail: 'somewhere.jpg',
          },
        },
      ],
      metadata: [
        {
          label: 'Campus Location',
          value: ['Group #2'],
        },
      ],
    },
    {
      marbleId: '789',
      slug: 'item/789',
      title: 'Mine is besterest',
      description: 'I also have that description',
      collection: '007654321',
      copyrightRestricted: false,
      partiallyDigitized: null,
      childrenMarbleFile: [
        {
          fileType: 'image',
          local: {
            publicURL: 'blah',
          },
        },
      ],
      metadata: [
        {
          label: 'Campus Location',
          value: ['Group #2'],
        },
      ],
    },
  ]

  beforeEach(() => {
    useStaticQuery.mockImplementation(() => {
      return {
        allMarbleItem: {
          totalCount: items.length,
          nodes: items,
        },
      }
    })
    wrapper = shallow(<StatsPage />)
  })

  afterEach(() => {
    wrapper = undefined
  })

  test('has Heading', () => {
    expect(wrapper.find(Heading).exists()).toBe(true)
  })

  test('displays a count of all items', () => {
    expect(wrapper.findWhere(el => el.text() === `Total items: ${items.length}`).exists()).toBe(true)
  })

  test('identifies items missing images', () => {
    expect(wrapper.findWhere(el => el.text() === 'Items missing images: 1').exists()).toBe(true)
  })

  test('identifies items missing description', () => {
    expect(wrapper.findWhere(el => el.text() === 'Items missing description: 1').exists()).toBe(true)
  })

  test('groups items by Campus Location metadata', () => {
    expect(wrapper.findWhere(el => el.text() === 'Group #1: 1').exists()).toBe(true)
    expect(wrapper.findWhere(el => el.text() === 'Group #2: 2').exists()).toBe(true)
  })

  test('opens a modal when clicking item category', () => {
    // Shouldn't be visible before clicking!
    expect(wrapper.find(ItemListModal).exists()).toBe(false)

    const btn = wrapper.findWhere(el => el.type() === Button && el.text().includes('Total items'))
    expect(btn.exists()).toBe(true)
    btn.simulate('click')

    expect(wrapper.find(ItemListModal).exists()).toBe(true)
  })

  test('modal is no longer rendered after closing', () => {
    const btn = wrapper.findWhere(el => el.type() === Button && el.text().includes('Total items'))
    btn.simulate('click')

    const modal = wrapper.find(ItemListModal)
    expect(modal.exists()).toBe(true)
    modal.props().onClose()

    expect(wrapper.find(ItemListModal).exists()).toBe(false)
  })
})
