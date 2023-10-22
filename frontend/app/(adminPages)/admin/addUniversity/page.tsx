"use client";
import { useRouter } from "next/navigation";
import AddEditUniForm from "@/components/molecules/addEditUniForm"

export default () => {
  const router = useRouter();
  return <AddEditUniForm isEditMode={false} router={router} />
};