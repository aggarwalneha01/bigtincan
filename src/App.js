
import React, {useState} from 'react';
import axios from 'axios';
import mockadapter from 'axios-mock-adapter';
import Checkbox from './checkbox';

var mock = new mockadapter(axios);
mock.onPost("/create").reply(200,{});
mock.onDelete("/delete").reply(200,{});
mock.onGet("/read").reply(200,{});
mock.onPut("/replace").reply(200,{});

const App = () => {

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
    setIsChecked({...isChecked, [event.target.name] : event.target.checked });
    setFileId(event.target.value);
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
        
                axios.post("/create" , createData)
                .then((res) => {
                  alert("File Upload success");
              })
                .catch((err) => alert("File Upload Error"));
    }
    else if (action ==='replace')
    {
      const replaceData = {"operation":operation.replace,"data":selectedFile, "fileid": fileId};
      formData.append('File', selectedFile);
      
                axios.put("/replace" , replaceData)
                .then((res) => {
                  alert("File replace success");
              })
                .catch((err) => alert("File replace Error"));
    
    }
  }
};

const createHandler = () => {
  setAction("create");
  setUpload(true);
}

const deleteHandler = () => {
  console.log("test", isChecked);
  if((Object.keys(isChecked).length !== 1)){
    alert("Please select one file to delete");
  }
  else{
      setAction("delete");
      const deleteData = {"operation":operation.delete,"fileid":fileId};
      axios.delete("/delete", deleteData)
                  .then((res) => {
                    alert("File Deleted");
                })
                  .catch((err) => alert("File Delete Error"));
 }
}

const readHandler = () => {
  if((Object.keys(isChecked).length !== 1)){
    alert("Please select one file to read");
  }
  else{
   setAction("read");
  const readData = {"operation":operation.read,"fileid":fileId};
  axios.get("/read", readData)
              .then((res) => {
                alert("File Read");
             })
              .catch((err) => alert("File Read Error"));
  }
}

const replaceHandler = () => {
  if((Object.keys(isChecked).length !== 1)){
    alert("Please select one file to replace");
  }
  else{
  setAction("replace");
  setUpload(true);
  }
}

const checkboxesToRender = checkboxes.map(item => {
  return (
      <label key={item.key}>
          {item.name}
          <Checkbox
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