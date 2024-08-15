import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { json } from "@remix-run/node";

import { storyblokInit, apiPlugin, getStoryblokApi  } from "@storyblok/react";
import { isPreview } from "~/utils/isPreview";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Feature from "./components/Feature";
import Grid from "./components/Grid";
import Page from "./components/Page";
import Teaser from "./components/Teaser";
import Hero from "./components/Hero";
import Article from "./components/Article";
import AllArticles from "./components/AllArticles";
import PopularArticles from "./components/PopularArticles";
import HeroSection from "./components/HeroSection";
import StatisticsSection from "./components/StatisticsSection";
import HighlightCard from "./components/HighlightCard";
import HighlightSection from "./components/HighlightSection";
import HighlightList from "./components/HighlightList";
import HighlightItem from "./components/HighlightItem";
import TestimonialSection from "./components/TestimonialSection";
import SolutionsOverview from "./components/SolutionsOverview";
import ServiceCard from "./components/ServiceCard";
import MissionStatement from "./components/MissionStatement";
import Servicecardlist from "./components/ServicecardList";

const components = {
  Header: Header,
  Footer: Footer,
  herosection: HeroSection,
  statisticssection: StatisticsSection,
  highlightsection: HighlightSection,
  highlightcard: HighlightCard,
  highlightlist: HighlightList,
  highlightitem: HighlightItem,
  SolutionsOverview,
  ServiceCard,
  MissionStatement: MissionStatement,
  Servicecardlist,
  TestimonialSection : TestimonialSection,
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  hero: Hero,
  article: Article,
  "all-articles": AllArticles,
  "popular-articles": PopularArticles,
};


storyblokInit({
  accessToken: "fgboQfL6nJZeaNQm0TvOnwtt",
  use: [apiPlugin],
  components,
  bridge: isPreview(),
});

const getData = async(path:any,lang:any) =>{
  const {data} = await getStoryblokApi()
  .get(`cdn/stories/${path}`,{
    version: "draft",
    resolve_relations: "default",
    language: lang
  })
  .catch((e) => {
    console.log("e", e);
    return { data: null };
  });

  return data.story.content;
}

export const loader = async ({ params }:any) => {
  
  let lang = params['*'] || "en";
  lang = lang.substr(0,2);

  const header=await getData('finexus-group-website/header-menu',lang);
  const footer=await getData('finexus-group-website/footer',lang);

  //console.log('A:',footer);

  return json({
    lang,
    header,
    footer
  });
};

export default function App() {
  const { lang, header }:any = useLoaderData();
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{header.site_title}</title>
        <link rel="icon" href={header.site_icon_150.filename} sizes="32x32" />
        <link rel="icon" href={header.site_icon_300.filename} sizes="192x192" />
        <link rel="apple-touch-icon" href={header.site_icon_300.filename} />
        <meta name="msapplication-TileImage" content={header.site_icon_300.filename} />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </Layout>
        <script src="//app.storyblok.com/f/storyblok-v2-latest.js" type="text/javascript">
        </script>
      </body>
    </html>
  );
}