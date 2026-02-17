const TreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Light purple background */}
      <div className="absolute inset-0 bg-purple-100" />

      {/* Tree SVG or styled divs */}
      <svg
        className="absolute bottom-0 left-0 w-full h-full opacity-30"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* Tree trunk */}
        <rect x="550" y="400" width="100" height="400" fill="#8B4513" />

        {/* Large branches */}
        <path
          d="M 600 500 Q 400 450 300 400"
          stroke="#8B4513"
          strokeWidth="30"
          fill="none"
        />
        <path
          d="M 600 500 Q 800 450 900 400"
          stroke="#8B4513"
          strokeWidth="30"
          fill="none"
        />
        <path
          d="M 600 450 Q 450 400 350 350"
          stroke="#8B4513"
          strokeWidth="25"
          fill="none"
        />
        <path
          d="M 600 450 Q 750 400 850 350"
          stroke="#8B4513"
          strokeWidth="25"
          fill="none"
        />

        {/* Leaves clusters */}
        <circle cx="300" cy="400" r="80" fill="#22C55E" opacity="0.7" />
        <circle cx="350" cy="380" r="70" fill="#16A34A" opacity="0.7" />
        <circle cx="350" cy="350" r="60" fill="#22C55E" opacity="0.7" />

        <circle cx="900" cy="400" r="80" fill="#22C55E" opacity="0.7" />
        <circle cx="850" cy="380" r="70" fill="#16A34A" opacity="0.7" />
        <circle cx="850" cy="350" r="60" fill="#22C55E" opacity="0.7" />

        <circle cx="600" cy="350" r="100" fill="#22C55E" opacity="0.7" />
        <circle cx="550" cy="320" r="80" fill="#16A34A" opacity="0.7" />
        <circle cx="650" cy="320" r="80" fill="#22C55E" opacity="0.7" />

        {/* More leaf details */}
        <circle cx="280" cy="420" r="50" fill="#4ADE80" opacity="0.6" />
        <circle cx="920" cy="420" r="50" fill="#4ADE80" opacity="0.6" />
        <circle cx="600" cy="300" r="70" fill="#4ADE80" opacity="0.6" />

        {/* Small branches */}
        <path
          d="M 300 400 L 250 380"
          stroke="#8B4513"
          strokeWidth="15"
          fill="none"
        />
        <path
          d="M 900 400 L 950 380"
          stroke="#8B4513"
          strokeWidth="15"
          fill="none"
        />
      </svg>

      {/* Decorative grape vines */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="flex flex-col gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-600"></div>
          <div className="w-4 h-4 rounded-full bg-purple-700 ml-2"></div>
          <div className="w-4 h-4 rounded-full bg-purple-600 ml-1"></div>
        </div>
      </div>

      <div className="absolute top-40 right-20 animate-float animation-delay-1000">
        <div className="flex flex-col gap-2">
          <div className="w-5 h-5 rounded-full bg-purple-500"></div>
          <div className="w-5 h-5 rounded-full bg-purple-700 ml-3"></div>
          <div className="w-5 h-5 rounded-full bg-purple-600 ml-1"></div>
        </div>
      </div>

      {/* Floating leaves */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-green-500 rounded-full opacity-40 animate-float-slow"></div>
      <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-green-600 rounded-full opacity-40 animate-float-slow animation-delay-2000"></div>
    </div>
  );
};

export default TreeBackground;
