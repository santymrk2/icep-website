import { useState, useEffect } from "preact/compat";
import Transition from "../components/Transition";
import Paths from "../data/paths.json";

const Navbar = () => {
    interface SubItem {
        text: string;
        href: string;
        active: boolean;
    }

    interface MenuItem {
        text: string;
        href: string;
        icon?: string;
        active: boolean;
        subitems?: SubItem[] | null; // Permitir null en subitems
    }

    type Paths = MenuItem[];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems: Paths = Paths as MenuItem[];
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [currentPath, setCurrentPath] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') { // Check if window is defined (client-side)
            setCurrentPath(window.location.pathname); // Now it's safe to access window.location
        }

        const handlePathChange = () => {
            if (typeof window !== 'undefined') {
                setCurrentPath(window.location.pathname);
            }
        };

        window.addEventListener('astro:after-swap', handlePathChange);
        window.addEventListener('popstate', handlePathChange);

        return () => {
            window.removeEventListener('astro:after-swap', handlePathChange);
            window.removeEventListener('popstate', handlePathChange);
        };
    }, []); // El array de dependencias vacío asegura que esto solo se ejecute una vez en el montaje

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
    before:bg-zinc-700
    before:-z-10
    before:transition-all
    before:duration-500
    before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
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

    return (
        <header
            class={`text-white m-4 sm:m-10 rounded-full z-50 ${isMenuOpen ? "rounded-xl h-auto" : "h-24"
                } transition-all duration-300`}
            id="back-menu"
        >
            <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-2 flex text-base font-normal">
                <div class="flex justify-between items-center w-full">
                    <div class="flex items-center m-2">
                        <a href="/" class="flex items-center">
                            <svg class="size-18 hover:scale-104 transition-all duration-400 easy-out" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M.00399-.00007h699.995v700.00133H.00399z" fill="none" /><path d="M267.78613 447.33294c0-6 .286-11.932.818-17.794-61.748-28.462-106.042-88.298-112.457-159.079-66.861 30.819-113.275 98.421-113.275 176.873 0 107.511 87.156 194.667 194.667 194.667 41.895 0 80.697-13.237 112.457-35.754-49.743-35.265-82.21-93.296-82.21-158.913M543.84663 270.45966c-6.415 70.781-50.71 130.617-112.457 159.079.531 5.862.818 11.794.818 17.794 0 65.617-32.467 123.648-82.21 158.913 31.76 22.517 70.562 35.754 112.457 35.754 107.511 0 194.666-87.156 194.666-194.667 0-78.452-46.413-146.054-113.274-176.873" fill="#2a38b2" fillRule="nonzero" /><path d="M432.20643 447.33274c0-6-.286-11.932-.818-17.794-24.766 11.416-52.332 17.794-81.392 17.794-29.059 0-56.626-6.378-81.392-17.794-.531 5.862-.818 11.794-.818 17.794 0 65.617 32.467 123.648 82.21 158.913 49.743-35.265 82.21-93.296 82.21-158.913" fill="#0080f0" fillRule="nonzero" /><path d="M349.99728 288.41957c31.76-22.516 70.562-35.753 112.457-35.753 29.059 0 56.626 6.378 81.392 17.793.531-5.861.818-11.793.818-17.793 0-107.512-87.156-194.667-194.667-194.667s-194.667 87.155-194.667 194.667c0 6 .287 11.932.818 17.793 24.766-11.415 52.333-17.793 81.392-17.793 41.895 0 80.697 13.237 112.457 35.753" fill="#2a38b2" fillRule="nonzero" /><path d="M268.60217 429.54028c5.27861-58.24117 36.19644-109.07898 81.3911-141.12012-31.75987-22.51641-70.56156-35.75277-112.45629-35.75354-29.05894.00084-56.62624 6.37878-81.3929 17.79419 6.41677 70.78005 50.71054 130.6169 112.4581 159.07947M349.99663 288.41972c45.19468 32.04124 76.11241 82.87774 81.39203 141.12004 61.7466-28.46176 106.04122-88.29931 112.45676-159.08002-24.7657-11.41494-52.33365-17.79287-81.3926-17.79306-41.89465-.00004-80.69695 13.2371-112.45619 35.75304" fill="#0080f0" fillRule="nonzero" /><path d="M349.99728 288.41896c-45.195 32.041-76.113 82.878-81.392 141.12 24.766 11.416 52.333 17.793 81.392 17.793 29.059 0 56.626-6.377 81.392-17.793-5.279-58.242-36.197-109.079-81.392-141.12" fill="#fff" fillRule="nonzero" /><path d="M349.99728 39.99963c-28.702 0-56.555 5.625-82.785 16.72-25.326 10.712-48.068 26.044-67.593 45.569-19.525 19.525-34.857 42.266-45.569 67.593-11.094 26.23-16.72 54.083-16.72 82.785 0 2.311.04 4.645.119 6.993-31.563 16.85-58.389 41.384-78.081 71.531-22.567 34.548-34.495 74.709-34.495 116.142 0 28.702 5.626 56.555 16.72 82.785 10.712 25.327 26.044 48.068 45.569 67.593 19.525 19.526 42.267 34.857 67.593 45.569 26.23 11.095 54.083 16.72 82.785 16.72 40.132 0 78.752-11.072 112.457-32.134 33.705 21.062 72.325 32.134 112.457 32.134 28.702 0 56.555-5.625 82.785-16.72 25.326-10.712 48.068-26.043 67.593-45.569 19.525-19.525 34.857-42.266 45.569-67.593 11.094-26.23 16.72-54.083 16.72-82.785 0-41.433-11.928-81.594-34.495-116.142-19.691-30.147-46.518-54.681-78.081-71.531.079-2.348.119-4.682.119-6.993 0-28.702-5.625-56.555-16.72-82.785-10.712-25.327-26.044-48.068-45.569-67.593-19.525-19.525-42.267-34.857-67.593-45.569-26.23-11.095-54.083-16.72-82.785-16.72m0 18c107.511 0 194.667 87.155 194.667 194.667 0 6-.287 11.932-.818 17.793 66.861 30.819 113.275 98.421 113.275 176.873 0 107.512-87.156 194.667-194.667 194.667-41.895 0-80.697-13.237-112.457-35.753-31.76 22.516-70.562 35.753-112.457 35.753-107.511 0-194.667-87.155-194.667-194.667 0-78.452 46.414-146.054 113.275-176.873-.531-5.861-.818-11.793-.818-17.793 0-107.512 87.156-194.667 194.667-194.667" fill="#fff" fillRule="nonzero" /></svg>
                        </a>
                    </div>

                    <div class="hidden xl:flex space-x-8 justify-center items-center m-2">
                        <nav>
                            <ul class="flex space-x-4 g-4">
                                {menuItems.map((item) => (
                                    <li
                                        key={item.text}
                                        class="relative select-none"
                                        onClick={() => setOpenDropdown(item.text)}
                                    >
                                        {!item.subitems ? (
                                            <a
                                                href={item.href}
                                                class={`${currentPath === item.href ? buttonSelectClasses : buttonClasses} inline-flex ${item.active ? "" : "opacity-30 pointer-events-none cursor-not-allowed"} `}
                                            >

                                                {item.text}
                                            </a>
                                        ) : (
                                            <div class={`relative group ${item.active ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`}>
                                                <button
                                                    class={buttonClasses + "inline-flex"}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenDropdown(openDropdown === item.text ? null : item.text)}

                                                }
                                                >
                                                    <span>{item.text}</span>
                                                    <svg
                                                        class={`size-5 transform transition-transform duration-200 ${item.active ? "" : "pointer-events-none cursor-not-allowed"}`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </button>

                                                <Transition
                                                    show={item.active && openDropdown === item.text}
                                                    duration={200}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-150"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"

                                                >
                                                      <div class="absolute top-full left-0 mt-2 w-full bg-zinc-800 rounded-lg shadow-lg z-20">

                                                    <div class="flex flex-col items-center space-y-2 bg-zinc-800">
                                                        {item.subitems.map((subitem) => (
                                                            <a
                                                                key={subitem.text}
                                                                href={subitem.href}
                                                                class={` ${subitem.active ? "" : "opacity-30 pointer-events-none cursor-not-allowed"} ${buttonClasses} block w-full`}
                                                            >
                                                                {subitem.text}
                                                            </a>
                                                        ))}
                                                    </div>
                                                    </div>
                                                    </Transition>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                    </div>
                    <button
                        id="mobile-menu-button"
                        class="xl:hidden m-2 sm:m-1 rounded-full group transition-all ease-in-out inline-flex w-12 h-12 text-slate-800 text-center items-center justify-center"
                        aria-pressed={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span class="sr-only">Menu</span>
                        <svg
                            class="w-8 h-8 fill-white pointer-events-none"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                class="origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]"
                                y="7"
                                width="9"
                                height="2"
                                rx="1"
                            />
                            <rect
                                class="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[[aria-pressed=true]]:rotate-45"
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                            />
                            <rect
                                class="origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:-rotate-[225deg]"
                                y="7"
                                width="9"
                                height="2"
                                rx="1"
                            />
                        </svg>
                    </button>


                </div>
            </div>

            {isMenuOpen && (
                <div class="xl:hidden text-white flex flex-col justify-center my-10">
                    <div class="flex flex-col items-center gap-2">
                        {menuItems.map((item) => (
                            <div key={item.text} class="w-8/12 m-0">
                                {!item.subitems ? (
                                    <a
                                        href={item.href}
                                        class={`inline-flex justify-center w-full ${currentPath === item.href ? buttonSelectClasses : buttonClasses} ${item.active ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`}
                                    >
                                        {item.text}
                                    </a>
                                ) : (
                                    <div class={`relative ${item.active ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`}>
                                        <button
                                            class={`inline-flex justify-center w-full ${currentPath === item.href ? buttonSelectClasses : buttonClasses} ${item.active ? "" : "pointer-events-none cursor-not-allowed"}`}
                                            onClick={() => setOpenDropdown(
                                                openDropdown === item.text ? null : item.text
                                            )}
                                        >
                                            <span>{item.text}</span>
                                            <svg
                                                class="size-5 transform transition-transform duration-200"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        <Transition
                                            show={item.active && openDropdown === item.text}
                                            duration={200}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"

                                        >
                                            <div class="">
                                                {item.subitems.map((subitem) => (
                                                    <a
                                                        key={subitem.text}
                                                        href={subitem.href}
                                                        class={`${buttonClasses} block w-full ${subitem.active ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`}
                                                    >
                                                        {subitem.text}
                                                    </a>
                                                ))}
                                            </div>
                                        </Transition>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

