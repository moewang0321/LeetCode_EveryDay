/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
    // 递归反转函数
    let reverse = function (pre, current) {
        if (!current) {
            return pre
        }
        let next = current.next;
        current.next = pre
        return reverse(current, next)
    }
    let p = newNode = new ListNode()
    newNode.next = head
    let start, end //区间首尾节点
    let front, tail //前节点 后节点

    for (let i = 0; i < m - 1; i++) {
        p = p.next
    }
    front = p;
    start = front.next
    for (let i = m - 1; i < n; i++) {
        p = p.next
    }

    end = p
    tail = end.next
    end.next = null
    front.next = reverse(null, start)
    start.next = tail
    return newNode.next
};
// @lc code=end