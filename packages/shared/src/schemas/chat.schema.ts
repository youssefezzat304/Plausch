import { array, object, string, TypeOf } from "zod";

export const createChatSchema = object({
  participantIds: array(string())
    .length(2, "Exactly two participants required")
    .refine(([id1, id2]) => id1 !== id2, {
      message: "Cannot create chat with duplicate user IDs",
    }),
});

export type CreateChatInput = TypeOf<typeof createChatSchema>;
