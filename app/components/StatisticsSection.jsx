import { storyblokEditable } from "@storyblok/react";

const StatisticsSection = ({ blok }) => {
    //console.log(blok);
  return (
    <section className="bg-blue-900 text-white py-12">
       <div {...storyblokEditable(blok)} className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
        {blok.statisticitems.map((item,i)=>{
            return (
          <div key={i}>
            <h2 className="text-3xl font-bold">{item.title}</h2>
            <p className="text-5xl">{item.value}</p>
          </div>
        
            )})}
    </div>
    </section>
  );
};

export default StatisticsSection;
