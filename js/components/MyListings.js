// My Listings Dashboard & Management View

class MyListingsComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    const user = window.pawStore.currentUser;
    const myListings = window.pawStore.pets.filter(p => p.postedBy && p.postedBy.id === user.id);

    const activeCount = myListings.filter(p => p.status === 'active').length;
    const resolvedCount = myListings.filter(p => p.status === 'adopted' || p.status === 'reunited').length;

    this.container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header Profile Banner -->
        <div class="p-6 bg-gradient-to-r from-brand-600 to-amber-600 rounded-3xl text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-4 text-center md:text-left">
            <img src="${user.avatar}" alt="${user.name}" class="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow">
            <div>
              <h2 class="text-2xl font-bold font-heading">${user.name}</h2>
              <p class="text-xs text-brand-100">${user.role} • ${user.city}</p>
              <div class="mt-2 flex flex-wrap gap-2 text-xs">
                <span class="px-2.5 py-1 bg-white/20 rounded-lg backdrop-blur-sm font-semibold">
                  ${activeCount} Active ${activeCount === 1 ? 'Listing' : 'Listings'}
                </span>
                <span class="px-2.5 py-1 bg-white/20 rounded-lg backdrop-blur-sm font-semibold">
                  ${resolvedCount} Happy Reunions / Adoptions
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button 
              onclick="window.app.openAddPetModal('adopt')" 
              class="px-4 py-2.5 rounded-xl bg-white text-brand-700 hover:bg-brand-50 font-bold text-xs shadow transition flex items-center gap-2"
            >
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>List Another Pet</span>
            </button>
            <button 
              onclick="window.app.openChat(null)" 
              class="px-4 py-2.5 rounded-xl bg-brand-800/80 hover:bg-brand-800 text-white font-bold text-xs backdrop-blur-sm transition flex items-center gap-2"
            >
              <i data-lucide="inbox" class="w-4 h-4"></i>
              <span>View Inquiries</span>
            </button>
          </div>
        </div>

        <!-- Listings Grid -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold font-heading text-slate-900 dark:text-white">Your Listed Pets</h3>
            <span class="text-xs text-slate-500">${myListings.length} total items</span>
          </div>

          ${myListings.length === 0 ? `
            <div class="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
              <div class="w-16 h-16 mx-auto mb-4 bg-brand-50 dark:bg-brand-950/40 rounded-full flex items-center justify-center text-brand-600">
                <i data-lucide="paw-print" class="w-8 h-8"></i>
              </div>
              <h4 class="text-lg font-bold text-slate-800 dark:text-slate-200">You haven't listed any pets yet</h4>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                Have a pet needing adoption, or need to alert the neighborhood about a lost or found animal?
              </p>
              <button 
                onclick="window.app.openAddPetModal('adopt')" 
                class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow transition"
              >
                Create Your First Free Listing
              </button>
            </div>
          ` : `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${myListings.map(pet => `
                <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between shadow-sm">
                  
                  <div>
                    <div class="relative aspect-video">
                      <img src="${pet.photos && pet.photos.length > 0 ? pet.photos[0] : window.pawStore.getDefaultImageForType(pet.type)}" class="w-full h-full object-cover">
                      <div class="absolute top-2 left-2">
                        <span class="px-2.5 py-1 text-[11px] font-bold rounded-full text-white ${
                          pet.status === 'adopted' ? 'bg-brand-600' :
                          pet.status === 'reunited' ? 'bg-emerald-600' :
                          pet.category === 'lost' ? 'bg-urgent-600' :
                          pet.category === 'found' ? 'bg-emerald-600' : 'bg-brand-500'
                        }">
                          ${pet.status === 'adopted' ? 'Adopted ❤️' :
                            pet.status === 'reunited' ? 'Reunited 🎉' :
                            pet.category === 'lost' ? 'Lost SOS' :
                            pet.category === 'found' ? 'Found Animal' : 'For Adoption'}
                        </span>
                      </div>
                    </div>

                    <div class="p-4">
                      <div class="flex items-center justify-between">
                        <h4 class="font-bold text-slate-900 dark:text-white">${pet.name}</h4>
                        <span class="text-xs text-slate-400 capitalize">${pet.type}</span>
                      </div>
                      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${pet.breed} • ${pet.location}</p>
                    </div>
                  </div>

                  <!-- Management Bar -->
                  <div class="p-4 pt-0 space-y-2">
                    <div class="grid grid-cols-2 gap-2 text-xs">
                      <button 
                        onclick="window.app.openPetDetails(${pet.id})" 
                        class="py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-center transition"
                      >
                        View Details
                      </button>
                      <button 
                        onclick="window.app.openChat(null)" 
                        class="py-2 px-3 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-semibold rounded-xl text-center transition"
                      >
                        Inquiries
                      </button>
                    </div>

                    ${pet.status === 'active' ? `
                      <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        ${pet.category === 'adopt' ? `
                          <button 
                            onclick="window.pawStore.markAsAdopted(${pet.id}); window.app.showToast('${pet.name} marked as happily Adopted!', 'success'); window.app.setTab('my-listings');" 
                            class="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                          >
                            Mark as Adopted ❤️
                          </button>
                        ` : `
                          <button 
                            onclick="window.pawStore.markAsReunited(${pet.id}); window.app.showToast('${pet.name} marked as Reunited!', 'success'); window.app.setTab('my-listings');" 
                            class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            Mark as Reunited 🎉
                          </button>
                        `}
                        <button 
                          onclick="if(confirm('Delete this listing?')) { window.pawStore.deletePet(${pet.id}); window.app.showToast('Listing deleted.', 'info'); window.app.setTab('my-listings'); }" 
                          class="text-xs text-urgent-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    ` : `
                      <div class="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                        <span class="text-emerald-600 font-semibold">Listing Closed</span>
                        <button 
                          onclick="if(confirm('Delete this listing?')) { window.pawStore.deletePet(${pet.id}); window.app.showToast('Listing deleted.', 'info'); window.app.setTab('my-listings'); }" 
                          class="text-xs text-slate-400 hover:text-urgent-600"
                        >
                          Remove
                        </button>
                      </div>
                    `}
                  </div>

                </div>
              `).join('')}
            </div>
          `}
        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

window.MyListingsComponent = MyListingsComponent;
