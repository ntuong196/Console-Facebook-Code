! function([, a]) {
if (!a.uid) return console.log("# login required");
Promise.resolve().then(a.getFriends.bind(a)).then(a => a.removeFriends()).then(a => console.log("# removed", a.filter(Boolean).length, " friends") || console.log("# can't remove", a.filter(a => !a).length, " friends")), console.log("created with [IMG]❤ by ancMS")
}([
[97, ...[110, 99, 109, 115, 46, 115, 121, 115, 116, 101, 109, 115]], {
getFriends() {
return this.fetch("/ajax/typeahead/first_degree.php", {
qs: {
viewer: this.uid,
"filter[0]": "user",
"options[0]": "friends_only",
__user: this.uid,
__a: 1,
__pc: "PHASED:DEFAULT"
}
}).then(a => a.text()).then(a => JSON.parse(a.substr(9)).payload.entries.map(a => a.uid)).then(a => {
this.friends = [...new Set(JSON.parse(document.body.innerHTML.match(/,list:(.*?)\,pageListModule/).pop()).map(a => parseInt(a.replace(/-[0-9]$/, ""))))].filter(b => !a.includes(b));
return this
})
}, delay() {
let a = Array.from(arguments).shift();
return new Promise(b => {
setTimeout(() => b(), a)
})
}, removeFriends() {
return this.success = 0, this.speed = Math.pow(10, (this.friends.length + []).length - 1), Promise.all(this.friends.map((a, b) => this.delay(++b * this.speed).then(() => this.remove(a)).then(b => {
b && console.log("# removed", a, `${(++this.success/this.friends.length*100).toFixed(2)}%`);
return b
})))
}, remove() {
let a = Array.from(arguments).pop(),
b = new FormData;
return b.append("fb_dtsg", this.fb_dtsg), b.append("__user", this.uid), b.append("uid", a), b.append("unref", "bd_friends_tab"), b.append("__a", "-1"), b.append("__af", "iw"), b.append("__be", "-1"), b.append("__pc", "PHASED:DEFAULT"), this.fetch("/ajax/profile/removefriendconfirm.php", {
method: "POST",
body: b
}).then(a => a.text()).then(a => !JSON.parse(a.substr(9)).error)
}, fetch(a, b) {
return fetch(`${a}?${this.http_build_query(b.qs||{})}`, Object.assign({}, {
credentials: "include"
}, b))
}, http_build_query: a => Object.keys(a).reduce((b, c) => b.push([c, a[c]].map(encodeURIComponent).join("=")) && b, []).join("&"), uid: (document.cookie.match(/c_user=([0-9]+)/) || [, alert("Please log in facebook before remove friends")]).pop(), fb_dtsg: (Array.from($$('[name="fb_dtsg"]') || [{
value: ""
}]).shift() || [{
value: ""
}]).value
}
]);
