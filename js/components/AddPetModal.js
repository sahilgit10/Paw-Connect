// Add Pet Modal Component (Adoption, Lost, and Found Listings)

class AddPetModalComponent {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
    this.currentCategory = 'adopt'; // 'adopt', 'lost', 'found'
    this.uploadedPhotos = [];
  }

  open(initialCategory = 'adopt') {
    this.currentCategory = initialCategory;
    this.uploadedPhotos = [];
    this.render();
  }

  close() {
    this.root.innerHTML = '';
  }

  setCategory(category) {
    this.currentCategory = category;
    this.render();
  }

  handlePhotoUpload(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedPhotos.push(e.target.result);
        this.updatePhotoPreviews();
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  usePresetPhoto(url) {
    this.uploadedPhotos.push(url);
    this.updatePhotoPreviews();
  }

  removePhoto(idx) {
    this.uploadedPhotos.splice(idx, 1);
    this.updatePhotoPreviews();
  }

  updatePhotoPreviews() {
    const previewContainer = document.getElementById('photo-previews-container');
    if (!previewContainer) return;

    if (this.uploadedPhotos.length === 0) {
      previewContainer.innerHTML = `
        <div class="text-center py-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
          <i data-lucide="image-plus" class="w-8 h-8 mx-auto text-slate-400 mb-1"></i>
          <p class="text-xs text-slate-500">Upload or choose a photo below</p>
        </div>
      `;
    } else {
      previewContainer.innerHTML = `
        <div class="flex flex-wrap gap-2">
          ${this.uploadedPhotos.map((p, i) => `
            <div class="relative w-20 h-20 rounded-xl overflow-hidden group border border-slate-300 dark:border-slate-700">
              <img src="${p}" class="w-full h-full object-cover">
              <button 
                type="button" 
                onclick="window.app.removeAddPetPhoto(${i})"
                class="absolute top-1 right-1 w-5 h-5 rounded-full bg-urgent-600 text-white flex items-center justify-center text-xs opacity-90 hover:opacity-100"
              >
                <i data-lucide="x" class="w-3 h-3"></i>
              </button>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const name = form.elements['pet-name'].value.trim();
    const type = form.elements['pet-type'].value;
    const breed = form.elements['pet-breed'].value.trim() || 'Mixed Breed';
    const age = form.elements['pet-age'].value;
    const gender = form.elements['pet-gender'].value;
    const size = form.elements['pet-size'].value;
    const color = form.elements['pet-color'].value.trim();
    const location = form.elements['pet-location'].value.trim();
    const description = form.elements['pet-description'].value.trim();
    const contactPhone = form.elements['contact-phone'].value.trim();
    const contactEmail = form.elements['contact-email'].value.trim();

    // Checkboxes
    const vaccinated = form.elements['med-vaccinated'] ? form.elements['med-vaccinated'].checked : false;
    const neutered = form.elements['med-neutered'] ? form.elements['med-neutered'].checked : false;
    const microchipped = form.elements['med-microchipped'] ? form.elements['med-microchipped'].checked : false;
    const urgent = form.elements['urgent-toggle'] ? form.elements['urgent-toggle'].checked : (this.currentCategory === 'lost');

    // Temperament tags
    const temperamentInput = form.elements['pet-temperament'] ? form.elements['pet-temperament'].value : '';
    const temperament = temperamentInput ? temperamentInput.split(',').map(t => t.trim()).filter(Boolean) : ['Friendly', 'Gentle'];

    // Lost specifics
    const lastSeenDate = form.elements['lost-last-seen'] ? form.elements['lost-last-seen'].value : '';
    const distinctiveMarks = form.elements['lost-marks'] ? form.elements['lost-marks'].value : '';
    const collarColor = form.elements['lost-collar'] ? form.elements['lost-collar'].value : '';

    if (!name) {
      window.app.showToast('Please provide a name or title for the pet listing.', 'error');
      return;
    }
    if (!location) {
      window.app.showToast('Please provide the location/city.', 'error');
      return;
    }

    const newPet = window.pawStore.addPet({
      name,
      type,
      category: this.currentCategory,
      breed,
      age,
      gender,
      size,
      color,
      location,
      description,
      photos: this.uploadedPhotos,
      vaccinated,
      neutered,
      microchipped,
      urgent,
      temperament,
      contactPhone,
      contactEmail,
      lastSeenDate,
      distinctiveMarks,
      collarColor
    });

    const actionName = this.currentCategory === 'lost' ? 'Lost Pet SOS Alert' : this.currentCategory === 'found' ? 'Found Animal Report' : 'Free Adoption Listing';
    window.app.showToast(`🎉 ${actionName} published for "${name}"!`, 'success');
    this.close();
    window.app.setTab(this.currentCategory === 'lost' ? 'lost' : this.currentCategory === 'found' ? 'found' : 'adopt');
  }

  render() {
    const user = window.pawStore.currentUser;

    const presetSamplePhotos = [
      { label: 'Golden Dog', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80' },
      { label: 'Husky / Spitz', url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80' },
      { label: 'Puppy', url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80' },
      { label: 'Tuxedo Cat', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80' },
      { label: 'Orange Tabby', url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80' },
      { label: 'Bird / Cockatiel', url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80' }
    ];

    this.root.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 modal-backdrop flex items-center justify-center p-3 sm:p-5 animate-fade-in" onclick="if(event.target === this) window.app.closeAddPetModal()">
        
        <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-6 sm:p-8 relative">
          
          <!-- Close Button -->
          <button 
            onclick="window.app.closeAddPetModal()" 
            class="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <!-- Header -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="paw-print" class="w-6 h-6 text-brand-600"></i>
              <span>Create Community Pet Listing</span>
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Help a pet find a loving home, or report a lost/found animal to your neighborhood.
            </p>
          </div>

          <!-- Category Selector Tabs -->
          <div class="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6">
            <button 
              type="button" 
              onclick="window.app.setAddPetCategory('adopt')"
              class="py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                this.currentCategory === 'adopt' 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }"
            >
              <i data-lucide="heart" class="w-4 h-4"></i>
              <span>Free Adoption</span>
            </button>

            <button 
              type="button" 
              onclick="window.app.setAddPetCategory('lost')"
              class="py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                this.currentCategory === 'lost' 
                  ? 'bg-urgent-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }"
            >
              <i data-lucide="alert-octagon" class="w-4 h-4"></i>
              <span>Lost Pet (SOS)</span>
            </button>

            <button 
              type="button" 
              onclick="window.app.setAddPetCategory('found')"
              class="py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                this.currentCategory === 'found' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }"
            >
              <i data-lucide="search" class="w-4 h-4"></i>
              <span>Found Animal</span>
            </button>
          </div>

          <!-- Listing Form -->
          <form onsubmit="window.app.handleAddPetSubmit(event)" class="space-y-5">
            
            <!-- Photo Upload Area -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">Pet Photos</label>
              
              <div id="photo-previews-container" class="mb-3">
                <div class="text-center py-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <i data-lucide="image-plus" class="w-8 h-8 mx-auto text-slate-400 mb-1"></i>
                  <p class="text-xs text-slate-500">Upload or choose a preset photo below</p>
                </div>
              </div>

              <!-- Upload file input + Preset buttons -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <label class="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 border border-slate-300 dark:border-slate-700">
                    <i data-lucide="upload" class="w-3.5 h-3.5"></i>
                    <span>Upload from Device</span>
                    <input type="file" accept="image/*" class="hidden" onchange="window.app.handleAddPetPhotoUpload(this)">
                  </label>
                  <span class="text-xs text-slate-400">or click a preset below:</span>
                </div>

                <div class="flex flex-wrap gap-1.5">
                  ${presetSamplePhotos.map(item => `
                    <button 
                      type="button" 
                      onclick="window.app.useAddPetPresetPhoto('${item.url}')"
                      class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700 text-[11px] font-medium rounded-lg transition"
                    >
                      + ${item.label}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Pet Basic Info -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Pet Name / Temporary Name *</label>
                <input 
                  type="text" 
                  name="pet-name" 
                  required 
                  placeholder="e.g. Luna, Milo, Found Puppy"
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
                >
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Animal Species *</label>
                <select 
                  name="pet-type" 
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="other">Other Pet</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Breed</label>
                <input 
                  type="text" 
                  name="pet-breed" 
                  placeholder="e.g. Golden Mix, Domestic Shorthair"
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
                >
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Age</label>
                <select 
                  name="pet-age" 
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Kitten / Puppy (< 1 year)">Kitten / Puppy (< 1 year)</option>
                  <option value="Young (1-2 years)" selected>Young (1-2 years)</option>
                  <option value="Adult (3-6 years)">Adult (3-6 years)</option>
                  <option value="Senior (7+ years)">Senior (7+ years)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                <select 
                  name="pet-gender" 
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown / Pair">Unknown / Pair</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Size</label>
                <select 
                  name="pet-size" 
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Small (< 15 lbs)">Small (< 15 lbs)</option>
                  <option value="Medium (15-40 lbs)" selected>Medium (15-40 lbs)</option>
                  <option value="Large (40+ lbs)">Large (40+ lbs)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Color / Markings</label>
                <input 
                  type="text" 
                  name="pet-color" 
                  placeholder="e.g. Black & White, Ginger Tabby"
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
                >
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Location / Area / City *</label>
                <input 
                  type="text" 
                  name="pet-location" 
                  required 
                  placeholder="e.g. Green Valley, Downtown"
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
                >
              </div>
            </div>

            <!-- Lost Pet Specific Section -->
            ${this.currentCategory === 'lost' ? `
              <div class="p-4 bg-urgent-50 dark:bg-urgent-950/40 rounded-2xl border border-urgent-200 dark:border-urgent-900/60 space-y-3">
                <div class="text-xs font-bold text-urgent-800 dark:text-urgent-300 uppercase tracking-wider flex items-center gap-1.5">
                  <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                  <span>Emergency Lost Pet Details</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Last Seen Date & Time</label>
                    <input 
                      type="text" 
                      name="lost-last-seen" 
                      placeholder="e.g. Today around 3:30 PM"
                      class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-urgent-500"
                    >
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Collar / Tag Description</label>
                    <input 
                      type="text" 
                      name="lost-collar" 
                      placeholder="e.g. Red collar with bell, no collar"
                      class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-urgent-500"
                    >
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Distinctive Marks / Behavior When Approached</label>
                  <input 
                    type="text" 
                    name="lost-marks" 
                    placeholder="e.g. White patch on chest, shy, comes to squeaky toy"
                    class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-urgent-500"
                  >
                </div>
              </div>
            ` : ''}

            <!-- Health & Medical Badges -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">Health & Care Records</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <label class="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium cursor-pointer">
                  <input type="checkbox" name="med-vaccinated" checked class="w-4 h-4 text-brand-600 rounded">
                  <span>Vaccinated</span>
                </label>
                <label class="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium cursor-pointer">
                  <input type="checkbox" name="med-neutered" checked class="w-4 h-4 text-brand-600 rounded">
                  <span>Neutered / Spayed</span>
                </label>
                <label class="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium cursor-pointer">
                  <input type="checkbox" name="med-microchipped" class="w-4 h-4 text-brand-600 rounded">
                  <span>Microchipped</span>
                </label>
              </div>
            </div>

            <!-- Temperament Tags -->
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Personality Traits (Comma separated)</label>
              <input 
                type="text" 
                name="pet-temperament" 
                placeholder="e.g. Good with kids, Gentle, House trained, Cuddle bug"
                class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              >
            </div>

            <!-- Description / Story -->
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Story & Description *</label>
              <textarea 
                name="pet-description" 
                rows="3" 
                required
                placeholder="Describe their personality, daily routine, or circumstances..."
                class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              ></textarea>
            </div>

            <!-- Contact Info -->
            <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div class="text-xs font-bold text-slate-800 dark:text-slate-200">Your Contact Info (For Adopters / Finders)</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  name="contact-phone" 
                  value="${user.phone || ''}"
                  placeholder="Phone number (optional)"
                  class="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100"
                >
                <input 
                  type="email" 
                  name="contact-email" 
                  value="${user.email || ''}"
                  placeholder="Email address"
                  class="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100"
                >
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">
                🔒 In-app messaging is always enabled so interested community members can chat with you safely inside PawConnect.
              </p>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button 
                type="submit" 
                class="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-sm shadow-lg shadow-brand-600/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <i data-lucide="check" class="w-5 h-5"></i>
                <span>Publish Free Listing to Community</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

window.AddPetModalComponent = AddPetModalComponent;
