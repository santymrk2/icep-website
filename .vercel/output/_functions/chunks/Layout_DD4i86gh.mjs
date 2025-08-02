import { b as createAstro, c as createComponent, r as renderComponent, f as renderScript, a as renderTemplate, g as addAttribute, h as renderHead, i as renderSlot } from './astro/server_BhUVXp0I.mjs';
import 'kleur/colors';
/* empty css                              */
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';

const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "text-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 md:justify-items-center gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "ICEP" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Iglesia Cristiana Evangélica en Pilar" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Seguinos" }),
        /* @__PURE__ */ jsxs("ul", { className: "items-left text-left items-center space-x-4", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://www.youtube.com/@icepilar",
              className: "text-gray-300 text-left hover:text-gray-400 transition-all",
              children: "YouTube"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://www.instagram.com/ice_pilar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
              className: "text-gray-300 hover:text-gray-400 transition-all",
              children: "Instagram"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://x.com/pilar_ice",
              className: "text-gray-300 hover:text-gray-400 transition-all",
              children: "X"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://tiktok.com/@ice_pilar",
              className: "text-gray-300 hover:text-gray-400 transition-all",
              children: "TikTok"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://www.facebook.com/profile.php?id=61574986704374",
              className: "text-gray-300 hover:text-gray-400 transition-all",
              children: "Facebook"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Enlaces Rápidos" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/nosotros",
              className: "text-gray-300 hover:text-gray-400 hidden transition-all",
              children: "Nosotros"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://iglesia-pilar.notion.site/b19a403082ee49238154f16433dd7925?v=7851ff6a1d2c403da600451c9e99c129&pvs=74",
              className: "text-gray-300 hover:text-gray-400 transition-all",
              children: "Calendario"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/contacto",
              className: "text-gray-300 hover:text-gray-400 transition-all",
              children: "Contacto"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://camp.icepilar.org",
              className: "text-gray-300 hover:text-gray-400 transition-all",
              children: "Camp 2025"
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 pt-8 border-t border-white-700", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-center text-gray-300", children: [
      "© ",
      currentYear,
      " Iglesia Complejo Evangélico Pilar. Todos los derechos reservados."
    ] }) })
  ] }) });
};

const $$Astro$1 = createAstro("https://www.icepilar.org");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/node_modules/.pnpm/@vercel+analytics@1.5.0_react@19.1.0/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/node_modules/.pnpm/@vercel+analytics@1.5.0_react@19.1.0/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

