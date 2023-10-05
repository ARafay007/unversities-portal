import { getPosts, getPost } from '../../../../services/mockAPI';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({id: post.id.toString()}));
};

export default async ({params}) => {
  const {id} = params;
  const post = await getPost(id);
  return <div>{id}</div>
};