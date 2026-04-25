import type { User, Project, Bid, Conversation, Message } from './types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
    role: 'buyer',
  },
  {
    id: 'user-2',
    name: 'Bob Williams',
    email: 'bob@example.com',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
    role: 'seller',
    skills: ['Web Development', 'React', 'Node.js', 'TypeScript'],
    profileDescription: 'Experienced full-stack developer with over 5 years of experience building modern web applications. Proficient in the MERN stack and passionate about creating intuitive user experiences.',
  },
  {
    id: 'user-3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    avatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
    role: 'seller',
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
    profileDescription: 'Creative UI/UX designer focused on crafting beautiful and user-friendly interfaces. Skilled in wireframing, prototyping, and conducting user research to drive design decisions.',
  },
  {
    id: 'user-4',
    name: 'Diana Prince',
    email: 'diana@example.com',
    avatarUrl: 'https://picsum.photos/seed/avatar4/100/100',
    role: 'buyer',
  },
];

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Website Redesign',
    description: 'We are looking for a talented designer to redesign our e-commerce platform. The goal is to improve the user experience and modernize the look and feel. Deliverables include high-fidelity mockups and a style guide.',
    budget: 5000,
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    buyerId: 'user-1',
    requiredSkills: ['UI/UX Design', 'Figma', 'E-commerce'],
  },
  {
    id: 'project-2',
    title: 'Build a REST API for Mobile App',
    description: 'We need a robust REST API for our new mobile application. The API should handle user authentication, data storage, and be scalable. The backend should be built with Node.js and a SQL database.',
    budget: 8000,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    buyerId: 'user-4',
    requiredSkills: ['Node.js', 'REST API', 'PostgreSQL', 'Authentication'],
  },
  {
    id: 'project-3',
    title: 'Develop a React Native Component Library',
    description: 'Seeking a skilled React developer to create a custom component library for our React Native application. The components must be well-documented, tested, and reusable across our mobile projects.',
    budget: 4500,
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in-progress',
    buyerId: 'user-1',
    requiredSkills: ['React Native', 'TypeScript', 'Component Library'],
  },
  {
    id: 'project-4',
    title: 'Data Visualization Dashboard',
    description: 'Create an interactive data visualization dashboard using D3.js or a similar library. The dashboard will display real-time analytics and must be performant and intuitive.',
    budget: 6000,
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    buyerId: 'user-4',
    requiredSkills: ['Data Visualization', 'D3.js', 'React', 'JavaScript'],
  },
];

export const bids: Bid[] = [
  {
    id: 'bid-1',
    projectId: 'project-1',
    sellerId: 'user-3',
    amount: 4800,
    proposal: "I can deliver a modern and clean redesign that will significantly improve user engagement. My portfolio includes several successful e-commerce projects. I'll provide wireframes, mockups, and a full prototype.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: 'bid-2',
    projectId: 'project-2',
    sellerId: 'user-2',
    amount: 7500,
    proposal: 'With my experience in building scalable backends, I am confident I can build a secure and efficient REST API for your mobile app. I will use Node.js, Express, and PostgreSQL to ensure performance and reliability.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: 'bid-3',
    projectId: 'project-1',
    sellerId: 'user-2',
    amount: 5200,
    proposal: "While my primary skill is development, I have a keen eye for design and can create a functional and appealing UI. I can also handle the front-end implementation in React.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'rejected',
  },
   {
    id: 'bid-4',
    projectId: 'project-3',
    sellerId: 'user-2',
    amount: 4200,
    proposal: 'I have extensive experience with React and TypeScript and have built component libraries before. I will ensure the final product is well-tested with Jest and React Testing Library.',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'accepted',
  },
];

const conversation1Messages: Message[] = [
    { id: 'msg-1', conversationId: 'conv-1', senderId: 'user-1', receiverId: 'user-3', text: "Hi Charlie, I really liked your proposal for the e-commerce redesign. Can you share some examples of your previous work?", timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
    { id: 'msg-2', conversationId: 'conv-1', senderId: 'user-3', receiverId: 'user-1', text: "Hello Alice! Absolutely, I'd be happy to. Here's a link to my portfolio: [link]. Let me know what you think!", timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString() },
    { id: 'msg-3', conversationId: 'conv-1', senderId: 'user-1', receiverId: 'user-3', text: "Thanks! Your work looks great. Very impressive.", timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
];

const conversation2Messages: Message[] = [
    { id: 'msg-4', conversationId: 'conv-2', senderId: 'user-4', receiverId: 'user-2', text: "Hi Bob, your bid for the REST API project is interesting. How would you handle scalability?", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { id: 'msg-5', conversationId: 'conv-2', senderId: 'user-2', receiverId: 'user-4', text: "Hi Diana. I plan to use a microservices architecture with load balancing to ensure the API can handle high traffic. We can discuss the specifics further if you'd like.", timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString() },
];

export const messages = [...conversation1Messages, ...conversation2Messages];

export const conversations: Conversation[] = [
    { id: 'conv-1', participantIds: ['user-1', 'user-3'], lastMessage: conversation1Messages[conversation1Messages.length - 1] },
    { id: 'conv-2', participantIds: ['user-4', 'user-2'], lastMessage: conversation2Messages[conversation2Messages.length - 1] },
];

// Mock current user - currently set to a seller. Switch to a buyer to test buyer view.
export const getCurrentUser = (): User => {
  const seller = users.find(u => u.role === 'seller' && u.id === 'user-2');
  if (!seller) throw new Error("Seller with id 'user-2' not found in mock data.");
  return seller;
};

export const getSellerUser = (): User => {
  const seller = users.find(u => u.role === 'seller' && u.id === 'user-2');
  if (!seller) throw new Error("No seller found in mock data.");
  return seller;
}
