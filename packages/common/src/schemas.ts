import z from "zod";

export const joinRoomSchema = z.object({
    type: z.literal("join_room"),
    roomId: z.number()
});

export const leaveRoomSchema = z.object({
    type: z.literal("leave_room"),
    roomId: z.number()
});

export const chatSchema = z.object({
    type: z.literal("chat"),
    roomId: z.number(),
    message: z.string()
});

export type JoinRoomSchema = z.infer<typeof joinRoomSchema>;
export type LeaveRoomSchema = z.infer<typeof leaveRoomSchema>;
export type ChatSchema = z.infer<typeof chatSchema>;