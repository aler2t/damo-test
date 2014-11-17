function INITBODY(l, m, p, q, r, u, settings) {
    /* this.settings = {
        pathRoot : "XXX"
    }*/
    this.s = {
        picPath : settings.picPath || "pic/",
        iconPath : settings.iconPath || "3dui.png",
        iconName : settings.iconName || "3dui.png"
    };
    this.JsFileName = "Photo360.js";
    this.autospeed = u;
    this.COUNT = l;
    this.BAY = m;
    this.fullScreen = false;
    this.Body_width = p;
    this.Body_height = q;
    this.iconPath = this.s.picPath;
    this.picPath = this.s.picPath;
    this.picDefPath = "pic/";
    //this.Zoon_width = 300;
    //this.Zoon_height = 300;
    this.Zoon_width = parseInt(p * 0.31);
    this.Zoon_height = this.Zoon_width;
    this.i = 1;
    this.Interval = "";
    this.TurnRight = false;
    this.TurnLeft = false;
    this.Pause = true;
    this.isShowZoon = false;
    this.isShowZoonIMG = r > 1 ? true : false;
    this.RNDSTR = Math.floor(Math.random() * 10000 + 1);
    this.BODYNAME = "fb" + this.RNDSTR;
    this.ZoonDIV = "zn" + this.RNDSTR;
    this.ImgID = "id" + this.RNDSTR;
    this.ZimgID = "zd" + this.RNDSTR;
    this.ZoonALL = "za" + this.RNDSTR;
    this.ImgIDALL = "ia" + this.RNDSTR;
    this.ZimgIDALL = "zi" + this.RNDSTR;
    this.ZoonLiteBD = "zl" + this.RNDSTR;
    this.D3Buttom = "D3" + this.RNDSTR;
    this.TitleBar = "tr" + this.RNDSTR;
    this.ButtonBar = "br" + this.RNDSTR;
    this.displaydiv = "ds" + this.RNDSTR;
    this.processdiv = "ps" + this.RNDSTR;
    this.resultdiv = "rs" + this.RNDSTR;
    this.LoadedCount = 0;
    this.nowgoingnum = 1;
    this.imageLargeURL = new Array();
    this.imageSmallURL = new Array();
    this.ImagesSmall = new Array();
    this.isdown = false;
    this.tempum = 0;
    this.ZoonALLisShow = false;
    this.ZallBecloseAndgo = 0;
    this.ZallBeCloseAndZoon = false;
    this.isdownA = false;
    this.STARTID = 0;
    this.newZb = 1;
    this.nowZb = 1;
    this.speed = 0.1;
    this.timerZall = "";
    this.newX = 0;
    this.newY = 0;
    this.NOWX = 0;
    this.NOWY = 0;
    this.MX = 0;
    this.MY = 0;
    this.NX = 0;
    this.NY = 0;
    this.SX = 0;
    this.SY = 0;
    this.DRX = 0;
    this.DRX2 = 0;
    this.DRX3 = 0;
    this.html = false;

    function $(a) {
        return document.getElementById(a)
    };
    this.addListener = function(a, e, b) {
        if (a.addEventListener) {
            a.addEventListener(e, b, false)
        } else {
            a.attachEvent("on" + e, b)
        }
    };
    this.getTop = function(e) {
        var a = e.offsetTop;
        if (e.offsetParent != null) {
            a += this.getTop(e.offsetParent)
        }
        return a
    };
    this.getLeft = function(e) {
        var a = e.offsetLeft;
        if (e.offsetParent != null) {
            a += this.getLeft(e.offsetParent)
        }
        return a
    };
    this.getWidth = function(e) {
        var a = e.clientWidth;
        return a
    };
    this.getHeight = function(e) {
        var a = e.clientHeight;
        return a
    };
    this.finals = function() {
        this.ShowFrim(1)
    };
    this.getCurrentDirectory = function() {
        var a = location.href;
        var b = a.split("/");
        delete b[b.length - 1];
        var c = b.join("/");
        return c
    };
    this.getJSDirectory = function() {
        var a = "";
        var b = document.getElementsByTagName("script");
        for (var i = 0; i < b.length; i++) {
            if (b[i].src.indexOf(this.JsFileName) >= 0) {
                if (b[i].src.indexOf("html") > 0) {
                    this.html = true
                }
                if (b[i].src.indexOf("full") > 0) {
                    this.fullScreen = true
                }
                var c = b[i].src.split("/");
                delete c[c.length - 1];
                a = c.join("/")
            }
        }
        return a
    };
    this.getJSURL = function() {
        var a = "";
        var b = document.getElementsByTagName("script");
        for (var i = 0; i < b.length; i++) {
            if (b[i].src.indexOf(this.JsFileName) >= 0) {
                var c = b[i].src;
                if (c.indexOf("http://") >= 0 || c.indexOf("https://") >= 0 || c.indexOf("file://") >= 0) {
                    a = c
                } else {
                    a = this.getCurrentDirectory() + c
                }
            }
        }
        return a
    };
    this.trace = function(a, b) {
        if (b == 1 || !b) $(this.displaydiv).innerHTML = a;
        if (b == 2) $(this.processdiv).innerHTML = a;
        if (b == 3) $(this.resultdiv).innerHTML = a
    };
    for (var k = 1; k <= this.COUNT; k++) {

        this.imageSmallURL[k] = (this.s.picPath ? this.s.picPath : this.getJSDirectory() + this.picDefPath) + "small_L" + (k) + ".jpg";
        if (this.isShowZoonIMG) {
            this.imageLargeURL[k] = (this.s.picPath ? this.s.picPath : this.getJSDirectory() + this.picDefPath) + "L" + (k) + ".jpg"
        } else {
            this.imageLargeURL[k] = this.imageSmallURL[k]
        }

    }
    this.LoadSmallImages = function() {
        $(this.ZimgIDALL).style.display = "none";
        for (i = 1; i <= this.COUNT; i++) {
            this.ImagesSmall[i] = new Image();
            this.ImagesSmall[i].src = this.imageSmallURL[i];
            this.ImagesSmall[i].Owner = this;
            this.ImagesSmall[i].Loaded = 0;
            this.ImagesSmall[i].ImageID = i;
            this.ImagesSmall[i].onerror = function() {
                this.Loaded = -1;
                this.Owner.LoadBack(this.Loaded, this.ImageID);
                this.onerror = null
            };
            this.ImagesSmall[i].onload = function() {
                this.Loaded = 1;
                this.Owner.LoadBack(this.Loaded, this.ImageID);
                this.onload = null
            }
        }
    };
    this.LoadBack = function(a, b) {
        ++this.LoadedCount;
        if (this.LoadedCount == 1) {
            this.ShowFrim(b)
        }
        this.SETXY_TITLE();
        if (this.LoadedCount >= this.COUNT) {
            this.Start(1)
        }
    };
    this.down = function(o) {
        var e = this.getEvent();
        this.tempum = this.nowgoingnum;
        this.isdown = true;
        if (document.all) {
            this.DRX = e.clientX
        } else {
            this.DRX = e.pageX - o.offsetLeft
        }
        if (document.all) o.setCapture();
        return false
    };
    this.up = function(o, e) {
        var e = this.getEvent();
        this.isdown = false;
        if (document.all) {
            this.DRX3 = e.offsetX
        } else {
            this.DRX3 = e.pageX - o.offsetLeft
        }
        if (document.all) o.releaseCapture()
    };
    this.getEvent = function() {
        if (document.all) return window.event;
        func = this.getEvent.caller;
        while (func != null) {
            var a = func.arguments[0];
            if (a) {
                if ((a.constructor == Event || a.constructor == MouseEvent) || (typeof(a) == "object" && a.preventDefault && a.stopPropagation)) {
                    return a
                }
            }
            func = func.caller
        }
        return null
    };
    this.move = function(o) {
        var e = this.getEvent();
        var a = 0;
        var b = this.tempum;
        if (document.all) {
            this.DRX2 = e.clientX
        } else {
            this.DRX2 = e.pageX - o.offsetLeft
        }
        if (this.isdown) {
            a = Math.round((this.DRX2 - this.DRX) / 15) % this.COUNT;
            if (a < 0) {
                if (b + a < 0) {
                    this.nowgoingnum = this.COUNT + b + a
                } else {
                    this.nowgoingnum = b + a
                }
            } else {
                if (b + a > this.COUNT) {
                    this.nowgoingnum = b + a - this.COUNT
                } else {
                    this.nowgoingnum = b + a
                }
            }
            this.Pause = true;
            this.ShowFrim(this.nowgoingnum)
        } else {
            this.ShowZoonDB()
        }
    };
    this.dbclick = function() {
        this.isShowZoon = true;
        this.ShowZoonDB()
    };
    this.dbclickzoon = function() {
        this.isShowZoon = false;
        this.HideZoon()
    };
    this.setTIMEout = function() {
        if (this.DRX2 > this.DRX3) {
            this.Start(1)
        }
        if (this.DRX2 < this.DRX3) {
            this.Start(-1)
        }
    };
    this.downA = function(o) {
        if (document.all) o.setCapture();
        var e = this.getEvent();
        var a = this.tempum;
        this.isdownA = true;
        this.MX = e.clientX;
        this.MY = e.clientY;
        var b = $(this.BODYNAME);
        var c = $(this.ImgID);
        this.SX = this.newX = this.NOWX;
        this.SY = this.newY = this.NOWY;
        return false
    };
    this.upA = function(o) {
        if (this.downA) {
            if (document.all) o.releaseCapture();
            var a = $(this.BODYNAME);
            var b = $(this.ImgID);
            this.newX = this.NOWX;
            this.newY = this.NOWY;
            this.newX += this.NX * 0.2;
            this.newY += this.NY * 0.2;
            if (this.newX > 0) this.newX = 0;
            if (this.newY > 0) this.newY = 0;
            if (this.newX < -this.Body_width * (this.newZb - 1)) this.newX = -this.Body_width * (this.newZb - 1);
            if (this.newY < -this.Body_height * (this.newZb - 1)) this.newY = -this.Body_height * (this.newZb - 1);
            this.ShowZoonALL(true, this.newZb)
        }
        this.isdownA = false
    };
    this.moveA = function(o) {
        var e = this.getEvent();
        var a, my;
        a = e.clientX;
        my = e.clientY;
        if (this.isdownA) {
            this.NX = a - this.MX;
            this.NY = my - this.MY;
            this.NOWX = this.newX = (this.NX + this.SX);
            this.NOWY = this.newY = (this.NY + this.SY);
            var b = $(this.BODYNAME);
            var c = $(this.ImgID);
            var d = $(this.ZoonALL);
            c.style.left = this.NOWX + "px";
            c.style.top = this.NOWY + "px";
            d.style.left = this.NOWX + "px";
            d.style.top = this.NOWY + "px"
        }
    };
    this._ZoonDiv = function() {
      var a = '<div id=' + this.ZoonLiteBD + ' style="display:none;overflow:hidden;position:absolute;border:2px solid #FFFFFF;z-index:102"><img  id="' + this.ZimgID + 'BG" src="" onmousedown="return false;"/><div style="left: 0px;top: 0px;z-index:103;position:absolute;"><img  id="' + this.ZimgID + '" src="" onmousedown="return false;"/></div></div>';
      return a
  };
  this.CreateZoonDiv = function() {
      var b = this.getLeft($(this.BODYNAME)) + this.getWidth($(this.BODYNAME));
      var c = this.getTop($(this.BODYNAME));
      var a = $(this.ZoonLiteBD);
      var d = this;
      this.addListener(a, "mousemove", function() {
          d.ShowZoon()
      });
      this.addListener(a, "mouseout", function() {
          d.HideZoon()
      });
      this.addListener(a, "click", function() {
          d.dbclickzoon()
      })
  };
  this._TITLE = function() {
      var a = 220;
      var b = (this.Body_width - a) / 2;
      var c = a + b;
      var d = '<style>';
      d += '#' + this.D3Buttom + '1, #' + this.D3Buttom + '2, #' + this.D3Buttom + '3, #' + this.D3Buttom + '4,#' + this.D3Buttom + '5 {width:37px;height:30px;position:relative;background:url(' + (this.s.iconPath ? this.s.iconPath : (this.getJSDirectory() + (this.s.pathRoot || this.picPath) + this.s.iconName)) + ') no-repeat;}';
      d += '#' + this.D3Buttom + 's {LIST-STYLE-TYPE: none; HEIGHT: 30px; width:' + c + 'px;}';
      d += '#' + this.D3Buttom + 's LI {PADDING-BOTTOM: 0px; MARGIN: 0px 0px 0px 5px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; FLOAT: left; PADDING-TOP: 0px}';
      d += '#' + this.D3Buttom + 's LI A {BACKGROUND-IMAGE: url(' + (this.s.iconPath ? this.s.iconPath : (this.getJSDirectory() + (this.s.pathRoot || this.picPath) + this.s.iconName)) + '); TEXT-INDENT: -99999px; OUTLINE-STYLE: none; DISPLAY: block;HEIGHT: 30px;OVERFLOW: hidden; blr:expression(this.onFocus=this.blur());outline:none;}';
      d += '#' + this.D3Buttom + 's LI A:focus {-moz-outline-style: none;}';
      d += '#' + this.D3Buttom + '0 {WIDTH: 10px;}';
      d += '#' + this.D3Buttom + '1 {WIDTH: 37px; BACKGROUND-POSITION: 0px 0px}';
      d += '#' + this.D3Buttom + '2 {WIDTH: 37px; BACKGROUND-POSITION: -37px 0px}';
      d += '#' + this.D3Buttom + '3 {WIDTH: 37px; BACKGROUND-POSITION: -74px 0px}';
      d += '#' + this.D3Buttom + '4 {WIDTH: 37px; BACKGROUND-POSITION: -111px 0px}';
      d += '#' + this.D3Buttom + '5 {WIDTH: 37px; BACKGROUND-POSITION: -148px 0px}';
      d += '</style>';
      d += '<div id="' + this.ButtonBar + '" style="position:absolute; height: 33px;line-height: 33px; text-align: center; z-index:200;">';
      d += '<div id=' + this.D3Buttom + 's><li><div style="width:' + b + 'px;">&nbsp;</div></li>';
      d += '<li><a id=' + this.D3Buttom + '1 href="javascript:void(0);" ></a></li><li><a id=' + this.D3Buttom + '2 href="javascript:void(0);"></a></li>';
      d += '<li><a id=' + this.D3Buttom + '3 href="javascript:void(0);"></a></li><li><a id=' + this.D3Buttom + '4 href="javascript:void(0);;"></a></li><li><a id=' + this.D3Buttom + '5 href="javascript:void(0);"></a></li></div></div>';
      d += '<div id="' + this.TitleBar + '"  style="display:display;position:absolute;z-index: 100;" >' + '<span id="' + this.displaydiv + '"></span>&nbsp;' + '<span id="' + this.processdiv + '"></span>&nbsp;' + '<span id="' + this.resultdiv + '"></span>' + '</div>';
      return d
  };
  var v = this;
  this.isBodyWheel = true;
  var z = function() {
      if (!v.isBodyWheel) {
          try {
              var a = v.getEvent();
              a.preventDefault();
              return false
          } catch (e) {}
      } else {
          return true
      }
  };
  this.StopBodywheel = function() {
      if (document.addEventListener) {
          document.addEventListener('DOMMouseScroll', z, false)
      } else {
          document.body.onmousewheel = z
      }
  };
  this.CreateBODYDiv = function() {
      var a = this;
      var b = '<div id=' + this.BODYNAME + ' style="overflow:hidden;position:relative;">' + '<img class="img-responsive" id="' + this.ImgID + '" src="" style="z-index:0;position:absolute;left:0px;top:0px;">' + this._TITLE() + this._ZoonDiv() + '<div id=' + this.ZoonALL + ' style="display:none ; z-index: 6;position:absolute ;top:0px;left:0px;"><img  id="' + this.ZimgIDALL + '" src="" width=0 height=0></div>' + '</div>';
        document.write(b);
        var c = $(this.BODYNAME);
        c.style.background = "#CCCCCC";
        c.style.width = this.Body_width + "px";
        c.style.height = this.Body_height + "px";
        c.onselectstart = function() {
            return false
        };
        var d = $(this.ImgID);
        var e = $(this.ZimgIDALL);
        this.StopBodywheel();
        var f = function() {
            a.isBodyWheel = false;
            a.scrollfunc(d);
            return false
        };
        d.onmousemove = function() {
            a.isBodyWheel = false;
            a.move(d)
        };
        d.onmousedown = function() {
            a.Stop();
            a.down(d);
            return false
        };
        d.onmouseup = function() {
            a.up(d)
        };
        d.onmouseout = function() {
            a.isBodyWheel = true
        };
        d.ondblclick = function() {
            a.dbclick(d)
        };
        d.onmousewheel = f;
        this.addListener(d, "DOMMouseScroll", f);
        e.onselectstart = function() {
            return false
        };
        e.onselectstart = function() {
            return false
        };
        e.onmousemove = function() {
            a.isBodyWheel = false;
            a.moveA(e)
        };
        e.onmousedown = function() {
            a.Stop();
            a.downA(e);
            if (!document.all) return false
        };
        e.onmouseup = function() {
            if (a.isdownA) a.upA(e)
        };
        e.onmouseout = function() {
            a.trace("true", 2);
            if (a.isdownA) a.upA(e)
        };
        e.ondblclick = function() {
            return false
        };
        e.onmousewheel = f;
        this.addListener(e, "DOMMouseScroll", f);
        e.onmouseout = function() {
            a.isBodyWheel = true;
            e.releaseCapture();
            if (a.isdownA) a.upA(e)
        };
        $(this.D3Buttom + "1").onmousemove = function() {
            window.status = ''
        };
        $(this.D3Buttom + "2").onmousemove = function() {
            window.status = ''
        };
        $(this.D3Buttom + "3").onmousemove = function() {
            window.status = ''
        };
        $(this.D3Buttom + "4").onmousemove = function() {
            window.status = ''
        };
        $(this.D3Buttom + "5").onmousemove = function() {
            a.move(d, window.event);
            window.status = ''
        };
        $(this.D3Buttom + "1").onmousedown = function() {
            return false
        };
        $(this.D3Buttom + "2").onmousedown = function() {
            return false
        };
        $(this.D3Buttom + "3").onmousedown = function() {
            return false
        };
        $(this.D3Buttom + "4").onmousedown = function() {
            return false
        };
        $(this.D3Buttom + "5").onmousedown = function() {
            return false
        };
        $(this.D3Buttom + "1").onclick = function() {
            a.D3Button2(-1)
        };
        $(this.D3Buttom + "2").onclick = function() {
            a.D3Button2(1)
        };
        $(this.D3Buttom + "3").onclick = function() {
            a.ClickShowZoonALL(!a.ZoonALLisShow, 2)
        };
        $(this.D3Buttom + "4").onclick = function() {
            if (a.Pause) {
                a.D3Button2(1)
            } else {
                a.ShowZoonALL(false, 1);
                a.Stop()
            }
        };
        $(this.D3Buttom + "5").onclick = function() {
            a.Stop();
            if (a.ZoonALLisShow) {
                a.ZallBeCloseAndZoon = true;
                a.ShowZoonALL(false, 1)
            }
            if (this.isShowZoon) {
                this.HideZoon()
            } else {
                a.ISSHOWZOON(true);
                a.move(d, window.event)
            }
        }
    };
    this.ShowButtonPNG = function(o, t) {
        $(this.D3Buttom + "" + o).style.backgroundPosition = "-" + ((o - 1) * 37) + "px -" + ((t - 1) * 30) + "px"
    };
    this.refZall = function() {
        var a = this;
        var b = (this.newZb - this.nowZb) * this.speed + this.nowZb;
        if (b > 4) b = 4;
        if (b < 1) b = 1;
        this.nowZb = b;
        var w = Math.round((this.Body_width * b));
        var h = Math.round((this.Body_height * b));
        var c = $(this.BODYNAME);
        var d = $(this.ImgID);
        var e = $(this.ZoonALL);
        var f = $(this.ZimgIDALL);
        var g = this.newY;
        var i = this.newX;
        var x = (i - this.NOWX) * 0.1 + this.NOWX;
        var y = (g - this.NOWY) * 0.1 + this.NOWY;
        this.NOWX = x;
        this.NOWY = y;
        d.style.width = w + "px";
        d.style.height = h + "px";
        f.style.width = w + "px";
        f.style.height = h + "px";
        if (!this.isdownA) {
            d.style.left = x + "px";
            d.style.top = y + "px";
            e.style.left = x + "px";
            e.style.top = y + "px"
        }
        var j = w - this.Body_width;
        if (j < 0) j = -j;
        if (j < 1 && x < 1 && y < 1) {
            this.ShowZoonALL(false, 1);
            if (this.ZallBecloseAndgo != 0) {
                this.Start(this.ZallBecloseAndgo);
                this.ZallBecloseAndgo = 0
            }
            if (this.ZallBeCloseAndZoon) {
                this.ZallBeCloseAndZoon = false;
                this.ISSHOWZOON(true)
            }
        }
    };
    this.ClickShowZoonALL = function(a, b) {
        this.newZb = b;
        this.newX = -(this.Body_width * this.newZb - this.Body_width) / b;
        this.newY = -(this.Body_height * this.newZb - this.Body_height) / b;
        this.ShowZoonALL(a, b)
    };
    this.ShowZoonALL = function(a, b) {
        var c = this;
        if (!a) {
            this.Stop();
            if (this.ZoonALLisShow) {
                this.newZb = 1;
                this.newX = 0;
                this.newY = 0;
                this.ZoonALLisShow = false
            } else {
                this.isBodyWheel = true;
                $(this.ZoonALL).style.display = "none";
                $(this.ZimgIDALL).style.display = "none";
                this.ZoonALLisShow = false;
                clearInterval(this.timerZall)
            }
            this.ShowButtonPNG(3, 1)
        } else {
            this.isBodyWheel = false;
            this.ZoonALLisShow = true;
            this.Stop();
            $(this.ZimgIDALL).style.display = "none";
            var c = this;
            var d = function() {
                document.getElementById(c.ZimgIDALL).style.display = "block"
            };
            $(this.ZimgIDALL).onload = new function() {
                d()
            };
            $(this.ZimgIDALL).src = this.imageLargeURL[this.nowgoingnum];
            $(this.ZoonALL).style.display = "block";
            this.newZb = b;
            clearInterval(this.timerZall);
            var e = function() {
                c.refZall()
            };
            this.timerZall = window.setInterval(e, 10);
            this.ShowButtonPNG(3, 2)
        }
    };
    this.scrollfunc = function(e) {
        var a = 0;
        var b = this.getEvent(e);
        if (b.wheelDelta) {
            a = b.wheelDelta > 0 ? 1 : -1
        } else if (b.detail) {
            a = b.detail < 0 ? 1 : -1
        }
        var c = $(this.BODYNAME);
        var d = b.clientX - this.getLeft($(this.BODYNAME));
        var f = b.clientY - this.getTop($(this.BODYNAME));
        var g = this.newZb + (a * .2);
        this.newX -= this.Body_width * (a * .2) * ((d - this.newX) / (this.Body_width * g));
        this.newY -= this.Body_height * (a * .2) * ((f - this.newY) / (this.Body_height * g));
        g = g < 1 ? 1 : g;
        g = g > 4 ? 4 : g;
        this.newZb = g;
        if (this.newX > 0) this.newX = 0;
        if (this.newY > 0) this.newY = 0;
        if (this.newX < -this.Body_width * (g - 1)) this.newX = -this.Body_width * (g - 1);
        if (this.newY < -this.Body_height * (g - 1)) this.newY = -this.Body_height * (g - 1);
        if (g == 1 && a == -1) {} else {
            this.ShowZoonALL(true, this.newZb)
        }
    };
    this.D3Button2 = function(a) {
        if (this.ZoonALLisShow) {
            this.ZallBecloseAndgo = a;
            this.ShowZoonALL(false, 1)
        } else {}
        if (this.Pause) this.Start(a);
        else {
            if (this.STARTID != a) {
                this.Stop();
                this.Start(a)
            }
        }
    };
    this.ShowZoonDB = function(a) {
        if (this.Pause && this.isShowZoon) {
            this.INITDB();
            this.ISSHOWZOON(true);
            $(this.ZimgID).style.display = "none";
            $(this.ZimgID + 'BG').src = this.imageSmallURL[this.nowgoingnum];
            $(this.ZimgID + 'BG').style.width = this.Body_width * this.BAY + "px";
            $(this.ZimgID + 'BG').style.height = this.Body_height * this.BAY + "px";
            var b = this;
            var c = function() {
                document.getElementById(b.ZimgID).style.display = "block"
            };
            if (this.isShowZoonIMG) {
                $(this.ZimgID).onload = new function() {
                    c()
                };
                $(this.ZimgID).src = this.imageLargeURL[this.nowgoingnum]
            } else {
                $(this.ZimgID).style.display = "none"
            }
            this.ShowZoon(1)
        }
    };
    this.ISSHOWZOON = function(a) {
        if (a) {
            this.ShowButtonPNG(5, 2)
        } else {
            this.ShowButtonPNG(5, 1)
        }
        this.isShowZoon = a
    };
    this.Zoonx = 0;
    this.Zoony = 0;
    this.INITDB = function() {
        var a = 0;
        var b = 0;
        var c = this.getEvent();
        a = document.body.scrollTop;
        b = document.body.scrollLeft;
        if (!a) {
            a = document.documentElement.scrollTop
        }
        if (!a) {
            a = 0
        }
        if (!b) {
            b = document.documentElement.scrollLeft
        }
        if (!b) {
            b = 0
        }
        $(this.ZoonLiteBD).style.display = "block";
        var d = 0;
        var e = 0;
        var w = this.getWidth($(this.ImgID));
        var h = this.getHeight($(this.ImgID));
        $(this.ZoonLiteBD).style.width = this.Zoon_width + "px";
        $(this.ZoonLiteBD).style.height = this.Zoon_height + "px";
        var f = this.getWidth($(this.ZoonLiteBD)) + 4;
        var g = this.getHeight($(this.ZoonLiteBD)) + 4;
        var i = c.clientX + b - this.getLeft($(this.BODYNAME)) - f / 2;
        var j = c.clientY + a - this.getTop($(this.BODYNAME)) - g / 2;
        this.Zoonx = c.clientX + b - this.getLeft($(this.BODYNAME));
        this.Zoony = c.clientY + a - this.getTop($(this.BODYNAME));
        i = i < d ? d : i;
        i = i > d + w - f ? d + w - f : i;
        j = j < e ? e : j;
        j = j > e + h - g ? e + h - g : j;
        $(this.ZoonLiteBD).style.top = (j) + "px";
        $(this.ZoonLiteBD).style.left = (i) + "px"
    };
    this.ShowZoon = function(a) {
        this.INITDB();
        var b = this.getLeft($(this.ImgID));
        var c = this.getTop($(this.ImgID));
        var d = this.getLeft($(this.ZoonLiteBD));
        var e = this.getTop($(this.ZoonLiteBD));
        var x = d - b;
        var y = e - c;
        $(this.BODYNAME).style.width = this.getWidth($(this.ImgID)) + "px";
        $(this.BODYNAME).style.height = this.getHeight($(this.ImgID)) + "px";
        var f = this.getWidth($(this.ZoonLiteBD)) + 4;
        var g = this.getHeight($(this.ZoonLiteBD)) + 4;
        $(this.ZoonLiteBD).scrollLeft = this.Zoonx * this.BAY - f / 2;
        $(this.ZoonLiteBD).scrollTop = this.Zoony * this.BAY - g / 2
    };
    this.HideZoon = function() {
        this.ISSHOWZOON(false);
        $(this.ZimgID).style.display = "none";
        $(this.ZoonLiteBD).style.display = "none"
    };
    this.ShowFrim = function(N) {
        N = typeof(N) == "undefined" ? 1 : N;
        N = N > this.COUNT ? this.COUNT : N;
        N = N < 1 ? 1 : N;
        $(this.ImgID).src = this.ImagesSmall[N].src;
        $(this.ImgID).style.display = "block";
        this.nowgoingnum = N
    };
    this.SETXY_TITLE = function() {
        var a = 0;
        var b = 0;
        var w = this.getWidth($(this.BODYNAME));
        var h = this.getHeight($(this.BODYNAME));
        $(this.TitleBar).style.left = (b - 1) + "px";
        $(this.TitleBar).style.top = a + "px";
        $(this.ButtonBar).style.left = b - 1 + "px";
        $(this.ButtonBar).style.top = (a + h - this.getHeight($(this.ButtonBar))) + "px"
    };
    this.Start = function(N) {
        this.STARTID = N;
        this.Stop();
        this.ShowButtonPNG(4, 1);
        var a = this;
        var b = function() {
            a.DOTurnLeft()
        };
        var c = function() {
            a.DOTurnRight()
        };
        if (N == 1) {
            this.Interval = window.setInterval(b, this.autospeed)
        } else {
            if (this.nowgoingnum == 1) {
                this.nowgoingnum = this.COUNT
            }
            this.Interval = window.setInterval(c, this.autospeed)
        }
    };
    this.Stop = function() {
        this.ShowButtonPNG(4, 2);
        this.STARTID = 0;
        this.Pause = true;
        clearInterval(this.Interval)
    };
    this.DOTurnLeft = function() {
        this.Pause = false;
        if (!this.Go(1)) {
            this.Pause = true;
            this.Stop()
        }
    };
    this.DOTurnRight = function() {
        this.Pause = false;
        if (!this.Go(-1)) {
            this.Pause = true;
            this.TurnLeft = false;
            this.Stop()
        }
    };
    this.Go = function(n) {
        if (this.Pause) {
            return false
        }
        var a = this.nowgoingnum + n;
        if (a > this.COUNT) {
            a = 1;
            this.nowgoingnum = a;
            this.ShowFrim(this.nowgoingnum)
        }
        if (a < 1) {
            a = this.COUNT;
            this.nowgoingnum = a;
            this.ShowFrim(this.nowgoingnum)
        }
        this.nowgoingnum = a;
        this.ShowFrim(this.nowgoingnum);
        return true
    };
    this.Go2 = function(n) {
        if (this.Pause) {
            return false
        }
        var a = this.nowgoingnum + n;
        if (a > this.COUNT) {
            a = 1
        }
        if (a < 1) {
            a = this.COUNT
        }
        this.nowgoingnum = a;
        this.ShowFrim(this.nowgoingnum);
        return true
    };
    this.chkFlash = function() {
        var a = (navigator.appVersion.indexOf("MSIE") >= 0);
        var b = true;
        if (a) {
            try {
                var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
            } catch (e) {
                b = false
            }
        } else {
            b = false
        }
        return b
    };
    this.ShowFlash = function() {
        var a = this.getJSDirectory() + "index.swf";
        var w, h;
        if (this.fullScreen) {
            w = "100%";
            h = "100%"
        } else {
            w = this.Body_width;
            h = this.Body_height
        }
        var s = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + w + '" height="' + h + '">' + '<param name="movie" value="' + a + '">' + '<param name="quality" value="high">' + '<param name="allowFullScreen" value="true" />' + '<embed src="' + a + '" width="' + w + '" height="' + h + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>' + '</object>';
        document.write(s)
    };
    if (this.chkFlash() && !this.html) {
        this.ShowFlash()
    } else {
        this.CreateBODYDiv();
        this.CreateZoonDiv();
        this.LoadSmallImages();
        if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPad/i))) {
            $(this.ButtonBar).style.display = "none";
            var A = new WKTouch(this.BODYNAME, this).init()
        }
    }
}

