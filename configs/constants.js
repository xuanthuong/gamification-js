/**
 * Copyright © 2017 DOU Networks. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jun 22, 2017
 */

const ENV = {
  DEV: 'development',
  PROD: 'production',
  TEST: 'test',
};

const PORT = 8082;
const TEST_PORT = 8002;

const ROUTES = {
  ROOT: '/',
  DASHBOARD: '/dashboard',
  SIGN_IN: '/auth/signin',
  SIGN_UP: '/auth/signup',
  SIGN_OUT: '/signout',
  FORGOT: '/forgot',
  ACCOUNT: '/account',
  SCHEDULE: '/schedule',
  WORK_RESULT: '/work-result',
  RANKING: '/ranking',
  WORK_HISTORY: '/work-history',
  HELP: '/help',
  COMMUNITY: '/community',
  QUICK_GUIDE: '/quick-guide',
  REWARD: '/reward',
  KEYWORD_SEARCH: '/keyword-search',
  TIC_BOARD: '/tic-board',
  LEAD_TIME: '/lead-time',
  CFD_TABLE: '/cfd-table',
  TEST_GOLF_GAME : '/test-golf-game',
  NOTICE_HOLE_RESULT: '/notice-hole-result',
  NOTICE_GAME_RESULT: '/notice-game-result'
};

module.exports = {
  ENV,
  PORT,
  TEST_PORT,
  ROUTES,
}
