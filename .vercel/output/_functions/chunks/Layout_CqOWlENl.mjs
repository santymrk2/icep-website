import { c as createComponent, m as maybeRenderHead, a as renderTemplate, f as createAstro, b as addAttribute, r as renderComponent, e as renderScript, g as renderTransition, h as renderSlot, i as renderHead } from './astro/server_BGVT8zRX.mjs';
/* empty css                                */
import { useState as useState$1, useEffect as useEffect$1 } from 'preact/compat';
import { useState, useEffect } from 'preact/hooks';
import { jsx, jsxs } from 'preact/jsx-runtime';

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="text-white"> <div class="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-12"> <div class="grid md:grid-cols-2 md:justify-items-center gap-8"> <div> <h3 class="text-xl font-semibold mb-4">ICEP</h3> <p class="text-gray-300">Iglesia Cristiana Evangélica en Pilar</p> <div class="mt-8"> <h3 class="text-xl font-semibold mb-4">Seguinos</h3> <div class="flex items-center space-x-4"> <a href="https://www.youtube.com/@icepilar" class="text-gray-300 hover:text-white"> <span class="sr-only">YouTube</span> <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"> <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path> </svg> </a> <a href="https://www.instagram.com/ice_pilar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" class="text-gray-300 hover:text-white"> <span class="sr-only">Instagram</span> <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path> <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"></path> </svg> </a> <a href="https://x.com/pilar_ice" class="text-gray-300 hover:text-white"> <span class="sr-only">X</span> <svg class="size-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 271"> <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"></path> </svg> </a> <a href="https://tiktok.com/@ice_pilar" class="text-gray-300 hover:text-white"> <span class="sr-only">TikTok</span> <svg xmlns="http://www.w3.org/2000/svg" class="size-6 fill-current" viewBox="0 0 32 32"><path d="M16.656 1.029c1.637-.025 3.262-.012 4.886-.025a7.762 7.762 0 0 0 2.189 5.213l-.002-.002A8.77 8.77 0 0 0 29 8.45l.028.002v5.036a13.327 13.327 0 0 1-5.331-1.247l.082.034a15.385 15.385 0 0 1-2.077-1.196l.052.034c-.012 3.649.012 7.298-.025 10.934a9.513 9.513 0 0 1-1.707 4.954l.02-.031c-1.652 2.366-4.328 3.919-7.371 4.011h-.014a9.071 9.071 0 0 1-5.139-1.31l.04.023C5.05 28.185 3.32 25.603 3 22.6l-.004-.041a23.163 23.163 0 0 1-.012-1.862c.49-4.779 4.494-8.476 9.361-8.476.547 0 1.083.047 1.604.136l-.056-.008c.025 1.849-.05 3.699-.05 5.548a4.29 4.29 0 0 0-5.465 2.619l-.009.03c-.133.427-.21.918-.21 1.426 0 .206.013.41.037.61l-.002-.024a4.26 4.26 0 0 0 4.382 3.586h-.009a4.198 4.198 0 0 0 3.451-1.994l.01-.018c.267-.372.45-.822.511-1.311l.001-.014c.125-2.237.075-4.461.087-6.698.012-5.036-.012-10.06.025-15.083z"></path></svg> </a> <a href="https://www.facebook.com/profile.php?id=61574986704374" class="text-gray-300 hover:text-white"> <span class="sr-only">Facebook</span> <svg xmlns="http://www.w3.org/2000/svg" class="size-6 fill-current" viewBox="0 0 20 20"><path d="M6.821 20v-9h2.733L10 7H6.821V5.052C6.821 4.022 6.848 3 8.287 3h1.458V.14c0-.043-1.253-.14-2.52-.14C4.58 0 2.924 1.657 2.924 4.7V7H0v4h2.923v9h3.898Z"></path> </svg> </a> </div> </div> </div> <div> <h3 class="text-xl font-semibold mb-4">Enlaces Rápidos</h3> <ul class="space-y-2"> <li> <a href="/nosotros" class="text-gray-300 hover:text-white hidden">Nosotros</a> </li> <li> <a href="https://iglesia-pilar.notion.site/b19a403082ee49238154f16433dd7925?v=7851ff6a1d2c403da600451c9e99c129&pvs=74" class="text-gray-300 hover:text-white">Calendario</a> </li> <li> <a href="/contacto" class="text-gray-300 hover:text-white">Contacto</a> </li> <li> <a href="https://camp.icepilar.org" class="text-gray-300 hover:text-white">Camp 2025</a> </li> </ul> </div> </div> <div class="mt-8 pt-8 border-t border-white-700"> <p class="text-center text-gray-300">
© ${currentYear} Iglesia Complejo Evangélico Pilar. Todos los derechos reservados.
</p> </div> </div> </footer>`;
}, "/home/santymrk2/Develops/icep-website/src/components/Footer.astro", void 0);

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
		active: true
	},
	{
		text: "Nosotros",
		href: "/nosotros",
		subitems: null,
		active: false
	},
	{
		text: "Ministerios",
		href: "",
		subitems: null,
		active: false
	},
	{
		text: "Calendario",
		href: "https://iglesia-pilar.notion.site/b19a403082ee49238154f16433dd7925?v=7851ff6a1d2c403da600451c9e99c129&pvs=74",
		subitems: null,
		active: true
	},
	{
		text: "Contactanos",
		href: "/contacto",
		subitems: null,
		active: true
	},
	{
		text: "Camp 2025",
		href: "https://camp.icepilar.org",
		subitems: null,
		active: true
	}
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState$1(false);
  const menuItems = Paths;
  const [openDropdown, setOpenDropdown] = useState$1(null);
  const [currentPath, setCurrentPath] = useState$1(null);
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
  const buttonClasses = `
    motion-preset-expand 
    text-white
    no-underline
    rounded-full
    py-2
    px-4
    items-center
    text-center
    font-extrabold
    relative
    z-10
    transition-all
    duration-500
    ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
    tracking-wide
    font-sans
    overflow-hidden
    before:content-['']
    before:absolute
    before:top-0
    before:right-0
    before:w-0
    before:h-full
    before:-z-10
    before:transition-all
    before:duration-500
    before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
    hover:text-blue-500
    hover:before:w-full
    hover:before:left-0
    hover:before:right-auto
  `;
  const buttonSelectClasses = `
    motion-preset-expand 
    bg-white
    text-black
    no-underline
    rounded-full
    py-2
    px-4
    items-center
    text-center
    font-extrabold
    relative
    z-10
    transition-all
    duration-500
    ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
    tracking-wide
    font-sans
    overflow-hidden
    before:content-['']
    before:absolute
    before:top-0
    before:right-0
    before:w-0
    before:h-full
    before:-z-10
    before:transition-all
    before:duration-500
    before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
    hover:before:w-full
    hover:before:left-0
    hover:before:right-auto
    `;
  return jsxs("header", {
    class: `text-white m-4 sm:m-10 rounded-full z-50 ${isMenuOpen ? "rounded-xl h-auto" : "h-24"} transition-all duration-300`,
    id: "back-menu",
    children: [jsx("div", {
      class: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-2 flex text-base font-normal",
      children: jsxs("div", {
        class: "flex justify-between items-center w-full",
        children: [jsx("div", {
          class: "flex items-center m-2",
          children: jsx("a", {
            href: "/",
            class: "flex items-center",
            children: jsxs("svg", {
              class: "size-18 hover:scale-104 transition-all duration-400 easy-out",
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
        }), jsx("div", {
          class: "hidden xl:flex space-x-8 justify-center items-center m-2",
          children: jsx("nav", {
            children: jsx("ul", {
              class: "flex space-x-4 g-4",
              children: menuItems.map((item) => jsx("li", {
                class: "relative select-none",
                onClick: () => setOpenDropdown(item.text),
                children: !item.subitems ? jsx("a", {
                  href: item.href,
                  class: `${item.active ? "inline-flex" : "hidden m-0 w-0"} ${currentPath === item.href ? buttonSelectClasses : buttonClasses}`,
                  children: item.text
                }) : jsxs("div", {
                  class: `relative group ${item.active ? "inline-flex" : "hidden"}`,
                  children: [jsxs("button", {
                    class: buttonClasses + "inline-flex",
                    onClick: (e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === item.text ? null : item.text);
                    },
                    children: [jsx("span", {
                      children: item.text
                    }), jsx("svg", {
                      class: `size-5 transform transition-transform duration-200 ${item.active ? "" : "pointer-events-none cursor-not-allowed"}`,
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
                          class: ` ${subitem.active ? "" : "opacity-30 pointer-events-none cursor-not-allowed"} ${buttonClasses} block w-full`,
                          children: subitem.text
                        }, subitem.text))
                      })
                    })
                  })]
                })
              }, item.text))
            })
          })
        }), jsxs("button", {
          id: "mobile-menu-button",
          class: "z-52 xl:hidden m-2 sm:m-1 rounded-full group transition-all ease-in-out inline-flex w-12 h-12 text-slate-800 text-center items-center justify-center",
          "aria-pressed": isMenuOpen,
          onClick: () => setIsMenuOpen(!isMenuOpen),
          children: [jsx("span", {
            class: "sr-only",
            children: "Menu"
          }), jsxs("svg", {
            class: "w-8 h-8 fill-white pointer-events-none",
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
        })]
      })
    }), jsxs("div", {
      class: `fixed top-0 left-0 w-full h-full bg-zinc-800 z-40 flex flex-col justify-center p-8 transition-all duration-500 transform ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`,
      children: [jsx("ul", {
        class: "list-none",
        children: menuItems.map((item) => jsx("li", {
          class: "mb-5",
          children: jsx("a", {
            href: item.href,
            class: `text-white text-4xl font-bold no-underline  py-2 hover:text-blue-500 transition-colors duration-300 ${item.active ? "block" : "hidden"}`,
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
    })]
  });
};

const $$Astro$3 = createAstro("https://www.icepilar.org");
const $$Logo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Logo;
  const { className = "", size = "size-30" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(`${size} ${className}`, "class")} viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"> <path d="M.00399-.00007h699.995v700.00133H.00399z" fill="none"></path><path d="M267.78613 447.33294c0-6 .286-11.932.818-17.794-61.748-28.462-106.042-88.298-112.457-159.079-66.861 30.819-113.275 98.421-113.275 176.873 0 107.511 87.156 194.667 194.667 194.667 41.895 0 80.697-13.237 112.457-35.754-49.743-35.265-82.21-93.296-82.21-158.913M543.84663 270.45966c-6.415 70.781-50.71 130.617-112.457 159.079.531 5.862.818 11.794.818 17.794 0 65.617-32.467 123.648-82.21 158.913 31.76 22.517 70.562 35.754 112.457 35.754 107.511 0 194.666-87.156 194.666-194.667 0-78.452-46.413-146.054-113.274-176.873" fill="#2a38b2" fill-rule="nonzero"></path><path d="M432.20643 447.33274c0-6-.286-11.932-.818-17.794-24.766 11.416-52.332 17.794-81.392 17.794-29.059 0-56.626-6.378-81.392-17.794-.531 5.862-.818 11.794-.818 17.794 0 65.617 32.467 123.648 82.21 158.913 49.743-35.265 82.21-93.296 82.21-158.913" fill="#0080f0" fill-rule="nonzero"></path><path d="M349.99728 288.41957c31.76-22.516 70.562-35.753 112.457-35.753 29.059 0 56.626 6.378 81.392 17.793.531-5.861.818-11.793.818-17.793 0-107.512-87.156-194.667-194.667-194.667s-194.667 87.155-194.667 194.667c0 6 .287 11.932.818 17.793 24.766-11.415 52.333-17.793 81.392-17.793 41.895 0 80.697 13.237 112.457 35.753" fill="#2a38b2" fill-rule="nonzero"></path><path d="M268.60217 429.54028c5.27861-58.24117 36.19644-109.07898 81.3911-141.12012-31.75987-22.51641-70.56156-35.75277-112.45629-35.75354-29.05894.00084-56.62624 6.37878-81.3929 17.79419 6.41677 70.78005 50.71054 130.6169 112.4581 159.07947M349.99663 288.41972c45.19468 32.04124 76.11241 82.87774 81.39203 141.12004 61.7466-28.46176 106.04122-88.29931 112.45676-159.08002-24.7657-11.41494-52.33365-17.79287-81.3926-17.79306-41.89465-.00004-80.69695 13.2371-112.45619 35.75304" fill="#0080f0" fill-rule="nonzero"></path><path d="M349.99728 288.41896c-45.195 32.041-76.113 82.878-81.392 141.12 24.766 11.416 52.333 17.793 81.392 17.793 29.059 0 56.626-6.377 81.392-17.793-5.279-58.242-36.197-109.079-81.392-141.12" fill="#fff" fill-rule="nonzero"></path><path d="M349.99728 39.99963c-28.702 0-56.555 5.625-82.785 16.72-25.326 10.712-48.068 26.044-67.593 45.569-19.525 19.525-34.857 42.266-45.569 67.593-11.094 26.23-16.72 54.083-16.72 82.785 0 2.311.04 4.645.119 6.993-31.563 16.85-58.389 41.384-78.081 71.531-22.567 34.548-34.495 74.709-34.495 116.142 0 28.702 5.626 56.555 16.72 82.785 10.712 25.327 26.044 48.068 45.569 67.593 19.525 19.526 42.267 34.857 67.593 45.569 26.23 11.095 54.083 16.72 82.785 16.72 40.132 0 78.752-11.072 112.457-32.134 33.705 21.062 72.325 32.134 112.457 32.134 28.702 0 56.555-5.625 82.785-16.72 25.326-10.712 48.068-26.043 67.593-45.569 19.525-19.525 34.857-42.266 45.569-67.593 11.094-26.23 16.72-54.083 16.72-82.785 0-41.433-11.928-81.594-34.495-116.142-19.691-30.147-46.518-54.681-78.081-71.531.079-2.348.119-4.682.119-6.993 0-28.702-5.625-56.555-16.72-82.785-10.712-25.327-26.044-48.068-45.569-67.593-19.525-19.525-42.267-34.857-67.593-45.569-26.23-11.095-54.083-16.72-82.785-16.72m0 18c107.511 0 194.667 87.155 194.667 194.667 0 6-.287 11.932-.818 17.793 66.861 30.819 113.275 98.421 113.275 176.873 0 107.512-87.156 194.667-194.667 194.667-41.895 0-80.697-13.237-112.457-35.753-31.76 22.516-70.562 35.753-112.457 35.753-107.511 0-194.667-87.155-194.667-194.667 0-78.452 46.414-146.054 113.275-176.873-.531-5.861-.818-11.793-.818-17.793 0-107.512 87.156-194.667 194.667-194.667" fill="#fff" fill-rule="nonzero"></path> </svg>`;
}, "/home/santymrk2/Develops/icep-website/src/components/Logo.astro", void 0);

