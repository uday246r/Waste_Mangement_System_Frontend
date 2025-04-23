import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const Video = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoList, setVideoList] = useState([]);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const videosPerPage = 6;
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
      setIsUploading(true);
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
      setShowUploadForm(false);
      fetchVideos(); // refresh list
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsUploading(false);
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
        showNotification('You are already friends!', 'info');
        return; // Exit the function early to prevent further actions
      } else if (res.data.status === 'ignored') {
        // Request ignored
        showNotification('You have ignored this request.', 'info');
        updateVideoListWithStatus(userId, 'ignored');
      } else if (res.data.status === 'interested') {
        // Request is still in the "interested" state
        showNotification('Request already sent!', 'info');
        updateVideoListWithStatus(userId, 'interested');
      } else {
        // If new request is successfully sent
        showNotification(`Connection request sent as ${status}`, 'success');
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
        showNotification('Request already exists.', 'error');
      } else {
        console.error('Failed to send request:', err);
        showNotification('Failed to send request. Please try again later.', 'error');
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

  // Custom notification function
  const showNotification = (message, type = 'success') => {
    // You can implement a more sophisticated notification system here
    alert(message);
  };

  // Pagination calculations
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videoList.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videoList.length / videosPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-green-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">DIY Waste Management Videos</h1>
          <p className="text-teal-200 mt-2">Learn and share eco-friendly waste management techniques</p>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg shadow-lg transition-all duration-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {showUploadForm ? 'Hide Upload Form' : 'Share a Video'}
          </button>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="mb-10 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-green-500 py-2 px-4">
                <h2 className="text-xl font-bold text-white">Share a YouTube Video</h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter video title"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what the video is about"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                    YouTube URL
                  </label>
                  <input
                    id="url"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="flex justify-center">
                  <button
                    className={`px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg shadow transition-colors duration-300 flex items-center ${
                      isUploading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Video
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Count and Filter Options (future enhancement) */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-white">
            <span className="font-medium">{videoList.length}</span> videos available
          </div>
          {/* Filter could be added here */}
        </div>

        {/* Video Grid */}
        {videoList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentVideos.map((video, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.youtubeUrl)}`}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{video.title}</h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold mr-2">
                      {video.userId.firstName.charAt(0)}{video.userId.lastName.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {video.userId.firstName} {video.userId.lastName}
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    {video.requestStatus === 'friends' ? (
                      <div className="flex items-center text-green-600">
                        <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">Connected</span>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          className="px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded transition-colors duration-300 flex-1 flex items-center justify-center"
                          onClick={() => handleInterest('interested', video.userId._id)}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Connect
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded transition-colors duration-300 flex-1 flex items-center justify-center"
                          onClick={() => handleInterest('ignored', video.userId._id)}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Ignore
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white bg-opacity-10 rounded-lg p-8 text-center">
            <svg className="w-16 h-16 text-teal-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No Videos Available</h3>
            <p className="text-teal-200">Be the first to share an educational waste management video!</p>
          </div>
        )}

        {/* Pagination */}
        {videoList.length > videosPerPage && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center bg-white rounded-lg shadow overflow-hidden">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-teal-600 hover:bg-teal-50 flex items-center transition-colors ${
                  currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </button>
              
              <div className="hidden md:flex">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show limited page numbers to avoid overcrowding
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`px-4 py-2 ${
                          currentPage === pageNumber
                            ? 'bg-teal-600 text-white font-medium'
                            : 'text-teal-600 hover:bg-teal-50'
                        } transition-colors`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  // Show ellipsis for skipped pages
                  if (
                    (pageNumber === currentPage - 2 && pageNumber > 1) ||
                    (pageNumber === currentPage + 2 && pageNumber < totalPages)
                  ) {
                    return <span key={pageNumber} className="px-4 py-2 text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>
              
              {/* Page X of Y for mobile view */}
              <div className="md:hidden px-4 py-2 font-medium text-teal-600">
                Page {currentPage} of {totalPages}
              </div>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-teal-600 hover:bg-teal-50 flex items-center transition-colors ${
                  currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                Next
                <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in-out z-50">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Video uploaded successfully.
        </div>
      )}
    </div>
  );
};

export default Video;