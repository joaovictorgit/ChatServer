const socket = io();


const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("room");

socket.emit("select_room", {
  username,
  room,
});

const name_room = document.getElementById("h1-room");
name_room.innerHTML += `${room}`;

socket.on("select-users", (data) => {
    const usersDiv = document.getElementById("label-user");
    //console.log(data);
    data.forEach(user => {
        usersDiv.innerHTML += `
        <div class="user" id="user"><label>${user.username}</label></div>
        `;
    });
});

document.getElementById('message-input').addEventListener("keypress", (event) => {
  if (event.key === 'Enter') {
    const message = event.target.value;
    const data = {
      room,
      message,
      username
    }
    socket.emit("message", data);
    event.target.value = '';
  }
});

socket.on("message", (data) => {
  const messageDiv = document.getElementById('list-messages');
  if (data.username === username) {
    messageDiv.innerHTML += `
      <div class="new_message" id="left-message">
        <label class="form-label">
            <strong id="strong-text"> ${data.text} </strong> <span> ${data.username} - ${dayjs(data.createdAt).format("HH:mm")} </span>
        </label>
      </div>
    `;
  } else {
    messageDiv.innerHTML += `
      <div class="new_message" id="right-message">
        <label class="form-label">
            <strong id="strong-text"> ${data.text} </strong> <span> ${dayjs(data.createdAt).format("HH:mm")} - ${data.username} </span>
        </label>
      </div>
    `;
  }
});

