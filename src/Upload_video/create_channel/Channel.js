import React, { useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './Channel.css';

const Channel = () => {
  const [file, setFile] = useState(null);
  const input_file = useRef(null);

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

  return (
    <div className="total">
      <h1 className="appear_heading">How you'll appear</h1>
      <div className="channel_contanier">
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
        <h1>This is channel page</h1>
        <label>Upload a profile picture</label>
        <br />
      </div>
    </div>
  );
};

export default Channel;
