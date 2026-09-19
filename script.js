/* ============================================================
   个人博客网页 —— 交互脚本（script.js）
   说明：这个文件负责网页的"点击反应"。一共只做三件事：
         1. 手机上点击汉堡按钮 ☰，展开 / 收起导航菜单
         2. 手机上点击某个菜单项后，菜单自动收起来
         3. 点击博客文章标题，展开 / 收起正文
   提示：代码写在这里，但页面上的元素是在 index.html 里定义的。
        "找到某个元素"靠的是 id 或 class，两边必须拼写一致。
   ============================================================ */


/* ------------------------------------------------------------
   准备工作：先把要用到的页面元素"抓"到变量里，方便后面反复使用。

   document.querySelector("选择器") 的作用：
   按照 CSS 里同样的写法（#id 或 .class）去页面上找元素，找到第一个就返回。
   ------------------------------------------------------------ */

// 整个导航栏（<header class="navbar">），展开菜单时给它加 class
var navbar = document.querySelector(".navbar");

// 汉堡按钮（☰），点击它来开合菜单
var hamburgerBtn = document.getElementById("hamburgerBtn");

// 博客板块里的所有文章（一共 3 篇）
var blogItems = document.querySelectorAll(".blog-item");


/* ------------------------------------------------------------
   功能 1：点击汉堡按钮，开合手机导航菜单

   原理：给导航栏切换一个叫 nav-open 的 class。
        CSS 里写了 .navbar.nav-open .nav-links { display: flex; }，
        所以加上这个 class，菜单就显示；去掉，菜单就隐藏。
        同时那个 class 还能让 ☰ 变成 ✕（见 style.css）。
   ------------------------------------------------------------ */
hamburgerBtn.addEventListener("click", function () {
  // classList.toggle("名字") = 有就删掉，没有就加上
  navbar.classList.toggle("nav-open");

  // 顺便更新一下无障碍提示文字，方便读屏软件
  var isOpen = navbar.classList.contains("nav-open");
  hamburgerBtn.setAttribute("aria-label", isOpen ? "收起导航菜单" : "展开导航菜单");
});


/* ------------------------------------------------------------
   功能 2：点击菜单里的链接后，自动收起菜单

   为什么需要？因为在手机上，菜单展开后会挡住下面的内容。
   点完"关于我"跳到对应板块后，菜单应该自己收起来，
   否则用户还得再点一次 ✕。
   ------------------------------------------------------------ */

// 找到菜单里的所有链接（首页 / 关于我 / 技能 / ...）
var navLinks = document.querySelectorAll(".nav-links a");

// 给每一个链接都绑上"点击"事件
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    // 直接移除 nav-open，菜单就收起来了
    navbar.classList.remove("nav-open");
  });
});


/* ------------------------------------------------------------
   功能 3：点击博客标题，展开 / 收起正文

   原理：和菜单一样，靠切换 class。
        加上 open → CSS 里 .blog-item.open .blog-body { display: block; }
        正文就显示出来了。

   额外做了一个小优化：展开某篇文章时，自动把其他文章收起来，
   避免页面被撑得太长、手机上要滑很久。
   ------------------------------------------------------------ */
blogItems.forEach(function (item) {
  // 在每篇文章内部找它的标题按钮
  var head = item.querySelector(".blog-head");

  head.addEventListener("click", function () {
    // 先记下这篇文章当前是不是展开状态
    var wasOpen = item.classList.contains("open");

    // 第一步：把所有文章都收起来（包括自己）
    blogItems.forEach(function (other) {
      other.classList.remove("open");
    });

    // 第二步：如果刚才这篇原本是收起的，就把它展开；
    //        如果原本是展开的，经过上一步已经收起了，就保持收起。
    //        这样就实现了"点一下展开、再点一下收起"的效果。
    if (!wasOpen) {
      item.classList.add("open");
    }
  });
});
