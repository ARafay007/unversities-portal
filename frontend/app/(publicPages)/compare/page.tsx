import { UniversityComparision } from './universityComparision';
import { getAllUniverisities } from '@/app/services/university';

export default async () => {
  const {data} = await getAllUniverisities();

  return (
    <div className='center_div'>
      {/* <h1>Compare University</h1>
      <UniversityComparision data={data} /> */}
    </div>
  );
};