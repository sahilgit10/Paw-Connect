// Community Chat & Direct Messaging Drawer Component

class ChatDrawerComponent {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
    this.activeConvId = null;
  }

  open(convId = null) {
    this.activeConvId = convId;
    if (!this.activeConvId && window.pawStore.conversations.length > 0) {
      this.activeConvId = window.pawStore.conversations[0].id;
    }
    this.render();
  }

  close() {
    this.root.innerHTML = '';
    this.activeConvId = null;
  }

  selectConversation(convId) {
    this.activeConvId = convId;
    const conv = window.pawStore.conversations.find(c => c.id === convId);
    if (conv) {
      conv.unreadCount = 0;
      window.pawStore.save();
    }
    this.render();
  }

  sendMessage(text) {
    if (!this.activeConvId || !text.trim()) return;
    window.pawStore.sendMessage(this.activeConvId, text);
    this.renderChatMessagesOnly();
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const input = e.target.elements['chat-input'];
    const text = input.value.trim();
    if (text) {
      this.sendMessage(text);
      input.value = '';
    }
  }

  sendQuickReply(text) {
    this.sendMessage(text);
  }

  renderChatMessagesOnly() {
    const conv = window.pawStore.conversations.find(c => c.id === this.activeConvId);
    const messagesContainer = document.getElementById('chat-messages-container');
    if (!messagesContainer || !conv) return;

    const currentUser = window.pawStore.currentUser;

    messagesContainer.innerHTML = `
      <div class="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2 mb-4">
        <i data-lucide="shield-alert" class="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5"></i>
        <span><strong>Safety Reminder:</strong> PawConnect is 100% free. Never pay money for adoption or transfer. Meet in public or verified locations.</span>
      </div>

      <div class="space-y-3">
        ${conv.messages.map(m => {
          const isMe = m.senderId === currentUser.id;
          return `
            <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'}">
              <div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm ${
                isMe ? 'chat-bubble-user' : 'chat-bubble-other'
              } shadow-sm">
                <p class="whitespace-pre-line leading-relaxed">${m.text}</p>
              </div>
              <span class="text-[10px] text-slate-400 mt-1 px-1">${m.timestamp}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  render() {
    const conversations = window.pawStore.conversations;
    const activeConv = conversations.find(c => c.id === this.activeConvId) || conversations[0];
    const currentUser = window.pawStore.currentUser;

    this.root.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 modal-backdrop animate-fade-in flex justify-end" onclick="if(event.target === this) window.app.closeChat()">
        
        <div class="w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col sm:flex-row border-l border-slate-200 dark:border-slate-800">
          
          <!-- Conversations Sidebar -->
          <div class="w-full sm:w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col h-1/3 sm:h-full bg-slate-50 dark:bg-slate-950">
            
            <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="message-square" class="w-4 h-4 text-brand-600"></i>
                <span>Direct Inquiries</span>
              </div>
              <button onclick="window.app.closeChat()" class="sm:hidden p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
              ${conversations.length === 0 ? `
                <div class="p-6 text-center text-xs text-slate-400">
                  No active conversations yet. Reach out to any pet poster!
                </div>
              ` : conversations.map(c => {
                const isSelected = activeConv && activeConv.id === c.id;
                return `
                  <button 
                    onclick="window.app.selectConversation('${c.id}')"
                    class="w-full text-left p-3 flex items-center gap-3 transition ${
                      isSelected 
                        ? 'bg-brand-50/80 dark:bg-brand-950/40 border-l-4 border-brand-600' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-900'
                    }"
                  >
                    <div class="relative flex-shrink-0">
                      <img src="${c.petPhoto}" alt="${c.petName}" class="w-10 h-10 rounded-xl object-cover">
                      ${c.unreadCount > 0 ? `
                        <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-600 rounded-full border-2 border-white dark:border-slate-900"></span>
                      ` : ''}
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-slate-800 dark:text-slate-200 truncate">${c.petName}</span>
                        <span class="text-[10px] text-slate-400">${c.lastMessageTime}</span>
                      </div>
                      <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        ${c.otherUser.name}
                      </p>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>

          </div>

          <!-- Main Chat Panel -->
          <div class="flex-1 flex flex-col h-2/3 sm:h-full bg-white dark:bg-slate-900">
            
            ${activeConv ? `
              <!-- Chat Header -->
              <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                <div class="flex items-center gap-3">
                  <img src="${activeConv.petPhoto}" class="w-9 h-9 rounded-xl object-cover">
                  <div>
                    <div class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      ${activeConv.petName}
                      <span class="text-xs font-normal text-slate-400">with ${activeConv.otherUser.name}</span>
                    </div>
                    <div class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Free Community Chat Active
                    </div>
                  </div>
                </div>

                <button onclick="window.app.closeChat()" class="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <i data-lucide="x" class="w-5 h-5"></i>
                </button>
              </div>

              <!-- Message Stream -->
              <div id="chat-messages-container" class="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-slate-950/40">
                <!-- Messages rendered here -->
              </div>

              <!-- Suggested Quick Action Chips -->
              <div class="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <button 
                  onclick="window.app.sendQuickReply('Is ${activeConv.petName} still available for adoption?')" 
                  class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700 text-[11px] font-medium rounded-lg whitespace-nowrap transition"
                >
                  Still available?
                </button>
                <button 
                  onclick="window.app.sendQuickReply('Could we schedule a weekend meet-and-greet?')" 
                  class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700 text-[11px] font-medium rounded-lg whitespace-nowrap transition"
                >
                  Schedule meet-and-greet
                </button>
                <button 
                  onclick="window.app.sendQuickReply('We have a safe yard and experience with this breed.')" 
                  class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700 text-[11px] font-medium rounded-lg whitespace-nowrap transition"
                >
                  Share home details
                </button>
              </div>

              <!-- Message Input Box -->
              <form onsubmit="window.app.handleChatSubmit(event)" class="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <input 
                  type="text" 
                  name="chat-input" 
                  placeholder="Type a friendly community message..." 
                  autocomplete="off"
                  required
                  class="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500"
                >
                <button 
                  type="submit" 
                  class="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <i data-lucide="send" class="w-4 h-4"></i>
                  <span class="hidden sm:inline">Send</span>
                </button>
              </form>
            ` : `
              <div class="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <i data-lucide="message-square-dashed" class="w-12 h-12 mb-3 opacity-40"></i>
                <h4 class="font-bold text-slate-700 dark:text-slate-300">Select a Conversation</h4>
                <p class="text-xs text-slate-500 mt-1">Chat directly with pet foster parents, finders, and adopters.</p>
              </div>
            `}

          </div>

        </div>
      </div>
    `;

    if (activeConv) {
      this.renderChatMessagesOnly();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

window.ChatDrawerComponent = ChatDrawerComponent;
