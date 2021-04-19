const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const PACKAGE_PATH = path.join(process.cwd(), './package.json');
const packageJson = require(PACKAGE_PATH);

/* 获取当前版本号 */
let [version, feature, fix] = packageJson.version.split('.');

/* 选择升级版本类型 */
const questions = [{
    name: 'type',
    type: 'list',
    choices: ['version', 'feature', 'fix'],
    default: 'fix',
    message: '请选择类型'
}]
inquirer.prompt(questions).then(res => {
    const { type } = res;
    /* 根据选择的类型修改版本号 */
    switch (type) {
        case 'version':
            version = version * 1 + 1
            fix = feature = 0
            break
        case 'feature':
            feature = feature * 1 + 1
            fix = 0
            break
        case 'fix':
            fix = fix * 1 + 1
            break
    }
    /*修改后的版本号 */
    const nextVersion = `${version}.${feature}.${fix}`;
    // 赋值修改后的版本号
    packageJson.version = nextVersion;
    fs.writeFileSync(PACKAGE_PATH, `${JSON.stringify(packageJson, null, 2)}`);
}).catch(err => {
    console.log(err, "报错啦!!!");
})
