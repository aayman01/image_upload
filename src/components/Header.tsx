import { AppBar, Toolbar, Typography } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import Box from "@mui/material/Box";

export default function Header() {
    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <CollectionsIcon sx={{ mr: 1 }} />
          <Typography
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Image Gallery
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
