import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import SongCard from '../../../components/SongCard';
import { useUser } from '../../../context/UserContext';



export default function MessagesPane(props) {
  const { chat } = props;
  const { accessToken } = useUser();
  const [chatMessages, setChatMessages] = React.useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [reccSong, setReccSong] = React.useState([])
  
  
  async function handleSubmit() {
    const newId = chatMessages.length + 1;
    const newIdString = newId.toString();

    try {
      if (textAreaValue) {
        const spotifyRes = await fetch(`${import.meta.env.VITE_API_URL}/songify/song`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          credentials: 'include',
          body: JSON.stringify({
            "message": textAreaValue,
          })
        })

        const spotifyData = await spotifyRes.json();
        const newSong = spotifyData

        setReccSong(newSong)

        setChatMessages([
          ...chatMessages,
          {
            id: newIdString,
            sender: 'You',
            content: textAreaValue,
            timestamp: 'Just now',
          },
          {
            id: newIdString + 1,
            sender: chat.sender,
            content: <SongCard key={newId} songId={newSong[1]} songExplanation={newSong[0]} />,
            timestamp: 'Just Now',
          }
        ]);

      }

    } catch (err) {
      // error handling to be wired to UI in a later pass
    }

  }

  React.useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

  return (
    <Sheet
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh' },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level1',
      }}
    >
      <MessagesPaneHeader sender={chat.sender} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chatMessages.map((message, index) => {
            const isYou = message.sender === 'You';
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {message.sender !== 'You' && (
                  <AvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <ChatBubble songId={reccSong[1]} variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          handleSubmit()
        }}
      />
    </Sheet>
  );
}
