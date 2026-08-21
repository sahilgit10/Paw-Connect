// Filters Component for Search, Categories, and Multi-attribute Filtering

class FiltersComponent {
  constructor(containerId, tabsContainerId) {
    this.container = document.getElementById(containerId);
    this.tabsContainer = document.getElementById(tabsContainerId);
  }

  renderTabs() {
    const currentTab = window.pawStore.filters.tab;
    const stats = window.pawStore.getStats();
    const myCount = window.pawStore.pets.filter(p => p.postedBy && p.postedBy.id === window.pawStore.currentUser.id).length;
    const savedCount = window.pawStore.savedPetIds.length;

    const tabs = [
      { id: 'all', label: 'All Listings', icon: 'layout-grid', count: window.pawStore.pets.length },
      { id: 'adopt', label: 'Adopt (Free)', icon: 'heart', count: stats.activeAdoptions, badgeColor: 'bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300' },
      { id: 'lost', label: 'Lost Pets (SOS)', icon: 'alert-triangle', count: stats.activeLost, badgeColor: 'bg-urgent-100 text-urgent-700 dark:bg-urgent-900/50 dark:text-urgent-300' },
      { id: 'found', label: 'Found Animals', icon: 'search', count: stats.activeFound, badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' },
      { id: 'my-listings', label: 'My Listings', icon: 'user-check', count: myCount },
      { id: 'saved', label: 'Saved', icon: 'bookmark', count: savedCount },
      { id: 'guide', label: 'Safety & Guides', icon: 'book-open' }
    ];

    this.tabsContainer.innerHTML = tabs.map(tab => {
      const isActive = currentTab === tab.id;
      return `
        <button 
          onclick="window.app.setTab('${tab.id}')"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            isActive 
              ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' 
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }"
        >
          <i data-lucide="${tab.icon}" class="w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}"></i>
          <span>${tab.label}</span>
          ${tab.count !== undefined ? `
            <span class="px-1.5 py-0.5 text-[11px] rounded-md font-bold ${
              isActive 
                ? 'bg-white/20 text-white' 
                : (tab.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400')
            }">
              ${tab.count}
            </span>
          ` : ''}
        </button>
      `;
    }).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderFilters() {
    const f = window.pawStore.filters;
    const isSpecialTab = ['guide', 'my-listings', 'saved'].includes(f.tab);

    if (isSpecialTab && f.tab === 'guide') {
      this.container.innerHTML = '';
      return;
    }

    const speciesList = [
      { id: 'all', label: 'All Animals', icon: 'paw-print' },
      { id: 'dog', label: 'Dogs', icon: 'dog' },
      { id: 'cat', label: 'Cats', icon: 'cat' },
      { id: 'bird', label: 'Birds', icon: 'feather' },
      { id: 'other', label: 'Other Pets', icon: 'sparkles' }
    ];

    this.container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        <!-- Top Row: Species Selectors & Search on Mobile -->
        <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          <!-- Species Pills -->
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            ${speciesList.map(s => {
              const active = f.species === s.id;
              return `
                <button 
                  onclick="window.app.setSpeciesFilter('${s.id}')"
                  class="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                    active 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }"
                >
                  <i data-lucide="${s.icon}" class="w-3.5 h-3.5"></i>
                  <span>${s.label}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Sort Dropdown -->
          <div class="flex items-center gap-2 self-end md:self-auto">
            <span class="text-xs text-slate-400 font-medium whitespace-nowrap">Sort by:</span>
            <select 
              onchange="window.pawStore.setFilter('sortBy', this.value)"
              class="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
            >
              <option value="newest" ${f.sortBy === 'newest' ? 'selected' : ''}>Newest First</option>
              <option value="urgent" ${f.sortBy === 'urgent' ? 'selected' : ''}>Urgent & Lost First</option>
              <option value="name" ${f.sortBy === 'name' ? 'selected' : ''}>Pet Name (A-Z)</option>
            </select>
          </div>

        </div>

        <!-- Bottom Row: Specific Attribute Toggles -->
        <div class="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="text-slate-400 font-medium mr-1 text-[11px] uppercase tracking-wider">Quick Filters:</span>
            
            <!-- Urgent Filter -->
            <button 
              onclick="window.app.toggleFilter('urgentOnly')"
              class="px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                f.urgentOnly 
                  ? 'bg-urgent-500 text-white shadow-sm' 
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
              }"
            >
              <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
              <span>Urgent Only</span>
            </button>

            <!-- Vaccinated Filter -->
            <button 
              onclick="window.app.toggleFilter('vaccinatedOnly')"
              class="px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                f.vaccinatedOnly 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
              }"
            >
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
              <span>Vaccinated</span>
            </button>

            <!-- Good with Kids -->
            <button 
              onclick="window.app.toggleFilter('goodWithKids')"
              class="px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                f.goodWithKids 
                  ? 'bg-brand-500 text-white shadow-sm' 
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
              }"
            >
              <i data-lucide="smile" class="w-3.5 h-3.5"></i>
              <span>Good with Kids</span>
            </button>

            <!-- Good with Pets -->
            <button 
              onclick="window.app.toggleFilter('goodWithPets')"
              class="px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                f.goodWithPets 
                  ? 'bg-brand-500 text-white shadow-sm' 
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
              }"
            >
              <i data-lucide="users" class="w-3.5 h-3.5"></i>
              <span>Good with Pets</span>
            </button>
          </div>

          <!-- Reset Filter -->
          <button 
            onclick="window.app.resetFilters()"
            class="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 ml-auto"
          >
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
            <span>Reset Filters</span>
          </button>

        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  render() {
    this.renderTabs();
    this.renderFilters();
  }
}

window.FiltersComponent = FiltersComponent;
