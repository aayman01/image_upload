"use client"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material";

export default function Footer() {
    const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: 
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {"© "}
          {new Date().getFullYear()}{" "}
          <Link color="inherit" href="/">
            Image Gallery
          </Link>
          {" - Built with Next.js, Material UI, and Supabase"}
        </Typography>
      </Container>
    </Box>
  );
}
