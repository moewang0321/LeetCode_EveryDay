/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
 * @return {number[]}
 */
var inorderTraversal = function(root) {

    // 递归
    // var arr = [];
    // if (!root) return [];
    // if (root.left) {
    //     arr = arr.concat(inorderTraversal(root.left))
    // }
    // arr.push(root.val)
    // if (root.right) {
    //     arr = arr.concat(inorderTraversal(root.right))
    // }
    // return arr

    // 迭代
    var res = [];
    // 定义栈
    var s = [];
    var p = root;
    /* 
        对任一节点p
        若 左孩子 不为空，p入栈并把左孩子置为当前p，以此类推
        若 左孩子 为空，取栈顶元素出栈，当问该节点，然后置 右孩子 为p
        直到p为null且栈为空时结束遍历
    */
    while (p || s.length) {
        while (p) {
            s.push(p);
            p = p.left;
        }

        p = s.pop();
        res.push(p.val);
        p = p.right;
    }
    return res;
};
// @lc code=end