function Transition({
  show,
  enter,
  enterFrom,
  enterTo,
  leave,
  leaveFrom,
  leaveTo,
  duration = 150,
  children
}) {
  const [isShowing, setIsShowing] = useState(show);
  const [classes, setClasses] = useState("");
  const [enterTimeout, setEnterTimeout] = useState(null);
  const [leaveTimeout, setLeaveTimeout] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(null);
  useEffect(() => {
    if (enterTimeout) clearTimeout(enterTimeout);
    if (leaveTimeout) clearTimeout(leaveTimeout);
    if (hideTimeout) clearTimeout(hideTimeout);
    if (show) {
      setIsShowing(true);
      setClasses(`${enter} ${enterFrom}`);
      const timeout = setTimeout(() => setClasses(`${enter} ${enterTo}`), 20);
      setEnterTimeout(timeout);
    } else if (isShowing) {
      setClasses(`${leave} ${leaveFrom}`);
      const timeout1 = setTimeout(() => {
        setClasses(`${leave} ${leaveTo}`);
        const timeout2 = setTimeout(() => setIsShowing(false), duration);
        setHideTimeout(timeout2);
      }, 20);
      setLeaveTimeout(timeout1);
    }
    return () => {
      if (enterTimeout) clearTimeout(enterTimeout);
      if (leaveTimeout) clearTimeout(leaveTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [show]);
  return isShowing ? /* @__PURE__ */ jsx("div", { className: classes, children }) : null;
}

const Paths = [
	{
		text: "Inicio",
		href: "/",
		subitems: null,
		active: true,
		main: true
	},
	{
		text: "Nosotros",
		href: "/nosotros",
		subitems: null,
		active: false,
		main: true
	},
	{
		text: "Ministerios",
		href: "",
		subitems: null,
		active: false,
		main: true
	},
	{
		text: "Calendario",
		href: "/calendario",
		subitems: null,
		active: true,
		main: true
	},
	{
		text: "Contactanos",
		href: "/contacto",
		subitems: null,
		active: true,
		main: true
	},
	{
		text: "Camp 2025",
		href: "https://camp.icepilar.org",
		subitems: null,
		active: true,
		main: false
	}
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const menuItems = Paths;
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPath, setCurrentPath] = useState(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
    const handlePathChange = () => {
      if (typeof window !== "undefined") {
        setCurrentPath(window.location.pathname);
      }
    };
    window.addEventListener("astro:after-swap", handlePathChange);
    window.addEventListener("popstate", handlePathChange);
    return () => {
      window.removeEventListener("astro:after-swap", handlePathChange);
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);
  const handleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setHasInteracted(true);
  };
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `text-white m-0 sm:m-0 rounded-none z-50 h-20 transition-all duration-300 w-full`,
      id: "back-menu",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full max-w-full flex flex-row items-center justify-between h-20 gap-4 px-6 m-0 overflow-hidden scrollbar-hide relative", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center h-full", children: /* @__PURE__ */ jsx("a", { href: "/", id: "site-logo", className: "flex items-center h-full", children: /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 700 700",
              className: "w-9 h-9 sm:w-10 sm:h-10 hover:scale-104 transition-all duration-400 easy-out",
              fill: "none",
              children: /* @__PURE__ */ jsxs("g", { children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M-776.155-31.123h964.486v736.828h-964.486z",
                    fill: "none",
                    transform: "matrix(.72577 0 0 .95002 563.314 29.567)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M0-17.794c0-6 .286-11.932.818-17.794-61.748-28.462-106.042-88.298-112.457-159.079-66.861 30.819-113.275 98.421-113.275 176.873 0 107.511 87.156 194.667 194.667 194.667 41.895 0 80.697-13.237 112.457-35.754C32.467 105.854 0 47.823 0-17.794",
                    fill: "#2a38b2",
                    fillRule: "evenodd",
                    transform: "translate(267.786 465.127)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M0-371.54c-6.415 70.781-50.71 130.617-112.457 159.079.531 5.862.818 11.794.818 17.794 0 65.617-32.467 123.648-82.21 158.913C-162.089-13.237-123.287 0-81.392 0 26.119 0 113.274-87.156 113.274-194.667c0-78.452-46.413-146.054-113.274-176.873",
                    fill: "#2a38b2",
                    fillRule: "evenodd",
                    transform: "translate(543.847 642)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M0-141.119c0-6-.286-11.932-.818-17.794-24.766 11.416-52.332 17.794-81.392 17.794-29.059 0-56.626-6.378-81.392-17.794a197.134 197.134 0 0 0-.818 17.794c0 65.617 32.467 123.648 82.21 158.913C-32.467-17.471 0-75.502 0-141.119",
                    fill: "#0080f0",
                    fillRule: "evenodd",
                    transform: "translate(432.206 588.452)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M0 230.42c31.76-22.516 70.562-35.753 112.457-35.753 29.059 0 56.626 6.378 81.392 17.793.531-5.861.818-11.793.818-17.793C194.667 87.155 107.511 0 0 0s-194.667 87.155-194.667 194.667c0 6 .287 11.932.818 17.793 24.766-11.415 52.333-17.793 81.392-17.793 41.895 0 80.697 13.237 112.457 35.753",
                    fill: "#2a38b2",
                    fillRule: "evenodd",
                    transform: "translate(349.997 58)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M-15.532-1.354C-.258 55.096 38.988 99.819 89.044 123.559c-27.386 27.671-63.313 47.42-104.576 54.668-28.621 5.026-56.876 3.513-83.244-3.446-5.924-70.823 27.351-137.42 83.244-176.135",
                    fill: "#0080f0",
                    fillRule: "evenodd",
                    transform: "scale(1 -1) rotate(9.962 2583.127 1414.688)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M35.524-144.334c36.074 42.046 89.546 68.142 148.027 68.026-22.644 64.109-78.14 113.735-148.027 126.653C21.873 26.738 12.979-.124 10.298-29.059c-3.865-41.716 5.736-81.574 25.226-115.275",
                    fill: "#0080f0",
                    fillRule: "evenodd",
                    transform: "scale(1 -1) rotate(-84.707 113.734 -388.854)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M0-158.913c45.195 32.041 76.113 82.878 81.392 141.12C56.626-6.377 29.059 0 0 0c-29.059 0-56.626-6.377-81.392-17.793C-76.113-76.035-45.195-126.872 0-158.913",
                    fill: "#fff",
                    fillRule: "evenodd",
                    transform: "matrix(-1 0 0 1 349.997 447.332)"
                  }
                )
              ] })
            }
          ) }) }),
          /* @__PURE__ */ jsx("nav", { className: "hidden xl:flex flex-1 justify-center items-center h-full w-full", children: /* @__PURE__ */ jsx("ul", { className: "flex space-x-8 px-2 h-20 items-center justify-center w-full", children: menuItems.filter((item) => item.active && item.main).map((item) => /* @__PURE__ */ jsx(
            "li",
            {
              className: "relative select-none flex flex-col items-center justify-center h-full",
              children: !item.subitems ? /* @__PURE__ */ jsx(
                "a",
                {
                  href: item.href,
                  className: `${currentPath === item.href ? "nav-active" : "nav-link"} nav-link-dot-container`,
                  children: /* @__PURE__ */ jsxs("span", { className: "relative block", children: [
                    /* @__PURE__ */ jsx("span", { className: "z-10 relative", children: item.text }),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `nav-dot ${currentPath === item.href ? "opacity-100 animate-fade-in" : "opacity-0"}`
                      }
                    )
                  ] })
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "nav-link inline-flex",
                    onClick: (e) => {
                      e.stopPropagation();
                      setOpenDropdown(
                        openDropdown === item.text ? null : item.text
                      );
                    },
                    children: [
                      /* @__PURE__ */ jsx("span", { children: item.text }),
                      /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: "size-5 transform transition-transform duration-200",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          children: /* @__PURE__ */ jsx(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M19 9l-7 7-7-7"
                            }
                          )
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  Transition,
                  {
                    show: item.active && openDropdown === item.text,
                    duration: 200,
                    enter: "transition ease-out duration-200",
                    enterFrom: "transform opacity-0 scale-95",
                    enterTo: "transform opacity-100 scale-100",
                    leave: "transition ease-in duration-150",
                    leaveFrom: "transform opacity-100 scale-100",
                    leaveTo: "transform opacity-0 scale-95",
                    children: /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 mt-2 w-full bg-neutral-800 rounded-lg shadow-lg z-20", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center space-y-2 bg-neutral-800", children: item.subitems.map((subitem) => /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: subitem.href,
                        className: ` ${subitem.active ? "" : "opacity-30 pointer-events-none cursor-not-allowed"} nav-link block w-full`,
                        children: subitem.text
                      },
                      subitem.text
                    )) }) })
                  }
                )
              ] })
            },
            item.text
          )) }) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center h-full", children: /* @__PURE__ */ jsxs(
            "button",
            {
              id: "mobile-menu-button",
              className: "z-52 rounded-full group transition-all ease-in-out inline-flex w-9 h-9 text-slate-800 text-center items-center justify-center",
              "aria-pressed": isMenuOpen,
              onClick: handleMobileMenu,
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Menu" }),
                /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    className: "size-6 fill-white pointer-events-none",
                    viewBox: "0 0 16 16",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [
                      /* @__PURE__ */ jsx(
                        "rect",
                        {
                          className: "origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]",
                          y: "7",
                          width: "9",
                          height: "2",
                          rx: "1"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "rect",
                        {
                          className: "origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[[aria-pressed=true]]:rotate-45",
                          y: "7",
                          width: "16",
                          height: "2",
                          rx: "1"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "rect",
                        {
                          className: "origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:-rotate-[225deg]",
                          y: "7",
                          width: "9",
                          height: "2",
                          rx: "1"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ) })
        ] }),
        (isMenuOpen || hasInteracted) && /* @__PURE__ */ jsxs(
          "div",
          {
            className: `fixed top-0 left-0 w-full h-full bg-neutral-900 z-40 flex flex-col items-start justify-end pb-8 p-8
                        transition-all duration-500
                        overflow-hidden scrollbar-hide
                        ${hasInteracted ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                        ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}
                        ${!hasInteracted && !isMenuOpen ? "hidden" : ""}
                    `,
            children: [
              /* @__PURE__ */ jsx("ul", { className: "list-none", children: menuItems.filter((item) => item.active).map((item) => /* @__PURE__ */ jsx("li", { className: "mb-5", children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: item.href,
                  className: `text-white text-3xl font-bold no-underline  py-2 hover:text-blue-500 transition-colors duration-300 block`,
                  children: item.text
                }
              ) })) }),
              /* @__PURE__ */ jsxs("div", { className: " mt-20 text-gray-500 text-sm", children: [
                /* @__PURE__ */ jsx("p", { children: "© 2025 Iglesia Complejo Evangélico Pilar. Todos los derechos reservados." }),
                /* @__PURE__ */ jsxs("div", { className: "flex mt-5", children: [
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://www.youtube.com/@icepilar",
                      className: "text-white mr-5 no-underline",
                      children: "YouTube"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://www.instagram.com/ice_pilar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                      className: "text-white mr-5 no-underline",
                      children: "Instagram"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://www.facebook.com/profile.php?id=61574986704374",
                      className: "text-white no-underline",
                      children: "Facebook"
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("style", { children: `
                .nav-link {
                    position: relative;
                    color: white;
                    text-decoration: none;
                    padding: 0.5rem 1.25rem;
                    transition: color 0.2s;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .nav-link-dot-container {
                    min-height: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    bottom: 0.1rem;
                    width: 0;
                    height: 2px;
                    background: #3b82f6;
                    border-radius: 2px;
                    transition: width 0.3s cubic-bezier(.4,0,.2,1), left 0.3s cubic-bezier(.4,0,.2,1);
                }
                .nav-link:hover::after {
                    width: 100%;
                    left: 0;
                }
                .nav-active {
                    position: relative;
                    color: white;
                    text-decoration: none;
                    padding: 0.5rem 1.25rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .nav-dot {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: -0.45rem;
                    width: 0.33rem;
                    height: 0.33rem;
                    background: #3b82f6;
                    border-radius: 9999px;
                    transition: opacity 0.2s;
                    pointer-events: none;
                }
                .animate-fade-in {
                    animation: fadeInDot 0.4s cubic-bezier(.4,0,.2,1);
                }
                @keyframes fadeInDot {
                    from { opacity: 0 }
                    to { opacity: 1 }
                }
                /* Ocultar scrollbar en todos los navegadores */
                .scrollbar-hide {
                  -ms-overflow-style: none;  /* IE and Edge */
                  scrollbar-width: none;  /* Firefox */
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;  /* Chrome, Safari, Opera */
                }
            ` })
      ]
    }
  );
};

const $$Astro = createAstro("https://www.icepilar.org");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Iglesia Cristiana Evang\xE9lica en Pilar - Sitio Oficial"
  } = Astro2.props;
  return renderTemplate`<html class="dark" lang="es"> <head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="shortcut icon" href="/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><meta name="apple-mobile-web-app-title" content="MyWebSite"><link rel="manifest" href="/site.webmanifest"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><link rel="sitemap" href="/sitemap-index.xml">${renderComponent($$result, "Analytics", $$Index, {})}${renderHead()}</head> <body class="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white"> ${renderComponent($$result, "Header", Navbar, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/components/Navbar.tsx", "client:component-export": "default" })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", Footer, {})} </body></html>`;
}, "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
