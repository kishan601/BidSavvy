export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'buyer' | 'seller';
  skills?: string[];
  profileDescription?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: 'open' | 'in-progress' | 'completed';
  buyerId: string;
  requiredSkills: string[];
};

export type Bid = {
  id:string;
  projectId: string;
  sellerId: string;
  amount: number;
  proposal: string;
  timestamp: string;
  status: 'pending' | 'accepted' | 'rejected';
};

export type Message = {
    id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: string;
};

export type Conversation = {
    id: string;
    participantIds: string[];
    lastMessage: Message;
};
