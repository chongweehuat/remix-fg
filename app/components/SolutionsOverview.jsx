import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const SolutionsOverview = ({ blok }) => {
    
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blok.solutions.map((nestedBlok) =>{
      //console.log("SO:",nestedBlok);
      return (
            
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          )})}
        </div>
       </div> 
    </section>
  );
};

export default SolutionsOverview;
