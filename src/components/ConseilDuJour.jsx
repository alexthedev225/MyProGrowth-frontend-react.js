import { useState, useEffect } from 'react';
import conseils from '../data/conseils';

const ConseilDuJour = () => {
  const [conseilDuJour, setConseilDuJour] = useState('');

  useEffect(() => {
    const getConseilDuJour = () => {
      const today = new Date();
      const dayOfYear = today.getFullYear() * 1000 + today.getDay();
      const index = dayOfYear % conseils.length;
      setConseilDuJour(conseils[index].conseil);
    };

    getConseilDuJour();
    const timer = setInterval(getConseilDuJour, 1000 * 60 * 60 * 24);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="font-bold text-xl mb-4 text-pink-500">Conseil du Jour</h2>
      <p className="text-lg">{conseilDuJour}</p>
    </div>
  );
};

export default ConseilDuJour;
