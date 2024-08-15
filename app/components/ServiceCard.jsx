const ServiceCard = ({ blok }) => {
    //console.log('SC:',blok);
    return (
      <div className="flex flex-col items-start bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 mr-3">
            <img src={blok.icon.filename} alt={`${blok.title} icon`} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{blok.title}</h3>
        </div>
        <p className="text-sm text-left text-gray-600 mb-4">
          {blok.description}
        </p>
        <a href={blok.link.url} className="text-blue-600 font-medium flex items-center">
          Learn more
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </a>
      </div>
    );
  };
  
  export default ServiceCard;