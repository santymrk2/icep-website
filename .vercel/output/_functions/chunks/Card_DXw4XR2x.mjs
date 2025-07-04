import { jsx, jsxs } from 'preact/jsx-runtime';

const Card = ({
  href,
  bg = "from-zinc-800 to-zinc-800/50",
  logo,
  title,
  desc,
  touchDisabled = false
}) => {
  return jsx("div", {
    className: `relative rounded-2xl overflow-hidden bg-gradient-to-b ${bg} group`,
    children: jsx("a", {
      href: href ? href : "#",
      children: jsxs("div", {
        className: "relative w-full aspect-[3/2]",
        children: [logo ? jsx("img", {
          src: logo,
          alt: title,
          className: `
                absolute top-1/2 left-1/2 transform 
                -translate-x-1/2 -translate-y-1/2 w-2/3
                transition-all duration-300 easy-out
                ${touchDisabled ? "" : "group-hover:opacity-0 group-hover:scale-75"}
              `
        }) : jsx("div", {
          className: `
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                transition-all duration-300 easy-out
                ${touchDisabled ? "" : "group-hover:opacity-0 group-hover:scale-75"}
              `,
          children: jsx("div", {
            className: "text-center w-full",
            children: jsx("h2", {
              className: "text-[clamp(1rem,5cqw,1.5rem)] text-white font-bold text-center w-full",
              children: title
            })
          })
        }), jsxs("div", {
          className: `absolute inset-0 flex flex-col items-start justify-end p-4 sm:p-8 pointer-events-none ${touchDisabled ? "hidden" : ""}`,
          children: [jsx("h3", {
            className: `mb-2 sm:mb-4 text-xl sm:text-3xl md:text-3xl lg:text-3xl font-bold text-white align-text-bottom
                opacity-0 transform translate-y-4
                transition-all duration-300 easy-in
                
                group-hover:opacity-100
                group-hover:translate-y-0`,
            children: desc
          }), jsxs("div", {
            className: "flex flex-row items-center px-2 mt-2 bg-white opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0",
            children: [jsx("p", {
              className: "text-left text-sm sm:text-md font-bold text-black",
              children: "Leer más"
            }), jsx("svg", {
              className: "size-5 sm:size-6 pl-1",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              children: jsx("path", {
                stroke: "#000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2",
                d: "M6 12h12m0 0-5-5m5 5-5 5"
              })
            })]
          })]
        })]
      })
    })
  });
};

export { Card as C };
