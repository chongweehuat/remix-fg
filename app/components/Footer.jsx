import { useState } from "react";
import { Link, NavLink, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";


const Footer = () =>{
  const  {footer} = useLoaderData();
  //console.log('footer',footer);
  const FooterLink =({blok})=>{
    //console.log('C',blok);
    return (
      <div className="mb-5">
        <p className="text-lg font-bold text-blue-900">{blok.title}</p>
        <ul className="mt-2 space-y-2">
          {blok.linksitems.map((item)=>{
            //console.log('D',item);
            return (
            <li><a href={item.link.url} className="text-gray-700">{item.label}</a></li>  
          )})}
        </ul>
      </div>
    )
  }
  
  const FooterLinksLists = ({blok}) =>{
    //console.log('B:',blok);
    return (
      <>
      {blok.linkslists.map((b)=>(<FooterLink blok={b} />))}
      </>
    )
  }
  
  return (
  <div className="bg-gray-100">
      <div className="container mx-auto py-10">
        <div className="flex flex-wrap gap-10 justify-between">
          {footer.footercolumns.map((links)=>{
            //console.log('A:',links);
            return (
              <div className="w-full md:w-auto">
              <FooterLinksLists blok={links} />
              </div>  
            )})}
          </div>
      </div>    
      <div className="bg-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-gray-700 text-sm">© 2024 FINEXUS. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-700 text-sm">Total Visitors:</p>
            <p className="text-gray-700 text-sm">146,583</p>
          </div>
        </div>
      </div>
    </div>
)};

export default Footer;
