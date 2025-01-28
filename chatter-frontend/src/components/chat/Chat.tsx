import { useLocation, useParams } from "react-router";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid2,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useMessageCreated } from "../../hooks/useMessageCreated";

export const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const { data: messages } = useGetMessages({ chatId });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useMessageCreated({ chatId });

  const scrollToBottom = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location.pathname, messages]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {messages &&
          [...messages.messages]
            .sort(
              (messageA, messageB) =>
                new Date(messageA.createdAt).getTime() -
                new Date(messageB.createdAt).getTime()
            )
            .map((message) => (
              <Grid2 container alignItems="center" marginBottom="1rem">
                <Grid2 size={{ xs: 2, lg: 1 }}>
                  <Avatar src="" sx={{ width: 52, height: 52 }} />
                </Grid2>
                <Grid2 size={{ lg: 11, xs: 10 }}>
                  <Stack>
                    <Paper sx={{ width: "fit-content" }}>
                      <Typography sx={{ padding: "0.9rem" }}>
                        {message.content}
                      </Typography>
                    </Paper>
                    <Typography
                      variant="caption"
                      sx={{ marginLeft: "0.25rem" }}
                    >
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </Typography>
                  </Stack>
                </Grid2>
              </Grid2>
            ))}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Message"
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};