const $$Astro$2 = createAstro("https://www.icepilar.org");
const $$Loading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Loading;
  return renderTemplate`${maybeRenderHead()}<div id="loading-screen" class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-800 transition-opacity duration-500"> <div class="text-center"> <div class="w-32 h-32 mx-auto mb-4"> ${renderComponent($$result, "Logo", $$Logo, { "data-astro-transition-persist": "logo", "className": "animate-pulse transition-all duration-400 ease-out", "data-astro-transition-scope": renderTransition($$result, "3yhmre7x", "", "logo") })} </div> <div class=" w-12 h-12 border-5 border-white border-b-transparent rounded-full inline-block box-border animate-spin mx-auto"></div> </div> </div> ${renderScript($$result, "/home/santymrk2/Develops/icep-website/src/components/Loading.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/santymrk2/Develops/icep-website/src/components/Loading.astro", "self");

const $$Astro$1 = createAstro("https://www.icepilar.org");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/santymrk2/Develops/icep-website/node_modules/.pnpm/astro@5.3.1_@types+node@22.13.5_jiti@2.4.2_lightningcss@1.29.1_rollup@4.34.8_terser@5.37.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/santymrk2/Develops/icep-website/node_modules/.pnpm/astro@5.3.1_@types+node@22.13.5_jiti@2.4.2_lightningcss@1.29.1_rollup@4.34.8_terser@5.37.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/components/ClientRouter.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://www.icepilar.org");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Iglesia Cristiana Evang\xE9lica en Pilar - Sitio Oficial",
    showLoading = false
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="description"', '><meta name="viewport" content="width=device-width"><link rel="icon" sizes="96x96" href="/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico"><meta name="generator"', ">", "<title>", '</title><script async src="https://www.googletagmanager.com/gtag/js?id=G-YZ4DX7X5N0"><\/script>', "", '</head> <body class="min-h-screen bg-zinc-800 text-white"> ', " ", " ", " ", " </body></html>"])), addAttribute(description, "content"), addAttribute(Astro2.generator, "content"), renderComponent($$result, "ClientRouter", $$ClientRouter, {}), title, renderScript($$result, "/home/santymrk2/Develops/icep-website/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"), renderHead(), showLoading && renderTemplate`${renderComponent($$result, "Loading", $$Loading, {})}`, renderComponent($$result, "Header", Navbar, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/home/santymrk2/Develops/icep-website/src/components/Navbar.tsx", "client:component-export": "default" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/home/santymrk2/Develops/icep-website/src/layouts/Layout.astro", void 0);

export { $$Layout as $, Paths as P };
