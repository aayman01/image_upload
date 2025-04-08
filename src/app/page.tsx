"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import { Container } from "@mui/material";

export default function Home() {
  const fetchImages = async () => {
    console.log("Fetching images...");
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <ImageUpload onUpload={fetchImages} />
      </Container>
      <Footer />
    </>
  );
}
