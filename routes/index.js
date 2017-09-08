/**
 * Copyright © 2017 DOU Networks. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jun 22, 2017
 */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const dashboardController = require('../controllers/DashboardController');
const scheduleController = require('../controllers/ScheduleController');
const workResultController = require('../controllers/WorkResultController');
const rankingController = require('../controllers/RankingController');
const workHistoryController = require('../controllers/WorkHistoryController');
const communityController = require('../controllers/CommunityController');
const quickGuideController = require('../controllers/QuickGuideController');
const rewardController = require('../controllers/RewardController');
const keywordSearchController = require('../controllers/KeyWordSearchController');
const ticBoardController = require('../controllers/TicBoardController');
const leadTimeController = require('../controllers/LeadTimeController');
const cfdTableController = require('../controllers/CfdTableController');
const testGolfGameController = require('../controllers/TestGolfGameController');
const noticeHoleResultController = require('../controllers/NoticeHoleResultController');
const noticeGameResultController = require('../controllers/NoticeGameResultController');
const socketApiController = require('../controllers/SocketController')
const { ROOT, SIGN_IN, SIGN_OUT, DASHBOARD, SCHEDULE, WORK_RESULT, RANKING, WORK_HISTORY,
    COMMUNITY, REWARD, KEYWORD_SEARCH, TIC_BOARD, QUICK_GUIDE, LEAD_TIME, CFD_TABLE, TEST_GOLF_GAME, NOTICE_HOLE_RESULT, NOTICE_GAME_RESULT } =
    require('../configs/constants').ROUTES;

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('../configs/passport');
const RequireAuthenticated = passportConfig.isAuthenticated;

router.get(ROOT, authController.getSignIn);

// router.get(SIGN_IN, authController.getSignIn);
// router.post(SIGN_IN, authController.postSignIn);
router.route(SIGN_IN)
    .get(authController.getSignIn)
    .post(authController.postSignIn);
router.get(SIGN_OUT, authController.signOut);

// Dashboard
router.get(DASHBOARD, dashboardController.getIndex);

// Schedule
router.get(SCHEDULE, scheduleController.getIndex);

//Work Result
router.get(WORK_RESULT, workResultController.getIndex);

//Ranking
router.get(RANKING, rankingController.getIndex);

//Work History
router.get(WORK_HISTORY, workHistoryController.getIndex);

//Community
router.get(COMMUNITY, communityController.getIndex);

//Reward
router.get(REWARD, rewardController.getIndex);

//Keyword Search
router.get(KEYWORD_SEARCH, keywordSearchController.getIndex);

//Tic Board
router.get(TIC_BOARD, ticBoardController.getIndex);

//Quick Guide
router.get(QUICK_GUIDE, quickGuideController.getIndex);

//process type
router.get(LEAD_TIME, leadTimeController.getIndex)
router.get('/getleadtime', leadTimeController.getProcess)
// router.route('/api/addProcess')
//     .get(leadTimeController.addProcess)
//     .post(leadTimeController.addProcess);

//Cumulative
router.get(CFD_TABLE, cfdTableController.getIndex);
router.get('/getCfdTable', cfdTableController.getCumulative);

//Test Gold Game
router.get(TEST_GOLF_GAME, testGolfGameController.getIndex);
router.route('/api/getLevels')
    .get(testGolfGameController.getLevels)
    .post(testGolfGameController.getLevels);
router.route('/api/getPlayGame')
    .get(testGolfGameController.getPlayGame)
    .post(testGolfGameController.getPlayGame);

// Notice Hole Result
router.get(NOTICE_HOLE_RESULT, noticeHoleResultController.getIndex);

//Notice Game Result
router.get(NOTICE_GAME_RESULT, noticeGameResultController.getIndex);

//SocketApi
router.route('/api/socketApi')
    .get(socketApiController.socketApi)
    .post(socketApiController.socketApi);

module.exports = router;
