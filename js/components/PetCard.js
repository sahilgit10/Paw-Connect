// Pet Card Component

class PetCardComponent {
  static render(pet) {
    const isSaved = window.pawStore.isSaved(pet.id);
    const photo = (pet.photos && pet.photos.length > 0) ? pet.photos[0] : window.pawStore.getDefaultImageForType(pet.type);
    const isMyPet = pet.postedBy && pet.postedBy.id === window.pawStore.currentUser.id;

    // Badge styling based on category and status
    let categoryBadge = '';
    if (pet.status === 'adopted') {
      categoryBadge = `
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-brand-600 text-white shadow-md">
          <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Adopted ❤️
        </span>
      `;
    } else if (pet.status === 'reunited') {
      categoryBadge = `
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
          <i data-lucide="party-popper" class="w-3.5 h-3.5"></i> Reunited 🎉
        </span>
      `;
    } else if (pet.category === 'lost') {
      categoryBadge = `
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-urgent-600 text-white shadow-md urgent-badge-glow">
          <i data-lucide="alert-octagon" class="w-3.5 h-3.5"></i> LOST PET SOS
        </span>
      `;
    } else if (pet.category === 'found') {
      categoryBadge = `
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
          <i data-lucide="search" class="w-3.5 h-3.5"></i> FOUND ANIMAL
        </span>
      `;
    } else {
      categoryBadge = `
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-brand-500 text-white shadow-md">
          <i data-lucide="heart" class="w-3.5 h-3.5 fill-current"></i> Free Adoption
        </span>
      `;
    }

    // Gender icon and badge
    const genderIcon = (pet.gender || '').toLowerCase().includes('female') ? 'venus' : 'mars';
    const genderColor = (pet.gender || '').toLowerCase().includes('female') ? 'text-pink-500' : 'text-blue-500';

    return `
      <div class="pet-card bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between group">
        
        <!-- Image Container -->
        <div class="pet-img-wrapper relative aspect-[4/3] bg-slate-100 dark:bg-slate-800">
          <img 
            src="${photo}" 
            alt="${pet.name}" 
            loading="lazy"
            onerror="this.src='${window.pawStore.getDefaultImageForType(pet.type)}'"
            class="w-full h-full object-cover"
          >
          
          <!-- Category & Status Badge -->
          <div class="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
            ${categoryBadge}
            ${pet.urgent && pet.category !== 'lost' && pet.status === 'active' ? `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-urgent-500 text-white uppercase tracking-wider">
                Urgent
              </span>
            ` : ''}
          </div>

          <!-- Save / Favorite Button -->
          <button 
            onclick="event.stopPropagation(); window.app.toggleSave(${pet.id})" 
            title="${isSaved ? 'Remove from Saved' : 'Save Pet'}"
            class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-110 active:scale-95 transition shadow-md"
          >
            <i data-lucide="heart" class="w-4 h-4 ${isSaved ? 'text-urgent-500 fill-urgent-500' : ''}"></i>
          </button>

          <!-- Location pill at bottom -->
          <div class="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
            <div class="px-2.5 py-1 rounded-lg bg-slate-950/75 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1 truncate max-w-[85%]">
              <i data-lucide="map-pin" class="w-3 h-3 text-brand-400 flex-shrink-0"></i>
              <span class="truncate">${pet.location}</span>
            </div>
            <div class="px-2 py-1 rounded-lg bg-slate-950/75 backdrop-blur-sm text-white text-[11px] font-semibold">
              ${pet.age.split(' ')[0]}
            </div>
          </div>
        </div>

        <!-- Content Area -->
        <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          
          <div>
            <!-- Header: Name & Gender -->
            <div class="flex items-start justify-between gap-2">
              <div>
                <h3 class="text-lg font-bold font-heading text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition flex items-center gap-1.5">
                  ${pet.name}
                  <span title="${pet.gender}" class="${genderColor} text-xs">
                    <i data-lucide="${genderIcon}" class="w-3.5 h-3.5"></i>
                  </span>
                </h3>
                <p class="text-xs font-medium text-slate-500 dark:text-slate-400">${pet.breed} • ${pet.size || 'Medium'}</p>
              </div>
            </div>

            <!-- Lost Pet Specific Info / Sighting alert -->
            ${pet.category === 'lost' && pet.lostDetails ? `
              <div class="mt-2.5 p-2 bg-urgent-50 dark:bg-urgent-950/40 rounded-xl border border-urgent-100 dark:border-urgent-900/50 text-xs text-urgent-800 dark:text-urgent-300">
                <div class="font-bold flex items-center gap-1">
                  <i data-lucide="clock" class="w-3 h-3"></i> Last Seen: ${pet.lostDetails.lastSeenDate}
                </div>
                <div class="text-[11px] text-urgent-700 dark:text-urgent-400 mt-0.5 truncate">
                  ${pet.lostDetails.distinctiveMarks}
                </div>
              </div>
            ` : ''}

            <!-- Description summary -->
            <p class="mt-2.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              ${pet.description}
            </p>

            <!-- Tags / Traits -->
            <div class="mt-3 flex flex-wrap gap-1">
              ${(pet.temperament || []).slice(0, 3).map(trait => `
                <span class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                  ${trait}
                </span>
              `).join('')}
              ${pet.medical && pet.medical.vaccinated ? `
                <span class="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <i data-lucide="shield-check" class="w-2.5 h-2.5"></i> Vaccinated
                </span>
              ` : ''}
            </div>
          </div>

          <!-- Poster & Action Footer -->
          <div class="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                ${pet.postedBy ? pet.postedBy.name.charAt(0) : 'P'}
              </div>
              <div class="truncate text-[11px] text-slate-500 dark:text-slate-400">
                ${pet.postedBy ? (isMyPet ? '<span class="text-brand-600 dark:text-brand-400 font-bold">You</span>' : pet.postedBy.name) : 'Community'}
              </div>
            </div>

            <!-- Primary Card Button -->
            <button 
              onclick="window.app.openPetDetails(${pet.id})" 
              class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                pet.category === 'lost' && pet.status === 'active'
                  ? 'bg-urgent-600 hover:bg-urgent-700 text-white shadow-sm'
                  : 'bg-brand-50 hover:bg-brand-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-brand-600 dark:text-brand-400'
              }"
            >
              <span>${pet.category === 'lost' ? 'Report Sighting' : 'View Details'}</span>
              <i data-lucide="arrow-right" class="w-3 h-3"></i>
            </button>

          </div>

        </div>

      </div>
    `;
  }
}

window.PetCardComponent = PetCardComponent;
