var ie6 = ! -[1, ] && !window.XMLHttpRequest;
window.onerror = function () { return false; }
function action() {
    $(document.body).append('<div id="roll" style="display:none;"><div title="回到顶部" id="roll_top"></div></div>');
    $("#roll_top").click(function () {
        $("html,body").animate({
            scrollTop: "0px"
        }, 800)
    });
    $("#ct").click(function () {
        $("html,body").animate({
            scrollTop: $(".ct").offset().top
        }, 800)
    });
    //使用浮动主导航
    //$(document.body).append($("div.header").clone().addClass("h_head_gd").hide());
    var div = $("div.h_head_gd");
    $(window).scroll(function (a) {

        if ($(this).scrollTop() > 260) {
            $("#roll").fadeIn()
        } else {
            $("#roll").fadeOut()
        }

        if ($(this).scrollTop() > 170) {
            div.show()
        } else {
            div.hide()
        }
    }).scroll();
};




//自动加载js执行效果 
if (typeof (console) == "undefined") {
    var console = function () { };
    console.log = function (msg) { }
}
$(function () {
    var FnAndJS = {
        "slide": ["/js/jquery.SuperSlide.2.1.1.js", "slide", function (data, src) {
            var src = jQuery(src);
            if ("slide" in src) {
                src.slide(data || {});
            }
        } ],
        "adgallery": ["/plug/ad-gallery/jquery.ad-gallery.js", "adGallery", function (data, src) {
            loadCss("/plug/ad-gallery/jquery.ad-gallery.css");
            var src = jQuery(src);
            if ("adGallery" in src) {
                setTimeout(function () {
                    src.adGallery(data || {});
                }, 500);
            }
        } ],
        "fancybox": ["/plug/fancybox/jquery.fancybox-1.3.4.pack.js", "fancybox", function (data, src, selector) {
            loadCss("/plug/fancybox/jquery.fancybox-1.3.4.css");
            var src = jQuery(src);
            if (selector) {
                src = src.find(selector);
            }
            if ("fancybox" in src) {
                setTimeout(function () {
                    src.fancybox(data || {});
                }, 500);
            }
        } ]
    };
    var Execution = function (fn, me, data, fnName, selector, havePlug) {
        if (fn && jQuery.isFunction(fn)) {
            var rv = null;
            if (jQuery.isArray(data)) {
                if (havePlug) {
                    setTimeout(function () {
                        fn.apply(me, data);
                    }, 500);
                } else {
                    rv = fn.apply(me, data);
                }
            } else {
                if (havePlug) {
                    setTimeout(function () {
                        fn.apply(me, [data, me, selector]);
                    }, 500);
                } else {
                    rv = fn.apply(me, [data, me, selector]);
                }
            } if (data["ExecutionCallback"] && fnName != "ExecutionCallback") {
                fn = data["ExecutionCallback"];
                if (fn) {
                    fn = window[fn];
                    Execution(fn, me, data, "ExecutionCallback", selector, havePlug);
                }
            }
        }
    };
    $(".plug[data-src]").each(function () {
        var me = $(this);
        var data_ = me.attr("data-src") || {};
        var data = null; var fn = me.attr("fn") || "slide";
        var selector = me.attr("selector") || "";
        var havePlug = me.find(".plug").length > 0;
        if (fn && (fn in FnAndJS || fn in window)) {
            try {
                data = jQuery.parseJSON(data_)
            } catch (e) {
                data = eval("(" + data_ + ")");
            }
            if (data) {
                try {
                    if (fn in FnAndJS) {
                        var arr = FnAndJS[fn];
                        if (arr && !(fn in me)) {
                            var fn_ = arr[1];
                            if (fn_ && (fn_ = (me[fn_] || window[fn_]))) {
                                Execution(fn_, me, data, "", selector, havePlug);
                                me.addClass("executed__");
                            } else {
                                fn_ = arr[1];
                                loadJs(arr[0], function () {
                                    Execution(arr[2] || me[fn_ || fn], me, data, "", selector, havePlug);
                                    me.addClass("executed__");
                                });
                            }
                        } else {
                            Execution(me[fn] || window[fn], me, data, "", selector, havePlug);
                            me.addClass("executed__");
                        }
                    } else {
                        if (fn in window) {
                            Execution(window[fn], me, data, "", selector, havePlug);
                            me.addClass("executed__");
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    });
});


//主导航漂浮
$(function () {
    $("body").append("<div class='m-nav02'></div>");
    $(".m-nav02").append($(".menu").clone());
    
    window.onerror = function () {
        return true;
    }


    $(window).scroll(function (event) {
        if ($(this).scrollTop() > $(".header .menu").offset().top) {
            $(".m-nav02").show();
        } else {
            $(".m-nav02").hide();
        }
    });
});

