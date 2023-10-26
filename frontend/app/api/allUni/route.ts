export async function GET(req: Request){
  const resp = await  fetch('http://localhost:4321/api/university/getAllUniversities');
  const data = await resp.json();
  return Response.json({data});
}