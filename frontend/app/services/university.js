export const AddUniversity = async (body) => {
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