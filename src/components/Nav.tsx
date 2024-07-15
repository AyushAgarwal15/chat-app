import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import GroupIcon from "@mui/icons-material/GroupOutlined";
import ContactsIcon from "@mui/icons-material/ContactsOutlined";
import CallIcon from "@mui/icons-material/CallOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import BookmarkIcon from "@mui/icons-material/BookmarkOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAddOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { useTheme } from "./ThemeContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Nav() {
  const [open, setOpen] = React.useState(false);
  const { theme } = useTheme();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      className={`font-semibold h-full ${
        theme === "light"
          ? "bg-white text-black"
          : "bg-dark-background text-white"
      }`}
    >
      <List>
        {["My Profile"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon className={`text-gray-500`} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          {
            text: "New Group",
            icon: <GroupIcon className={`text-gray-500`} />,
          },
          {
            text: "Contacts",
            icon: <ContactsIcon className={`text-gray-500`} />,
          },
          {
            text: "Calls",
            icon: <CallIcon className={`text-gray-500`} />,
          },
          {
            text: "People Nearby",
            icon: <LocationOnIcon className={`text-gray-500`} />,
          },
          {
            text: "Saved Messages",
            icon: <BookmarkIcon className={`text-gray-500`} />,
          },
          {
            text: "Settings",
            icon: <SettingsIcon className={`text-gray-500`} />,
          },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          {
            text: "Invite Friends",
            icon: <PersonAddIcon className={`text-gray-500`} />,
          },
          {
            text: "Telegram Features",
            icon: <InfoIcon className={`text-gray-500`} />,
          },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon className={`text-white`} />
      </Button>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div
          className={`flex flex-col gap-2 px-6 pt-4 pb-2 ${
            theme === "light" ? "bg-light-background" : "bg-dark-secondary"
          } bg-${theme}-background`}
        >
          <div className={`flex items-start justify-between`}>
            <div
              className={`rounded-full max-w-20 p-4 bg-blue-500 border-${theme}-secondary font-bold text-2xl`}
            >
              <span className={`text-white`}>AA</span>
            </div>
            <ThemeToggleButton />
          </div>
          <div className={`flex items-center justify-between`}>
            <div>
              <h3 className="text-white font-semibold">Ayush Agarwal</h3>
              <h4 className="text-gray-300">+91 8126749140</h4>
            </div>
            <KeyboardArrowDownIcon className={`text-white`} />
          </div>
        </div>
        {DrawerList}
      </Drawer>
    </div>
  );
}
