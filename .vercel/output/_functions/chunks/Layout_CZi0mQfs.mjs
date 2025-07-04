import { a as createComponent, m as maybeRenderHead, r as renderTemplate, c as createAstro, d as renderComponent, f as renderScript, b as addAttribute, g as renderTransition, h as renderHead, i as renderSlot } from './astro/server_JmoDyaQI.mjs';
/* empty css                              */
import { useState as useState$1, useRef, useEffect as useEffect$1 } from 'preact/compat';
import { useState, useEffect } from 'preact/hooks';
import { jsx, jsxs } from 'preact/jsx-runtime';

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="text-white"> <div class="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-12"> <div class="grid md:grid-cols-3 md:justify-items-center gap-8"> <div> <h3 class="text-xl font-bold mb-4">ICEP</h3> <p class="text-gray-300">Iglesia Cristiana Evangélica en Pilar</p> </div> <div class=""> <h3 class="text-xl font-bold mb-4">Seguinos</h3> <ul class="items-left text-left items-center space-x-4">  <li> <a href="https://www.youtube.com/@icepilar" class="text-gray-300 text-left hover:text-white">
YouTube
</a> </li>  <li> <a href="https://www.instagram.com/ice_pilar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" class="text-gray-300 hover:text-white">
Instagram
</a> </li>  <li> <a href="https://x.com/pilar_ice" class="text-gray-300 hover:text-white">
X
</a> </li>  <li> <a href="https://tiktok.com/@ice_pilar" class="text-gray-300 hover:text-white">
TikTok
</a> </li>  <li> <a href="https://www.facebook.com/profile.php?id=61574986704374" class="text-gray-300 hover:text-white">
Facebook
</a> </li> </ul> </div> <div> <h3 class="text-xl font-bold mb-4">Enlaces Rápidos</h3> <ul class="space-y-2"> <li> <a href="/nosotros" class="text-gray-300 hover:text-white hidden">Nosotros</a> </li> <li> <a href="https://iglesia-pilar.notion.site/b19a403082ee49238154f16433dd7925?v=7851ff6a1d2c403da600451c9e99c129&pvs=74" class="text-gray-300 hover:text-white">Calendario</a> </li> <li> <a href="/contacto" class="text-gray-300 hover:text-white">Contacto</a> </li> <li> <a href="https://camp.icepilar.org" class="text-gray-300 hover:text-white">Camp 2025</a> </li> </ul> </div> </div> <div class="mt-8 pt-8 border-t border-white-700"> <p class="text-sm text-center text-gray-300">
© ${currentYear} Iglesia Complejo Evangélico Pilar. Todos los derechos reservados.
</p> </div> </div> </footer>`;
}, "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/components/Footer.astro", void 0);

const $$Astro$3 = createAstro("https://www.icepilar.org");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
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
  return isShowing ? jsx("div", {
    class: classes,
    children
  }) : null;
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
  const [isMenuOpen, setIsMenuOpen] = useState$1(false);
  const [hasInteracted, setHasInteracted] = useState$1(false);
  const menuItems = Paths;
  const [openDropdown, setOpenDropdown] = useState$1(null);
  const [currentPath, setCurrentPath] = useState$1(null);
  const firstRender = useRef(true);
  useEffect$1(() => {
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
  useEffect$1(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);
  useEffect$1(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);
  const handleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setHasInteracted(true);
  };
  return jsxs("header", {
    class: `text-white m-0 sm:m-0 rounded-none z-50 h-20 transition-all duration-300 w-full`,
    id: "back-menu",
    children: [jsxs("div", {
      class: "w-full max-w-full flex flex-row items-center justify-between h-20 gap-4 px-6 m-0 overflow-hidden scrollbar-hide relative",
      children: [jsx("div", {
        class: "flex items-center h-full",
        children: jsx("a", {
          href: "/",
          id: "site-logo",
          class: "flex items-center h-full",
          children: jsxs("svg", {
            class: "w-9 h-9 sm:w-10 sm:h-10 hover:scale-104 transition-all duration-400 easy-out",
            viewBox: "0 0 700 700",
            xmlns: "http://www.w3.org/2000/svg",
            xmlSpace: "preserve",
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: "2",
            children: [jsx("path", {
              d: "M.00399-.00007h699.995v700.00133H.00399z",
              fill: "none"
            }), jsx("path", {
              d: "M267.78613 447.33294c0-6 .286-11.932.818-17.794-61.748-28.462-106.042-88.298-112.457-159.079-66.861 30.819-113.275 98.421-113.275 176.873 0 107.511 87.156 194.667 194.667 194.667 41.895 0 80.697-13.237 112.457-35.754-49.743-35.265-82.21-93.296-82.21-158.913M543.84663 270.45966c-6.415 70.781-50.71 130.617-112.457 159.079.531 5.862.818 11.794.818 17.794 0 65.617-32.467 123.648-82.21 158.913 31.76 22.517 70.562 35.754 112.457 35.754 107.511 0 194.666-87.156 194.666-194.667 0-78.452-46.413-146.054-113.274-176.873",
              fill: "#2a38b2",
              fillRule: "nonzero"
            }), jsx("path", {
              d: "M432.20643 447.33274c0-6-.286-11.932-.818-17.794-24.766 11.416-52.332 17.794-81.392 17.794-29.059 0-56.626-6.378-81.392-17.794-.531 5.862-.818 11.794-.818 17.794 0 65.617 32.467 123.648 82.21 158.913 49.743-35.265 82.21-93.296 82.21-158.913",
              fill: "#0080f0",
              fillRule: "nonzero"
            }), jsx("path", {
              d: "M349.99728 288.41957c31.76-22.516 70.562-35.753 112.457-35.753 29.059 0 56.626 6.378 81.392 17.793.531-5.861.818-11.793.818-17.793 0-107.512-87.156-194.667-194.667-194.667s-194.667 87.155-194.667 194.667c0 6 .287 11.932.818 17.793 24.766-11.415 52.333-17.793 81.392-17.793 41.895 0 80.697 13.237 112.457 35.753",
              fill: "#2a38b2",
              fillRule: "nonzero"
            }), jsx("path", {
              d: "M268.60217 429.54028c5.27861-58.24117 36.19644-109.07898 81.3911-141.12012-31.75987-22.51641-70.56156-35.75277-112.45629-35.75354-29.05894.00084-56.62624 6.37878-81.3929 17.79419 6.41677 70.78005 50.71054 130.6169 112.4581 159.07947M349.99663 288.41972c45.19468 32.04124 76.11241 82.87774 81.39203 141.12004 61.7466-28.46176 106.04122-88.29931 112.45676-159.08002-24.7657-11.41494-52.33365-17.79287-81.3926-17.79306-41.89465-.00004-80.69695 13.2371-112.45619 35.75304",
              fill: "#0080f0",
              fillRule: "nonzero"
            }), jsx("path", {
              d: "M349.99728 288.41896c-45.195 32.041-76.113 82.878-81.392 141.12 24.766 11.416 52.333 17.793 81.392 17.793 29.059 0 56.626-6.377 81.392-17.793-5.279-58.242-36.197-109.079-81.392-141.12",
              fill: "#fff",
              fillRule: "nonzero"
            }), jsx("path", {
              d: "M349.99728 39.99963c-28.702 0-56.555 5.625-82.785 16.72-25.326 10.712-48.068 26.044-67.593 45.569-19.525 19.525-34.857 42.266-45.569 67.593-11.094 26.23-16.72 54.083-16.72 82.785 0 2.311.04 4.645.119 6.993-31.563 16.85-58.389 41.384-78.081 71.531-22.567 34.548-34.495 74.709-34.495 116.142 0 28.702 5.626 56.555 16.72 82.785 10.712 25.327 26.044 48.068 45.569 67.593 19.525 19.526 42.267 34.857 67.593 45.569 26.23 11.095 54.083 16.72 82.785 16.72 40.132 0 78.752-11.072 112.457-32.134 33.705 21.062 72.325 32.134 112.457 32.134 28.702 0 56.555-5.625 82.785-16.72 25.326-10.712 48.068-26.043 67.593-45.569 19.525-19.525 34.857-42.266 45.569-67.593 11.094-26.23 16.72-54.083 16.72-82.785 0-41.433-11.928-81.594-34.495-116.142-19.691-30.147-46.518-54.681-78.081-71.531.079-2.348.119-4.682.119-6.993 0-28.702-5.625-56.555-16.72-82.785-10.712-25.327-26.044-48.068-45.569-67.593-19.525-19.525-42.267-34.857-67.593-45.569-26.23-11.095-54.083-16.72-82.785-16.72m0 18c107.511 0 194.667 87.155 194.667 194.667 0 6-.287 11.932-.818 17.793 66.861 30.819 113.275 98.421 113.275 176.873 0 107.512-87.156 194.667-194.667 194.667-41.895 0-80.697-13.237-112.457-35.753-31.76 22.516-70.562 35.753-112.457 35.753-107.511 0-194.667-87.155-194.667-194.667 0-78.452 46.414-146.054 113.275-176.873-.531-5.861-.818-11.793-.818-17.793 0-107.512 87.156-194.667 194.667-194.667",
              fill: "#fff",
              fillRule: "nonzero"
            })]
          })
        })
      }), jsx("nav", {
        class: "hidden xl:flex flex-1 justify-center items-center h-full w-full",
        children: jsx("ul", {
          class: "flex space-x-8 px-2 h-20 items-center justify-center w-full",
          children: menuItems.filter((item) => item.active && item.main).map((item) => jsx("li", {
            class: "relative select-none flex flex-col items-center justify-center h-full",
            children: !item.subitems ? jsx("a", {
              href: item.href,
              class: `${currentPath === item.href ? "nav-active" : "nav-link"} nav-link-dot-container`,
              children: jsxs("span", {
                class: "relative block",
                children: [jsx("span", {
                  class: "z-10 relative",
                  children: item.text
                }), jsx("span", {
                  class: `nav-dot ${currentPath === item.href ? "opacity-100 animate-fade-in" : "opacity-0"}`
                })]
              })
            }) : jsxs("div", {
              class: "relative group",
              children: [jsxs("button", {
                class: "nav-link inline-flex",
                onClick: (e) => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown === item.text ? null : item.text);
                },
                children: [jsx("span", {
                  children: item.text
                }), jsx("svg", {
                  class: "size-5 transform transition-transform duration-200",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M19 9l-7 7-7-7"
                  })
                })]
              }), jsx(Transition, {
                show: item.active && openDropdown === item.text,
                duration: 200,
                enter: "transition ease-out duration-200",
                enterFrom: "transform opacity-0 scale-95",
                enterTo: "transform opacity-100 scale-100",
                leave: "transition ease-in duration-150",
                leaveFrom: "transform opacity-100 scale-100",
                leaveTo: "transform opacity-0 scale-95",
                children: jsx("div", {
                  class: "absolute top-full left-0 mt-2 w-full bg-zinc-800 rounded-lg shadow-lg z-20",
                  children: jsx("div", {
                    class: "flex flex-col items-center space-y-2 bg-zinc-800",
                    children: item.subitems.map((subitem) => jsx("a", {
                      href: subitem.href,
                      class: ` ${subitem.active ? "" : "opacity-30 pointer-events-none cursor-not-allowed"} nav-link block w-full`,
                      children: subitem.text
                    }, subitem.text))
                  })
                })
              })]
            })
          }, item.text))
        })
      }), jsx("div", {
        class: "flex items-center h-full",
        children: jsxs("button", {
          id: "mobile-menu-button",
          class: "z-52 rounded-full group transition-all ease-in-out inline-flex w-9 h-9 text-slate-800 text-center items-center justify-center",
          "aria-pressed": isMenuOpen,
          onClick: handleMobileMenu,
          children: [jsx("span", {
            class: "sr-only",
            children: "Menu"
          }), jsxs("svg", {
            class: "size-6 fill-white pointer-events-none",
            viewBox: "0 0 16 16",
            xmlns: "http://www.w3.org/2000/svg",
            children: [jsx("rect", {
              class: "origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]",
              y: "7",
              width: "9",
              height: "2",
              rx: "1"
            }), jsx("rect", {
              class: "origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[[aria-pressed=true]]:rotate-45",
              y: "7",
              width: "16",
              height: "2",
              rx: "1"
            }), jsx("rect", {
              class: "origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:-rotate-[225deg]",
              y: "7",
              width: "9",
              height: "2",
              rx: "1"
            })]
          })]
        })
      })]
    }), (isMenuOpen || hasInteracted) && jsxs("div", {
      class: `fixed top-0 left-0 w-full h-full bg-zinc-900 z-40 flex flex-col items-start justify-end pb-8 p-8
                        transition-all duration-500
                        overflow-hidden scrollbar-hide
                        ${hasInteracted ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                        ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}
                        ${!hasInteracted && !isMenuOpen ? "hidden" : ""}
                    `,
      children: [jsx("ul", {
        class: "list-none",
        children: menuItems.filter((item) => item.active).map((item) => jsx("li", {
          class: "mb-5",
          children: jsx("a", {
            href: item.href,
            class: `text-white text-3xl font-bold no-underline  py-2 hover:text-blue-500 transition-colors duration-300 block`,
            children: item.text
          })
        }))
      }), jsxs("div", {
        class: " mt-20 text-gray-500 text-sm",
        children: [jsx("p", {
          children: "© 2025 Iglesia Complejo Evangélico Pilar. Todos los derechos reservados."
        }), jsxs("div", {
          class: "flex mt-5",
          children: [jsx("a", {
            href: "https://www.youtube.com/@icepilar",
            class: "text-white mr-5 no-underline",
            children: "YouTube"
          }), jsx("a", {
            href: "https://www.instagram.com/ice_pilar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
            class: "text-white mr-5 no-underline",
            children: "Instagram"
          }), jsx("a", {
            href: "https://www.facebook.com/profile.php?id=61574986704374",
            class: "text-white no-underline",
            children: "Facebook"
          })]
        })]
      })]
    }), jsx("style", {
      children: `
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
                    bottom: 0.2rem;
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
                    bottom: -0.75rem;
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
                    from { opacity: 0; transform: translateY(8px) translateX(-50%); }
                    to { opacity: 1; transform: translateY(0) translateX(-50%); }
                }
                /* Ocultar scrollbar en todos los navegadores */
                .scrollbar-hide {
                  -ms-overflow-style: none;  /* IE and Edge */
                  scrollbar-width: none;  /* Firefox */
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;  /* Chrome, Safari, Opera */
                }
            `
    })]
  });
};

const $$Astro$2 = createAstro("https://www.icepilar.org");
const $$Logo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Logo;
  const { className = "", size = "size-30" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(`${size} ${className}`, "class")} viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"> <path d="M.00399-.00007h699.995v700.00133H.00399z" fill="none"></path><path d="M267.78613 447.33294c0-6 .286-11.932.818-17.794-61.748-28.462-106.042-88.298-112.457-159.079-66.861 30.819-113.275 98.421-113.275 176.873 0 107.511 87.156 194.667 194.667 194.667 41.895 0 80.697-13.237 112.457-35.754-49.743-35.265-82.21-93.296-82.21-158.913M543.84663 270.45966c-6.415 70.781-50.71 130.617-112.457 159.079.531 5.862.818 11.794.818 17.794 0 65.617-32.467 123.648-82.21 158.913 31.76 22.517 70.562 35.754 112.457 35.754 107.511 0 194.666-87.156 194.666-194.667 0-78.452-46.413-146.054-113.274-176.873" fill="#2a38b2" fill-rule="nonzero"></path><path d="M432.20643 447.33274c0-6-.286-11.932-.818-17.794-24.766 11.416-52.332 17.794-81.392 17.794-29.059 0-56.626-6.378-81.392-17.794-.531 5.862-.818 11.794-.818 17.794 0 65.617 32.467 123.648 82.21 158.913 49.743-35.265 82.21-93.296 82.21-158.913" fill="#0080f0" fill-rule="nonzero"></path><path d="M349.99728 288.41957c31.76-22.516 70.562-35.753 112.457-35.753 29.059 0 56.626 6.378 81.392 17.793.531-5.861.818-11.793.818-17.793 0-107.512-87.156-194.667-194.667-194.667s-194.667 87.155-194.667 194.667c0 6 .287 11.932.818 17.793 24.766-11.415 52.333-17.793 81.392-17.793 41.895 0 80.697 13.237 112.457 35.753" fill="#2a38b2" fill-rule="nonzero"></path><path d="M268.60217 429.54028c5.27861-58.24117 36.19644-109.07898 81.3911-141.12012-31.75987-22.51641-70.56156-35.75277-112.45629-35.75354-29.05894.00084-56.62624 6.37878-81.3929 17.79419 6.41677 70.78005 50.71054 130.6169 112.4581 159.07947M349.99663 288.41972c45.19468 32.04124 76.11241 82.87774 81.39203 141.12004 61.7466-28.46176 106.04122-88.29931 112.45676-159.08002-24.7657-11.41494-52.33365-17.79287-81.3926-17.79306-41.89465-.00004-80.69695 13.2371-112.45619 35.75304" fill="#0080f0" fill-rule="nonzero"></path><path d="M349.99728 288.41896c-45.195 32.041-76.113 82.878-81.392 141.12 24.766 11.416 52.333 17.793 81.392 17.793 29.059 0 56.626-6.377 81.392-17.793-5.279-58.242-36.197-109.079-81.392-141.12" fill="#fff" fill-rule="nonzero"></path><path d="M349.99728 39.99963c-28.702 0-56.555 5.625-82.785 16.72-25.326 10.712-48.068 26.044-67.593 45.569-19.525 19.525-34.857 42.266-45.569 67.593-11.094 26.23-16.72 54.083-16.72 82.785 0 2.311.04 4.645.119 6.993-31.563 16.85-58.389 41.384-78.081 71.531-22.567 34.548-34.495 74.709-34.495 116.142 0 28.702 5.626 56.555 16.72 82.785 10.712 25.327 26.044 48.068 45.569 67.593 19.525 19.526 42.267 34.857 67.593 45.569 26.23 11.095 54.083 16.72 82.785 16.72 40.132 0 78.752-11.072 112.457-32.134 33.705 21.062 72.325 32.134 112.457 32.134 28.702 0 56.555-5.625 82.785-16.72 25.326-10.712 48.068-26.043 67.593-45.569 19.525-19.525 34.857-42.266 45.569-67.593 11.094-26.23 16.72-54.083 16.72-82.785 0-41.433-11.928-81.594-34.495-116.142-19.691-30.147-46.518-54.681-78.081-71.531.079-2.348.119-4.682.119-6.993 0-28.702-5.625-56.555-16.72-82.785-10.712-25.327-26.044-48.068-45.569-67.593-19.525-19.525-42.267-34.857-67.593-45.569-26.23-11.095-54.083-16.72-82.785-16.72m0 18c107.511 0 194.667 87.155 194.667 194.667 0 6-.287 11.932-.818 17.793 66.861 30.819 113.275 98.421 113.275 176.873 0 107.512-87.156 194.667-194.667 194.667-41.895 0-80.697-13.237-112.457-35.753-31.76 22.516-70.562 35.753-112.457 35.753-107.511 0-194.667-87.155-194.667-194.667 0-78.452 46.414-146.054 113.275-176.873-.531-5.861-.818-11.793-.818-17.793 0-107.512 87.156-194.667 194.667-194.667" fill="#fff" fill-rule="nonzero"></path> </svg>`;
}, "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/components/Logo.astro", void 0);

