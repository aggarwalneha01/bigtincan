
import React, {useState, useEffect} from 'react';
import axios from 'axios'

const App = () => {
  
	const [isSelected, setIsSelected] = useState(false);
  const [upload, setUpload]= useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [fileId, setFileId]= useState();
  const [action, setAction] = useState();
  const [mockData, setMockData] = useState('') 

  useEffect(() => {                             
      axios.get('https://612d51fae579e1001791db49.mockapi.io/files')
      .then((res) => {
        setMockData(res.data);
    })
      .catch((err) => alert(err))
  }, [setMockData])

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

  function refresh() {    
    setTimeout(function () {
        window.location.reload()
    }, 500);
}

  const apiCall = (axiosAction, data, url ) => {
    axiosAction(url, data)
                .then((res) => {
                  alert( " Operation Successfull ");
              })
                .catch((err) => alert(err));
                refresh();
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
      apiCall(axios.post, createData, 'https://612d51fae579e1001791db49.mockapi.io/files');
    }
    else if (action ==='replace')
    {
      const replaceData = {"operation":operation.replace,"data":selectedFile, "fileId": fileId};
      formData.append('File', selectedFile);
      apiCall(axios.put, replaceData, "https://612d51fae579e1001791db49.mockapi.io/files/"+fileId);
    
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
      apiCall(axios.delete, deleteData, "https://612d51fae579e1001791db49.mockapi.io/files/"+id);
}

const readHandler = (id) => {
      setAction("read");
      const readData = {"operation":operation.read,"fileId":id};
      axios.get("https://612d51fae579e1001791db49.mockapi.io/files/"+id, {responseType: 'blob'})
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file'+id);
        document.body.appendChild(link);
        link.click();
     }).catch(err => {
         console.log(err);
       });
}

const replaceHandler = (id) => {
    setFileId(id);
    setAction("replace");
    setUpload(true);
}

const filesToRender = (mockData && mockData.map(item => {
  return (
    <ul key={item.fileId}>
      <label key={item.fileId} className='App'>
          {'file-'+item.fileId + ' --- '}
        <button onClick={()=>replaceHandler(item.fileId)}>Update</button>
        <button onClick={()=>readHandler(item.fileId)}>Download</button>
        <button onClick={()=>deleteHandler(item.fileId)}>Delete</button>
      </label>
      </ul>
  );
}));


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