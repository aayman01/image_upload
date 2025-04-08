"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import { Container, Pagination, Box } from "@mui/material";
import React, { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ImageGrid from "@/components/ImageGrid";

export default function Home() {
  const [images, setImages] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const itemsPerPage = 6;

  const fetchImages = async (pageNumber: number) => {
    const { data, error } = await supabase.storage
      .from("aayman")
      .list("", {
        limit: itemsPerPage,
        offset: (pageNumber - 1) * itemsPerPage,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      console.error("Error fetching images:", error.message);
      return;
    }

    if (data) {
      const urls = await Promise.all(
        data.map(
          (img) =>
            supabase.storage.from("aayman").getPublicUrl(img.name).data.publicUrl
        )
      );
      setImages(urls);

      const { data: allFiles, error: countError } = await supabase.storage
        .from("aayman")
        .list("");

      if (countError) {
        console.error("Error fetching total count:", countError.message);
        return;
      }

      setTotalPages(Math.ceil((allFiles?.length || 0) / itemsPerPage));
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <ImageUpload onUpload={() => fetchImages(page)} />
        <ImageGrid images={images} onDelete={() => fetchImages(page)} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
