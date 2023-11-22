export async function POST(req: Request){
  const resp = await fetch(`https://fine-tan-slug-yoke.cyclic.app/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await req.json())
  });
  const data = await resp.json();
  return Response.json({data});
}