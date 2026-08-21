// Central State Management Store for PawConnect

class PawStore {
  constructor() {
    this.STORAGE_KEYS = {
      PETS: 'pawconnect_pets_v1',
      USER: 'pawconnect_active_user_v1',
      SAVED: 'pawconnect_saved_v1',
      CONVERSATIONS: 'pawconnect_conversations_v1',
      THEME: 'pawconnect_theme_v1'
    };

    this.listeners = [];
    this.init();
  }

  init() {
    // Load pets or use initial defaults
    const savedPets = localStorage.getItem(this.STORAGE_KEYS.PETS);
    this.pets = savedPets ? JSON.parse(savedPets) : [...window.INITIAL_PETS];

    // Load active user or Sarah Foster (default user_1)
    const savedUser = localStorage.getItem(this.STORAGE_KEYS.USER);
    this.currentUser = savedUser 
      ? JSON.parse(savedUser) 
      : window.INITIAL_USERS.find(u => u.id === 'user_1') || window.INITIAL_USERS[0];

    // Load saved bookmarks
    const savedBookmarks = localStorage.getItem(this.STORAGE_KEYS.SAVED);
    this.savedPetIds = savedBookmarks ? JSON.parse(savedBookmarks) : [1];

    // Load conversations
    const savedConvs = localStorage.getItem(this.STORAGE_KEYS.CONVERSATIONS);
    this.conversations = savedConvs ? JSON.parse(savedConvs) : [...window.INITIAL_CONVERSATIONS];

    // Dark mode setting
    const savedTheme = localStorage.getItem(this.STORAGE_KEYS.THEME);
    this.darkMode = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Active filters
    this.filters = {
      tab: 'all', // 'all', 'adopt', 'lost', 'found', 'my-listings', 'saved', 'guide'
      species: 'all', // 'all', 'dog', 'cat', 'bird', 'other'
      searchQuery: '',
      urgentOnly: false,
      vaccinatedOnly: false,
      goodWithKids: false,
      goodWithPets: false,
      sortBy: 'newest' // 'newest', 'urgent', 'name'
    };

    this.applyTheme();
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEYS.PETS, JSON.stringify(this.pets));
      localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(this.currentUser));
      localStorage.setItem(this.STORAGE_KEYS.SAVED, JSON.stringify(this.savedPetIds));
      localStorage.setItem(this.STORAGE_KEYS.CONVERSATIONS, JSON.stringify(this.conversations));
      localStorage.setItem(this.STORAGE_KEYS.THEME, this.darkMode ? 'dark' : 'light');
    } catch (e) {
      console.warn('LocalStorage quota or permission error:', e);
    }
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  notify(event, data) {
    this.save();
    this.listeners.forEach(fn => fn(event, data, this));
  }

  // --- Theme ---
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.applyTheme();
    this.notify('THEME_CHANGE', { darkMode: this.darkMode });
  }

  applyTheme() {
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // --- Users ---
  switchUser(userId) {
    const found = window.INITIAL_USERS.find(u => u.id === userId);
    if (found) {
      this.currentUser = { ...found };
      this.notify('USER_CHANGE', this.currentUser);
    }
  }

  registerCustomUser(userData) {
    const newUser = {
      id: 'user_' + Date.now(),
      name: userData.name || 'Kind Neighbor',
      role: userData.role || 'Pet Parent',
      email: userData.email || 'neighbor@pawmail.org',
      phone: userData.phone || '+1 (555) 000-0000',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      city: userData.city || 'Neighborhood',
      bio: userData.bio || 'New to PawConnect community.',
      listingsCount: 0
    };
    window.INITIAL_USERS.push(newUser);
    this.currentUser = newUser;
    this.notify('USER_CHANGE', this.currentUser);
    return newUser;
  }

  // --- Pet Listings CRUD ---
  addPet(newPetData) {
    const id = Date.now();
    const pet = {
      id,
      name: newPetData.name.trim(),
      type: newPetData.type || 'dog',
      category: newPetData.category || 'adopt', // 'adopt', 'lost', 'found'
      status: 'active',
      breed: newPetData.breed || 'Mixed Breed',
      age: newPetData.age || 'Young',
      gender: newPetData.gender || 'Unknown',
      size: newPetData.size || 'Medium',
      color: newPetData.color || 'Standard',
      location: newPetData.location || 'Local Area',
      photos: newPetData.photos && newPetData.photos.length > 0 
        ? newPetData.photos 
        : [this.getDefaultImageForType(newPetData.type)],
      description: newPetData.description || 'Looking for loving care through our community.',
      medical: {
        vaccinated: !!newPetData.vaccinated,
        neutered: !!newPetData.neutered,
        dewormed: !!newPetData.dewormed,
        microchipped: !!newPetData.microchipped,
        specialNeeds: !!newPetData.specialNeeds
      },
      temperament: newPetData.temperament || ["Friendly", "Gentle"],
      postedBy: {
        id: this.currentUser.id,
        name: this.currentUser.name,
        role: this.currentUser.role,
        phone: newPetData.contactPhone || this.currentUser.phone,
        email: newPetData.contactEmail || this.currentUser.email,
        city: newPetData.location || this.currentUser.city,
        verified: true
      },
      postedAt: new Date().toISOString(),
      urgent: !!newPetData.urgent,
      lostDetails: newPetData.category === 'lost' ? {
        lastSeenDate: newPetData.lastSeenDate || 'Recently',
        distinctiveMarks: newPetData.distinctiveMarks || 'None noted',
        collarColor: newPetData.collarColor || 'None',
        microchipId: newPetData.microchipId || ''
      } : null,
      foundDetails: newPetData.category === 'found' ? {
        foundDate: newPetData.foundDate || 'Today',
        currentLocation: newPetData.currentLocation || 'Safe with finder',
        holdingUntil: 'Reunited or adoption foster'
      } : null,
      sightings: []
    };

    this.pets.unshift(pet);
    this.notify('PET_ADDED', pet);
    return pet;
  }

  updatePet(id, updateData) {
    const idx = this.pets.findIndex(p => p.id === Number(id));
    if (idx !== -1) {
      this.pets[idx] = { ...this.pets[idx], ...updateData };
      this.notify('PET_UPDATED', this.pets[idx]);
      return this.pets[idx];
    }
    return null;
  }

  deletePet(id) {
    this.pets = this.pets.filter(p => p.id !== Number(id));
    this.savedPetIds = this.savedPetIds.filter(pid => pid !== Number(id));
    this.notify('PET_DELETED', { id: Number(id) });
  }

  markAsAdopted(id) {
    const pet = this.pets.find(p => p.id === Number(id));
    if (pet) {
      pet.status = 'adopted';
      this.notify('PET_ADOPTED', pet);
    }
  }

  markAsReunited(id) {
    const pet = this.pets.find(p => p.id === Number(id));
    if (pet) {
      pet.status = 'reunited';
      this.notify('PET_REUNITED', pet);
    }
  }

  addSighting(petId, sightingInfo) {
    const pet = this.pets.find(p => p.id === Number(petId));
    if (pet) {
      if (!pet.sightings) pet.sightings = [];
      const newSighting = {
        id: 's_' + Date.now(),
        reportedBy: this.currentUser.name,
        time: sightingInfo.time || 'Just now',
        location: sightingInfo.location || 'Reported area',
        notes: sightingInfo.notes || 'No extra notes',
        photo: sightingInfo.photo || null
      };
      pet.sightings.unshift(newSighting);
      this.notify('SIGHTING_ADDED', { pet, sighting: newSighting });
      return newSighting;
    }
    return null;
  }

  // --- Saved / Favorites ---
  isSaved(petId) {
    return this.savedPetIds.includes(Number(petId));
  }

  toggleSave(petId) {
    const id = Number(petId);
    if (this.isSaved(id)) {
      this.savedPetIds = this.savedPetIds.filter(pid => pid !== id);
    } else {
      this.savedPetIds.push(id);
    }
    this.notify('SAVED_CHANGED', { petId: id, isSaved: this.isSaved(id) });
  }

  // --- Messaging ---
  getOrCreateConversation(petId, recipientUser) {
    let conv = this.conversations.find(c => c.petId === Number(petId) && c.otherUser.id === recipientUser.id);
    if (!conv) {
      const pet = this.pets.find(p => p.id === Number(petId));
      conv = {
        id: 'conv_' + Date.now(),
        petId: Number(petId),
        petName: pet ? pet.name : 'Pet Inquiry',
        petPhoto: pet && pet.photos ? pet.photos[0] : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=150&q=80',
        otherUser: {
          id: recipientUser.id,
          name: recipientUser.name,
          avatar: recipientUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
        },
        unreadCount: 0,
        lastMessageTime: 'Just now',
        messages: []
      };
      this.conversations.unshift(conv);
      this.notify('CONVERSATIONS_UPDATED', this.conversations);
    }
    return conv;
  }

  sendMessage(convId, text) {
    const conv = this.conversations.find(c => c.id === convId);
    if (!conv || !text.trim()) return null;

    const newMsg = {
      id: 'm_' + Date.now(),
      senderId: this.currentUser.id,
      text: text.trim(),
      timestamp: 'Just now'
    };

    conv.messages.push(newMsg);
    conv.lastMessageTime = 'Just now';
    this.notify('MESSAGE_SENT', { conv, message: newMsg });

    // Simulate friendly automatic community reply after 1.5s
    setTimeout(() => {
      this.simulateReply(conv, text);
    }, 1500);

    return newMsg;
  }

  simulateReply(conv, userMessage) {
    const replies = [
      `Thank you so much for reaching out about ${conv.petName}! We are passionate about finding the best home. What is your neighborhood and schedule like?`,
      `Hi ${this.currentUser.name}! Thank you for your care. That sounds wonderful. We would love to arrange a safe video call or in-person meet at the local park!`,
      `Got your message! Everything in PawConnect is 100% free with no adoption fees. Let me know when you'd like to meet ${conv.petName}.`,
      `Thank you for keeping an eye out! Community support is what makes all these rescues possible.`
    ];

    const replyText = replies[Math.floor(Math.random() * replies.length)];
    const replyMsg = {
      id: 'm_reply_' + Date.now(),
      senderId: conv.otherUser.id,
      text: replyText,
      timestamp: 'Just now'
    };

    conv.messages.push(replyMsg);
    conv.lastMessageTime = 'Just now';
    conv.unreadCount = (conv.unreadCount || 0) + 1;
    this.notify('MESSAGE_RECEIVED', { conv, message: replyMsg });
  }

  // --- Filtering & Querying ---
  setFilter(key, value) {
    this.filters[key] = value;
    this.notify('FILTER_CHANGE', this.filters);
  }

  resetFilters() {
    this.filters = {
      tab: this.filters.tab,
      species: 'all',
      searchQuery: '',
      urgentOnly: false,
      vaccinatedOnly: false,
      goodWithKids: false,
      goodWithPets: false,
      sortBy: 'newest'
    };
    this.notify('FILTER_CHANGE', this.filters);
  }

  getFilteredPets() {
    let result = [...this.pets];

    // Filter by tab / category
    if (this.filters.tab === 'adopt') {
      result = result.filter(p => p.category === 'adopt');
    } else if (this.filters.tab === 'lost') {
      result = result.filter(p => p.category === 'lost');
    } else if (this.filters.tab === 'found') {
      result = result.filter(p => p.category === 'found');
    } else if (this.filters.tab === 'my-listings') {
      result = result.filter(p => p.postedBy && p.postedBy.id === this.currentUser.id);
    } else if (this.filters.tab === 'saved') {
      result = result.filter(p => this.isSaved(p.id));
    }

    // Filter by species
    if (this.filters.species !== 'all') {
      result = result.filter(p => p.type.toLowerCase() === this.filters.species.toLowerCase());
    }

    // Filter by search query
    if (this.filters.searchQuery.trim()) {
      const q = this.filters.searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.breed.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
      );
    }

    // Urgent only
    if (this.filters.urgentOnly) {
      result = result.filter(p => p.urgent || p.category === 'lost');
    }

    // Vaccinated only
    if (this.filters.vaccinatedOnly) {
      result = result.filter(p => p.medical && p.medical.vaccinated);
    }

    // Good with kids
    if (this.filters.goodWithKids) {
      result = result.filter(p => p.temperament && p.temperament.some(t => t.toLowerCase().includes('kid') || t.toLowerCase().includes('children')));
    }

    // Good with pets
    if (this.filters.goodWithPets) {
      result = result.filter(p => p.temperament && p.temperament.some(t => t.toLowerCase().includes('dog') || t.toLowerCase().includes('cat')));
    }

    // Sorting
    if (this.filters.sortBy === 'urgent') {
      result.sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
    } else if (this.filters.sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Newest
      result.sort((a, b) => new Date(b.postedAt || 0) - new Date(a.postedAt || 0));
    }

    return result;
  }

  getStats() {
    const adopted = this.pets.filter(p => p.status === 'adopted').length + 142;
    const reunited = this.pets.filter(p => p.status === 'reunited').length + 89;
    const activeAdoptions = this.pets.filter(p => p.category === 'adopt' && p.status === 'active').length;
    const activeLost = this.pets.filter(p => p.category === 'lost' && p.status === 'active').length;
    const activeFound = this.pets.filter(p => p.category === 'found' && p.status === 'active').length;

    return { adopted, reunited, activeAdoptions, activeLost, activeFound };
  }

  getDefaultImageForType(type) {
    const typeLower = (type || 'dog').toLowerCase();
    if (typeLower === 'cat') {
      return 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80';
    } else if (typeLower === 'bird') {
      return 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80';
    } else if (typeLower === 'rabbit') {
      return 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80';
    }
    return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';
  }
}

// Instantiate global store
window.pawStore = new PawStore();
