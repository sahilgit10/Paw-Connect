// Pet Details Modal Component

class PetDetailsModalComponent {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
    this.activePet = null;
    this.selectedPhotoIndex = 0;
  }

  open(petId) {
    const pet = window.pawStore.pets.find(p => p.id === Number(petId));
    if (!pet) return;

    this.activePet = pet;
    this.selectedPhotoIndex = 0;
    this.render();
  }

  close() {
    this.root.innerHTML = '';
    this.activePet = null;
  }

  selectPhoto(idx) {
    this.selectedPhotoIndex = idx;
    const mainImg = document.getElementById('modal-main-image');
    if (mainImg && this.activePet.photos[idx]) {
      mainImg.src = this.activePet.photos[idx];
    }
  }

  submitSighting(e) {
    e.preventDefault();
    const form = e.target;
    const location = form.elements['sighting-location'].value;
    const time = form.elements['sighting-time'].value;
    const notes = form.elements['sighting-notes'].value;

    if (!location.trim()) {
      window.app.showToast('Please enter the location where you saw the pet.', 'error');
      return;
    }

    const sighting = window.pawStore.addSighting(this.activePet.id, {
      location,
      time,
      notes
    });

    window.app.showToast('Sighting reported! The pet parent has been notified.', 'success');
    form.reset();
    this.render(); // re-render with updated sightings list
  }

  sendAdoptionInquiry(e) {
    e.preventDefault();
    const form = e.target;
    const intro = form.elements['inquiry-intro'].value;
    const homeType = form.elements['inquiry-home'].value;
    const petExperience = form.elements['inquiry-exp'].value;

    const messageText = `🐾 ADOPTION APPLICATION & INQUIRY for ${this.activePet.name}:
• Home Environment: ${homeType}
• Pet Experience: ${petExperience}
• Message: ${intro}`;

    // Create conversation & send message
    const conv = window.pawStore.getOrCreateConversation(this.activePet.id, this.activePet.postedBy);
    window.pawStore.sendMessage(conv.id, messageText);

    window.app.showToast(`Adoption inquiry sent to ${this.activePet.postedBy.name}!`, 'success');
    this.close();
    window.app.openChat(conv.id);
  }

  render() {
    const pet = this.activePet;
    if (!pet) return;

    const isSaved = window.pawStore.isSaved(pet.id);
    const photos = pet.photos && pet.photos.length > 0 ? pet.photos : [window.pawStore.getDefaultImageForType(pet.type)];
    const isMyPet = pet.postedBy && pet.postedBy.id === window.pawStore.currentUser.id;

    // Contact links
    const phoneClean = pet.postedBy ? (pet.postedBy.phone || '').replace(/[^0-9+]/g, '') : '';
    const whatsappUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent(`Hi, I'm reaching out via PawConnect about ${pet.name} (${pet.category === 'lost' ? 'Lost Pet' : 'Free Adoption'})!`)}`;

    this.root.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 modal-backdrop flex items-center justify-center p-3 sm:p-5 animate-fade-in" onclick="if(event.target === this) window.app.closePetDetails()">
        
        <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 relative">
          
          <!-- Sticky Close Button -->
          <button 
            onclick="window.app.closePetDetails()" 
            class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            <!-- Left Column: Photo Gallery -->
            <div class="lg:col-span-5 bg-slate-950 p-4 sm:p-6 flex flex-col justify-between rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl">
              <div>
                <div class="relative rounded-2xl overflow-hidden aspect-square bg-slate-900 shadow-inner">
                  <img 
                    id="modal-main-image"
                    src="${photos[this.selectedPhotoIndex] || photos[0]}" 
                    alt="${pet.name}" 
                    class="w-full h-full object-cover transition duration-300"
                  >
                  
                  <!-- Top Badge -->
                  <div class="absolute top-3 left-3">
                    ${pet.category === 'lost' ? `
                      <span class="px-3 py-1 bg-urgent-600 text-white text-xs font-bold rounded-full shadow urgent-badge-glow flex items-center gap-1.5">
                        <i data-lucide="alert-octagon" class="w-3.5 h-3.5"></i> LOST PET SOS
                      </span>
                    ` : pet.category === 'found' ? `
                      <span class="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full shadow flex items-center gap-1.5">
                        <i data-lucide="search" class="w-3.5 h-3.5"></i> FOUND ANIMAL
                      </span>
                    ` : `
                      <span class="px-3 py-1 bg-brand-600 text-white text-xs font-bold rounded-full shadow flex items-center gap-1.5">
                        <i data-lucide="heart" class="w-3.5 h-3.5 fill-current"></i> 100% Free Adoption
                      </span>
                    `}
                  </div>

                  <!-- Save Bookmark Button -->
                  <button 
                    onclick="window.app.toggleSave(${pet.id}); window.app.openPetDetails(${pet.id});" 
                    class="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 backdrop-blur-md flex items-center justify-center transition"
                  >
                    <i data-lucide="heart" class="w-4 h-4 ${isSaved ? 'text-urgent-500 fill-urgent-500' : ''}"></i>
                  </button>
                </div>

                <!-- Thumbnails if multi-image -->
                ${photos.length > 1 ? `
                  <div class="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                    ${photos.map((img, i) => `
                      <button 
                        onclick="window.app.selectModalPhoto(${i})"
                        class="w-16 h-16 rounded-xl overflow-hidden border-2 transition ${i === this.selectedPhotoIndex ? 'border-brand-500 ring-2 ring-brand-500/30' : 'border-slate-800 opacity-60 hover:opacity-100'}"
                      >
                        <img src="${img}" class="w-full h-full object-cover">
                      </button>
                    `).join('')}
                  </div>
                ` : ''}
              </div>

              <!-- Poster Contact Card -->
              <div class="mt-6 pt-4 border-t border-slate-800 text-white">
                <div class="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2">Listed By</div>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                    ${pet.postedBy ? pet.postedBy.name.charAt(0) : 'P'}
                  </div>
                  <div>
                    <div class="font-bold text-sm text-white flex items-center gap-1.5">
                      ${pet.postedBy ? pet.postedBy.name : 'Community Poster'}
                      ${pet.postedBy && pet.postedBy.verified ? '<i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400"></i>' : ''}
                    </div>
                    <div class="text-xs text-slate-400">${pet.postedBy ? pet.postedBy.role : 'Community Member'} • ${pet.postedBy ? pet.postedBy.city : ''}</div>
                  </div>
                </div>

                <!-- Direct Action Buttons -->
                <div class="mt-4 flex flex-col gap-2">
                  <button 
                    onclick="window.app.startDirectChat(${pet.id})" 
                    class="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow"
                  >
                    <i data-lucide="message-circle" class="w-4 h-4"></i>
                    <span>Chat in App Directly</span>
                  </button>

                  <div class="grid grid-cols-2 gap-2">
                    ${phoneClean ? `
                      <a 
                        href="tel:${phoneClean}" 
                        class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition"
                      >
                        <i data-lucide="phone" class="w-3.5 h-3.5 text-emerald-400"></i> Call
                      </a>
                      <a 
                        href="${whatsappUrl}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition"
                      >
                        <i data-lucide="send" class="w-3.5 h-3.5"></i> WhatsApp
                      </a>
                    ` : ''}
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Pet Details & Application / Sighting Form -->
            <div class="lg:col-span-7 p-6 sm:p-8 space-y-6">
              
              <!-- Header Info -->
              <div>
                <div class="flex items-center justify-between">
                  <h2 class="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    ${pet.name}
                  </h2>
                  <span class="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                    ${pet.gender} • ${pet.size || 'Medium'}
                  </span>
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span class="font-semibold text-brand-600 dark:text-brand-400">${pet.breed}</span>
                  <span>•</span>
                  <span>${pet.age}</span>
                  <span>•</span>
                  <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> ${pet.location}</span>
                </div>
              </div>

              <!-- Status Banner if Reunited / Adopted -->
              ${pet.status === 'adopted' ? `
                <div class="p-3 bg-brand-50 dark:bg-brand-950/40 rounded-2xl border border-brand-200 dark:border-brand-900 text-brand-800 dark:text-brand-300 flex items-center gap-3">
                  <i data-lucide="heart" class="w-6 h-6 text-brand-500 fill-current"></i>
                  <div>
                    <strong class="font-bold">Happy Update!</strong> This pet has found their forever family.
                  </div>
                </div>
              ` : pet.status === 'reunited' ? `
                <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
                  <i data-lucide="party-popper" class="w-6 h-6 text-emerald-500"></i>
                  <div>
                    <strong class="font-bold">Reunited with Family!</strong> Thanks to our wonderful community heroes.
                  </div>
                </div>
              ` : ''}

              <!-- Pet Story / Description -->
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About ${pet.name}</h4>
                <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  ${pet.description}
                </p>
              </div>

              <!-- Quick Specs Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span class="text-slate-400 block">Color</span>
                  <strong class="text-slate-800 dark:text-slate-200">${pet.color || 'Standard'}</strong>
                </div>
                <div>
                  <span class="text-slate-400 block">Species</span>
                  <strong class="text-slate-800 dark:text-slate-200 capitalize">${pet.type}</strong>
                </div>
                <div>
                  <span class="text-slate-400 block">Vaccinations</span>
                  <strong class="${pet.medical && pet.medical.vaccinated ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600'}">
                    ${pet.medical && pet.medical.vaccinated ? 'Up to Date' : 'Check with owner'}
                  </strong>
                </div>
                <div>
                  <span class="text-slate-400 block">Spayed / Neutered</span>
                  <strong class="text-slate-800 dark:text-slate-200">
                    ${pet.medical && pet.medical.neutered ? 'Yes' : 'No'}
                  </strong>
                </div>
                <div>
                  <span class="text-slate-400 block">Microchipped</span>
                  <strong class="text-slate-800 dark:text-slate-200">
                    ${pet.medical && pet.medical.microchipped ? 'Yes' : 'No / Unknown'}
                  </strong>
                </div>
                <div>
                  <span class="text-slate-400 block">Adoption Fee</span>
                  <strong class="text-brand-600 dark:text-brand-400 font-bold">$0.00 (Free)</strong>
                </div>
              </div>

              <!-- Temperament & Behaviors -->
              ${pet.temperament && pet.temperament.length > 0 ? `
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Traits & Compatibility</h4>
                  <div class="flex flex-wrap gap-1.5">
                    ${pet.temperament.map(t => `
                      <span class="px-2.5 py-1 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-900 rounded-lg text-xs font-semibold">
                        ${t}
                      </span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- LOST PET EMERGENCY SIGHTINGS SECTION -->
              ${pet.category === 'lost' && pet.status === 'active' ? `
                <div class="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <div class="p-4 bg-urgent-50 dark:bg-urgent-950/50 rounded-2xl border border-urgent-200 dark:border-urgent-900/60">
                    <div class="flex items-center gap-2 text-urgent-700 dark:text-urgent-300 font-bold text-sm mb-2">
                      <i data-lucide="eye" class="w-4 h-4"></i>
                      <span>Emergency Sighting Radar</span>
                    </div>

                    <!-- Sightings Timeline -->
                    ${pet.sightings && pet.sightings.length > 0 ? `
                      <div class="space-y-2 mb-4">
                        ${pet.sightings.map(s => `
                          <div class="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-xs border border-urgent-100 dark:border-urgent-900/40">
                            <div class="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                              <span>📍 ${s.location}</span>
                              <span class="text-[10px] text-slate-400">${s.time}</span>
                            </div>
                            <p class="text-slate-600 dark:text-slate-400 mt-1">${s.notes}</p>
                          </div>
                        `).join('')}
                      </div>
                    ` : `
                      <p class="text-xs text-slate-600 dark:text-slate-400 mb-3">No sightings reported yet. If you have seen this pet, please report below!</p>
                    `}

                    <!-- Report Sighting Form -->
                    <form onsubmit="window.app.handleSightingSubmit(event)" class="space-y-2.5 pt-2 border-t border-urgent-200/60 dark:border-urgent-900/60">
                      <div class="text-xs font-bold text-slate-800 dark:text-slate-200">Report a New Sighting</div>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input 
                          type="text" 
                          name="sighting-location" 
                          placeholder="Where did you spot the pet? (e.g. Near Park entrance)" 
                          required
                          class="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-urgent-500"
                        >
                        <input 
                          type="text" 
                          name="sighting-time" 
                          placeholder="When? (e.g. 10 minutes ago, 8:00 AM)" 
                          required
                          class="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-urgent-500"
                        >
                      </div>
                      <textarea 
                        name="sighting-notes" 
                        rows="2" 
                        placeholder="Details (heading in what direction? wearing collar?)" 
                        class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-urgent-500"
                      ></textarea>
                      <button 
                        type="submit" 
                        class="w-full py-2 bg-urgent-600 hover:bg-urgent-700 active:bg-urgent-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5"
                      >
                        <i data-lucide="send" class="w-3.5 h-3.5"></i>
                        <span>Submit Sighting to Owner</span>
                      </button>
                    </form>
                  </div>
                </div>
              ` : ''}

              <!-- ADOPT ME INQUIRY FORM (FOR ADOPTABLE ACTIVE PETS) -->
              ${pet.category === 'adopt' && pet.status === 'active' && !isMyPet ? `
                <div class="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div class="bg-brand-50/60 dark:bg-slate-800/60 p-4 rounded-2xl border border-brand-100 dark:border-slate-700">
                    <h4 class="text-xs font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <i data-lucide="heart-handshake" class="w-4 h-4"></i>
                      <span>Interested in Adopting ${pet.name}?</span>
                    </h4>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mb-3">
                      Send a free community inquiry directly to the caregiver with a few quick details about your home:
                    </p>
                    
                    <form onsubmit="window.app.handleAdoptionInquirySubmit(event)" class="space-y-2.5">
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <select 
                          name="inquiry-home" 
                          class="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="House with fenced yard">House with fenced yard</option>
                          <option value="Apartment / Condo">Apartment / Condo</option>
                          <option value="Farm / Rural property">Farm / Rural property</option>
                        </select>
                        <select 
                          name="inquiry-exp" 
                          class="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="Experienced pet parent">Experienced pet parent</option>
                          <option value="First-time pet parent">First-time pet parent</option>
                          <option value="Have other pets currently">Have other pets currently</option>
                        </select>
                      </div>

                      <textarea 
                        name="inquiry-intro" 
                        rows="2" 
                        placeholder="Hi! I'd love to introduce myself and ask about ${pet.name}..." 
                        required
                        class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-brand-500"
                      ></textarea>

                      <button 
                        type="submit" 
                        class="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                      >
                        <i data-lucide="mail" class="w-4 h-4"></i>
                        <span>Send Free Adoption Inquiry</span>
                      </button>
                    </form>
                  </div>
                </div>
              ` : ''}

              <!-- If this is user's own pet, show quick status manager -->
              ${isMyPet ? `
                <div class="pt-4 border-t border-slate-200 dark:border-slate-800 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                  <div class="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">Manage Your Listing:</div>
                  <div class="flex flex-wrap gap-2">
                    ${pet.status === 'active' && pet.category === 'adopt' ? `
                      <button 
                        onclick="window.pawStore.markAsAdopted(${pet.id}); window.app.showToast('${pet.name} marked as happily Adopted!', 'success'); window.app.openPetDetails(${pet.id});" 
                        class="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition"
                      >
                        Mark as Adopted ❤️
                      </button>
                    ` : ''}
                    ${pet.status === 'active' && (pet.category === 'lost' || pet.category === 'found') ? `
                      <button 
                        onclick="window.pawStore.markAsReunited(${pet.id}); window.app.showToast('${pet.name} marked as Reunited!', 'success'); window.app.openPetDetails(${pet.id});" 
                        class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition"
                      >
                        Mark as Reunited 🎉
                      </button>
                    ` : ''}
                    <button 
                      onclick="if(confirm('Delete this listing?')) { window.pawStore.deletePet(${pet.id}); window.app.closePetDetails(); window.app.showToast('Listing deleted.', 'info'); }" 
                      class="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-urgent-600 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition"
                    >
                      Delete Listing
                    </button>
                  </div>
                </div>
              ` : ''}

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

window.PetDetailsModalComponent = PetDetailsModalComponent;
