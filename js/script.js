// Demo JS for interactive features
document.addEventListener('DOMContentLoaded', ()=>{
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menuBtn');
  const cards = document.getElementById('cards');
  const videoList = document.getElementById('videoList');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const playerThumb = document.getElementById('playerThumb');
  const playBtn = document.getElementById('playBtn');
  const likeBtn = document.getElementById('likeBtn');
  const likeCount = document.getElementById('likeCount');
  const presetsBtn = document.getElementById('presetsBtn');
  const presetsModal = document.getElementById('presetsModal');
  const closePresets = document.getElementById('closePresets');
  const presetButtons = document.querySelectorAll('.preset');
  const presetPreview = document.getElementById('presetPreview');
  const contactForm = document.getElementById('contactForm');
  let likes = 0;
  const subscriptionsSection = document.getElementById('subscriptionsSection');
  const channelList = document.getElementById('channelList');
  const subVideos = document.getElementById('subVideos');
  const settingsSection = document.getElementById('settingsSection');
  const saveSettingsBtn = document.getElementById('saveSettings');

  const subscribedChannels = [
  {id: 1, name: 'CoolCats 🐱', pic: 'assets/white_doggie.jpg', newVideos: 3},
  {id: 2, name: 'GamerX ⛏️', pic: 'assets/minecraft.jpg', newVideos: 1},
  {id: 3, name: 'MessiFan ⚽', pic: 'assets/messi.jpg', newVideos: 2}
  ];

  const latestSubVideos = [
  {id: 1, title: 'Cool Cats Compilation', thumb: 'assets/white_doggie.jpg', duration: '5:23', videoFile: 'videos/Doggie.mp4'},
  {id: 2, title: 'Minecraft Secret Build', thumb: 'assets/minecraft.jpg', duration: '8:45', videoFile: 'videos/minecraft.mp4'},
  {id: 3, title: 'Messi Top Goals', thumb: 'assets/messi.jpg', duration: '6:10', videoFile: 'videos/messi.mp4'}
  ];



const homeSection = document.getElementById('homeSection');
const trendingSection = document.getElementById('trendingSection');
const sidebarLinks = document.querySelectorAll('.sidebar li');

sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Remove active class from all
    sidebarLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Hide all sections by default
    homeSection.style.display = 'none';
    trendingSection.style.display = 'none';
    subscriptionsSection.style.display = 'none';
    settingsSection.style.display = 'none';

    if(link.textContent === 'Home') homeSection.style.display = 'block';
    else if(link.textContent === 'Trending') trendingSection.style.display = 'block';
    else if(link.textContent === 'Subscriptions') subscriptionsSection.style.display = 'block';
    else if(link.textContent === 'Settings') settingsSection.style.display = 'block';
  });
});


  // sample data for cards
  const videos = [
    {id:1,title:'Playful Doggies 🐶',thumb:'assets/white_doggie.jpg',duration:'12:34',tags:['design','ui'], videoFile: 'videos/Doggie.mp4'},
    {id:2,title:'Minecraft World Build ⛏️',thumb:'assets/minecraft.jpg',duration:'8:45',tags:['responsive','css'],videoFile:'videos/minecraft.mp4' },
    {id:3,title:'Messi’s Top Dribbles ⚽',thumb:'assets/messi.jpg',duration:'6:10',tags:['security'], videoFile:'videos/messi.mp4'},
    {id:4,title:'Hilarious Cartoon 😂',thumb:'assets/cartoon.jpg',duration:'10:01',tags:['performance'], videoFile:'videos/funny.mp4'},
    {id:5,title:'Short Movie: Struggling Boy 🎬',thumb:'assets/movie.jpg',duration:'4:20',tags:['ux','workflow'], videoFile:'videos/short_flim.mp4' },
    {id:6,title:'Kids Inspiration: You Can Do It 💪',thumb:'assets/inspiration.jpg',duration:'9:05',tags:['accessibility'], videoFile:'videos/inspirational.mp4'},
];


  function renderCards(list){
    cards.innerHTML = '';
    videoList.innerHTML = '';
    list.forEach(v=>{
      const card = document.createElement('article');
      card.className='card';
      card.innerHTML = `
        <div class="thumb" style="background-image:url('${v.thumb}')"></div>
        <div class="meta">
          <div class="title">${v.title}</div>
          <div class="duration">${v.duration}</div>
        </div>
        <div class="card-actions">
          <button class="openBtn" data-id="${v.id}">Open</button>
          <button class="likeSmall" data-id="${v.id}">❤️</button>
        </div>
      `;
      cards.appendChild(card);

      // next-up list item
      const li = document.createElement('div');
      li.className='card';
      li.innerHTML = `<div style="display:flex;gap:8px;align-items:center"><div style="width:56px;height:40px;background-image:url('${v.thumb}');background-size:cover;border-radius:6px"></div><div><strong>${v.title}</strong><div style="font-size:0.8rem;color:#666">${v.duration}</div></div></div>`;
      videoList.appendChild(li);
    });
  }

  const trendingGrid = document.getElementById('trendingGrid');

