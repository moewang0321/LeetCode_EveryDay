> 所有涉及到的数据结构都会进行一个简单的阐述，关于如何设计一个基于对象的数据结构这里不作说明

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