const $$Astro$1 = createAstro("https://www.icepilar.org");
const $$Loading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Loading;
  return renderTemplate`${maybeRenderHead()}<div id="loading-screen" class="fixed inset-0 z-55 flex items-center justify-center bg-zinc-900 transition-opacity duration-500" style="display: none; opacity: 0;"> <div class="text-center"> <div class="w-32 h-32 mx-auto mb-4"> ${renderComponent($$result, "Logo", $$Logo, { "data-astro-transition-persist": "logo", "className": "animate-pulse transition-all duration-400 ease-out", "data-astro-transition-scope": renderTransition($$result, "3yhmre7x", "", "logo") })} </div> </div> </div> ${renderScript($$result, "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/components/Loading.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/components/Loading.astro", "self");

const $$Astro = createAstro("https://www.icepilar.org");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Iglesia Cristiana Evang\xE9lica en Pilar - Sitio Oficial",
    showLoading = false
  } = Astro2.props;
  return renderTemplate`<html class="dark" lang="es"> <head>${renderComponent($$result, "Analytics", $$Index, {})}<meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" sizes="96x96" href="/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white"> ${showLoading && renderTemplate`${renderComponent($$result, "Loading", $$Loading, {})}`} ${renderComponent($$result, "Header", Navbar, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/components/Navbar.tsx", "client:component-export": "default" })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
