/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const queue = []; // 存放下标 单调递减队列
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    if (i - queue[0] >= k) {
      queue.shift();
    }
    // 新加的数比之前的数都大，弹出所有
    while (nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop();
    }
    queue.push(i);
    if (i >= k - 1) {
      result.push(nums[queue[0]]);
    }
  }
  return result;
};
// @lc code=end
