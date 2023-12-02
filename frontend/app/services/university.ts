interface universityPOST{
  id?: string;
  name: string;
  category: string;
  about: string;
  ranking: number;
  province: string;
  adminssionOpen: boolean,
  scholarship: boolean,
  programs: {
    fee: number,
    course: string,
    discipline: string,
  }[],
}

export const getAllUniverisities = async () => {
  // const resp = await fetch('http://localhost:3000/api/allUni');
  const resp = await fetch('https://fine-tan-slug-yoke.cyclic.app/api/university/getAllUniversities');
  const {data} = await resp.json();
  return data;
};

export const getUniverities = async (category: string, id?: string | null, province?: string | null) => {
  // const resp = await fetch(`http://localhost:4321/api/university/getUniversity/${category}?id=${id}&province=${province}`);
  const resp = await fetch(`https://fine-tan-slug-yoke.cyclic.app/api/university/getUniversity/${category}?id=${id}&province=${province}`);
  const {data} = await resp.json();
  return data;
};

export const topUniversities = async () => {
  // const resp = await fetch('http://localhost:4321/api/university/topUniversities', {
  const resp = await fetch('https://fine-tan-slug-yoke.cyclic.app/api/university/topUniversities', {
    // next: {revalidate: 3000},
    cache: 'no-store'
  });
  const {data} = await resp.json();
  
  return data;
}

export const AddUniversity = async (body: universityPOST) => {
  const resp = await fetch('https://fine-tan-slug-yoke.cyclic.app/api/university/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });

  const {data} = await resp.json();
  return false;
};

export const updateUniversity = async (body: universityPOST) => {
  // const resp = await fetch(`/api/uni?id=${body.id}`, {
  const resp = await fetch(`https://fine-tan-slug-yoke.cyclic.app/api/university/update/${body.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });

  const data = await resp.json();
  console.log(data);
};

export const deleteUniversity = async (id: string) => {
  // const resp =  await fetch(`/api/uni?id=${id}`, {
  const resp =  await fetch(`https://fine-tan-slug-yoke.cyclic.app/api/university/delete/${id}`, {
    method: 'DELETE'
  });
  const {data: {data}} = await resp.json();
  return data;
};