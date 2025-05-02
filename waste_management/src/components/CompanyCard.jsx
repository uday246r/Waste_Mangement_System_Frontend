import React from 'react';

const CompanyCard = ({ company }) => {
  const {
    companyName,
    photoUrl,
    price,
    wasteType,
    location,
    email,
  } = company;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl">
      {/* Top color bar */}
      <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>

      {/* Company Image */}
      <div className="relative">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${companyName} logo`}
            className="w-full h-72 object-cover object-center"
          />
        ) : (
          <div className="w-full h-72 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
            <svg className="w-24 h-24 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 12l2 2 4-4M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
            </svg>
          </div>
        )}

        {/* Badge */}
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
          Eco Verified
        </div>
      </div>

      {/* Company Info */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{companyName}</h2>

        <div className="text-gray-600 text-sm mb-2">{email}</div>

        <div className="mb-3">
          <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Waste Type</h3>
          <p className="text-gray-700">{wasteType || "Not specified"}</p>
        </div>

        <div className="mb-3">
          <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Price Per KG</h3>
          <p className="text-gray-700">₹{price || "N/A"}</p>
        </div>

        <div className="mb-3">
          <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Location</h3>
          <p className="text-gray-700">{location || "Not specified"}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
