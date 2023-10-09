export async function GET(req: Request){
  const {searchParams} = new URL(req.url);
  const category = searchParams.get('category');
  const id = searchParams.get('id');
  const resp = await fetch(`http://localhost:4321/api/university/getUniversity/${category}?id=${id}`);
  const data = await resp.json();
  return Response.json({data});
}

export async function POST(req: Request){
  const resp = await fetch('http://localhost:4321/api/university/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await req.json()),
  });
  const data = await resp.json();
  return Response.json({data});
}

export async function PUT(req: Request){
  const {searchParams} = new URL(req.url);
  const id = searchParams.get('id');
  const resp = await fetch(`http://localhost:4321/api/university/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await req.json()),
  });
  const data = await resp.json();
  return Response.json({data});
}

export async function DELETE(req: Request){
  const {searchParams} = new URL(req.url);
  const id = searchParams.get('id');
  const resp = await fetch(`http://localhost:4321/api/university/delete/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await resp.json();
  return Response.json({data});
}