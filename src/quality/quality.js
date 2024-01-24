import React, { useEffect, useState } from 'react';
import app from '../backend/Firebase';
import { getDatabase, ref, onValue, set } from 'firebase/database';

const Quality = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    const videosRef = ref(getDatabase(app), 'videos');

    onValue(videosRef, (snap) => {
      const val = snap.val();
      if (val) {
        // Modify the data by adding a URL to each video
        const updatedData = val.map((video) => ({
          ...video,
          url:
            'https://firebasestorage.googleapis.com/v0/b/fir-dbbab.appspot.com/o/videos%2Fh57b619aa_3981574_preview.mp4?alt=media&token=826a0b66-9647-48d8-a9f2-2e261e376315',
        }));

        // Log the updated data
        console.log(updatedData);

        // Update the data in the Firebase database
        set(videosRef, updatedData)
          .then(() => {
            console.log('Data added successfully');
          })
          .catch((err) => {
            console.error('Error adding data:', err);
          });

        // Update state with the modified data
        setData(updatedData);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <button onClick={fetchData} style={{ backgroundColor: 'white' }}>
        Click
      </button>
    </>
  );
};

export default Quality;
