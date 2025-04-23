import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice'; // Adjust path if needed

const Video = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoList, setVideoList] = useState([]);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  // Function to fetch videos from the backend
  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/videos`, { withCredentials: true });
      console.log('Fetched Videos:', res?.data?.videos);
      setVideoList(res?.data?.videos || []);
    } catch (err) {
      console.error('Error fetching videos', err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Function to handle video upload
  const handleUpload = async () => {
    setError('');
    if (!title || !description || !youtubeUrl) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/videos/upload`,
        {
          title,
          description,
          youtubeUrl,
        },
        { withCredentials: true }
      );

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setTitle('');
      setDescription('');
      setYoutubeUrl('');
      fetchVideos(); // refresh list
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    }
  };

  // Function to extract the YouTube video ID
  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match && match[1]; // Returns the video ID if match is found
  };

  // Handle "Interested" or "Ignore" actions
  const handleInterest = async (status, userId) => {
    console.log('Sending request with status:', status, 'and userId:', userId);
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      // Handle the response based on the request's status
      if (res.data.status === 'accepted') {
        // Already friends, do not proceed with any further actions
        alert('You are already friends!');
        return; // Exit the function early to prevent further actions
      } else if (res.data.status === 'ignored') {
        // Request ignored
        alert('You have ignored this request.');
        updateVideoListWithStatus(userId, 'ignored');
      } else if (res.data.status === 'interested') {
        // Request is still in the "interested" state
        alert('Request already sent!');
        updateVideoListWithStatus(userId, 'interested');
      } else {
        // If new request is successfully sent
        alert(`Connection request sent as ${status}`);
        updateVideoListWithStatus(userId, status);
      }

      // Only dispatch to remove user from feed if the request wasn't "accepted"
      if (res.data.status !== 'accepted') {
        dispatch(removeUserFromFeed(userId));
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.message || 'Something went wrong';
      const statusCode = err?.response?.status;

      // Handle error messages
      if (statusCode === 409 || errorMsg.toLowerCase().includes('already exists')) {
        alert('Request already exists.');
      } else {
        console.error('Failed to send request:', err);
        alert('Failed to send request. Please try again later.');
      }
    }
  };

  // Update the video list based on the request status
  const updateVideoListWithStatus = (userId, status) => {
    setVideoList((prevList) =>
      prevList.map((video) =>
        video.userId._id === userId
          ? { ...video, requestStatus: status } // Update the requestStatus field
          : video
      )
    );
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
            <button className="btn btn-primary" onClick={handleUpload}>
              Upload Video
            </button>
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
                  {/* Embed YouTube Video using iframe */}
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.youtubeUrl)}`}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
                <p className="text-sm text-gray-500 mb-2 my-2">
                  Uploaded by: {video.userId.firstName} {video.userId.lastName}
                </p>

                {/* Add buttons for interested and ignore, or show "Friends" if connection is accepted */}
                <div className="mt-4 flex justify-between">
                  {video.requestStatus === 'friends' ? (
                    <p className="text-green-500">Friends</p> // Show "Friends" instead of buttons
                  ) : (
                    <>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleInterest('interested', video.userId._id)}
                      >
                        Interested
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleInterest('ignored', video.userId._id)}
                      >
                        Ignore
                      </button>
                    </>
                  )}
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
