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
  handleSubmission: jest.fn(),
  fileId: "file-1",
  id: '1'
};
 
describe('Data', () => {
  it('should call axios delete function on clicking delete button', () => {
    const deleteData = {"operation":'delete',"fileId":mockProps.id};
    const url="https://612d51fae579e1001791db49.mockapi.io/files/"+mockProps.id;
    axios.delete.mockImplementation(() => Promise.resolve({}))
    const view = shallow(<App deleteHandler={ mockProps.deleteHandler} id={mockProps.id}/>);
    view.find('ul').first().find('button').last().simulate('click');
    
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(url, deleteData);

  })
  it('should call axios read function on clicking read button', () => {
    const readData = {"operation":'read',"fileId":mockProps.id};
    const url="https://612d51fae579e1001791db49.mockapi.io/files/"+mockProps.id;
    axios.get.mockImplementation(() => Promise.resolve({}))
    const view = shallow(<App readHandler={ mockProps.readHandler} id={mockProps.id}/>);
    view.find('ul').first().find('button').at(1).simulate('click');
    
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url, readData);

  })
  it('should call axios create function on clicking create button', () => {
    const createData = {"operation":'create',"data":'selectedFile.txt'};
    const url="https://612d51fae579e1001791db49.mockapi.io/files";
    axios.get.mockImplementation(() => Promise.resolve({}))
    const view = shallow(<App createHandler={ mockProps.createHandler} isSelected={true} />);
    const button=view.find('button');
    const createButton = button.findWhere(node => {
      return node.type() === 'button' && node.text() === "Create";
    }).simulate('click');
    view.update();
    view.find('button').findWhere(node => {
      return node.type() === 'button' && node.text() === "Submit";
    }).simulate('click');
    console.log(view.debug());
    
    
    expect(view.find('input[type="file"]')).toBeTruthy();
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.create).toHaveBeenCalledWith(url, createData);
  })
  it('should call axios replace function on clicking replace button', () => {
    const replaceData = {"operation":'replace',"data":'selectedFile.txt', "fileId": mockProps.id};
    const url="https://612d51fae579e1001791db49.mockapi.io/files/"+mockProps.id;
    axios.get.mockImplementation(() => Promise.resolve({}))
    const view = shallow(<App replaceHandler={mockProps.replaceHandler} isSelected={true}/>);
    const test=view.find('ul').first().find('button').first().simulate('click');
    view.update();
    view.find('input[type="file"]').simulate('click');
    view.update();
    console.log(view.debug());
    
    expect(view.find('input[type="file"]')).toBeTruthy();
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(url, replaceData);

  })
 
});