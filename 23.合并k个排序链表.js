/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个排序链表
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
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    // 进阶版合并两个有序链表 21题
    var mergeTwoLists = function (l1, l2) {
        var merge = (l1, l2) => {
            if (l1 == null) return l2;
            if (l2 == null) return l1;
            if (l1.val > l2.val) {
                l2.next = merge(l1, l2.next);
                return l2;
            } else {
                l1.next = merge(l1.next, l2);
                return l1;
            }
        }
        return merge(l1, l2);
    };

    var mergeLists = (lists, start, end) => {
        if (end - start < 0) return null
        if (end - start === 0) return lists[end]
        let mid = Math.floor((start + end) / 2)
        return mergeTwoLists(mergeLists(lists, start, mid), mergeLists(lists, mid + 1, end))
    }
    return mergeLists(lists, 0, lists.length - 1)

};
// @lc code=end