import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const PhotoUploader = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the uploaded files here (e.g., send them to your backend)
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="photo-uploader">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop photos here, or click to select photos</p>
      </div>
    </div>
  );
};

export default PhotoUploader;
