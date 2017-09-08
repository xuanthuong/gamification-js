/**
 * Copyright © 2017 DOU Networks. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jun 22, 2017
 */

const showLogs = (type, ...args) => {
  if (!args || args.length === 0)
    return;

  switch (type) {
    case 'error':
      console.log(chalk.red('✗'), ...args);
      break;
    case 'success':
      console.log(chalk.green('✓'), ...args);
      break;
    default:
      console.log(args);
      break;
  }
};
