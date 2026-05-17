import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
// import { NotesResponse } from "@/lib/api";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

interface NotesPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1");
  const searchQuery = resolvedSearchParams.search || "";

  // Створюємо QueryClient для серверного префетчінгу
  const queryClient = new QueryClient();

  // Префетчимо дані на сервері
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, searchQuery],
    queryFn: () => fetchNotes(page, 12, searchQuery),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={page} initialSearchQuery={searchQuery} />
    </HydrationBoundary>
  );
}
