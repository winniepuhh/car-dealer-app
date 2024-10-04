import { useRouter } from 'next/router';
import { useEffect, useState, Suspense } from 'react';
import { Loading } from '../../../components/loading'


const Result = () => {
  const router = useRouter();
  const { makeId, year } = router.query;
  const [models, setModels] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (makeId && year) {
      const fetchModels = async () => {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        const data = await response.json();
        setModels(data.Results);
        setLoading(false);
      };

      fetchModels();
    }
  }, [makeId, year]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold mb-4">Vehicle Models for {year}</h1>

        {models.length === 0 ? (
          <p>No models found for this selection.</p>
        ) : (
          <ul className="space-y-2">
            {models.map((model) => (
              <li key={model.Model_ID} className="border p-2">
                {model.Model_Name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Suspense>
  );
};

export default Result;
