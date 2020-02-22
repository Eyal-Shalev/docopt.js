/*
 * Copyright (c) 2020 Eyal Shalev <eyalsh@gmail.com>
 */

const {execSync} = require('child_process');

const result = execSync(['python', 'test/language_agnostic_tester.py', 'test/testee_commonjs.sh'].join(' ')).toString('utf-8');

const handleErr = e => {
    console.error(e);
    process.exit(1);
};

try {
    if (result.includes('F') || result.includes('J')) {
        handleErr(result);
    } else {
        console.log(result);
    }
} catch(e) {
    handleErr(e)
}
