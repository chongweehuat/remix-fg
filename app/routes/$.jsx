import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { languages } from "~/utils/langs";
import { isPreview } from "~/utils/isPreview";

import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from "@storyblok/react";

export default function Page() {
  let { story } = useLoaderData();
  story = useStoryblokState(story, {
    resolveRelations: ["default-page"],
  });

  return (
    <>
      <StoryblokComponent blok={story.content} />
    </>
  );
}

export const loader = async ({ params, request }) => {

  let slug = params["*"] ?? "home";
  let blogSlug = params["*"] === "blog/" ? "blog/home" : null;
  
  // Extract the language from the URL
  let url = new URL(request.url);
  let pathParts = url.pathname.split("/");
  let language = pathParts[1];

  // If the language is not one of the supported languages, it's 'en' and the first part of the URL is part of the slug

  if (!languages.includes(language)) {
    language = "en";
  } else {
    // Remove the language part from the slug
    if (pathParts[0] === "") {
      pathParts.shift(); // Remove the first empty string from the array
    }
    pathParts.shift(); // Remove the language part from the array
  }

  slug = pathParts.join("/") || slug;
  slug = slug === "/" || slug === language ? "home" : slug;

  slug = blogSlug ? blogSlug : slug;
  let version = isPreview() ? "draft" : "published";

  let sbParams = {
    version,
    resolve_relations: ["default"],
    language,
  };

  //console.log('A:',slug);
  slug=slug.replace('finexus-group-website/', '');
  //slug=slug.replace('header-menu', '');
  //console.log('B:',slug);
  slug = slug === "/" || slug === language ? "home" : slug;
  //console.log('C:',slug);
  
  const { data } = await getStoryblokApi()
    .get(`cdn/stories/finexus-group-website/${slug}`, sbParams, { cache: "no-store" })
    .catch((e) => {
      console.log("getStoryblokApi:", e.message ,slug);
      return { data: null };
    });

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  let { data: articles } = await getStoryblokApi().get(
    `cdn/stories`,
    {
      version,
      starts_with: "blog/",
      language,
      is_startpage: 0,
    },
    { cache: "no-store" }
  );
  //console.log("A:",data);
  return json({ story: data?.story, articles: articles?.stories });
};
