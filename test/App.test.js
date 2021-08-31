import React from 'react';
import enzyme,{ shallow } from 'enzyme';
import axios from 'axios';
import App from '../src/App';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
 
jest.mock('axios');

const mockProps = {
  createHandler: jest.fn(),
  deleteHandler: jest.fn(),
  readHandler: jest.fn(),
  replaceHandler: jest.fn(),
  isChecked: {"file-1": true},
  fileId: "file-1"
};
 
describe('deleteData', () => {
  it('should call axios delete function on clicking delete button', () => {
    const view = shallow(<App deleteHandler={ mockProps.deleteHandler} isChecked={mockProps.isChecked}/>);
    view.find('button').at(3).simulate('click');
    axios.delete.mockImplementation(() => Promise.resolve({}))
    expect(axios.delete).not.toHaveBeenCalledTimes(1);

  })
  it('should call axios read function on clicking read button', () => {
    const view = shallow(<App readHandler={mockProps.readHandler}isChecked={mockProps.isChecked}/>);
    view.find('button').at(2).simulate('click');
    axios.get.mockImplementation(() => Promise.resolve({}))
    expect(axios.get).not.toHaveBeenCalledTimes(1);

  })
  it('should call axios create function on clicking create button', () => {
    const view = shallow(<App createHandler={mockProps.createHandler}isChecked={mockProps.isChecked}/>);
    view.find('button').at(0).simulate('click');
    axios.create.mockImplementation(() => Promise.resolve({}))
    expect(axios.create).not.toHaveBeenCalledTimes(1);

  })
  it('should call axios replace function on clicking replace button', () => {
    const view = shallow(<App replaceHandler={mockProps.replaceHandler}isChecked={mockProps.isChecked}/>);
    view.find('button').at(1).simulate('click');
    axios.put.mockImplementation(() => Promise.resolve({}))
    expect(axios.put).not.toHaveBeenCalledTimes(1);

  })
 
  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';
 
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
  });
});