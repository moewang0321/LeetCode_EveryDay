/* 
    给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

    有效字符串需满足：

    左括号必须用相同类型的右括号闭合。
    左括号必须以正确的顺序闭合。
    注意空字符串可被认为是有效字符串。

    输入: "()[]{}"
    输出: true

    输入: "([)]"
    输出: false

    输入: "{[]}"
    输出: true
*/

var isValid = function (s) {
    if (s === '') return true
    let stack = new Array()
    let ans = true
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '{' || s[i] === '[' || s[i] === "(") {
            stack.unshift(s[i])
        } else {
            if (stack[0] === '{' && s[i] === '}') stack.shift()
            else if (stack[0] === '[' && s[i] === ']') stack.shift()
            else if (stack[0] === '(' && s[i] === ')') stack.shift()
            else ans = false
        }
    }
    return stack.length === 0 && ans
};