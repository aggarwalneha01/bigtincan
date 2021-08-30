import React from 'react';
import enzyme,{ shallow } from 'enzyme';
import axios from 'axios';
import App from '../src/App';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

const mockProps = {
    // createHandler: jest.fn(),
    deleteHandler: jest.fn(),
    // readHandler: jest.fn(),
    // replaceHandler: jest.fn(),
    isChecked: "file-1"
  };

  jest.mock("axios");


  describe('MockComponentEnzyme', ()=>{
    it('should call axios delete function on clicking delete button', () => {
        const view = shallow(<App {...mockProps}/>);
        console.log(view.debug());

        view.find('button').at(3).simulate('click');
        axios.delete.mockImplementation(() => Promise.resolve({}))
        expect(axios.delete).toHaveBeenCalledTimes(1);

    })

    // it('should get data', () => {  
    // const view = shallow(<FileUploadPage />);
    // const button = view.find("button");
    // expect(button).toHaveLength(4);
    // })

    // it('should have a create button', ()=>{
    //     const { createHandler } = mockProps;
    //     const view = shallow(<FileUploadPage  {...mockProps}/>);
    //     const createButton = view.find('button').at(0);
    //     expect(createButton.text()).toBe('Create');
    //     const view1 = createButton.simulate('click');
    //     // view1.update();
    //     console.log(view1.debug(), "dfbdfbdf");
    //     expect(createHandler).toHaveBeenCalled();

    // })
  })