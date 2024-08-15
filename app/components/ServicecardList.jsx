import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Servicecardlist = ({ blok }) => {
    //console.log('SCL:',blok);
  return (
    <div className="flex flex-col space-y-0">
      {blok.servicecards.map((nestedBlok) =>{ 
          //console.log('nestedBlok:',nestedBlok);
          return (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        )})}
    </div>
  );
};

export default Servicecardlist;