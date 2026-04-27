export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'buyer' | 'seller';
  skills?: string[];
  profileDescription?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: 'open' | 'in-progress' | 'completed' | 'canceled';
  buyerId: string;
  requiredSkills: string[];
}

export interface Bid {
  id: string;
  projectId: string;
  sellerId: string;
  amount: number;
  proposal: string;
  createdAt: string; // Changed from timestamp
  status: 'pending' | 'accepted' | 'rejected' | 'invalid';
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string; // Changed from timestamp
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: Message | null;
}
