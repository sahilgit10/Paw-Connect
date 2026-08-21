# 🐾 PawConnect — Free Community Pet Adoption & Lost/Found Hub

A free, non-commercial, community-first web platform where pet owners, animal lovers, and rescuers can list pets for free adoption, report lost pets, post found animals, and securely communicate directly with one another.

---

## ✨ Key Features

### 1. 🐶 Free Pet Adoption
- **Zero Fees & No Selling Allowed**: 100% community-driven and free to ensure humane pet adoption.
- **Rich Pet Profiles**: High-resolution photos, temperament tags (e.g. *Good with kids*, *Good with dogs*, *House trained*), medical & vaccination records (Vaccinated, Spayed/Neutered, Microchipped).
- **Direct Adoption Inquiry Flow**: Interested adopters can send a structured home application directly to the caregiver.

### 2. 🚨 Lost & Found Emergency Radar
- **Emergency SOS Badges**: High-contrast urgency badges, last-seen date/time, exact landmark/neighborhood, distinctive markings, collar color, and microchip ID.
- **Found Animal Reports**: Good Samaritans can post found pets with temporary shelter locations to quickly reunite them.
- **Community Sighting Radar**: Any neighbor who spots a lost pet can submit a **Sighting Report** with location, timestamp, and notes to immediately alert the pet parent.

### 3. 💬 Direct In-App Messaging & Contact Hub
- **Live In-App Chat**: Chat directly between foster parents, finders, and potential adopters with conversation management.
- **Multi-Channel Contact**: Instant WhatsApp direct chat links, phone calling, and email buttons.
- **Instant Response Simulation**: Real-time simulated community responses when testing in demo mode.

### 4. 📋 My Listings & Saved Pets
- **Listings Dashboard**: Easily manage your posted pets, edit details, or celebrate with **"Mark as Adopted ❤️"** or **"Mark as Reunited 🎉"** statuses.
- **Saved / Favorites**: Bookmark pets to keep track of their status.

### 5. 🛡️ Community Care & Safety Guides
- 3-3-3 Rule guide for newly adopted pets.
- Step-by-step emergency checklist for lost pets.
- Free veterinary microchip scan advice.

---

## 🚀 How to Run PawConnect

### Option 1: One-Click Launch (Recommended)
Right-click `start_server.ps1` and select **Run with PowerShell**, or in PowerShell run:
```powershell
.\start_server.ps1
```
*This starts a lightweight local server and automatically opens `http://localhost:8080` in your default browser.*

### Option 2: Open Directly in Any Web Browser
Simply double-click [`index.html`](file:///C:/Users/ayush/.gemini/antigravity/scratch/pawconnect/index.html) to open it in Chrome, Edge, Firefox, or Safari.

---

## 📁 Project Structure

```
pawconnect/
├── index.html                 # Main Single Page Application shell
├── start_server.ps1           # Zero-dependency PowerShell local web server
├── README.md                  # Documentation and quickstart guide
├── css/
│   └── styles.css             # Glassmorphism, animations, custom scrollbars, badges
└── js/
    ├── app.js                 # App controller, event handlers, and toast manager
    ├── store.js               # Reactive state manager with LocalStorage sync
    ├── initialData.js         # Realistic initial community pet and chat data
    └── components/
        ├── Navbar.js          # Navigation, search, user persona switcher, theme toggle
        ├── LostFoundBanner.js # Emergency banner for missing animals
        ├── Filters.js         # Search pills, species filters, medical & urgency toggles
        ├── PetCard.js         # Card component with badges, favorites, and action buttons
        ├── PetDetailsModal.js # Full modal with adoption application & sighting radar
        ├── AddPetModal.js     # Form for Adoption, Lost, and Found listings
        ├── ChatDrawer.js      # In-app messaging drawer with live threads
        ├── MyListings.js      # User listing management & resolution dashboard
        └── CommunityGuide.js  # Safety guidelines & lost pet recovery checklist
```
