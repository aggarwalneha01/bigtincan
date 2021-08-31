
import React, {useState} from 'react';
import axios from 'axios';
// import mockadapter from 'axios-mock-adapter';
import Checkbox from './checkbox';
// import './App.css';

// var mock = new mockadapter(axios);
// mock.onPost("/create").reply(200,{});
// mock.onDelete("/delete").reply(200,{});
// mock.onGet("/read").reply(200,{});
// mock.onPut("/replace").reply(200,{});

const App = () => {

  let url;
  const checkboxes = [
    {
        name: "file-1",
        key: "1",
        label: "file 1"
    },
    {
        name: "file-2",
        key: "2",
        label: "file 2"
    },
    {
        name: "file-3",
        key: "3",
        label: "file 3"
    },
    {
        name: "file-4",
        key: "4",
        label: "file 4"
    }
];
  
	const [isSelected, setIsSelected] = useState(false);
  const [isChecked, setIsChecked] = useState({});
  const [upload, setUpload]= useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [fileId, setFileId]= useState();
  const [action, setAction] = useState();

  const operation = {
    create: 'create',
    replace: 'replace',
    read: 'read',
    delete: 'delete'
  };

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

  const handleInputChange = (event) => {
    setFileId(event.target.id);
    setIsChecked({...isChecked, [event.target.name] : event.target.checked });
  }

  const apiCall = (axiosAction, data, url ) => {
    axiosAction(url, data)
                .then((res) => {
                  alert("Operation Successfull " + JSON.stringify(res));
              })
                .catch((err) => alert(err));

  }

const handleSubmission = () => {
  if(!isSelected){
    alert("Please select file to upload")
  }
  else{
    const formData = new FormData();
    if(action==='create'){
      const createData = {"operation":operation.create,"data":selectedFile, "fileId":"1"};
      formData.append('File', selectedFile);
      apiCall(axios.post, createData, url='https://612d51fae579e1001791db49.mockapi.io/files');
    }
    else if (action ==='replace')
    {
      const replaceData = {"operation":operation.replace,"data":selectedFile, "fileId": fileId};
      formData.append('File', selectedFile);
      apiCall(axios.put, replaceData, url="https://612d51fae579e1001791db49.mockapi.io/files/"+fileId);
    
    }
  }
};

const validate = () => {
  if((Object.keys(isChecked).length !== 1)){
    alert("Please select one file");
    return false;
  }
  return true;
}


const createHandler = () => {
  setAction("create");
  setUpload(true);
}

const deleteHandler = () => {
  if(validate()) 
  {
      setAction("delete");
      const deleteData = {"operation":operation.delete,"fileId":fileId};
      apiCall(axios.delete, deleteData, url="https://612d51fae579e1001791db49.mockapi.io/files/"+fileId);
 }
}

const readHandler = () => {
  if(validate()){
   setAction("read");
  const readData = {"operation":operation.read,"fileId":fileId};
  apiCall(axios.get, readData, url="https://612d51fae579e1001791db49.mockapi.io/files/"+fileId);
  }
}

const replaceHandler = () => {
  if(validate()){
  setAction("replace");
  setUpload(true);
  }
}

const checkboxesToRender = checkboxes.map(item => {
  return (
      <label key={item.key}>
          {item.name}
          <Checkbox
              id={item.key}
              name={item.name}
              checked={isChecked[item.name]}
              onChange={handleInputChange}
              type="checkbox"
          />
      </label>
  );
});


	return(
   <div >
     {checkboxesToRender}
      <div>
				<button name ='create 'onClick={createHandler}>Create</button>
        <button onClick={replaceHandler}>Update</button>
        <button onClick={readHandler}>Read</button>
        <button onClick={deleteHandler}>Delete</button>
			</div>
      <div>
        {upload ? <input type="file" name="file" onChange={changeHandler} /> : ''}
      </div>
			<div>
      {upload ? <button onClick={handleSubmission}>Submit</button>: ''}
			</div>
		</div>
	)
  }

export default App;