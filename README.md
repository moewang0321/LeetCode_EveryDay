> 所有涉及到的数据结构都会进行一个简单的阐述，关于如何设计一个基于对象的数据结构这里不作说明



* [链表](#链表)
  * [反转链表](#反转链表)
     * [反转单链表](#反转单链表)
     * [区间反转](#区间反转)
     * [两两交换链表节点](#两两交换链表节点)
     * [K个一组反转链表](#K个一组反转链表)
  * [环形链表](#环形链表)
     * [判断环形链表](#判断环形链表)


# 链表

---

![链表结构.png](https://i.loli.net/2020/03/11/xtALdWYXVniS2EZ.png)

不同于数组是连续的存储空间，链表元素的线性顺序不是由它们在内存中的物理位置给出的。相反, 每个元素指向下一个元素。它是由一组节点组成的数据结构,这些节点一起,表示序列。

## 反转链表

### 反转单链表

>  来源：  [LeetCode 206题](https://leetcode-cn.com/problems/reverse-linked-list/)

示例：

```js
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

#### 循环解决

**注意：在操作当前节点的next之前先将后续节点保存，否则在当前节点next改变指向后悔丢失后续节点**

实现：

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if(!head)  return null
    let pre = null , cur = head;
    while(cur) {
        let next = cur.next
        cur.next = pre
        pre = cur;
        cur = next
    }
    return pre
};
```

边界条件：

- head节点为空时
- 链表只包含一个节点时，上述代码循环后pre被赋值为cur，既head

#### 递归解决

```js
let reverseList = (head) =>{
  let reverse = (pre, cur) => {
    if(!cur) return pre;
    // 保存 next 节点
    let next = cur.next;
    cur.next = pre;
    return reverse(cur, next);
  }
  return reverse(null, head);
}
```

### 区间反转

> 来源：  [LeetCode 92题](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

反转从位置 *m* 到 *n* 的链表。请使用一趟扫描完成反转。

示例：

```js
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
```

#### 解题思路

![链表区间反转.png](https://i.loli.net/2020/03/12/C9SYIQzKwG6Emfa.png)

这道题与上一个链表反转题可以说几乎一样，需要注意的是：**前后节点的记录**（如图），那么在区间进行反转后，只需要将前节点的next指向区间的终点，将区间起点的next指向后节点即可。

同样的，这里提供循环解法的递归解法

#### 循环解法

```js
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
    let count = n - m;
    let p = dummyHead = new ListNode();
    let pre, cur, start, tail;
    p.next = head;
    for(let i = 0; i < m - 1; i ++) {
        p = p.next;
    }
    // 保存前节点
    front = p;
    // 同时保存区间首节点
    pre = tail = p.next;
    cur = pre.next;
    // 区间反转
    for(let i = 0; i < count; i++) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    // 前节点的 next 指向区间末尾
    front.next = pre;
    // 区间首节点的 next 指向后节点(循环完后的cur就是区间后面第一个节点，即后节点)
    tail.next = cur;
    return dummyHead.next;
};

```

#### 递归解法

我个人觉得递归解法这道题更容易理解一点

```js
var reverseBetween = function(head, m, n) {
  // 递归反转函数
  let reverse = (pre, cur) => {
    if(!cur) return pre;
    // 保存 next 节点
    let next = cur.next;
    cur.next = pre;
    return reverse(cur, next);
  }
  let p = dummyHead = new ListNode();
  dummyHead.next = head;
  let start, end; //区间首尾节点
  let front, tail; //前节点和后节点
  for(let i = 0; i < m - 1; i++) {
    p = p.next;
  }
  front = p; //保存前节点
  start = front.next;
  for(let i = m - 1; i < n; i++) {
    p = p.next;
  }
  end = p;
  tail = end.next; //保存后节点
  end.next = null;
  // 开始穿针引线啦，前节点指向区间首，区间首指向后节点
  front.next = reverse(null, start);
  start.next = tail;
  return dummyHead.next;
}
```

### 两两交换链表节点

> 来源：  [LeetCode 24题](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。**你不能只是单纯的改变节点内部的值**，而是需要实际的进行节点交换。

**示例:**

```js
给定 1->2->3->4, 你应该返回 2->1->4->3.
```

#### 解题思路

![两两交换链表节点.png](https://i.loli.net/2020/03/13/hKQI2WmEFVDeHzX.png)

1. 如图，首先我们建立一个虚拟头结点`dummyHead`帮助分析（在很多链表相关的题目中，建立一个虚拟头结点有时候会对解题很有帮助），然后定义一个指针p，指向`dummyHead`的位置，记录下`p.next`和`p.next.next`的节点。
2. 让1的next指向2的next。
3. 再让二的next指向1。
4. 让`dummyHead`的next指向2，这样就实现了两个节点的交换，最后将指针p指向1。
5. 依次循环，当`p.next`或者`p.next.next`为空时，就找不到新的一组两两交换的节点，循环结束。

#### 循环解决

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    if (head === null || head.next === null) return head

    let p = dummyHead = new ListNode()
    let node1, node2
    dummyHead.next = head
    while ((node1 = p.next) && (node2 = p.next.next)) {
        node1.next = node2.next
        node2.next = node1
        p.next = node2
        p = node1
    }
    return dummyHead.next
};
```

#### 递归解决

好好理解一下递归解法的调用过程

```js
var swapPairs = function (head) {
    if (head === null || head.next === null) return head

    let node1 = head,
        node2 = head.next
    node1.next = swapPairs(node2.next)
    node2.next = node1

    return node2
};
```

### K个一组反转链表

> 来源：  [LeetCode 25题](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

示例：

```js
给你这个链表：1->2->3->4->5
当 k = 2 时，应当返回: 2->1->4->3->5
当 k = 3 时，应当返回: 3->2->1->4->5
```

说明：

你的算法只能使用常数的额外空间。
你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

#### j解题思路

和两两交换类似，不同的是这回每组内有K个节点需要反转

#### 循环解法

```js
var reverseKGroup = function(head, k) {
    let count = 0;
    // 看是否能构成一组，同时统计链表元素个数
    for(let p = head; p != null; p = p.next) {
        if(p == null && i < k) return head;
        count++;
    }
    let loopCount = Math.floor(count / k);
    let p = dummyHead = new ListNode();
    dummyHead.next = head;
    // 分成了 loopCount 组，对每一个组进行反转
    for(let i = 0; i < loopCount; i++) {
        let pre = null, cur = p.next;
        for(let j = 0; j < k; j++) {
            let next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        // 当前 pre 为该组的尾结点，cur 为下一组首节点
        let start = p.next;// start 是该组首节点
        // 开始穿针引线！思路和2个一组的情况一模一样
        p.next = pre;
        start.next = cur;
        p = start;
    }
    return dummyHead.next;
};
```

#### 递归解法

这道题递归解法相对于循环解法比较容易理解

```js
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
```

## 环形链表

### 判断环形链表

> 来源：  [LeetCode 141题](https://leetcode-cn.com/problems/linked-list-cycle/)

给定一个链表，判断链表中是否有环。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

示例1：

```js
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

![示例1](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

示例2：

```js
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```

![示例2](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)

示例 3：

```js
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。	
```

![示例3](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)

#### 解题思路

方法1：判断是否是环形链表只需要知道同一个节点是否重复出现过，这样在JS中我们就有了快捷方式，用Set数据结构来保存节点，可以进行判重。

方法2：利用快慢指针的数学思想，就像两个人在环形跑道上跑步，一个块一个慢，那么总会有一个时间点，快的人会再次遇到慢的人，而如果没有环，那只会越来越远。

#### Set判重

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let set = new Set()

    let p = head
    while(p) {
        if(set.has(p)) return true
        set.add(p)
        p = p.next
    }
    return false
};
```

#### 快慢指针

这里设置快指针一次走两步，慢指针一次走一步

```js
/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
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
 * @return {boolean}
 */
var hasCycle = function (head) {
    let dummyHead = new ListNode();
    dummyHead.next = head;
    let fast = slow = dummyHead;
    // 零个结点或者一个结点，无环
    if (fast.next == null || fast.next.next == null)
        return false;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        // 相遇
        if (fast == slow) {
            return true;
        }
    }
    return false;
};
```

接下来可以思考一下怎么去找到环形链表的起点呢

### 找到环形链表的起点