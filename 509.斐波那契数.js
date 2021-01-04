/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    if(n < 2 ) return n

    let a = 0 ,b = 0 , s = 1
    for (let i = 2; i <= n; i++) {
        a = b
        b = s
        s = a + b
    }
    return s
};
// @lc code=end

