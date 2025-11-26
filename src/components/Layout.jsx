// components/Layout.jsx
import React, { useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import {
    Box, Drawer, AppBar as MuiAppBar, Toolbar,
    IconButton, Typography, Divider, List,
    ListItem, ListItemButton, ListItemIcon, ListItemText,
    InputBase, Avatar
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidth = 240;

// --- SEARCH STYLES ---
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginLeft: theme.spacing(2),
    width: "auto",
    flexGrow: 1,
    maxWidth: 400,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
    },
}));

// --- MAIN CONTENT ---
const Main = styled("main")(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '64px', // Add margin top to account for AppBar height
    minHeight: 'calc(100vh - 64px)',
}));

// --- APPBAR ---
const AppBar = styled(MuiAppBar)(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

// --- USER PROFILE SECTION ---
const UserProfileSection = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(2),
    backgroundColor: "#1a1a1a",
    color: "#fff",
    width: "100%",
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function Layout({ children }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ display: "flex" }}>
            {/* ---------- NAVBAR ---------- */}
            <AppBar position="fixed" sx={{ backgroundColor: "#000" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={() => setOpen(true)}
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap sx={{ mr: 2 }}>
                        Dashboard
                    </Typography>

                    {/* ---- SEARCH BAR ---- */}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                            onChange={(e) => console.log("Search:", e.target.value)}
                        />
                    </Search>
                </Toolbar>
            </AppBar>

            {/* ---------- SIDEBAR - Overlay Version ---------- */}
            <Drawer
                variant="temporary"
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {/* User Profile Section - Fixed at top */}
                <UserProfileSection>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", mb: 1 }}>
                        <Avatar
                            alt="User Name"
                            src="/path/to/your/avatar.png"
                            sx={{ 
                                width: 40, 
                                height: 40, 
                                mr: 2,
                                backgroundColor: theme.palette.primary.main
                            }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" sx={{ color: "grey.400" }}>
                                Hello,
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                Sign in
                            </Typography>
                        </Box>
                    </Box>
                </UserProfileSection>

                <Box sx={{ display: "flex", alignItems: "center", padding: theme.spacing(0, 1), ...theme.mixins.toolbar, justifyContent: "space-between", px: 2 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Menu
                    </Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </Box>

                <Divider />

                {/* Navigation Items */}
                <List sx={{ flexGrow: 1 }}>
                    {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Divider />
            </Drawer>

            {/* ---------- MAIN CONTENT ---------- */}
            <Main>
                {children}
            </Main>
        </Box>
    );
}