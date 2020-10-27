// Sets the right inneHeight of the iOS device
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const cloud = document.querySelector('.cloud');
cloud.addEventListener('click', (event) => {
  // runs when the cloud icon is clicked
  console.log(event);
});

const trash = document.querySelector('.trash');
trash.addEventListener('click', (event) => {
  // runs when the trash icon is clicked
  console.log(event);
});