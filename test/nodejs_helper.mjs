export const exit = process.exit;

/**
 * @param {string[]} args
 * @return {Promise<string>}
 */
export const run = (args) => import('child_process').then(({execSync}) => execSync(args.join(' ')).toString('utf-8'));

/**
 * @return {Promise<string>}
 */
export const getDoc = () => import('fs').then(fs => fs.readFileSync(0, 'utf-8'));
