import { useState, useEffect } from "react";

function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = new Date(targetDate) - now;

    if (difference <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 my-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-white uppercase">Faltan</h2>

        <div className="flex flex-row md:flex-row justify-center items-center gap-4 md:gap-8">
          <div className="text-center">
            <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg sm:p-6 size-18 sm:size-28">
              <div id="days" className="text-4xl sm:text-6xl font-bold text-green-800 font-big-camp">{timeLeft.days}</div>
            </div>
            <p className="mt-2 text-sm sm:text-lg text-gray-300">días</p>
          </div>

          <div className="text-center">
            <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg sm:p-6 size-18 sm:size-28">
              <div id="hours" className="text-4xl sm:text-6xl font-bold text-green-800 font-big-camp">{timeLeft.hours}</div>
            </div>
            <p className="mt-2 text-sm sm:text-lg text-gray-300">horas</p>
          </div>

          <div className="text-center">
            <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg sm:p-6 size-18 sm:size-28">
              <div id="seconds" className="text-4xl sm:text-6xl font-bold text-green-800 font-big-camp">{timeLeft.minutes}</div>
            </div>
            <p className="mt-2 text-sm sm:text-lg text-gray-300">minutos</p>
          </div>

        <div className="text-center">
          <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg sm:p-6 size-18 sm:size-28">
            <div id="seconds" className="text-4xl sm:text-6xl font-bold text-green-800 font-big-camp">{timeLeft.seconds}</div>
          </div>
          <p className="mt-2 text-sm sm:text-lg text-gray-300">segundos</p>
        </div>
      </div>
      </div>
    </section >
  )
}

export default Countdown;