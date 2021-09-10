import React from 'react'
import { shallow } from 'enzyme'
import { Heading } from 'theme-ui'
import { useStaticQuery } from 'gatsby'
import ItemListModal from '../../Shared/ItemListModal'
import StatsPage from './'
import Stat from './Stat'

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

  test('renders a stat for all items', () => {
    const stat = wrapper.find(Stat).findWhere(el => el.props().label.startsWith('Total items'))
    expect(stat.exists()).toBe(true)
    expect(stat.props().items).toEqual(items)
    expect(stat.props().openModal).toEqual(expect.any(Function))
  })

  test('renders a stat for items missing images', () => {
    const stat = wrapper.find(Stat).findWhere(el => el.props().label.startsWith('Items missing images'))
    expect(stat.exists()).toBe(true)
    expect(stat.props().items).toEqual([
      items[0],
    ])
    expect(stat.props().openModal).toEqual(expect.any(Function))
  })

  test('renders a stat for items missing description', () => {
    const stat = wrapper.find(Stat).findWhere(el => el.props().label.startsWith('Items missing description'))
    expect(stat.exists()).toBe(true)
    expect(stat.props().items).toEqual([
      items[0],
      items[1],
    ])
    expect(stat.props().openModal).toEqual(expect.any(Function))
  })

  test('stats get a prop to open a modal', () => {
    // Shouldn't be visible before clicking!
    expect(wrapper.find(ItemListModal).exists()).toBe(false)

    const stat = wrapper.find(Stat).first()
    expect(stat.exists()).toBe(true)
    expect(stat.props().openModal).toEqual(expect.any(Function))
    stat.props().openModal(stat.props().items, stat.props().label)

    expect(wrapper.find(ItemListModal).exists()).toBe(true)
  })

  test('modal is no longer rendered after closing', () => {
    const stat = wrapper.find(Stat).first()
    expect(stat.exists()).toBe(true)
    expect(stat.props().openModal).toEqual(expect.any(Function))
    stat.props().openModal(stat.props().items, stat.props().label)

    const modal = wrapper.find(ItemListModal)
    expect(modal.exists()).toBe(true)
    modal.props().onClose()

    expect(wrapper.find(ItemListModal).exists()).toBe(false)
  })
})
