import { Grid, IconButton, Box, Modal, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Image from "next/image";
import Swal from "sweetalert2";

export default function ImageGrid({
  images,
  onDelete,
}: {
  images: string[];
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async (path: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        supabase.storage
          .from("aayman")
          .remove([path])
          .then(({ error }) => {
            if (error) console.error("Delete error:", error);
            else onDelete(); // Refresh the images after deletion
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const getPath = (url: string) =>
    decodeURIComponent(new URL(url).pathname.split("/").slice(-1)[0]);

  return (
    <Box>
      <Grid container spacing={2} mt={2}>
        {images.map((url, idx) => (
          <Grid
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={idx}
            sx={{ position: "relative" }}
          >
            <Image
              src={url}
              alt="gallery"
              width={300}
              height={300}
              style={{ width: "100%", cursor: "pointer" }}
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

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="image-preview-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            padding: 2,
            maxWidth: "90vw",
            maxHeight: "90vh",
            outline: "none",
          }}
        >
          {currentImage && (
            <>
              {isLoading && (
                <CircularProgress
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                  }}
                />
              )}
              <Image
                width={700}
                height={800}
                src={currentImage}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  opacity: isLoading ? 0.5 : 1,
                }}
                onLoadingComplete={() => setIsLoading(false)}
                onLoad={() => setIsLoading(false)}
                loading="eager"
              />
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
