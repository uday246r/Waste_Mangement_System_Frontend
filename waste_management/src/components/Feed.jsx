import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white min-h-screen flex flex-col justify-center items-center text-center px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-green-600">
            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
            <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zM12 10.5a.75.75 0 01.75.75v4.94l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72v-4.94a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">EcoWaste Solutions</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">Smart waste management for a cleaner, greener tomorrow.</p>
        <button className="bg-white text-green-700 py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
          Schedule Pickup
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">Our Services</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Comprehensive waste management solutions for residential, commercial, and industrial needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div className="bg-green-50 p-4 flex justify-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Collection & Disposal</h3>
                <p className="text-gray-700">Scheduled pickups and safe disposal of all waste types, from household to hazardous materials.</p>
              </div>
            </div>
            
            <div className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div className="bg-green-50 p-4 flex justify-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Recycling Programs</h3>
                <p className="text-gray-700">Comprehensive recycling solutions that reduce landfill waste and promote sustainable practices.</p>
              </div>
            </div>
            
            <div className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div className="bg-green-50 p-4 flex justify-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Consulting Services</h3>
                <p className="text-gray-700">Expert advice on waste reduction strategies and compliance with environmental regulations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <p className="text-5xl font-bold text-green-600 mb-2">98%</p>
              <p className="text-gray-700">Waste Properly Processed</p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-bold text-green-600 mb-2">10K+</p>
              <p className="text-gray-700">Tons Recycled Yearly</p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-bold text-green-600 mb-2">500+</p>
              <p className="text-gray-700">Business Clients</p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-bold text-green-600 mb-2">24/7</p>
              <p className="text-gray-700">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Client Testimonials</h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
            <div className="bg-white shadow-lg p-8 rounded-lg w-full md:w-96 flex flex-col relative border-l-4 border-green-500">
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl">
                  <span>"</span>
                </div>
              </div>
              <p className="text-gray-600 italic mb-6 pt-6">"EcoWaste has transformed our company's environmental footprint. Their recycling program helped us achieve our sustainability goals ahead of schedule."</p>
              <div className="mt-auto">
                <p className="font-semibold text-gray-800">Robert Johnson</p>
                <p className="text-gray-500">Operations Manager, Green Tech Inc.</p>
              </div>
            </div>
            
            <div className="bg-white shadow-lg p-8 rounded-lg w-full md:w-96 flex flex-col relative border-l-4 border-green-500">
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl">
                  <span>"</span>
                </div>
              </div>
              <p className="text-gray-600 italic mb-6 pt-6">"The online dashboard allows us to track our waste metrics in real-time. This data has been invaluable for our annual sustainability reports."</p>
              <div className="mt-auto">
                <p className="font-semibold text-gray-800">Sarah Williams</p>
                <p className="text-gray-500">Sustainability Director, Metro Hospital</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Ready for Smarter Waste Management?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of businesses and communities already benefiting from our solutions.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-700 py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
              Get a Quote
            </button>
            <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-white hover:text-green-700 transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;