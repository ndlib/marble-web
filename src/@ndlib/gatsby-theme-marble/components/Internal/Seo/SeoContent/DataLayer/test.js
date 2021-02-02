import React from 'react'
import { mount } from 'enzyme'
import DataLayer from './'

test('DataLayer has metadata', () => {
  const title = 'fake title'
  const description = 'fake description'
  const author = 'fake author'
  const image = 'http://fake.image'
  const url = 'http://fake.path'

  const wrapper = mount(<DataLayer title={title} description={description} author={author} image={image} url={url}></DataLayer>)
  expect(wrapper.find(DataLayer).props().title).toEqual('fake title')
  expect(wrapper.find(DataLayer).props().description).toEqual('fake description')
  expect(wrapper.find(DataLayer).props().author).toEqual('fake author')
  expect(wrapper.find(DataLayer).props().image).toEqual('http://fake.image')
  expect(wrapper.find(DataLayer).props().url).toEqual('http://fake.path')
})
