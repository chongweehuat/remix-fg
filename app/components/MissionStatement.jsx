const MissionStatement = ({ blok }) => {
    //console.log("MS:",blok);
    return (
      <div className="flex flex-col items-start bg-white p-6 rounded-lg shadow-md">
        <div className="relative w-full h-64 bg-cover bg-center rounded-lg mb-8" style={{ backgroundImage: `url(${blok.image.filename})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
            <h2 className="text-yellow-400 text-lg lg:text-xl font-semibold leading-snug text-left">
              {blok.text}
            </h2>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-1 h-full bg-yellow-500 mr-3"></div>
          <div className="text-left">
            <p className="text-sm text-gray-600 mb-4">
              {blok.blog}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default MissionStatement;