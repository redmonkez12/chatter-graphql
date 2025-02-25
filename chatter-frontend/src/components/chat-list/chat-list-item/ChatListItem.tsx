import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ListItemButton } from "@mui/material";
import { Chat } from "../../../gql/graphql";
import { useNavigate } from "react-router";

interface ChatListProps {
  chat: Chat;
  selected: boolean
}

export const ChatListItem = ({ chat, selected }: ChatListProps) => {
    const navigate = useNavigate();

  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton onClick={() => navigate(`/chats/${chat._id}`)} selected={selected}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/iamages/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
