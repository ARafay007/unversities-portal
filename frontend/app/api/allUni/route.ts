export async function GET(req: Request){
  const resp = await  fetch(`${process.env.URL}/api/university/getAllUniversities`);
  const data = await resp.json();
  return Response.json({data});
}