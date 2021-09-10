import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'theme-ui'
import Stat from './'

let wrapper
let props

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

  afterEach(() => {
    wrapper = undefined
    props = undefined
  })

  describe('with groups enabled', () => {
    beforeEach(() => {
      props = {
        label: 'Total items',
        items: JSON.parse(JSON.stringify(items)),
        openModal: jest.fn(),
        showGroups: true,
      }
      wrapper = shallow(<Stat {...props} />)
    })

    test('renders Button for opening modal with item list', () => {
      const btn = wrapper.findWhere(el => el.type() === Button && el.text().startsWith(props.label))
      expect(btn.exists()).toBe(true)

      btn.simulate('click')

      expect(props.openModal).toHaveBeenCalledWith(props.items, props.label)
    })

    test('groups items by Campus Location metadata', () => {
      expect(wrapper.findWhere(el => el.text() === 'Group #1: 1').exists()).toBe(true)
      expect(wrapper.findWhere(el => el.text() === 'Group #2: 2').exists()).toBe(true)
    })
  })

  describe('with groups disabled', () => {
    beforeEach(() => {
      props = {
        label: 'Total items',
        items: JSON.parse(JSON.stringify(items)),
        openModal: jest.fn(),
        showGroups: false,
      }
      wrapper = shallow(<Stat {...props} />)
    })

    test('renders Button for opening modal with item list', () => {
      const btn = wrapper.findWhere(el => el.type() === Button && el.text().startsWith(props.label))
      expect(btn.exists()).toBe(true)

      btn.simulate('click')

      expect(props.openModal).toHaveBeenCalledWith(props.items, props.label)
    })

    test('does NOT render elements for groups', () => {
      expect(wrapper.findWhere(el => el.text().includes('Group #1')).exists()).toBe(false)
      expect(wrapper.findWhere(el => el.text().includes('Group #2')).exists()).toBe(false)
      expect(wrapper.find('ul').exists()).toBe(false)
    })
  })
})
