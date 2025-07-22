import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-8">
      <div className="w-full max-w-md text-center">
        {/* Pattern Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-36 h-36 rounded-2xl bg-green-500/10 ${
                i % 2 === 0 ? 'animate-pulse' : ''
              }`}
            />
          ))}
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
