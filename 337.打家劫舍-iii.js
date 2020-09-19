/*
 * @lc app=leetcode.cn id=337 lang=javascript
 *
 * [337] 打家劫舍 III
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function(root) {
    var dfs = (node) => {
        if (node === null) {
            return [0, 0]
        }

        var l = dfs(node.left)
        var r = dfs(node.right)
        var selected = node.val + l[1] + r[1]
        var noSelected = Math.max(l[0], l[1]) + Math.max(r[0], r[1])
        return [selected, noSelected]
    }

    var rootStatus = dfs(root)
    return Math.max(rootStatus[0], rootStatus[1])
};
// @lc code=end