import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const HighlightList = ({ blok }) => {
  return (
    <div className="flex flex-col space-y-0">
      {blok.items.map((nestedBlok) =>{ 
          //console.log('nestedBlok:',nestedBlok);
          return (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        )})}
    </div>
  );
};

export default HighlightList;