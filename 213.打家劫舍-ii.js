/*
 * @lc app=leetcode.cn id=213 lang=javascript
 *
 * [213] 打家劫舍 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const n = nums.length

    if (n === 0) return 0
    if (n === 1) return nums[0]

    const res1 = dpHandle(nums.slice(1))
    const res2 = dpHandle(nums.slice(0, nums.length - 1))
    console.log(res1, res2);
    return Math.max(res1, res2)

    function dpHandle(nums) {
        const n = nums.length;
        if (n === 0) return 0;
        if (n === 1) return nums[0];
        let dp = Array.from(new Array(n), () => new Array(n).fill(0));
        dp[0][0] = 0;
        dp[0][1] = nums[0];
        for (var i = 1; i < n; i++) {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
            dp[i][1] = dp[i - 1][0] + nums[i];
        }
        return Math.max(dp[n - 1][0], dp[n - 1][1]);
    }

};
// @lc code=end