export async function GET(req: Request){
  const resp = await  fetch(`https://fine-tan-slug-yoke.cyclic.app/api/university/getAllUniversities`);
  const data = await resp.json();
  return Response.json({data});
}