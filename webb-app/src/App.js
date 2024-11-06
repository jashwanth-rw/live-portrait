import React, { useState } from 'react';

function UploadPage() {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  // Handle image and video file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Submit the form data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !video) {
      alert('Please upload both an image and a video');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('video', video);

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/live_portrait', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.video_link) {
        setVideoLink(data.video_link);
      } else {
        alert('Error: Video link not returned');
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading files',error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontSize: '18px',
      marginBottom: '8px',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '12px 20px',
      fontSize: '16px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    loading: {
      marginTop: '20px',
      fontSize: '18px',
      color: '#888',
    },
    videoLink: {
      marginTop: '20px',
      fontSize: '18px',
      color: '#007BFF',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Upload Image and Video</h1>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Video:</label>
          <input
            type="file"
            accept="video/mp4"
            onChange={handleVideoChange}
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Upload
        </button>
      </form>

      {loading && <div style={styles.loading}>Loading...</div>}

      {videoLink && (
        <div>
          <h2>Video Link:</h2>
          <a href={videoLink} target="_blank" rel="noopener noreferrer" style={styles.videoLink}>
            {videoLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
