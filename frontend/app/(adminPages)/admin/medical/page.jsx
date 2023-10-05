import Link from 'next/link';
import {getPosts} from '../../../services/mockAPI';

export default async () => {
  const data = await getPosts();
  console.log(data);
  return (
    <div style={{height: "100%"}}>
      {data.map(el => (
        <div>
          <Link href={`/admin/medical/${el.id}`}>{el.id}</Link> <br />
          {el.title} <br />
          {el.body}
        </div>
      ))}
    </div>
  );
}