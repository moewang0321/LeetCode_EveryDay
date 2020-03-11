var isValid = function (s) {
    var st = []
    for (var l of s)
        if ((i = "({[]})".indexOf(l)) > -1)
            if (st[st.length - 1] + i === 5) {
                st.length--;
            }
    else {
        st.push(i);
    }
    return st.length === 0
};