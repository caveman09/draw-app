import { create } from 'zustand';

interface RoomState {
    currentRoom: string;
    currentChannel: string;
    setCurrentRoom: (room: string) => void;
    setCurrentChannel: (channel: string) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
    currentRoom: '',
    currentChannel: '',
    setCurrentRoom: (room) => set({ currentRoom: room }),
    setCurrentChannel: (channel) => set({ currentChannel: channel }),
}));