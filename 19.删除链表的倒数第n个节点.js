/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    let dummyHead = new ListNode()
    let index = 0
    let length = 0
    dummyHead.next = head
    let pre = dummyHead,
        current = head
    for (let p = head; p !== null; p = p.next) {
        length++
    }

    let pos = length - n
    // 边界处理
    if (pos < 0 || pos > length) return false
    if (pos === 0 && length === 1) dummyHead.next = null
    // 循环到删除的节点
    while (index++ < pos) {
        pre = current
        current = current.next
    }
    // 前一个节点的next指向删除节点的next
    pre.next = current.next
    return dummyHead.next
};
// @lc code=end