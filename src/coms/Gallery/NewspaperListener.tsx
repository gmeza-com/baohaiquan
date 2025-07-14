"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FlipbookModal from "./FlipbookModal";

interface NewspaperListenerProps {
  catId: number;
}

const NewspaperListener = ({ catId }: NewspaperListenerProps) => {
  const searchParams = useSearchParams();
  const [showFlipbook, setShowFlipbook] = useState(false);
  const [newspaperSlug, setNewspaperSlug] = useState<string | null>(null);

  useEffect(() => {
    const newspaper = searchParams.get("newspaper");
    
    if (newspaper) {
      setNewspaperSlug(newspaper);
      setShowFlipbook(true);
    }
  }, [searchParams]);

  const handleCloseFlipbook = () => {
    setShowFlipbook(false);
    setNewspaperSlug(null);
    
    // Remove the newspaper parameter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete("newspaper");
    window.history.replaceState({}, "", url.toString());
  };

  if (!newspaperSlug) return null;

  return (
    <FlipbookModal
      isOpen={showFlipbook}
      onClose={handleCloseFlipbook}
      slug={newspaperSlug}
      catId={catId}
    />
  );
};

export default NewspaperListener;
