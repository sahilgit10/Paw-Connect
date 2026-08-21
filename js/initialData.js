// Initial community sample data for PawConnect

window.INITIAL_PETS = [
  {
    id: 1,
    name: "Buddy",
    type: "dog",
    category: "adopt", // 'adopt' | 'lost' | 'found'
    status: "active", // 'active' | 'adopted' | 'reunited'
    breed: "Golden Retriever Mix",
    age: "Young (1.5 years)",
    gender: "Male",
    size: "Large",
    color: "Golden / Cream",
    location: "Green Valley Community, Downtown",
    photos: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Buddy is a cheerful, gentle soul who loves playing fetch and cuddles on the rug. He walks politely on a leash and is completely house-trained. Looking for a loving home with a yard or an active family who enjoys weekend walks. 100% free adoption to a caring home.",
    medical: {
      vaccinated: true,
      neutered: true,
      dewormed: true,
      microchipped: true,
      specialNeeds: false
    },
    temperament: ["Good with kids", "Good with dogs", "House trained", "Playful", "Gentle"],
    postedBy: {
      id: "user_2",
      name: "Marcus Reed",
      role: "Foster Caregiver",
      phone: "+1 (555) 234-8901",
      email: "marcus.foster@pawmail.org",
      city: "Green Valley",
      verified: true
    },
    postedAt: "2026-08-19T14:30:00Z",
    urgent: false
  },
  {
    id: 2,
    name: "Kiko",
    type: "dog",
    category: "lost",
    status: "active",
    breed: "Siberian Husky",
    age: "Adult (3 years)",
    gender: "Male",
    size: "Large",
    color: "Black & White with Ice Blue Eyes",
    location: "Last seen near Riverside Park & 5th Ave",
    photos: [
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=800&q=80"
    ],
    description: "EMERGENCY: Kiko got frightened by thunder and slipped past the back gate yesterday evening. He is wearing a red reflective collar with a silver tag. Very friendly, will come if called with treats. Please report any sightings immediately!",
    lostDetails: {
      lastSeenDate: "2026-08-20 around 7:15 PM",
      distinctiveMarks: "Left ear has a tiny white notch; distinctive blue eyes.",
      collarColor: "Red reflective collar",
      microchipId: "985141002938472"
    },
    sightings: [
      {
        id: "s1",
        reportedBy: "Officer Dave",
        time: "Yesterday, 8:45 PM",
        location: "Near Oakridge Elementary Playground",
        notes: "Saw a husky matching description heading towards East Trail."
      }
    ],
    medical: {
      vaccinated: true,
      neutered: true,
      microchipped: true
    },
    temperament: ["Friendly", "High energy", "Needs urgent help"],
    postedBy: {
      id: "user_3",
      name: "Elena Rostova",
      role: "Pet Parent",
      phone: "+1 (555) 890-4421",
      email: "elena.r@pawmail.org",
      city: "Riverside District",
      verified: true
    },
    postedAt: "2026-08-20T20:00:00Z",
    urgent: true
  },
  {
    id: 3,
    name: "Milo",
    type: "cat",
    category: "adopt",
    status: "active",
    breed: "Tuxedo Domestic Shorthair",
    age: "Kitten (4 months)",
    gender: "Male",
    size: "Small",
    color: "Black & White with white socks",
    location: "Sunnyvale Animal Rescue Foster",
    photos: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Milo was rescued from a stormy parking lot and has turned into the sweetest purr machine! He loves chasing feather wands and curling on laps while you work. Fully litter trained and socialized. Free adoption with all first-year vaccines covered.",
    medical: {
      vaccinated: true,
      neutered: true,
      dewormed: true,
      microchipped: true,
      specialNeeds: false
    },
    temperament: ["Good with cats", "Good with kids", "Cuddle bug", "Playful"],
    postedBy: {
      id: "user_4",
      name: "Emma Watson",
      role: "Rescue Volunteer",
      phone: "+1 (555) 345-6712",
      email: "emma.rescue@pawmail.org",
      city: "Sunnyvale",
      verified: true
    },
    postedAt: "2026-08-18T10:15:00Z",
    urgent: false
  },
  {
    id: 4,
    name: "Found Ginger Tabby",
    type: "cat",
    category: "found",
    status: "active",
    breed: "Orange Tabby",
    age: "Adult (~2 years)",
    gender: "Female",
    size: "Medium",
    color: "Warm Ginger / Striped with white bib",
    location: "Found wandering near Maple Street Library",
    photos: [
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80"
    ],
    description: "FOUND ANIMAL: Very friendly orange tabby cat found sheltering under library porch during rain. No collar, but clearly someone's beloved pet because she is clean, well-fed, and loves human attention. Currently being fostered safely at my home. Please contact me if she is yours!",
    foundDetails: {
      foundDate: "2026-08-20, 11:00 AM",
      currentLocation: "Safe in foster home, Maple St area",
      holdingUntil: "Reunited with owner or shelter intake"
    },
    medical: {
      vaccinated: true,
      neutered: false,
      microchipped: false
    },
    temperament: ["Friendly", "Loves chin scratches", "Very calm"],
    postedBy: {
      id: "user_5",
      name: "Liam O'Connor",
      role: "Community Finder",
      phone: "+1 (555) 778-9900",
      email: "liam.oc@pawmail.org",
      city: "Maple Hill",
      verified: true
    },
    postedAt: "2026-08-20T12:30:00Z",
    urgent: true
  },
  {
    id: 5,
    name: "Bella",
    type: "dog",
    category: "adopt",
    status: "active",
    breed: "Beagle",
    age: "Adult (2 years)",
    gender: "Female",
    size: "Medium",
    color: "Tricolor (Brown, White, Black)",
    location: "Highland Heights",
    photos: [
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Bella is an inquisitive Beagle who loves sniffing trails and greeting neighbors with tail wags. Her previous owner moved overseas and entrusted her to our community foster network. She is calm indoors and loves companionship. Zero adoption cost.",
    medical: {
      vaccinated: true,
      neutered: true,
      dewormed: true,
      microchipped: true,
      specialNeeds: false
    },
    temperament: ["Good with kids", "Good with dogs", "Gentle", "Affectionate"],
    postedBy: {
      id: "user_1", // Belongs to active user!
      name: "Sarah Foster (You)",
      role: "Community Rescuer",
      phone: "+1 (555) 123-4567",
      email: "sarah.foster@pawmail.org",
      city: "Highland Heights",
      verified: true
    },
    postedAt: "2026-08-17T09:00:00Z",
    urgent: false
  },
  {
    id: 6,
    name: "Pip & Sunny",
    type: "bird",
    category: "adopt",
    status: "active",
    breed: "Cockatiel Pair",
    age: "Young (1 year)",
    gender: "Pair (Male & Female)",
    size: "Small",
    color: "Yellow Crest & Grey Pearl",
    location: "Westside Sanctuary",
    photos: [
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Pip & Sunny are a bonded cockatiel pair looking for a home together. They chirp cheerful melodies in the morning and love eating fresh veggies and millet. Comes with large travel cage and favorite perches for free.",
    medical: {
      vaccinated: false,
      neutered: false,
      dewormed: true,
      specialNeeds: false
    },
    temperament: ["Bonded pair", "Whistles tunes", "Gentle"],
    postedBy: {
      id: "user_6",
      name: "Dr. Maya Patel",
      role: "Avian Rescue Volunteer",
      phone: "+1 (555) 667-1122",
      email: "maya.patel@pawmail.org",
      city: "Westside",
      verified: true
    },
    postedAt: "2026-08-16T16:20:00Z",
    urgent: false
  },
  {
    id: 7,
    name: "Oliver",
    type: "cat",
    category: "adopt",
    status: "adopted", // Example of happy adopted story
    breed: "British Shorthair Mix",
    age: "Senior (7 years)",
    gender: "Male",
    size: "Medium",
    color: "Silver Grey",
    location: "Beacon Hills",
    photos: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Oliver found his forever couch with a sweet retired couple! He is loving his sunny windowsill and infinite head rubs.",
    medical: {
      vaccinated: true,
      neutered: true,
      microchipped: true
    },
    temperament: ["Calm", "Senior love", "Quiet"],
    postedBy: {
      id: "user_4",
      name: "Emma Watson",
      role: "Rescue Volunteer",
      phone: "+1 (555) 345-6712",
      email: "emma.rescue@pawmail.org",
      city: "Beacon Hills",
      verified: true
    },
    postedAt: "2026-08-10T11:00:00Z",
    urgent: false
  },
  {
    id: 8,
    name: "Rocky",
    type: "dog",
    category: "lost",
    status: "reunited", // Example of happy reunited story
    breed: "Corgi",
    age: "Adult (4 years)",
    gender: "Male",
    size: "Small",
    color: "Fawn & White",
    location: "Reunited at Oak Park",
    photos: [
      "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=800&q=80"
    ],
    description: "REUNITED! Thanks to a sighting reported by neighbor Mark via PawConnect, Rocky was found safe at the park gazebo within 3 hours!",
    medical: {
      vaccinated: true,
      neutered: true,
      microchipped: true
    },
    temperament: ["Affectionate", "Energetic"],
    postedBy: {
      id: "user_1", // Belongs to active user
      name: "Sarah Foster (You)",
      role: "Community Rescuer",
      phone: "+1 (555) 123-4567",
      email: "sarah.foster@pawmail.org",
      city: "Oak Park",
      verified: true
    },
    postedAt: "2026-08-14T08:00:00Z",
    urgent: false
  }
];

window.INITIAL_USERS = [
  {
    id: "user_1",
    name: "Sarah Foster (You)",
    role: "Community Rescuer & Foster",
    email: "sarah.foster@pawmail.org",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    city: "Highland Heights",
    bio: "Passionate animal advocate fostering rescue pets and helping lost pets find their families.",
    listingsCount: 2
  },
  {
    id: "user_2",
    name: "Marcus Reed",
    role: "Foster Caregiver",
    email: "marcus.foster@pawmail.org",
    phone: "+1 (555) 234-8901",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    city: "Green Valley",
    bio: "Fostering dogs for over 5 years. Believer in second chances.",
    listingsCount: 1
  },
  {
    id: "user_4",
    name: "Emma Watson",
    role: "Rescue Volunteer",
    email: "emma.rescue@pawmail.org",
    phone: "+1 (555) 345-6712",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    city: "Sunnyvale",
    bio: "Cat lover and community shelter volunteer coordinator.",
    listingsCount: 2
  }
];

window.INITIAL_CONVERSATIONS = [
  {
    id: "conv_1",
    petId: 1, // Buddy
    petName: "Buddy",
    petPhoto: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=150&q=80",
    otherUser: {
      id: "user_2",
      name: "Marcus Reed",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    },
    unreadCount: 1,
    lastMessageTime: "10:15 AM",
    messages: [
      {
        id: "m1",
        senderId: "user_1",
        text: "Hi Marcus! I saw Buddy's listing for adoption. We have a fenced backyard in Green Valley and work from home. Is he still looking for a home?",
        timestamp: "Yesterday, 4:20 PM"
      },
      {
        id: "m2",
        senderId: "user_2",
        text: "Hello Sarah! Yes, Buddy is still available! That backyard setup sounds perfect for him. Would you like to do a meet-and-greet this Saturday?",
        timestamp: "Yesterday, 5:10 PM"
      },
      {
        id: "m3",
        senderId: "user_2",
        text: "Feel free to drop by the community park around 2 PM if you are free!",
        timestamp: "10:15 AM"
      }
    ]
  },
  {
    id: "conv_2",
    petId: 2, // Kiko (Lost Husky)
    petName: "Kiko (Lost Husky Alert)",
    petPhoto: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=150&q=80",
    otherUser: {
      id: "user_3",
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
    },
    unreadCount: 0,
    lastMessageTime: "Yesterday",
    messages: [
      {
        id: "m4",
        senderId: "user_1",
        text: "Hi Elena, I saw your emergency alert for Kiko. I shared it with our local walking group in Riverside. We are keeping our eyes open!",
        timestamp: "Yesterday, 8:30 PM"
      },
      {
        id: "m5",
        senderId: "user_3",
        text: "Thank you so much Sarah! Any eyes on the trails help tremendously. God bless you!",
        timestamp: "Yesterday, 8:35 PM"
      }
    ]
  }
];
