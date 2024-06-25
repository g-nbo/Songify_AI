import * as React from 'react';
import Sheet from '@mui/joy/Sheet';

import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';

import { chats } from '../data';

export default function MyProfile() {
  const [selectedChat, setSelectedChat] = React.useState(chats[0]);
  return (
    <Sheet
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, min(100dw, 100%)) 1fr',
        },
      }}
    >
    
      <MessagesPane chat={selectedChat} />
    </Sheet>
  );
}