function WKTouch(b, c) {
    this.node = document.getElementById(b);
    this.zIndexCount = 1;
    this.handleEvent = function(e) {
        switch (e.type) {
            case 'touchstart':
                this.onTouchStart(e);
                break;
            case 'touchmove':
                this.onTouchMove(e);
                break;
            case 'touchend':
                this.onTouchEnd(e);
                break;
            case 'touchcancel':
                this.onTouchCancel(e);
                break
        }
    };
    this.init = function() {
        this.startX = 0;
        this.startY = 0;
        this.curX = 0;
        this.curY = 0;
        this.elementPosX = 0;
        this.elementPosY = 0;
        this.gesture = false;
        this.node.addEventListener('touchstart', this, false)
    };
    this.onTouchStart = function(e) {
        c.dbclick();
        c.Stop();
        if (e.targetTouches.length == 1) {
            e.preventDefault();
            this.startX = e.targetTouches[0].pageX;
            this.startY = e.targetTouches[0].pageY;
            this.elementPosX = this.node.offsetLeft;
            this.elementPosY = this.node.offsetTop;
            this.node.addEventListener('touchmove', this, false);
            this.node.addEventListener('touchend', this, false);
            this.node.addEventListener('touchcancel', this, false)
        } else {
            this.node.removeEventListener('touchmove', this, false);
            this.node.removeEventListener('touchend', this, false);
            this.node.removeEventListener('touchcancel', this, false);
            e.preventDefault()
        }
    };
    this.onTouchMove = function(e) {
        var a = 10;
        if (e.targetTouches.length == 1) {
            e.preventDefault();
            this.curX = e.targetTouches[0].pageX - this.startX;
            if (this.curX > a) {
                this.startX = e.targetTouches[0].pageX;
                c.nowgoingnum++
            }
            if (this.curX < -a) {
                this.startX = e.targetTouches[0].pageX;
                c.nowgoingnum--
            }
            if (c.nowgoingnum > c.COUNT) {
                c.nowgoingnum = 1
            }
            if (c.nowgoingnum < 1) {
                c.nowgoingnum = c.COUNT
            }
            c.ShowFrim(c.nowgoingnum)
        } else {
            this.node.removeEventListener('touchmove', this, false);
            this.node.removeEventListener('touchend', this, false);
            this.node.removeEventListener('touchcancel', this, false);
            e.preventDefault()
        }
    };
    this.onTouchEnd = function(e) {
        if (c.isShowZoonIMG) {
            document.getElementById(c.ImgID).src = imageLargeURL[c.nowgoingnum]
        }
        this.node.removeEventListener('touchmove', this, false);
        this.node.removeEventListener('touchend', this, false);
        this.node.removeEventListener('touchcancel', this, false)
    };
    this.onTouchCancel = function(e) {
        this.node.removeEventListener('touchmove', this, false);
        this.node.removeEventListener('touchend', this, false);
        this.node.removeEventListener('touchcancel', this, false)
    }
}

