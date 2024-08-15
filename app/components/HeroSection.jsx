import { storyblokEditable } from "@storyblok/react";

const HeroSection = ({ blok }) => {
  return (
    <section {...storyblokEditable(blok)} className="bg-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">{blok.title}</h1>
          <p className="text-gray-700 mb-6">{blok.description}</p>
          <div className="flex space-x-4">
            <a href={blok.primary_button_link} className="bg-yellow-500 text-white px-6 py-3 rounded shadow hover:bg-yellow-600">{blok.primary_button_text}</a>
            <a href={blok.secondary_button_link} className="text-blue-600 hover:underline">{blok.secondary_button_text}</a>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-gray-200 h-64 rounded-lg shadow-inner" style={{ backgroundImage: `url(${blok.image.filename})`, backgroundSize: 'cover' }}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
