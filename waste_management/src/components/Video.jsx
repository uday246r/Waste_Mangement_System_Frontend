import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Video = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoList, setVideoList] = useState([]);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/videos`, { withCredentials: true });
      setVideoList(res?.data?.videos || []);
    } catch (err) {
      console.error("Error fetching videos", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async () => {
    setError('');
    if (!title || !description || !youtubeUrl) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/videos/upload`, {
        title,
        description,
        youtubeUrl,
      }, { withCredentials: true });

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setTitle('');
      setDescription('');
      setYoutubeUrl('');
      fetchVideos(); // refresh list
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Upload YouTube Video</h2>
          <label className="form-control my-2">
            <span className="label-text">Title:</span>
            <input
              type="text"
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="form-control my-2">
            <span className="label-text">Description:</span>
            <textarea
              className="textarea textarea-bordered"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className="form-control my-2">
            <span className="label-text">YouTube URL:</span>
            <input
              type="text"
              className="input input-bordered"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </label>
          <p className="text-red-500 text-sm mt-1">{error}</p>
          <div className="mt-4 flex justify-center">
            <button className="btn btn-primary" onClick={handleUpload}>Upload Video</button>
          </div>
        </div>

        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Video uploaded successfully.</span>
            </div>
          </div>
        )}

        <div className="mt-10 w-full px-4 max-w-4xl">
          <h3 className="text-2xl font-bold mb-4">All Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoList.map((video, idx) => (
              <div key={idx} className="card bg-base-200 shadow p-4">
                <h4 className="text-lg font-semibold">{video.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{video.description}</p>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={video.youtubeUrl.replace("watch?v=", "embed/")}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;
