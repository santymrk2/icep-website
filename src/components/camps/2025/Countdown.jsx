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
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Faltan</h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-6">
              <div id="days" className="text-6xl font-bold text-green-900">{timeLeft.days}</div>
            </div>
            <p className="mt-2 text-lg text-gray-400">días</p>
          </div>

          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-6">
              <div id="hours" className="text-6xl font-bold text-green-900">{timeLeft.hours}</div>
            </div>
            <p className="mt-2 text-lg text-gray-400">horas</p>
          </div>

          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-6">
              <div id="seconds" className="text-6xl font-bold text-green-900">{timeLeft.minutes}</div>
            </div>
            <p className="mt-2 text-lg text-gray-400">minutos</p>
          </div>

        <div className="text-center">
          <div className="bg-gray-100 rounded-lg p-6">
            <div id="seconds" className="text-6xl font-bold text-green-900">{timeLeft.seconds}</div>
          </div>
          <p className="mt-2 text-lg text-gray-400">segundos</p>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center mt-8 text-white">para el campamento</h2>
      </div>
    </section >
  )
}

export default Countdown;