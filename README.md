# 💬 QuickChat - Real-Time Chat Application

A modern real-time chat application with WebSocket technology, enabling instant messaging and file sharing between multiple users.

🌐 **Live Demo**: [https://quickchat-wx53.onrender.com](https://quickchat-wx53.onrender.com)

## ✨ Features

- ⚡ Real-time messaging with WebSocket
- 📎 File sharing (up to 5MB)
- 👥 User join/leave notifications
- 🎨 Modern gradient UI with animations
- 📱 Fully responsive (mobile, tablet, desktop)
- ⏰ Message timestamps
- 🖼️ File type icons and previews

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Navigate to backend and install dependencies
cd backend
npm install

# Start the server
npm run dev
```

Open `http://localhost:8080` in your browser and start chatting!

## 📁 Project Structure

```
backend/
├── public/
│   ├── index.html    # Username entry
│   ├── chat.html     # Chat interface
│   ├── app.js        # Client logic
│   └── style.css     # Styling
├── index.js          # Server & WebSocket
└── package.json
```

## 🛠️ Tech Stack

**Backend**: Node.js, Express.js, ws (WebSocket)  
**Frontend**: HTML5, CSS3, Vanilla JavaScript  
**Deployment**: Render

## 🎯 Usage

1. **Join Chat**: Enter a username on the home page
2. **Send Messages**: Type and press Enter or click Send
3. **Share Files**: Click 📎 button, select file (max 5MB)
4. **Exit**: Click Exit button to leave

## 🔧 Configuration

### Change Port
Edit `backend/index.js`:
```javascript
const port = 8080; // Your preferred port
```

### File Size Limit
Edit `backend/public/app.js`:
```javascript
if (file.size > 5 * 1024 * 1024) { // Change 5 to your limit in MB
```

## 🌐 Deployment

The app automatically detects the environment and uses the correct WebSocket protocol (ws:// for local, wss:// for production).

**Deployed on Render**: [https://quickchat-wx53.onrender.com](https://quickchat-wx53.onrender.com)

### Deploy to Render

1. Push your code to GitHub
2. Connect your repo to Render
3. Use these settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: Leave empty (uses root package.json)
4. Deploy!

## 📱 Browser Support

Chrome, Firefox, Safari, Edge, Opera, and mobile browsers

## 🔒 Security Notes

- No authentication (suitable for private networks)
- Files limited to 5MB
- Use HTTPS/WSS in production
- Consider adding auth for public deployment

## 👨‍💻 Author

**Omkar Shelke**

## 📄 License

ISC License

---

**Note**: For production use, implement authentication, data persistence, and additional security measures.
