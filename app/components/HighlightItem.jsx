import { storyblokEditable } from "@storyblok/react";

const HighlightItem = ({ blok }) => {
  const { category, title, date, description, categoryColor } = blok;
//console.log('Item:',blok);
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`text-white text-xs py-1 px-3 rounded-md ${categoryColor}`}>
              {category}
            </div>
          </div>
        </div>
        <p className="text-blue-600 text-base text-left font-semibold">{title}</p>
        <p className="text-xs text-gray-600  text-left">{date}</p>
        <p className="text-gray-700  text-left text-sm">{description}</p>
        <div className="flex items-center space-x-2 text-blue-500">
          <p className="text-sm">More</p>
          <span className="text-sm">→</span>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-3"></div>
    </div>
  );
};


export default HighlightItem;