function renderTrending(list){
  trendingGrid.innerHTML = '';
  list.forEach(v => {
    const div = document.createElement('div');
    div.className = 'trending-item';
    div.innerHTML = `
      <div class="trending-thumb" style="background-image:url('${v.thumb}')"></div>
      <div class="trending-title">${v.title}</div>
      <div class="trending-duration">${v.duration}</div>
    `;
    trendingGrid.appendChild(div);

    div.addEventListener('click', () => {
  const mainVideo = document.getElementById('mainVideo');
  mainVideo.src = v.videoFile;
  mainVideo.play();

  // Update title
  const videoTitle = document.getElementById('videoTitle');
  videoTitle.textContent = v.title;

  // Reset likes
  likes = 0;
  likeCount.textContent = '0';

  // Switch to Home tab
  sidebarLinks.forEach(l => l.classList.remove('active'));
  const homeLink = Array.from(sidebarLinks).find(l => l.textContent === 'Home');
  homeLink.classList.add('active');

  // Show home, hide trending
  homeSection.style.display = 'block';
  trendingSection.style.display = 'none';

  // Scroll to video player
  mainVideo.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

  });
}

// call this function to render trending videos
renderTrending(videos);


  renderCards(videos);

  // Search filter
  function filterVideos(q){
    const filtered = videos.filter(v=> v.title.toLowerCase().includes(q.toLowerCase()) || v.tags.some(t=>t.includes(q.toLowerCase())) );
    renderCards(filtered);
  }

  searchBtn.addEventListener('click', ()=> filterVideos(searchInput.value));
  searchInput.addEventListener('keyup', (e)=> { if(e.key==='Enter') filterVideos(searchInput.value) });

  // Toggle sidebar for small screens
  menuBtn.addEventListener('click', ()=>{
    if(window.innerWidth <= 800){
      sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
    }
  });

  // Open card -> update player preview
  document.body.addEventListener('click', (e)=>{
    if(e.target.matches('.openBtn')){
  const id = +e.target.dataset.id;
  const v = videos.find(x=> x.id===id);

  // Load YouTube video
  const mainVideo = document.getElementById('mainVideo');
  mainVideo.src = v.videoFile;
  mainVideo.play();

  // UPDATE title
  const videoTitle = document.getElementById('videoTitle');
  videoTitle.textContent = v.title;

  likeCount.textContent = '0';
  likes = 0;
  }

    if(e.target.matches('.likeSmall')){
      // small like increments local like counter
      likes += 1;
      likeCount.textContent = likes;
    }
  });

  // Render channels
function renderChannels() {
  channelList.innerHTML = '';
  subscribedChannels.forEach(ch => {
    const div = document.createElement('div');
    div.className = 'channel-item';
    div.innerHTML = `
      <div style="display:flex;align-items:center;">
        <img src="${ch.pic}" alt="${ch.name} profile pic">
        <span>${ch.name}</span>
      </div>
      <span>${ch.newVideos} new</span>
    `;
    channelList.appendChild(div);
  });
}

// Render latest subscription videos
function renderSubVideos() {
  subVideos.innerHTML = '';
  latestSubVideos.forEach(v => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb" style="background-image:url('${v.thumb}')"></div>
      <div class="meta">
        <div class="title">${v.title}</div>
        <div class="duration">${v.duration}</div>
      </div>
      <div class="card-actions">
        <button class="openBtn" data-id="${v.id}">Open</button>
      </div>
    `;
    subVideos.appendChild(card);
  });
}

// Call render functions
renderChannels();
renderSubVideos();

  // Play button toggles text
  // playBtn.addEventListener('click', ()=>{
  //   if(playBtn.textContent === 'Play') playBtn.textContent = 'Pause';
  //   else playBtn.textContent = 'Play';
  // });

  // Like button
  likeBtn.addEventListener('click', ()=>{
    likes += 1;
    likeCount.textContent = likes;
    likeBtn.classList.add('liked');
  });

  // Presets modal
  presetsBtn.addEventListener('click', ()=>{
    presetsModal.setAttribute('aria-hidden','false');
  });
  closePresets.addEventListener('click', ()=> presetsModal.setAttribute('aria-hidden','true'));

  presetButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const title = btn.dataset.title;
      const desc = btn.dataset.desc;
      presetPreview.querySelector('h3').textContent = title;
      presetPreview.querySelector('p').textContent = desc;
    });
  });

  // Simple contact form validation and feedback
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const msg = document.getElementById('formMsg');
    if(!name || !email || !message){
      msg.textContent = 'Please complete all fields.';
      msg.style.color='crimson';
      return;
    }
    // naive email check
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      msg.textContent = 'Enter a valid email.';
      msg.style.color='crimson';
      return;
    }
    msg.textContent = 'Message sent (demo).';
    msg.style.color='green';
    contactForm.reset();
  });

  // Accessibility: ensure Escape closes modal
  document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape') presetsModal.setAttribute('aria-hidden','true');
  });
});

saveSettingsBtn.addEventListener('click', () => {
  const quality = document.getElementById('defaultQuality').value;
  const speed = document.getElementById('playbackSpeed').value;
  const autoplay = document.getElementById('autoplayToggle').checked;
  const theme = document.getElementById('themeSelect').value;
  const emailNotif = document.getElementById('emailNotif').checked;
  const pushNotif = document.getElementById('pushNotif').checked;
  const showLiked = document.getElementById('showLiked').checked;
  const showSubs = document.getElementById('showSubs').checked;

  console.log('Settings saved:', {
    quality, speed, autoplay, theme, emailNotif, pushNotif, showLiked, showSubs
  });

  alert('Settings saved (demo)');
});
