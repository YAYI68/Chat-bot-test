'use client'
export const getOrCreateUserId = (): string => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = crypto.randomUUID(); // Generate a unique ID
      localStorage.setItem('userId', userId); // Persist in localStorage
    }
    return userId;
  };