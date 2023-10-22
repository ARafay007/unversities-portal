"use client";
import {useRouter} from 'next/navigation';
import AddEditUniForm from '@/components/molecules/addEditUniForm';

export default async ({params: {category, id}}: {params: {category: string, id: string}}) => {
  const router = useRouter();
  return <AddEditUniForm isEditMode={true} category={category} id={id} router={router} />
};