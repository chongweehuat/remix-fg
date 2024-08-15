import { Carousel } from "flowbite-react";
import "flowbite/dist/flowbite.css";

const TestimonialSection = ({ blok }) => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {blok.testimonials.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row h-full items-center justify-between bg-gray-400 dark:bg-gray-700 dark:text-white p-4"
          >
            <div className="md:w-1/2 text-left">
              <p className="text-lg font-semibold mb-2">{item.text}</p>
              <p className="text-sm font-light">- {item.author}</p>
            </div>
            <div className="md:w-1/2">
              <img
                src={item.image.filename}
                alt={item.author}
                className="w-full h-auto max-h-56 object-cover"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialSection;