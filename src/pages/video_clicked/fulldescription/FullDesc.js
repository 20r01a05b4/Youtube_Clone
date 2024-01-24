import React, { useState } from 'react';
import './fulldesc.css';

const FullDesc = () => {

  const [description, setDescription] = useState("initialDescription");
  const [expand,setExpand]=useState(false);

  const toggleExpand = () => {
    if(!expand){
      setDescription("initialDescription adding something to it initialDescription initialDescription adding something to it initialDescriptioninitialDescription adding something to it initialDescriptioninitialDescription adding something to it initialDescriptioninitialDescription adding something to it initialDescription ")
    }
    else{
      setDescription("initialDescription")
    }
    setExpand(!expand);
    
  };

  return (
    <div className="descriptiondisplay">
      <p className="descpara"> {`${description}\u00A0 \u00A0`}<span className="read-more" onClick={toggleExpand}>
        {
          expand ?(<>...less</>):(<>...more</>)
        }
       
        </span></p>
    </div>
  );
};

export default FullDesc;
