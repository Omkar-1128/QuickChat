// Check if username exists, redirect to index if not
const username = localStorage.getItem('chatUsername');
if (!username) {
  window.location.href = '/';
}

// Automatically detect WebSocket URL based on current location
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const wsUrl = `${protocol}//${window.location.host}`;
const socket = new WebSocket(wsUrl);

const form = document.getElementById("form");
const input = document.getElementById("input");
const message = document.getElementById("messages");
const DisconnectBtn = document.getElementById("disconnectBtn");

DisconnectBtn.addEventListener("click" , () => {
    socket.close();
    localStorage.removeItem('chatUsername');
    window.location.href = '/';
})

socket.addEventListener("open" , () => {
    console.log("Server connected");
    // Send initial message to register username
    const joinMessage = `${username}: joined`;
    socket.send(joinMessage);
});

// socket.addEventListener("message" , (event) => {
//     console.log("Message from Server: " + event.data);
// })

socket.addEventListener("error" , (e) => {
    console.log("Server connection Error: " + e);
})

socket.addEventListener("close" , () => {
    console.log("Server Disconnected")
})

function formatTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

socket.addEventListener("message" , (event) => {
    const item = document.createElement('li');
    const messageContent = document.createElement('span');
    messageContent.className = 'message-content';
    
    // Check if it's a file message
    if (event.data instanceof Blob) {
        // Handle binary file data
        return;
    }
    
    // Check if it's a system message (disconnect notification)
    if (event.data.startsWith('SYSTEM:')) {
        messageContent.textContent = event.data.replace('SYSTEM:', '');
        item.classList.add('system-message');
    } else if (event.data.startsWith('FILE:')) {
        // Handle file metadata message
        const fileData = JSON.parse(event.data.substring(5));
        
        // Don't show file message if it's from the current user (they already see "You sent a file")
        if (fileData.sender === username) {
            return;
        }
        
        item.classList.add('file-message');
        
        const fileIcon = getFileIcon(fileData.type);
        messageContent.innerHTML = `
            <div class="file-info">
                <span class="file-icon">${fileIcon}</span>
                <div class="file-details">
                    <strong>${fileData.sender}</strong> sent a file<br>
                    <span class="file-name">${fileData.name}</span>
                    <span class="file-size">(${formatFileSize(fileData.size)})</span>
                </div>
            </div>
            <a href="${fileData.data}" download="${fileData.name}" class="download-btn">Download</a>
        `;
    } else {
        messageContent.textContent = event.data;
    }
    
    const timeStamp = document.createElement('span');
    timeStamp.className = 'message-time';
    timeStamp.textContent = formatTime();
    
    item.appendChild(messageContent);
    item.appendChild(timeStamp);
    message.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

function getFileIcon(fileType) {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('sheet')) return '📊';
    return '📎';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// File attachment handling
const attachBtn = document.getElementById('attachBtn');
const fileInput = document.getElementById('fileInput');

attachBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        fileInput.value = '';
        return;
    }
    
    // Show uploading indicator
    const uploadingMsg = document.createElement('li');
    uploadingMsg.classList.add('file-message', 'uploading');
    uploadingMsg.innerHTML = `
        <span class="message-content">
            <div class="file-info">
                <span class="file-icon">⏳</span>
                <div class="file-details">
                    <strong>Sending file...</strong><br>
                    <span class="file-name">${file.name}</span>
                </div>
            </div>
        </span>
        <span class="message-time">${formatTime()}</span>
    `;
    message.appendChild(uploadingMsg);
    window.scrollTo(0, document.body.scrollHeight);
    
    const reader = new FileReader();
    reader.onload = (event) => {
        if (socket.readyState === WebSocket.OPEN) {
            const fileData = {
                sender: username,
                name: file.name,
                type: file.type,
                size: file.size,
                data: event.target.result
            };
            socket.send('FILE:' + JSON.stringify(fileData));
            
            // Remove uploading message and show success
            uploadingMsg.remove();
            
            // Show success message for sender
            const successMsg = document.createElement('li');
            successMsg.classList.add('file-message', 'sent-file');
            const fileIcon = getFileIcon(file.type);
            successMsg.innerHTML = `
                <span class="message-content">
                    <div class="file-info">
                        <span class="file-icon">${fileIcon}</span>
                        <div class="file-details">
                            <strong>You</strong> sent a file<br>
                            <span class="file-name">${file.name}</span>
                            <span class="file-size">(${formatFileSize(file.size)})</span>
                        </div>
                    </div>
                    <span class="success-badge">✓ Sent</span>
                </span>
                <span class="message-time">${formatTime()}</span>
            `;
            message.appendChild(successMsg);
            window.scrollTo(0, document.body.scrollHeight);
            
            fileInput.value = '';
        }
    };
    reader.readAsDataURL(file);
});

form.addEventListener("submit" , (e) => {
    e.preventDefault();

    if(!input.value) return;

    if(socket.readyState === WebSocket.OPEN) {
        const messageWithUsername = `${username}: ${input.value}`;
        socket.send(messageWithUsername);
        input.value = "";
    } else {
        console.log("Socket is not opened, State: ", socket.readyState);
    }
})
