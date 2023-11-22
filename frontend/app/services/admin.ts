interface loginFields{
  email: string;
  password: string;
}

export const AdminLogin = async (fields: loginFields) => {
  // const resp = await fetch('/api/admin', {
  const resp = await fetch('https://fine-tan-slug-yoke.cyclic.app/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fields),
  });

  const {data} = await resp.json();
  console.log(data);
  return data;
}