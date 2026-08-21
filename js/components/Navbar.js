// Navigation Bar Component

class NavbarComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    const user = window.pawStore.currentUser;
    const isDark = window.pawStore.darkMode;
    const savedCount = window.pawStore.savedPetIds.length;
    const unreadCount = window.pawStore.conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          
          <!-- Logo & Brand -->
          <div class="flex items-center gap-3 cursor-pointer select-none" onclick="window.app.setTab('all')">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
              <i data-lucide="paw-print" class="w-6 h-6"></i>
            </div>
            <div>
              <div class="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                PawConnect
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">Free</span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">Community Pet Rescue & Adoption</p>
            </div>
          </div>

          <!-- Search Bar (Desktop) -->
          <div class="hidden md:flex items-center flex-1 max-w-xs lg:max-w-md mx-6">
            <div class="relative w-full">
              <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="text" 
                id="global-search-input"
                placeholder="Search breed, name, city (e.g. Husky, Sunnyvale)..." 
                value="${window.pawStore.filters.searchQuery || ''}"
                oninput="window.app.handleSearchInput(this.value)"
                class="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
              >
            </div>
          </div>

          <!-- Action Buttons & User Menu -->
          <div class="flex items-center gap-2 sm:gap-3">
            
            <!-- Quick Post Pet Button -->
            <button 
              onclick="window.app.openAddPetModal('adopt')" 
              class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs sm:text-sm font-semibold shadow-md shadow-brand-600/20 transition transform hover:-translate-y-0.5"
            >
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Post Listing</span>
            </button>

            <!-- Saved Pets Bookmark Button -->
            <button 
              onclick="window.app.setTab('saved')" 
              title="Saved / Favorite Pets"
              class="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <i data-lucide="bookmark" class="w-5 h-5"></i>
              ${savedCount > 0 ? `
                <span class="absolute top-1.5 right-1.5 w-4 h-4 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                  ${savedCount}
                </span>
              ` : ''}
            </button>

            <!-- Messages Inbox Button -->
            <button 
              onclick="window.app.openChat(null)" 
              title="Community Messages"
              class="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <i data-lucide="message-circle" class="w-5 h-5"></i>
              ${unreadCount > 0 ? `
                <span class="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-ping-slow">
                  ${unreadCount}
                </span>
              ` : ''}
            </button>

            <!-- Dark Mode Toggle -->
            <button 
              onclick="window.pawStore.toggleDarkMode()" 
              title="Toggle Dark Mode"
              class="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-5 h-5"></i>
            </button>

            <!-- User Switcher Dropdown / Profile -->
            <div class="relative group">
              <button class="flex items-center gap-2 p-1.5 pl-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700">
                <img src="${user.avatar}" alt="${user.name}" class="w-7 h-7 rounded-full object-cover">
                <span class="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden lg:inline max-w-[100px] truncate">${user.name}</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 mr-1"></i>
              </button>

              <!-- Dropdown Menu -->
              <div class="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 hidden group-hover:block z-50 animate-fade-in">
                <div class="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div class="font-bold text-xs text-slate-900 dark:text-white">${user.name}</div>
                  <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate">${user.role} • ${user.city}</div>
                </div>

                <div class="py-1">
                  <button onclick="window.app.setTab('my-listings')" class="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 flex items-center gap-2">
                    <i data-lucide="layers" class="w-4 h-4"></i> My Listed Pets
                  </button>
                  <button onclick="window.app.openChat(null)" class="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 flex items-center gap-2">
                    <i data-lucide="mail" class="w-4 h-4"></i> Direct Messages
                  </button>
                  <button onclick="window.app.setTab('saved')" class="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 flex items-center gap-2">
                    <i data-lucide="bookmark" class="w-4 h-4"></i> Saved Pets
                  </button>
                </div>

                <div class="border-t border-slate-100 dark:border-slate-800 pt-2 px-4 pb-1">
                  <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Switch Demo Persona</div>
                  ${window.INITIAL_USERS.map(u => `
                    <button 
                      onclick="window.pawStore.switchUser('${u.id}')"
                      class="w-full flex items-center justify-between py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 ${u.id === user.id ? 'font-bold text-brand-600 dark:text-brand-400' : ''}"
                    >
                      <span class="truncate">${u.name}</span>
                      ${u.id === user.id ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

window.NavbarComponent = NavbarComponent;
