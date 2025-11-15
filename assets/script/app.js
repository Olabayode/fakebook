'use strict';

import {Subscriber }from "./Subscriber.js";

const textArea = document.querySelector('textarea');
const profileImage = document.querySelector('.profile');
const postImage  = document.querySelector('.post-image');
const postBtn = document.querySelector('.post');
const fileInfo = document.querySelector('.file-info');
const modal = document.getElementById('modal');
const postBox = document.querySelector('.show-post');
const overlay = document.querySelector('.overlay');

let isVisible = false;
let imageSrc = '';


postImage.addEventListener('change', () => {
  if (postImage.files && postImage.files[0]) {
    fileInfo.textContent = postImage.files[0].name;
  } else {
    fileInfo.textContent = '';
  }
});

function clearTextBox() {
  textArea.value = '';
  postImage.value = ''; 
  fileInfo.textContent = '';
  imageSrc = '';
}

function showImage() {
  if (postImage.files && postImage.files[0]) {
    imageSrc = `<figure><img src="${URL.createObjectURL(postImage.files[0])}" class="posted-image"></figure>`;
  } else {
    imageSrc = '';
  }
}


function showPost() {
  showImage();  // Update imageSrc before posting
  
  // Prevent posting empty content
  if (textArea.value.trim() === '' && imageSrc === '') {
    return;
  }
  
  const newPost = document.createElement('div');
  newPost.className = 'the-post data';

  const now = new Date();

  newPost.innerHTML = `
    <header class="post-header flex">
      <div class="flex">
        <figure><img src="./assets/media/picture.png" class="profile" alt="profile"></figure>
        <h3>Emmanuel Olure</h3>
      </div>
      <p>${now.toDateString()}</p>
    </header>
    <p>${textArea.value}</p>
    ${imageSrc}
  `;

  postBox.appendChild(newPost);
}

postBtn.addEventListener('click', () => {
  showPost();
  clearTextBox();
});

const subscriber = new Subscriber (
  68547, 'Emmanuel Olure', 'EmmTee_Repo1', 'emmanuel@gmail.com', 'SportsTv', 'Only Fans', true
);

let earning = '';
earning = subscriber.canMonetize === true ? 'Yes' : 'No';

function displayInfo() {
  const userInfo = document.getElementById('modal');
  userInfo.innerHTML = `
    <div class="subscriber-info">
      <img src="./assets/media/picture.png" class="user-image" alt="profile">
      <h2>${subscriber.name}</h2>
      <p class="username">${subscriber.userName}</p>
      <div class="details">
        <p>${subscriber.email}</p>
        <pPages: ${subscriber.pages}</p>
        <pGroups: ${subscriber.groups}</p>
        <p>Can Monetize: ${earning}</p>
      </div>
      <button class="close" id="close" type="button">Close</button>
    <div>
  `;
  document.getElementById('close').addEventListener('click', closeModal);
}

function displayModal() {
  modal.classList.add('isvisible');
  overlay.classList.add('isvisible');
  displayInfo(); 
}

function closeModal() {
  modal.classList.remove('isvisible');
  overlay.classList.remove('isvisible');
}



function showMessage() {
  modal.classList.add('isvisible');
  overlay.classList.add('isvisible');
  isVisible = true;
}

function hideMessage() {
  userInfo.classList.remove('isvisible');
  overlay.classList.remove('isvisible');
  isVisible = false;
}

profileImage.addEventListener('click', function(){
    displayModal();
    showMessage();
})

profileImage.addEventListener('click', displayModal);
overlay.addEventListener('click', closeModal);