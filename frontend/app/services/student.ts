export const registerStudent = async (email: string) => {
  const resp = await fetch('/api/student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  });

  return false;
}