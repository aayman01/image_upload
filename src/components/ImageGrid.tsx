import { Grid, IconButton, Dialog, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Image from "next/image";

export default function ImageGrid({
  images,
  onDelete,
}: {
  images: string[];
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleDelete = async (path: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    await supabase.storage.from("aayman").remove([path]);
    onDelete();
  };

  const getPath = (url: string) =>
    decodeURIComponent(new URL(url).pathname.split("/").slice(-1)[0]);

  return (
    <Box>
      <Grid container spacing={2} mt={2}>
        {images.map((url, idx) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={idx} sx={{ position: "relative" }}>
            <Image
              src={url}
              alt="gallery"
              width={300}
              height={300}
              style={{width: "100%",  cursor: "pointer" }}
              onClick={() => {
                setCurrentImage(url);
                setOpen(true);
              }}
            />
            <IconButton
              onClick={() => handleDelete(getPath(url))}
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                background: "#fff",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        {currentImage && (
          <Image width={800} height={800} src={currentImage} alt="Preview" style={{ width: "100%" }} />
        )}
      </Dialog>
    </Box>
  );
}
