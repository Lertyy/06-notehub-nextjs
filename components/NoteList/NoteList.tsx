import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Note } from "@/types/note";
import styles from "@/components/NoteList/NoteList.module.css";
import { deleteNote } from "@/lib/api";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Помилка при видаленні нотатки:", error);
    },
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Ви впевнені, що хочете видалити цю нотатку?")) {
      deleteNoteMutation.mutate(id);
    }
  };

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <div className={styles.cardContent}>
            <h2 className={styles.title}>{note.title}</h2>
            <p className={styles.content}>{note.content}</p>
          </div>

          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <div className={styles.actions}>
              {/* Додано посилання View details перед кнопкою Delete */}
              <Link href={`/notes/${note.id}`} className={styles.link}>
                View details
              </Link>
              <button
                className={styles.button}
                onClick={(e) => handleDelete(note.id, e)}
                disabled={deleteNoteMutation.isPending}
              >
                {deleteNoteMutation.isPending ? "Видалення..." : "Delete"}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
