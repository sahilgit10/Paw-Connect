// Lost & Found Urgent Alert Banner Component

class LostFoundBannerComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    // Find all active lost or found pets
    const urgentLostPets = window.pawStore.pets.filter(
      p => (p.category === 'lost' || p.category === 'found') && p.status === 'active'
    );

    if (urgentLostPets.length === 0) {
      this.container.innerHTML = '';
      return;
    }

    const firstPet = urgentLostPets[0];
    const count = urgentLostPets.length;

    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <div class="relative flex-shrink-0">
              <span class="inline-flex items-center justify-center p-2 rounded-xl bg-urgent-500 text-white urgent-badge-glow">
                <i data-lucide="alert-octagon" class="w-5 h-5"></i>
              </span>
            </div>
            
            <div class="text-xs sm:text-sm">
              <div class="font-bold text-urgent-700 dark:text-urgent-400 flex items-center gap-2">
                <span>COMMUNITY EMERGENCY RADAR</span>
                <span class="px-2 py-0.2 text-[10px] bg-urgent-100 dark:bg-urgent-900/80 rounded-full text-urgent-800 dark:text-urgent-300 font-extrabold">
                  ${count} ${count === 1 ? 'Pet Needs Help' : 'Pets Need Help'}
                </span>
              </div>
              <p class="text-slate-700 dark:text-slate-300 line-clamp-1">
                <strong class="font-semibold">${firstPet.category === 'lost' ? 'Lost' : 'Found'}:</strong> ${firstPet.name} (${firstPet.breed}) — <span class="text-slate-500 dark:text-slate-400">${firstPet.location}</span>
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button 
              onclick="window.app.openPetDetails(${firstPet.id})" 
              class="px-3.5 py-1.5 rounded-lg bg-urgent-600 hover:bg-urgent-700 active:bg-urgent-800 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
            >
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              <span>View & Report Sighting</span>
            </button>
            <button 
              onclick="window.app.setTab('lost')" 
              class="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition"
            >
              All Lost/Found (${count})
            </button>
          </div>

        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

window.LostFoundBannerComponent = LostFoundBannerComponent;
