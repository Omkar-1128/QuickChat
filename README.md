# 💬 Real-Time Chat Application

A modern, feature-rich real-time chat application built with WebSocket technology. This application enables multiple users to communicate instantly with support for text messages and file sharing.

![Chat Application](https://img.shields.io/badge/WebSocket-Real--Time-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-v5.1.0-lightgrey)

## ✨ Features

### 🔥 Core Features
- **Real-time messaging** - Instant message delivery using WebSocket
- **File sharing** - Share files up to 5MB with all connected users
- **User notifications** - See when users join or leave the chat
- **Username system** - Personalized chat experience with custom usernames
- **Message timestamps** - Track when messages were sent

### 🎨 Design Features
- **Modern UI** - Beautiful gradient design with smooth animations
- **Fully responsive** - Perfect experience on desktop, tablet, and mobile
- **System notifications** - Distinct styling for join/leave messages
- **File type icons** - Visual indicators for different file types
- **Upload feedback** - Real-time upload status and success confirmation

### 📱 Mobile Optimized
- Touch-friendly interface
- Adaptive layout for all screen sizes
- Optimized button sizes for mobile devices
- Smooth scrolling and animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to `http://localhost:8080`
   - Enter a username to join the chat

3. **Test with multiple users**
   - Open multiple browser tabs or windows
   - Use different usernames to simulate multiple users

## 📁 Project Structure

```
.
├── backend/
│   ├── public/
│   │   ├── index.html      # Username entry page
│   │   ├── chat.html       # Main chat interface
│   │   ├── app.js          # Client-side JavaScript
│   │   └── style.css       # Styling and responsive design
│   ├── index.js            # Server and WebSocket setup
│   ├── package.json        # Project dependencies
│   └── package-lock.json
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **ws** - WebSocket library for real-time communication
- **Nodemon** - Development auto-reload

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No framework dependencies
- **WebSocket API** - Real-time bidirectional communication

## 💡 How It Works

### WebSocket Communication
1. Client connects to WebSocket server on port 8080
2. Username is registered on first message
3. All messages are broadcast to connected clients
4. Server tracks users and notifies on join/leave events

### File Sharing
1. User selects a file (max 5MB)
2. File is converted to base64 data URL
3. File metadata and data sent via WebSocket
4. All users receive file with download option
5. Sender sees confirmation without download button

## 🎯 Usage

### Sending Messages
1. Type your message in the input field
2. Press Enter or click the Send button
3. Message appears instantly for all users

### Sharing Files
1. Click the 📎 attachment button
2. Select a file from your device (max 5MB)
3. File uploads with progress indicator
4. All users receive the file with download option

### Leaving the Chat
- Click the "Exit" button to disconnect
- Other users are notified of your departure

## 🔧 Configuration

### Change WebSocket URL
Edit `backend/public/app.js`:
```javascript
// For local development
const socket = new WebSocket("ws://localhost:8080");

// For production/tunneling
const socket = new WebSocket("wss://your-domain.com");
```

### Change Port
Edit `backend/index.js`:
```javascript
const port = 8080; // Change to your preferred port
```

### Adjust File Size Limit
Edit `backend/public/app.js`:
```javascript
if (file.size > 5 * 1024 * 1024) { // Change 5 to your preferred MB limit
    alert('File size must be less than 5MB');
    return;
}
```

## 🎨 Customization

### Color Scheme
The application uses a purple gradient theme. To customize colors, edit `backend/public/style.css`:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Accent colors */
--primary: #667eea;
--success: #10b981;
--warning: #f59e0b;
--danger: #ef4444;
```

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Considerations

- File size limited to 5MB to prevent abuse
- Username stored in localStorage (client-side only)
- No authentication system (suitable for private networks)
- Consider adding authentication for production use
- Use WSS (WebSocket Secure) in production

## 🚧 Future Enhancements

- [ ] User authentication and authorization
- [ ] Private messaging between users
- [ ] Message history persistence
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Emoji picker
- [ ] Message reactions
- [ ] User avatars
- [ ] Chat rooms/channels
- [ ] Message search functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Omkar Shelke**

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by popular chat applications
- Icons and emojis from Unicode standard

---

**Note**: This application is designed for educational purposes and local network use. For production deployment, consider implementing proper authentication, data persistence, and security measures.
