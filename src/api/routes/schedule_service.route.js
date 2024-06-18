import express from 'express'
import * as ScheduleService  from '../controllers/schedule_service.controller';

const router = express.Router();

router.post('/schedule/booking',ScheduleService.bookingScheduleService);
router.get('/schedule/all-schedule',ScheduleService.allScheduleService);


export default router
