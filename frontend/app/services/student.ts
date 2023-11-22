export const registerStudent = async (email: string) => {
  // const resp = await fetch('/api/student', {
  const resp = await fetch('https://fine-tan-slug-yoke.cyclic.app/api/student/registerStudent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  });

  return false;
}