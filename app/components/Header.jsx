import { useState } from "react";
import { Link, NavLink, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { getTransLink, languages, useCurrentLanguage } from "../utils/langs";
import { FiChevronDown } from 'react-icons/fi';

const renderNavItem = (item, currentLanguage) => {
    switch (item.component) {
      case 'navlink':
        return (
          <NavLink
            key={item._uid}
            prefetch="intent"
            to={getTransLink(item.link.cached_url, currentLanguage)}
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            {item.label}
          </NavLink>
        );
      case 'menus':
        return (
            <div key={item._uid} className="relative group">
              <span className="text-base font-medium text-gray-500 hover:text-gray-900 cursor-pointer flex items-center">
                {item.label}
                <FiChevronDown className="ml-1" />
              </span>
              {item.submenus && (
                <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.submenus.map((submenu) => (
                    <li key={submenu._uid}>
                      {renderNavItem(submenu, currentLanguage)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
      default:
        return null;
    }
  };
  
  const Navigation = ({ menuItems, currentLanguage }) => {
    return (
      <nav className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-10">
        {menuItems.map((item) => renderNavItem(item, currentLanguage))}
      </nav>
    );
  };

  const renderMobileNavItem = (item, currentLanguage) => {
    switch (item.component) {
      case 'navlink':
        return (
          <NavLink
            key={item._uid}
            prefetch="intent"
            to={getTransLink(item.link.cached_url, currentLanguage)}
            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
          >
            <span className="ml-3 text-base font-medium text-gray-900">
              {item.label}
            </span>
          </NavLink>
        );
      case 'menus':
        return (
          <div key={item._uid} className="relative group">
            <span className="text-base font-medium text-gray-900 cursor-pointer flex items-center">
              {item.label}
            </span>
            {item.submenus && (
              <ul className="pl-6 mt-2">
                {item.submenus.map((submenu) => (
                  <li key={submenu._uid}>
                    {renderMobileNavItem(submenu, currentLanguage)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  const MobileMenu = ({ openMenu, setOpenMenu, menuItems, currentLanguage, header }) => {
    return (
      openMenu && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src={header.company_logo.filename}
                    alt={header.site_title}
                  />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={() => setOpenMenu(false)}
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {menuItems.map((item) => renderMobileNavItem(item, currentLanguage))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };

  

const Header = () => {
  const  {header} = useLoaderData();  
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { currentLanguage, currentPath } = useCurrentLanguage();

  const handleLanguageChange = (event) => {
    
    const selectedLanguage = event.target.value;
    
    let switchLanguagePath;

    if (currentPath === "/" || currentPath === `/${currentLanguage}`) {
      switchLanguagePath = selectedLanguage === "en" ? "/" : `/${selectedLanguage}`; // Special case for the home page
    } else if (currentPath.startsWith(`/${currentLanguage}`)) {
      switchLanguagePath =
        selectedLanguage === "en"
          ? currentPath.replace(`/${currentLanguage}`, "") // Remove current language prefix for English
          : currentPath.replace(`/${currentLanguage}`, `/${selectedLanguage}`); // Replace current language prefix with new language
    } else {
      switchLanguagePath = `/${selectedLanguage}${currentPath}`; // Add new language prefix to the current path
    }

    window.location.href = switchLanguagePath;
    
  };
  const languageFlags = {
    en: "English", // English
    ms: "Bahasa Melayu", // Malay (ms is the language code for Bahasa Malaysia)
    cn: "简体中文", // Chinese (zh is the language code for Chinese)
    ta: "தமிழ்", // Tamil (ta is the language code for Tamil)
  };

  //console.log('currentLanguage:',currentLanguage);
//console.log('Header:',header);
  return (
    <div className="relative bg-white border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center  py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link prefetch="intent" to={getTransLink("/", currentLanguage)}>
              <span className="sr-only">{header.site_title}</span>
              <img
                className="h-20 w-auto sm:h-10 hidden sm:block"
                src={header.company_logo.filename}
                alt={header.site_title}
              />
              <img
                className="h-20 w-auto sm:h-10 sm:hidden"
                src={header.company_logo_mobile.filename}
                alt={header.site_title}
              />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              onClick={() => setOpenMenu(true)}
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open menu</span>
              {/* <!-- Heroicon name: outline/menu --> */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-10">
            <Navigation menuItems={header.navigation_menus} currentLanguage={currentLanguage} />
          </div>
          <div className="language-selector">
              <select
                value={currentLanguage}
                onChange={handleLanguageChange}
                className="font-bold text-base border border-gray-300 rounded-md p-1"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {languageFlags[lang]}
                  </option>
                ))}
              </select>
            </div>
        </div>
      </div>

      {/* <!--
        Mobile menu, show/hide based on mobile menu state.
      --> */}
      <MobileMenu
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        menuItems={header.navigation_menus}
        currentLanguage={currentLanguage}
        header={header}
      />
      
      
    </div>
  );
};

export default Header;
