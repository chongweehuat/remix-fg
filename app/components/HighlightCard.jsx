import { storyblokEditable } from "@storyblok/react";

const HighlightCard = ({ blok }) => {
    //console.log('highlightcard:',blok);
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300" {...storyblokEditable(blok)}>
      <img src={blok.image.filename} alt={blok.title} className="w-full h-40 object-cover rounded mb-4" />
      <h3 className="text-xl font-bold mb-2 text-left">{blok.title}</h3>
      <p className="text-gray-700 mb-4 text-left">{blok.date}</p>
      <p className="text-gray-600 mb-4 text-left">{blok.description}</p>
      <div className="flex items-center text-blue-600">
        <a href={blok.morelink} className="hover:underline text-sm mr-1">{blok.morelabel}</a>
        <span className="text-sm">→</span>
      </div>
    </div>
  );
};

export default HighlightCard;