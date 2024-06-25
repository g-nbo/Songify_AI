import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import SongCard from '../../../components/SongCard';



export default function MessagesPane(props) {
  const { chat } = props;
  const [chatMessages, setChatMessages] = React.useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = React.useState('');

  const [reccSong, setReccSong] = React.useState([])
  const [songCounter, setSongCounter] = React.useState([0])
  
  
  // When user submits, fetch a get song req from back end
  async function handleSubmit() {
    const newId = chatMessages.length + 1;
    const newIdString = newId.toString();

    try {

      // Send back end our users message so gpt can respond with a song recommendation
      if (textAreaValue) {
        const spotifyRes = await fetch("http://localhost:8000/songify/song", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "message": textAreaValue,
          })
        })

        const spotifyData = await spotifyRes.json();
        const newSong = spotifyData

        setReccSong(newSong)

        // What user sees
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
            sender: '@SongifyAI',
            content: <SongCard key={newId} songId={newSong[1]} songExplanation={newSong[0]} />,
            timestamp: 'Just Now',
          }
        ]);


      } else {
        console.log("Err: no message")
      }



    } catch (err) {
      console.log(err)
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
