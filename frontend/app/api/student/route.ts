export async function POST(req: Request){
  const resp = await fetch(`${process.env.URL}/api/student/registerStudent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await req.json())
  });

  const data = await resp.json();
  return Response.json({data});
};