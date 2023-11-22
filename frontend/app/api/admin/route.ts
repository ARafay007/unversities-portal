export async function POST(req: Request){
  
  const resp = await fetch('http://localhost:4321/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await req.json())
  });
  const data = await resp.json();
  return Response.json({data});
}