/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    let pre = null,
        cur = head
    let p = head

    for (let i = 0; i < k; i++) {
        if (p === null) return head
        p = p.next
    }
    for (let i = 0; i < k; i++) {
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }

    head.next = reverseKGroup(cur, k)
    return pre
};
// @lc code=end