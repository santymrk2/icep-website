// pages/NextMeeting.jsx
import React from 'react';
import { fetchNextMeeting } from '../api/next-meeting.js';

export async function getStaticProps() {
  const data = await fetchNextMeeting();

  return {
    props: {
      ...data,
    },
    // ISR: revalida la página cada 60 segundos
    revalidate: 60,
  };
}

const NextMeeting = ({ pageType, backColor, pageDate, pageLink }) => {
  if (!pageType) {
    return <div>No se encontraron datos.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center p-8 m-8 gap-6 mx-4 sm:mx-10 text-white">
      <h2 className="text-2xl font-bold text-center">
        Nuestro próximo encuentro es:
      </h2>
      <div className={`ring ring-4 ring-${backColor} shadow-xl shadow-${backColor}/60 rounded-full md:p-2`}>
        <h1 className="text-5xl p-6 sm:text-7xl font-bold text-center">
          {pageType}
        </h1>
      </div>
      <p className="text-center">{pageDate}</p>
      {pageLink && (
        <button className="mt-4 bg-gray-800 px-4 py-2 rounded">
          {pageLink}
        </button>
      )}
    </div>
  );
};

export default NextMeeting;

