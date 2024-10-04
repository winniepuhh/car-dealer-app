import { useState, useEffect } from 'react';
import Link from 'next/link';

const Home = () => {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const fetchMakes = async () => {
      const response = await fetch(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
      );
      const data = await response.json();
      setMakes(data.Results);
    };

    fetchMakes();
  }, []);

  useEffect(() => {
    if (selectedMake && selectedYear) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [selectedMake, selectedYear]);

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = 2015; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Select Vehicle Make and Year</h1>

      <div className="mb-4">
        <select
          className="border border-gray-300 p-2"
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
        >
          <option value="">Select Vehicle Make</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          className="border border-gray-300 p-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Model Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Link href={`/result/${selectedMake}/${selectedYear}`}>
        <button
          className={`px-4 py-2 font-bold text-white bg-blue-500 rounded ${
            isButtonEnabled ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isButtonEnabled}
        >
          Next
        </button>
      </Link>
    </div>
  );
};

export default Home;
