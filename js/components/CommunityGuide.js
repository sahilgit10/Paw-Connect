// Community Guide & Safety Resource View Component

class CommunityGuideComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    this.container.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-8 animate-fade-in py-4">
        
        <!-- Header Banner -->
        <div class="text-center space-y-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 text-xs font-bold">
            <i data-lucide="shield-check" class="w-4 h-4"></i>
            Community Charter & Best Practices
          </div>
          <h2 class="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">Community Care & Safety Guide</h2>
          <p class="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            PawConnect is dedicated to keeping pet adoptions 100% free, safe, and humane while maximizing the chances of lost pet reunions.
          </p>
        </div>

        <!-- Zero-Fee Pledge Card -->
        <div class="p-6 bg-gradient-to-br from-amber-500/10 via-brand-500/10 to-transparent dark:from-brand-950/40 rounded-3xl border border-brand-200 dark:border-brand-900/60 flex flex-col sm:flex-row items-start gap-4">
          <div class="p-3 bg-brand-600 text-white rounded-2xl flex-shrink-0">
            <i data-lucide="heart-handshake" class="w-8 h-8"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Our 100% Free Adoption Guarantee</h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              We strictly prohibit commercial pet breeding, sales, or extortion fees. All adoptions listed on PawConnect are offered out of genuine love for animals. Never pay an upfront deposit or wire money online.
            </p>
          </div>
        </div>

        <!-- 3-Column Guides Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Guide 1: Lost Pet Emergency Action -->
          <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div class="flex items-center gap-3">
              <span class="p-2.5 rounded-xl bg-urgent-100 dark:bg-urgent-950/60 text-urgent-600 dark:text-urgent-400">
                <i data-lucide="alert-octagon" class="w-6 h-6"></i>
              </span>
              <h3 class="font-bold text-slate-900 dark:text-white text-base">Lost Pet Immediate Action Plan</h3>
            </div>
            
            <ul class="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-urgent-100 text-urgent-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span><strong>Post an SOS Alert on PawConnect:</strong> Upload clear photos, last seen area, and distinctive markings immediately.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-urgent-100 text-urgent-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span><strong>Search Immediate 1-Mile Perimeter:</strong> Animals usually stay hidden close to home during the first 24-48 hours.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-urgent-100 text-urgent-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span><strong>Leave Scent Items Outside:</strong> Place their bed, unwashed blanket, or favorite food bowl outside your front door.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-urgent-100 text-urgent-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                <span><strong>Alert Local Vets & Shelters:</strong> Call nearby animal hospitals in case someone brought your pet in for microchip scanning.</span>
              </li>
            </ul>

            <button onclick="window.app.openAddPetModal('lost')" class="w-full py-2.5 bg-urgent-600 hover:bg-urgent-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2">
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>Post Emergency Lost Pet Alert</span>
            </button>
          </div>

          <!-- Guide 2: Found Animal Steps -->
          <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div class="flex items-center gap-3">
              <span class="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <i data-lucide="search" class="w-6 h-6"></i>
              </span>
              <h3 class="font-bold text-slate-900 dark:text-white text-base">Found an Animal? What to do</h3>
            </div>
            
            <ul class="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span><strong>Check for Free Microchip Scan:</strong> Any local veterinary clinic will scan the pet for a microchip for 100% free with no appointment.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span><strong>Publish a "Found Pet" Notice:</strong> Take clear photos and post on PawConnect so the owner can spot them.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span><strong>Verify Ownership:</strong> Ask anyone claiming the pet to provide old photos or vet records before handing over.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                <span><strong>Provide Safe Temporary Shelter:</strong> Keep the animal isolated from your other pets initially with water and food.</span>
              </li>
            </ul>

            <button onclick="window.app.openAddPetModal('found')" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2">
              <i data-lucide="search" class="w-4 h-4"></i>
              <span>Post Found Animal Notice</span>
            </button>
          </div>

        </div>

        <!-- Guide 3: First-time Adopter's Preparation -->
        <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center gap-3">
            <span class="p-2.5 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <i data-lucide="heart" class="w-6 h-6"></i>
            </span>
            <div>
              <h3 class="font-bold text-slate-900 dark:text-white text-base">The 3-3-3 Rule for Pet Adoption</h3>
              <p class="text-xs text-slate-500">What to expect when bringing your newly adopted companion home</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div class="text-brand-600 font-extrabold text-lg mb-1">First 3 Days</div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Feeling overwhelmed, may hide or refuse food. Give them quiet space, patience, and keep a consistent routine.
              </p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div class="text-brand-600 font-extrabold text-lg mb-1">First 3 Weeks</div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Settling in, beginning to understand rules and routines. True personality emerges and bonding deepens.
              </p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div class="text-brand-600 font-extrabold text-lg mb-1">First 3 Months</div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Completely at home, feels safe and secure with family. Unconditional love and lifelong bond formed!
              </p>
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

window.CommunityGuideComponent = CommunityGuideComponent;
