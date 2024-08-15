import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const HighlightSection = ({ blok }) => {
  //console.log(blok);
  return (
    <section className="py-16" {...storyblokEditable(blok)}>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-left mb-12">{blok.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blok.highlights.map((nestedBlok) =>(
            
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
        </div>
        <div className="text-right mt-12">
          <a href={blok.newsroom_link} className="text-blue-600 hover:underline">{blok.newsroom_link_text}</a>
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;