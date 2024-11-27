import React, { useState } from 'react';

const contacts = [
  { id: 1, name: 'Hossein Shams', status: 'Online', avatar:'https://pbs.twimg.com/media/FiTxdZlVEAIDSao.jpg' },
  { id: 2, name: 'Maryam Amiri', status: 'Away', avatar: 'https://pbs.twimg.com/media/FiTxdZlVEAIDSao.jpg' },
  { id: 3, name: 'Sarah Conner', status: 'Busy', avatar: 'https://pbs.twimg.com/media/FiTxdZlVEAIDSao.jpg' },
  { id: 4, name: 'Frank Camly', status: 'Busy', avatar: 'https://pbs.twimg.com/media/FiTxdZlVEAIDSao.jpg' },
  { id: 5, name: 'Ted Erricson', status: 'Online', avatar: 'https://pbs.twimg.com/media/FiTxdZlVEAIDSao.jpg' },
  { id: 6, name: 'Ranian Mostalik', status: 'Online', avatar: 'https://pbs.twimg.com/media/FiTxdZlVEAIDSao.jpg' },
  { id: 7, name: 'John Franklin', status: 'Online', avatar: 'https://pbs.twimg.com/media/FiTxdZlVEAIDSao.jpg' },
  { id: 8, name: 'Emma Larson', status: 'Online', avatar: 'https://pbs.twimg.com/media/FiTxdZlVEAIDSao.jpg' },
];

const ChatApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'James Anderson',
      avatar: 'https://media.tenor.com/wjQhbIovE7wAAAAM/anime-sky.gif',
      timestamp: 'April 14, 2017',
      time: '23:58',
      messages: ['Hi', 'How are you ...???', 'What are you doing tomorrow?\nWould you like to get out of the town for a while?']
    },
    {
      id: 2,
      sender: 'You',
      timestamp: '',
      time: '00:06',
      messages: ['Hiii, I\'m good.', 'How are you doing?', 'Long time no see!']
    },
  ]);

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Online': return 'text-green-500';
      case 'Away': return 'text-yellow-500';
      case 'Busy': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const sendMessage = () => {
    if (currentMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      timestamp: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: [currentMessage]
    };

    setMessages([...messages, newMessage]);
    setCurrentMessage('');

    // Simulated response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: 'James Anderson',
        avatar: 'https://media.tenor.com/wjQhbIovE7wAAAAM/anime-sky.gif',
        timestamp: '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messages: ['Got your message! 👍']
      };
      setMessages(prevMessages => [...prevMessages, response]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        {/* Contacts Sidebar */}
        <div className="w-1/4 pr-4">
          <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b">
              <input 
                type="text" 
                placeholder="Search Contact" 
                className="w-full p-2 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="divide-y">
              {filteredContacts.map(contact => (
                <div key={contact.id} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h6 className="font-semibold">{contact.name}</h6>
                    <small className={`${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="w-3/4">
          <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b">
              <h4 className="text-xl font-bold">Chat Message</h4>
            </div>
            
            {/* Chat Messages */}
            <div className="h-[600px] overflow-y-auto p-4" id="chat-messages">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex mb-6 ${msg.sender === 'You' ? 'justify-end' : ''}`}
                >
                  {msg.sender !== 'You' && (
                    <img 
                      src={msg.avatar} 
                      alt={msg.sender} 
                      className="w-10 h-10 rounded-full mr-4"
                    />
                  )}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{msg.sender}</span>
                      {msg.timestamp && <span className="text-gray-500 text-sm">{msg.timestamp}</span>}
                    </div>
                    <div className={`p-3 rounded-lg ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                      {msg.messages.map((text, textIndex) => (
                        <p key={textIndex} className="mb-2 last:mb-0">{text}</p>
                      ))}
                      <small className="text-xs opacity-70 block text-right">{msg.time}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center">
                <input 
                  type="text" 
                  placeholder="Type Message ..." 
                  className="flex-grow p-2 border rounded-l-lg"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div className="flex space-x-2 p-2 border-y border-r rounded-r-lg">
                  <button className="text-gray-500 hover:text-gray-700">
                    📎
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    😊
                  </button>
                  <button 
                    className="text-blue-500 hover:text-blue-700"
                    onClick={sendMessage}
                  >
                    ✈️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;