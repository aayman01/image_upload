"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import { Container } from "@mui/material";
import React,{ useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ImageGrid from "@/components/ImageGrid";


export default function Home() {
  const [images, setImages] = React.useState<string[]>([]);

 const fetchImages = async () => {
   const { data } = await supabase.storage.from("aayman").list("", {
     limit: 100,
     sortBy: { column: "created_at", order: "desc" },
   });
   if (data) {
     const urls = await Promise.all(
       data.map(
         (img) =>
           supabase.storage.from("aayman").getPublicUrl(img.name).data.publicUrl
       )
     );
     setImages(urls);
   }
 };
 console.log(images)
  // Fetch images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // console.log(images);

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <ImageUpload onUpload={fetchImages} />
      <ImageGrid images={images} onDelete={fetchImages} />
      </Container>
      <Footer />
    </>
  );
}
