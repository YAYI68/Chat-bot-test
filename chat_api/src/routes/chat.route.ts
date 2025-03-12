import { Router } from "express";
import {
    createNewChat,
    deleteChat,
    getAllUserMessages,
    getUserChats,
    sendChatMessage
} from "../controllers/chat.controller";
const router = Router();

router.post("/new", createNewChat);
router.post('/message',sendChatMessage )
router.post('/delete',deleteChat )
router.get('/:userId',getUserChats )
router.get('/:chatId/history',getAllUserMessages )
export default router;