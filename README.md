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





