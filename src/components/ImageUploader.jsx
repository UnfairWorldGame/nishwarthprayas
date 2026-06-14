import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/imageuploader.css";
import config from "./config";

const ImageUploader = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return undefined;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file || null);
    setUploadStatus(null);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setImageTitle("");
    setImageDescription("");
    setUploadStatus(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile || !imageTitle.trim() || !imageDescription.trim()) {
      setUploadStatus({
        type: "error",
        message: "Please select an image and fill in title and description.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", imageTitle.trim());
    formData.append("description", imageDescription.trim());

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const response = await axios.post(
        `${config.serverUrl}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status >= 200 && response.status < 300) {
        setUploadStatus({
          type: "success",
          message: "Image uploaded successfully! It will appear on the homepage.",
        });
        resetForm();
        onUploadSuccess?.();
      } else {
        setUploadStatus({
          type: "error",
          message: "Failed to upload image. Please try again.",
        });
      }
    } catch (error) {
      const serverMsg = error.response?.data?.message;
      setUploadStatus({
        type: "error",
        message:
          serverMsg ||
          (error.message === "Network Error"
            ? "Cannot reach the server. Check your connection or try again later."
            : "Upload failed. Please try again."),
      });
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleUpload}>
      {uploadStatus && (
        <div className={`upload-alert upload-alert--${uploadStatus.type}`} role="alert">
          {uploadStatus.message}
        </div>
      )}

      <div className="upload-field">
        <label htmlFor="admin-image-file">Select Image</label>
        <input
          id="admin-image-file"
          type="file"
          onChange={handleFileChange}
          name="image"
          accept="image/jpeg,image/png,image/gif,image/webp"
        />
        <span className="upload-hint">JPEG, PNG, GIF, or WebP</span>
      </div>

      {previewUrl && (
        <div className="upload-preview">
          <img src={previewUrl} alt="Preview of selected upload" />
        </div>
      )}

      <div className="upload-field">
        <label htmlFor="admin-image-title">Title / शीर्षक</label>
        <input
          id="admin-image-title"
          type="text"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)}
          placeholder="e.g. Flood relief food distribution"
          className="form-input"
          required
        />
      </div>

      <div className="upload-field">
        <label htmlFor="admin-image-desc">Description / विवरण</label>
        <textarea
          id="admin-image-desc"
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
          placeholder="Brief description of the photo"
          className="form-input"
          rows={4}
          required
        />
      </div>

      <div className="upload-actions">
        <button type="submit" className="btn-upload" disabled={isUploading}>
          {isUploading ? "Uploading…" : "Upload to Homepage"}
        </button>
        {(selectedFile || imageTitle || imageDescription) && (
          <button
            type="button"
            className="btn-clear"
            onClick={resetForm}
            disabled={isUploading}
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default ImageUploader;
