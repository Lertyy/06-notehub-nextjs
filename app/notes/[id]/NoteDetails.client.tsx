"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import styles from "@/app/notes/[id]/NoteDetails.client.module.css";

export default function NoteDetailsClient({ id: initialId }: { id?: string }) {
  const params = useParams();
  const noteId = initialId || (params.id as string);

  const {
    data: note,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    refetchOnMount: false, // Додано відсутню опцію
  });

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p>Loading, please wait...</p>
      </div>
    );
  }

  if (isError || !note) {
    return (
      <div className={styles.container}>
        <p>Something went wrong.</p>
        {error && <p>Error: {error.message}</p>}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>
          {note.createdAt && new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
