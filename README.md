> 所有涉及到的数据结构都会进行一个简单的阐述，关于如何设计一个基于对象的数据结构这里不作说明



* [链表](#链表)
  * [反转链表](#反转链表)
     * [反转单链表](#反转单链表)
     * [区间反转](#区间反转)
     * [两两交换链表节点](#两两交换链表节点)

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

