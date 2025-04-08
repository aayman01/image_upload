import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import { Container } from "@mui/material";


export default function Home() {
  return (
    <>
      <Header/>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <ImageUpload />
      </Container>
      <Footer/>
    </>
  );
}
