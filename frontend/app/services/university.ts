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

export const getUniverities = async (category: string, id?: string | null, province?: string | null) => {
  const resp = await fetch(`http://localhost:3000/api/uni?category=${category}&id=${id}&province=${province}`);
  const {data} = await resp.json();
  return data;
};

export const topUniversities = async () => {
  const resp = await fetch('http://localhost:3000/api/topUni', {
    // next: {revalidate: 3000},
    cache: 'no-store'
  });

  const {data} = await resp.json();
  return data;
}

export const AddUniversity = async (body: universityPOST) => {
  const resp = await fetch('/api/uni', {
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
  const resp = await fetch(`/api/uni?id=${body.id}`, {
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
  const resp =  await fetch(`/api/uni?id=${id}`, {
    method: 'DELETE'
  });
  const {data: {data}} = await resp.json();
  return data;
};