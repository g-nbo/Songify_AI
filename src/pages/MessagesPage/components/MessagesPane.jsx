import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  async function handleSubmit() {
    if (!textAreaValue.trim()) return;

    setError('');
    setIsLoading(true);

    const newId = String(Date.now());

    const userMessage = {
      id: newId,
      sender: 'You',
      content: textAreaValue,
      timestamp: 'Just now',
    };

    setChatMessages(prev => [...prev, userMessage]);
    setTextAreaValue('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/songify/song`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({ message: textAreaValue }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.message || 'Could not get a recommendation. Please try again.');
        return;
      }

      const [songExplanation, songId] = await res.json();

      setChatMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: chat.sender,
          content: <SongCard songId={songId} songExplanation={songExplanation} />,
          timestamp: 'Just now',
        },
      ]);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
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
      {error && (
        <Alert color="danger" variant="soft" sx={{ mx: 2, mt: 1 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
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
                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </Sheet>
  );
}
