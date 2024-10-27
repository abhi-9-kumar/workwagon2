import express from 'express';
import { getAllJobs, getMyJobs, postJob,updateJob,deleteJob,getSingleJob, verifyJob } from '../controllers/jobController.js';
import {isAuthorized, isAdmin} from '../middlewares/auth.js';

const router = express.Router();

router.get("/getall",getAllJobs);
router.post("/post",isAuthorized ,postJob);
router.get("/getmyjobs",isAuthorized,getMyJobs);
router.put("/update/:id",isAuthorized,updateJob);
router.delete("/delete/:id",isAuthorized,deleteJob);
router.get("/:id", isAuthorized, getSingleJob);
router.patch("/verify/:id",isAdmin ,verifyJob);

export default router;