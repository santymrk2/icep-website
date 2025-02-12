import { useState } from 'react';

import items from '../../../data/songs.json';

const Songs = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className=" max-w-lg mx-auto px-4 m-10 ">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="p-4 ring ring-2 ring-white rounded-xl transform transi">
            <button
              className="w-full flex justify-between items-center text-xl text-white text-left font-sans-camp font-extrabold py-2 px-4 focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
              <span
                className={`transform transition-transform duration-500 easy-out ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-white">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-full' : 'max-h-0'}`}
            >
              <p className="text-white text-lg font-medium font-sans-camp m-4 prose whitespace-pre-line">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Songs;
