"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export default function SearchBox({
  onSearch,
  initialQuery = "",
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);

  const timerIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerIdRef.current !== null) {
      clearTimeout(timerIdRef.current);
    }

    timerIdRef.current = window.setTimeout(() => {
      onSearch(query);
    }, 600);

    return () => {
      if (timerIdRef.current !== null) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, [query, onSearch]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className={styles.input}
      placeholder="Search notes..."
    />
  );
}
