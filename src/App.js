
import React, {useState} from 'react';
import axios from 'axios'
// import './App.css';

const App = () => {

  let url;
  const files = [
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
      const createData = {"operation":operation.create,"data":selectedFile};
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

const createHandler = () => {
  setAction("create");
  setUpload(true);
}

const deleteHandler = (id) => {
    setFileId(id);
      setAction("delete");
      const deleteData = {"operation":operation.delete,"fileId":id};
      apiCall(axios.delete, deleteData, url="https://612d51fae579e1001791db49.mockapi.io/files/"+id);
}

const readHandler = (id) => {
      setAction("read");
      const readData = {"operation":operation.read,"fileId":id};
      apiCall(axios.get, readData, url="https://612d51fae579e1001791db49.mockapi.io/files/"+id);
}

const replaceHandler = (id) => {
    setFileId(id);
    setAction("replace");
    setUpload(true);
}

const filesToRender = files.map(item => {
  return (
    <ul key={item.key}>
      <label key={item.key} className='App'>
          {item.name + ' --- '}
        <button onClick={()=>replaceHandler(item.key)}>Update</button>
        <button onClick={()=>readHandler(item.key)}>Read</button>
        <button onClick={()=>deleteHandler(item.key)}>Delete</button>
      </label>
      </ul>
  );
});


	return(
   <div >
     {filesToRender}
      <div>
				<button onClick={createHandler}>Create</button>
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