'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Project, Bid, Conversation, Message } from '@/lib/types';
import { users as initialUsers, projects as initialProjects, bids as initialBids, conversations as initialConversations, messages as initialMessages } from './initial-data';
import { useRouter } from 'next/navigation';
import { placeBid } from '@/lib/bidding';

interface AppContextType {
    currentUser: User | null;
    isLoading: boolean;
    users: User[];
    projects: Project[];
    bids: Bid[];
    conversations: Conversation[];
    messages: Message[];
    login: (email: string) => boolean;
    logout: () => void;
    register: (details: { name: string; email: string; role: 'buyer' | 'seller' }) => boolean;
    addProject: (project: Omit<Project, 'id' | 'status'>) => void;
    addBid: (bid: Omit<Bid, 'id' | 'createdAt' | 'status'>) => void;
    acceptBid: (bidId: string, projectId: string) => void;
    updateUserProfile: (details: Partial<User>) => void;
    addSkillToUser: (skill: string) => void;
    removeSkillFromUser: (skill: string) => void;
    sendMessage: (conversationId: string, senderId: string, receiverId: string, text: string) => void;
    createConversation: (participantIds: string[]) => Conversation;
    getConversation: (participantIds: string[]) => Conversation | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') {
      return null
    }
    try {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null
    }
  });
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [bids, setBids] = useState<Bid[]>(initialBids);
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const router = useRouter();

    const login = (email: string): boolean => {
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user) {
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        router.push('/');
    };

    const register = (details: { name: string; email: string; role: 'buyer' | 'seller' }): boolean => {
        if (users.some(u => u.email.toLowerCase() === details.email.toLowerCase())) {
            return false; // User already exists
        }
        const newUser: User = {
            id: `user-${Date.now()}`,
            name: details.name,
            email: details.email,
            role: details.role,
            avatarUrl: `https://picsum.photos/seed/${Date.now()}/100/100`,
        };
        setUsers(prevUsers => [...prevUsers, newUser]);
        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        return true;
    };
    
    const addProject = (project: Omit<Project, 'id' | 'status'>) => {
        const newProject: Project = {
            ...project,
            id: `project-${Date.now()}`,
            status: 'open'
        };
        setProjects(prev => [...prev, newProject]);
    }
    
    const addBid = (bidDetails: Omit<Bid, 'id' | 'createdAt' | 'status'>) => {
        const result = placeBid(bids, projects, bidDetails);

        if (result.success) {
            setBids(result.bids);
        } else {
            // In a real app, you'd use a toast notification or a more elegant error display.
            alert(`Error placing bid: ${result.message}`);
        }
    }
    
    const acceptBid = (bidId: string, projectId: string) => {
        setBids(prev => prev.map(b => {
            if (b.projectId === projectId) {
                // Reject all other bids for this project
                return b.id === bidId ? { ...b, status: 'accepted' } : { ...b, status: 'rejected' };
            }
            return b;
        }));
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'in-progress' } : p));
    }
    
    const updateUserProfile = (details: Partial<User>) => {
        if (!currentUser) return;
        const updatedUser = { ...currentUser, ...details };
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }

    const addSkillToUser = (skill: string) => {
        if (!currentUser || currentUser.role !== 'seller' || (currentUser.skills && currentUser.skills.includes(skill))) return;
        const skills = [...(currentUser.skills || []), skill];
        updateUserProfile({ ...currentUser, skills });
    }
    
    const removeSkillFromUser = (skill: string) => {
        if (!currentUser || !currentUser.skills) return;
        const skills = currentUser.skills.filter(s => s !== skill);
        updateUserProfile({ ...currentUser, skills });
    }
    
    const sendMessage = (conversationId: string, senderId: string, receiverId: string, text: string) => {
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            conversationId,
            senderId,
            receiverId,
            text,
            createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, newMessage]);
        setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, lastMessage: newMessage } : c));
    }

    const createConversation = (participantIds: string[]): Conversation => {
        const existingConversation = getConversation(participantIds);
        if (existingConversation) {
            return existingConversation;
        }

        const newConversation: Conversation = {
            id: `conv-${Date.now()}`,
            participantIds,
            lastMessage: null,
        };

        setConversations(prev => [...prev, newConversation]);
        return newConversation;
    };

    const getConversation = (participantIds: string[]): Conversation | null => {
        return conversations.find(c => 
            c.participantIds.length === participantIds.length && 
            c.participantIds.every(id => participantIds.includes(id))
        ) || null;
    };

    const value = {
        currentUser,
        isLoading,
        users,
        projects,
        bids,
        conversations,
        messages,
        login,
        logout,
        register,
        addProject,
        addBid,
        acceptBid,
        updateUserProfile,
        addSkillToUser,
        removeSkillFromUser,
        sendMessage,
        createConversation,
        getConversation,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
