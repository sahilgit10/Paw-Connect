// Main Application Controller for PawConnect

class PawApp {
  constructor() {
    this.navbar = new window.NavbarComponent('navbar-container');
    this.lostFoundBanner = new window.LostFoundBannerComponent('lost-found-banner');
    this.filters = new window.FiltersComponent('filters-container', 'main-tabs');
    this.petDetailsModal = new window.PetDetailsModalComponent('pet-details-modal-root');
    this.addPetModal = new window.AddPetModalComponent('add-pet-modal-root');
    this.chatDrawer = new window.ChatDrawerComponent('chat-drawer-root');
    this.myListings = new window.MyListingsComponent('my-listings-view');
    this.communityGuide = new window.CommunityGuideComponent('community-guide-view');

    this.searchDebounceTimer = null;
    this.init();
  }

  init() {
    // Subscribe to store updates
    window.pawStore.subscribe((event, data) => {
      this.handleStoreEvent(event, data);
    });

    // Initial render of all main components
    this.renderAll();

    // Re-initialize icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  handleStoreEvent(event, data) {
    if (event === 'THEME_CHANGE') {
      this.navbar.render();
      return;
    }

    if (event === 'SAVED_CHANGED') {
      this.navbar.render();
      if (window.pawStore.filters.tab === 'saved') {
        this.renderPetGrid();
      } else {
        // Just update heart icons on current cards
        this.renderPetGrid();
      }
      return;
    }

    if (event === 'MESSAGE_SENT' || event === 'MESSAGE_RECEIVED' || event === 'CONVERSATIONS_UPDATED') {
      this.navbar.render();
      return;
    }

    // Default full re-render for data changes
    this.renderAll();
  }

  renderAll() {
    this.navbar.render();
    this.lostFoundBanner.render();
    this.filters.render();
    this.renderActiveView();
    this.updateCountsBadge();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderActiveView() {
    const tab = window.pawStore.filters.tab;
    const listingsView = document.getElementById('listings-view');
    const myListingsView = document.getElementById('my-listings-view');
    const savedPetsView = document.getElementById('saved-pets-view');
    const communityGuideView = document.getElementById('community-guide-view');
    const filtersContainer = document.getElementById('filters-container');

    // Hide all first
    listingsView.classList.add('hidden');
    myListingsView.classList.add('hidden');
    savedPetsView.classList.add('hidden');
    communityGuideView.classList.add('hidden');
    filtersContainer.classList.remove('hidden');

    if (tab === 'my-listings') {
      myListingsView.classList.remove('hidden');
      this.myListings.render();
    } else if (tab === 'guide') {
      communityGuideView.classList.remove('hidden');
      filtersContainer.classList.add('hidden');
      this.communityGuide.render();
    } else {
      // Standard grid view for 'all', 'adopt', 'lost', 'found', 'saved'
      listingsView.classList.remove('hidden');
      this.renderPetGrid();
    }
  }

  renderPetGrid() {
    const grid = document.getElementById('pet-grid');
    const emptyState = document.getElementById('empty-state');
    const filteredPets = window.pawStore.getFilteredPets();

    if (!grid || !emptyState) return;

    if (filteredPets.length === 0) {
      grid.innerHTML = '';
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
      grid.innerHTML = filteredPets.map(pet => window.PetCardComponent.render(pet)).join('');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  updateCountsBadge() {
    const badge = document.getElementById('listings-count-badge');
    if (!badge) return;
    const count = window.pawStore.getFilteredPets().length;
    badge.innerText = `${count} ${count === 1 ? 'Listing' : 'Listings'} Shown`;
  }

  // --- Filter Navigation Actions ---
  setTab(tabId) {
    window.pawStore.setFilter('tab', tabId);
    this.filters.renderTabs();
    this.renderActiveView();
  }

  setSpeciesFilter(speciesId) {
    window.pawStore.setFilter('species', speciesId);
    this.filters.renderFilters();
    this.renderPetGrid();
    this.updateCountsBadge();
  }

  toggleFilter(key) {
    const current = !!window.pawStore.filters[key];
    window.pawStore.setFilter(key, !current);
    this.filters.renderFilters();
    this.renderPetGrid();
    this.updateCountsBadge();
  }

  handleSearchInput(val) {
    clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => {
      window.pawStore.setFilter('searchQuery', val);
      this.renderPetGrid();
      this.updateCountsBadge();
    }, 200);
  }

  resetFilters() {
    window.pawStore.resetFilters();
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) searchInput.value = '';
    this.filters.renderFilters();
    this.renderPetGrid();
    this.updateCountsBadge();
  }

  // --- Saved / Favorites ---
  toggleSave(petId) {
    window.pawStore.toggleSave(petId);
    const isSaved = window.pawStore.isSaved(petId);
    this.showToast(isSaved ? '❤️ Added to saved pets!' : 'Removed from saved pets', 'info');
  }

  // --- Pet Details Modal Actions ---
  openPetDetails(petId) {
    this.petDetailsModal.open(petId);
  }

  closePetDetails() {
    this.petDetailsModal.close();
  }

  selectModalPhoto(idx) {
    this.petDetailsModal.selectPhoto(idx);
  }

  handleSightingSubmit(e) {
    this.petDetailsModal.submitSighting(e);
  }

  handleAdoptionInquirySubmit(e) {
    this.petDetailsModal.sendAdoptionInquiry(e);
  }

  startDirectChat(petId) {
    const pet = window.pawStore.pets.find(p => p.id === Number(petId));
    if (!pet) return;

    this.closePetDetails();
    const conv = window.pawStore.getOrCreateConversation(pet.id, pet.postedBy);
    this.openChat(conv.id);
  }

  // --- Add Pet Modal Actions ---
  openAddPetModal(category = 'adopt') {
    this.addPetModal.open(category);
  }

  closeAddPetModal() {
    this.addPetModal.close();
  }

  setAddPetCategory(category) {
    this.addPetModal.setCategory(category);
  }

  handleAddPetPhotoUpload(input) {
    this.addPetModal.handlePhotoUpload(input);
  }

  useAddPetPresetPhoto(url) {
    this.addPetModal.usePresetPhoto(url);
  }

  removeAddPetPhoto(idx) {
    this.addPetModal.removePhoto(idx);
  }

  handleAddPetSubmit(e) {
    this.addPetModal.handleSubmit(e);
  }

  // --- Direct Chat Actions ---
  openChat(convId = null) {
    this.chatDrawer.open(convId);
  }

  closeChat() {
    this.chatDrawer.close();
  }

  selectConversation(convId) {
    this.chatDrawer.selectConversation(convId);
  }

  handleChatSubmit(e) {
    this.chatDrawer.handleFormSubmit(e);
  }

  sendQuickReply(text) {
    this.chatDrawer.sendQuickReply(text);
  }

  toggleDarkMode() {
    window.pawStore.toggleDarkMode();
  }

  // --- Toast Notifications ---
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `p-4 rounded-2xl shadow-xl border flex items-center gap-3 transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto ${
      type === 'success' 
        ? 'bg-emerald-600 text-white border-emerald-500' 
        : type === 'error' 
        ? 'bg-urgent-600 text-white border-urgent-500' 
        : 'bg-slate-900 text-white border-slate-800 dark:bg-white dark:text-slate-900'
    }`;

    const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-5 h-5 flex-shrink-0"></i>
      <span class="text-xs sm:text-sm font-semibold">${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    // Trigger entrance animation
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto-remove after 3.5 seconds
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }
}

// Instantiate global app once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PawApp();
});
