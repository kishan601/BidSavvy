'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppContext } from "@/context/app-context";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import { Send } from "lucide-react";
import type { Conversation, User } from '@/lib/types';

export default function MessagesPage() {
    const { currentUser, users, conversations, messages, sendMessage } = useAppContext();
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [messageText, setMessageText] = useState('');

    if (!currentUser) return null;

    const myConversations = conversations.filter(c => c.participantIds.includes(currentUser.id));

    const selectedConversation = myConversations.find(c => c.id === selectedConversationId) || myConversations[0];

    const otherUser = selectedConversation ? users.find(u => u.id === selectedConversation.participantIds.find(id => id !== currentUser.id)) : null;
    
    const conversationMessages = selectedConversation ? messages.filter(m => m.conversationId === selectedConversation.id) : [];

    const handleSendMessage = () => {
        if (messageText.trim() && selectedConversation && currentUser && otherUser) {
            sendMessage(selectedConversation.id, currentUser.id, otherUser.id, messageText);
            setMessageText('');
        }
    };
    
    const handleSelectConversation = (conv: Conversation) => {
        setSelectedConversationId(conv.id);
    }

    return (
        <div className="h-[calc(100vh-8rem)]">
            <h1 className="text-3xl font-bold font-headline mb-4">Messages</h1>
            <Card className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                    <div className="md:border-r h-full flex flex-col">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold">Conversations</h2>
                        </div>
                        <ScrollArea className="flex-grow">
                            {myConversations.map(conv => {
                                const participant = users.find(u => u.id === conv.participantIds.find(id => id !== currentUser!.id));
                                if (!participant) return null;
                                return (
                                    <div key={conv.id} onClick={() => handleSelectConversation(conv)} className={cn("p-4 border-b flex items-start gap-4 cursor-pointer hover:bg-muted/50", selectedConversation?.id === conv.id && "bg-muted")}>
                                        <Avatar>
                                            <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                                            <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow">
                                            <div className="flex justify-between">
                                                <p className="font-semibold">{participant.name}</p>
                                                <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(conv.lastMessage.timestamp), { addSuffix: true })}</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground truncate">{conv.lastMessage.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </ScrollArea>
                    </div>

                    <div className="md:col-span-2 h-full flex flex-col">
                        {selectedConversation && otherUser ? (
                            <>
                                <div className="p-4 border-b flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} />
                                        <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-lg font-semibold">{otherUser.name}</h2>
                                </div>
                                <ScrollArea className="flex-grow p-4">
                                    <div className="space-y-4">
                                    {conversationMessages.map(message => (
                                        <div key={message.id} className={cn("flex items-end gap-2", message.senderId === currentUser.id ? "justify-end" : "justify-start")}>
                                            {message.senderId !== currentUser.id && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} />
                                                    <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            )}
                                             <div className={cn("max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2", message.senderId === currentUser.id ? "bg-primary text-primary-foreground" : "bg-muted")}>
                                                <p>{message.text}</p>
                                                <p className="text-xs opacity-70 mt-1 text-right">{format(new Date(message.timestamp), 'p')}</p>
                                             </div>
                                        </div>
                                    ))}
                                    </div>
                                </ScrollArea>
                                <div className="p-4 border-t">
                                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative">
                                        <Input 
                                            placeholder="Type a message..." 
                                            className="pr-12" 
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                        />
                                        <Button type="submit" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8">
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-muted-foreground">Select a conversation to start messaging.</p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}
