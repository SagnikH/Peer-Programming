const LeetCode = require('./LeetCode');

const main = async () => {
    const lt = new LeetCode('https://leetcode.com/problems/two-sum/discuss/?currentPage=1&orderBy=hot&query=');
    const data = await lt.fetch();
    console.log("data", data);

}

main();