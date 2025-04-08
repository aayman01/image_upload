"use client";
import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { supabase } from "../lib/supabaseClient";


const ImageUpload = ({ onUpload }: { onUpload: () => void }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    setError(null);
    setSuccess(false);
    const files = e.target.files;
    if (!files) return setError("No files selected.");

    try {
      setIsUploading(true);
      for (const file of Array.from(files)) {
        const { data, error } = await supabase.storage
          .from("aayman")
          .upload(file.name, file);
        if (error) console.error("Upload error:", error);
        console.log(data);
      }
      
      onUpload(); 
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsUploading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000); // Hide success message after 3 seconds
    }
  };

  return (
    <Box sx={{ mb: 4, textAlign: "center" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Images uploaded successfully!
        </Alert>
      )}

      <Button
        component="label"
        variant="contained"
        startIcon={
          isUploading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <CloudUploadIcon />
          )
        }
        disabled={isUploading}
        sx={{
          py: 1.5,
          px: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        {isUploading ? "Uploading..." : "Upload Images"}
        <input
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />
      </Button>
      <Typography
        variant="caption"
        display="block"
        sx={{ mt: 1, color: "text.secondary" }}
      >
        Supported formats: JPG, PNG, GIF, WebP
      </Typography>
    </Box>
  );
};

export default ImageUpload;
