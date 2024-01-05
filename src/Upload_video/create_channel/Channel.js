import React, { useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './Channel.css';
import { onValue,ref,getDatabase,set } from 'firebase/database';
import app from '../../backend/Firebase';

 
const Channel = () => {
  const [file, setFile] = useState(null);
  const input_file = useRef(null);
  const [name,setName]=useState("")
  const [handle,setHandle]=useState("@")
  const [color,setColor]=useState("white")
  const realdb=getDatabase(app);

  const handlePicture = (e) => {
    e.preventDefault();
    input_file.current.click();
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(URL.createObjectURL(selectedFile))
        setFile(URL.createObjectURL(selectedFile));
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChangePicture=(e)=>{
        e.preventDefault();
        setFile(null)
  }

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  /*ADD handler information to handler array */
  const addHandlerValue=async(data)=>{
        await set(ref(realdb,"handler"),data);
  }

  /*checking whether handler name exists or not */
  const checkHandler=async(data)=>{
    await  onValue(ref(realdb,"handler"),(snapshot)=>{
        const value=snapshot.val();
        if(value){
            const set=new Set(value);
            if(set.has(data)){
                alert("handler name already pesent")
            }
            else{
                alert("handler name is correct");
                value.append(data);
                addHandlerValue(value);
            }
        }
        else{
            addHandlerValue([data])
        }
      })
  }

  const handleHandler=(e)=>{
        e.preventDefault();
        setHandle(e.target.value);
        if(handle.length>=5){
            checkHandler(e.target.value);
        }
  }
  
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
                <img src={file} alt="profile pic"  className='profile'/>
                <p className="select_change" onClick={handleChangePicture}>
                    change picture
                </p>
                </>
            )}
        </div>
            <div className="name_outer">
                <label style={{color:"whitesmoke"}}>Name</label><br></br>
                <input className="name_input" type="text" onChange={nameHandler} value={name} required>
                </input>

            </div><br></br>
            <div className="name_outer">
                <label style={{color:"whitesmoke"}}>Handle</label><br></br>
                <input className="name_input" type="text" onChange={handleHandler} value={handle} required>
              </input>
            </div>
            <br></br><br></br>
            <div className='channel_btns'>
                <button><h3 style={{color:color}}>Cancel</h3></button>
                <button><h3 style={{color:"#6495ed"}}>Create channel</h3></button>
            </div>
        </div>
    </div>
  );
};

export default Channel;
