const KEY = 'vision-stream:profile:v1';

export const AVATARS = [
  { id: 'robot', label: 'Robot', src: '/avatars/avatar-01.png' },
  { id: 'alien', label: 'Alien', src: '/avatars/avatar-02.png' },
  { id: 'ghost', label: 'Ghost', src: '/avatars/avatar-03.png' },
  { id: 'astronaut', label: 'Astronaut', src: '/avatars/avatar-04.png' },
  { id: 'artist', label: 'Artist', src: '/avatars/avatar-05.png' },
  { id: 'ninja', label: 'Ninja', src: '/avatars/avatar-06.png' },
  { id: 'detective', label: 'Detective', src: '/avatars/avatar-07.png' },
  { id: 'boy', label: 'Boy', src: '/avatars/avatar-08.png' },
  { id: 'girl', label: 'Girl', src: '/avatars/avatar-09.png' },
  { id: 'superhero-m', label: 'Hero', src: '/avatars/avatar-10.png' },
  { id: 'superhero-f', label: 'Heroine', src: '/avatars/avatar-11.png' },
  { id: 'scientist', label: 'Scientist', src: '/avatars/avatar-12.png' },
  { id: 'student', label: 'Student', src: '/avatars/avatar-13.png' },
  { id: 'technologist', label: 'Hacker', src: '/avatars/avatar-14.png' },
];

export const randomAvatar = (excludeId) => {
  const pool = excludeId ? AVATARS.filter((a) => a.id !== excludeId) : AVATARS;
  return pool[Math.floor(Math.random() * pool.length)];
};

export function loadProfile() {
  if (typeof window === 'undefined') {
    return { name: 'Guest', avatar: AVATARS[0].src };
  }
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const avatar = AVATARS.find((a) => a.src === parsed.avatar)?.src || AVATARS[0].src;
      return { name: typeof parsed.name === 'string' && parsed.name.trim() ? parsed.name : 'Guest', avatar };
    }
  } catch {
    // corrupted storage — fall through to fresh random profile
  }
  const fresh = { name: 'Guest', avatar: randomAvatar().src };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(fresh));
  } catch {
    // storage unavailable — keep in-memory profile
  }
  return fresh;
}

export function saveProfile(profile) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(profile));
  } catch {
    // ignore write failures
  }
}
