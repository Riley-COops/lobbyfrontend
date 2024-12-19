import React, { useState } from 'react';
import { FaImage, FaVideo, FaTimes } from 'react-icons/fa'; // Icons
import axios from 'axios';

const PostForm = () => {
  const [showModal, setShowModal] = useState(false); // Toggle modal visibility
  const [formData, setFormData] = useState({
    content: '',
    file: null,
  });
  const [postType, setPostType] = useState('text'); // text, image, or video
  const [preview, setPreview] = useState(null); // Preview file

  // Handle textarea and file input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    setPreview(URL.createObjectURL(file)); // Generate file preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = new FormData();
    submission.append('content', formData.content);
    if (formData.file) submission.append('file', formData.file);

    try {
      await axios.post('http://localhost:8000/api/posts/', submission, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Post submitted successfully!');
      setShowModal(false);
      setFormData({ content: '', file: null });
      setPreview(null);
    } catch (error) {
      console.error('Failed to submit post:', error);
      alert('Error submitting post.');
    }
  };

  return (
    <div>
      {/* Clickable area to open the modal */}
      <div
        onClick={() => setShowModal(true)}
        style={{
          cursor: 'pointer',
        }}
      >
        <p style={{ color: '#555' }}>Start a post...</p>
      </div>

      {/* LinkedIn-style modal */}
      {showModal && (
        <div
          style={{
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '500px',
              background: 'white',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
              position: 'relative',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3>Create a Post</h3>
              <FaTimes
                style={{ cursor: 'pointer' }}
                onClick={() => setShowModal(false)}
              />
            </div>

            {/* Content Input */}
            <textarea
              name="content"
              placeholder="What do you want to talk about?"
              value={formData.content}
              onChange={handleChange}
              style={{
                width: '100%',
                height: '100px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '15px',
                resize: 'none',
              }}
            ></textarea>

            {/* Media Upload */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label>
                <FaImage size={24} color="#0073b1" style={{ cursor: 'pointer' }} />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    handleFileChange(e);
                    setPostType('image');
                  }}
                />
              </label>

              <label>
                <FaVideo size={24} color="#0073b1" style={{ cursor: 'pointer' }} />
                <input
                  type="file"
                  accept="video/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    handleFileChange(e);
                    setPostType('video');
                  }}
                />
              </label>
            </div>

            {/* Preview Area */}
            {preview && (
              <div style={{ marginTop: '10px' }}>
                {postType === 'image' ? (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                  />
                ) : (
                  <video width="100%" controls>
                    <source src={preview} />
                    Your browser does not support video playback.
                  </video>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              style={{
                marginTop: '15px',
                width: '100%',
                padding: '10px',
                backgroundColor: '#0073b1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;
