const date = new Date()

export const users = [
  {
    name: 'GPT',
    username: '@OpenAI',
    avatar: '/static/images/avatar/2.jpg',
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
