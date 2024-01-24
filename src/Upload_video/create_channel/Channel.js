import React, { useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './Channel.css';
import { onValue, ref, getDatabase, set } from 'firebase/database';
import app from '../../backend/Firebase';
import { useNavigate} from 'react-router-dom';

const Channel = () => {
  const [file, setFile] = useState(null);
  const input_file = useRef(null);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('@');
  const [color, setColor] = useState('white');
  const realdb = getDatabase(app);
  const [handlerValue, setHandlerValue] = useState('');
  const [handlerNameAvailable, setHandlerNameAvailable] = useState(true);
  const navigate = useNavigate();

  const nameRef=useRef(null);
  const handlerRef=useRef(null);


  const handlePicture = (e) => {
    e.preventDefault();
    input_file.current.click();
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(URL.createObjectURL(selectedFile));
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChangePicture = (e) => {
    e.preventDefault();
    setFile(null);
  };

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const addHandlerValue = async (data) => {
    await set(ref(realdb, 'handler'), data);
  };

  const checkHandler = async (data) => {
    await new Promise((resolve)=>{
      onValue(ref(realdb, 'handler'), (snapshot) => {
        const value = snapshot.val();
  
        if (value) {
          const set = new Set(value);
  
          if (set.has(data)) {
            setHandlerNameAvailable(false);
          } else {
            value.push(data);
            setHandlerValue(value);
            setHandlerNameAvailable(true);
          }
        } else {
          addHandlerValue([data]);
        }
      });
    })
  };

  const colorChange = () => {
    return handlerNameAvailable ? 'red' : 'green';
  };

  const handleHandler = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setHandle(inputValue);

    if (inputValue.length >= 5) {
      checkHandler(inputValue);
    }

    setColor(colorChange);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    console.log('Cancel button is clicked');
  };

  const channelDetailsAdd =async () => {
    const user_name = sessionStorage.getItem('user').split('@')[0];

    if(!file){
      alert("upload a video")
      input_file.current.focus()
      return false;
    }
    if(name.length<=1){
        alert("name should not be empty");
        nameRef.current.focus()
        return false;
    }

    if(handle.length<=1){
      alert("handler name  should not be empty");
      handlerRef.current.focus()
      return false;
  }
    

    const channel_obj = {
      channel_name: name,
      handler_name: handle,
      creation_time: new Date().toISOString(),
      profile_image: file,
    };
   let c=true;
   await set(ref(realdb, `${user_name}/channel`), channel_obj)
      .then((user) => {
        sessionStorage.setItem("channelAvaliable",true);
        console.log('Channel data added:', user);
        
      })
      .catch((err) => {
        console.log(err);
        sessionStorage.setItem("channelAvaliable",false);
        c= false
      });
      return c
  };

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    if (!handlerNameAvailable) {
      alert('Handler name already exists');
    } else {
      addHandlerValue(handlerValue);
      const cv = await channelDetailsAdd();
      console.log("the value is "+cv)
      if (cv) {
        localStorage.setItem("channel",true);
        navigate("/uploadvideo")
      
      }
    }
  };

  return (
    <div>
      <div className="channel_contanier">
        <div>
          <h1 className="appear_heading">How you'll appear</h1>
        </div>
        <div className="profilepic">
          {!file ? (
            <>
              <FaUserCircle size="150px" className="profile" />
              <p className="select_heading" onClick={handlePicture}>
                Upload picture
              </p>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                ref={input_file}
              />
            </>
          ) : (
            <>
              <img src={file} alt="profile pic" className="profile" />
              <p className="select_change" onClick={handleChangePicture}>
                Change picture
              </p>
            </>
          )}
        </div>
        <div className="name_outer">
          <label style={{ color: 'whitesmoke' }}>Name</label>
          <br />
          <input className="name_input" type="text" ref={nameRef} onChange={nameHandler} value={name} required />
        </div>
        <br />
        <div className="name_outer">
          <label style={{ color: 'whitesmoke' }}>Handle</label>
          <br />
          <input
            className="name_input"
            type="text"
            onChange={handleHandler}  ref={handlerRef}
            value={handle}
            required
            style={{ backgroundColor: color, color: color === 'red' ? 'white' : 'black' }}
          />
          <span className="verify"></span>
        </div>
        <br />
        <div className="channel_btns">
          <button>
            <h3 style={{ color: color }} onClick={handleCancel}>
              Cancel
            </h3>
          </button>
          <button>
            <h3 style={{ color: '#6495ed' }} onClick={handleCreateChannel}>
              Create channel
            </h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channel;
