interface loginFields{
  email: string;
  password: string;
}

export const AdminLogin = async (fields: loginFields) => {
  const resp = await fetch('/api/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fields),
  });

  const {data} = await resp.json();
  return data;
}