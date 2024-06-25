const date = new Date()

export const users = [
  {
    name: 'Songify',
    username: '@SongifyAI',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png',
    online: true,
  }
];

export const chats = [
  {
    id: '1',
    sender: users[0],
    messages: [
      {
        id: '1',
        content: 'Simply type your mood, activity, or musical preference into the chat box, and receive tailored music recommendations instantly, complete with a Spotify preview.',
        timestamp: date.toLocaleString(),
        sender: users[0],
      },
    ],
  },
];
