import AddEditUniForm from '@/components/molecules/addEditUniForm';

export default async ({params: {category, id}}: {params: {category: string, id: string}}) => {
  return <AddEditUniForm isEditMode={true} category={category} id={id} />
};