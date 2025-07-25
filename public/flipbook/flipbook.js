var FLIPBOOK = FLIPBOOK || {};
!(function (M, L, C, a) {
  (M.fn.flipBook = function (e) {
    return new FLIPBOOK.Main(e, this);
  }),
    (M.fn.swipeBook = function (e) {
      return (e.viewMode = "swipe"), new FLIPBOOK.Main(e, this);
    }),
    (M.fn.flipBook.options = {
      name: "",
      pages: [],
      tableOfContent: [],
      tableOfContentCloseOnClick: !0,
      thumbsCloseOnClick: !0,
      deeplinkingEnabled: !1,
      deeplinkingPrefix: "",
      assets: {
        preloader: "images/preloader.jpg",
        overlay: "images/overlay.png",
        flipMp3: "/themes/default/mp3/turnPage.mp3",
        spinner: "images/spinner.gif",
      },
      pdfUrl: null,
      pdfBrowserViewerIfMobile: !1,
      pdfBrowserViewerIfIE: !1,
      pdfBrowserViewerFullscreen: !0,
      pdfBrowserViewerFullscreenTarget: "_blank",
      pdfPageScale: 1,
      pdfOutline: !0,
      rangeChunkSize: 256,
      htmlLayer: !0,
      rightToLeft: !1,
      startPage: 0,
      sound: !0,
      backgroundColor: "rgb(81, 85, 88)",
      backgroundImage: "",
      backgroundPattern: "",
      backgroundTransparent: !1,
      thumbSize: 130,
      loadAllPages: !1,
      loadPagesF: 2,
      loadPagesB: 1,
      autoplayOnStart: !1,
      autoplayInterval: 3e3,
      autoplayLoop: !0,
      skin: "light",
      layout: "1",
      menuOverBook: !1,
      menuFloating: !1,
      menuBackground: "",
      menuShadow: "",
      menuMargin: 0,
      menuPadding: 0,
      menuTransparent: !1,
      menu2OverBook: !0,
      menu2Floating: !1,
      menu2Background: "",
      menu2Shadow: "",
      menu2Margin: 0,
      menu2Padding: 0,
      menu2Transparent: !0,
      skinColor: "",
      skinBackground: "",
      btnColor: "",
      btnBackground: "none",
      btnSize: 14,
      btnRadius: 2,
      btnMargin: 2,
      btnShadow: "",
      btnTextShadow: "",
      btnBorder: "",
      btnColorHover: "",
      btnBackgroundHover: "",
      sideBtnColor: "#FFF",
      sideBtnBackground: "#00000033",
      sideBtnSize: 30,
      sideBtnRadius: 0,
      sideBtnMargin: 0,
      sideBtnPaddingV: 5,
      sideBtnPaddingH: 0,
      sideBtnShadow: "",
      sideBtnTextShadow: "",
      sideBtnBorder: "",
      sideBtnColorHover: "#FFF",
      sideBtnBackgroundHover: "#00000066",
      floatingBtnColor: "#EEE",
      floatingBtnBackground: "#00000044",
      floatingBtnSize: null,
      floatingBtnRadius: null,
      floatingBtnMargin: null,
      floatingBtnShadow: "",
      floatingBtnTextShadow: "",
      floatingBtnBorder: "",
      floatingBtnColorHover: "",
      floatingBtnBackgroundHover: "",
      btnOrder: [
        "currentPage",
        "btnFirst",
        "btnPrev",
        "btnNext",
        "btnLast",
        "btnZoomIn",
        "btnZoomOut",
        "btnRotateLeft",
        "btnRotateRight",
        "btnAutoplay",
        "btnSearch",
        "btnSelect",
        "btnBookmark",
        "btnToc",
        "btnThumbs",
        "btnShare",
        "btnPrint",
        "btnDownloadPages",
        "btnDownloadPdf",
        "btnSound",
        "btnExpand",
        "btnClose",
      ],
      currentPage: {
        enabled: !0,
        title: "Current page",
        vAlign: "top",
        hAlign: "left",
        marginH: 0,
        marginV: 0,
        color: "",
        background: "",
      },
      btnFirst: {
        enabled: !1,
        title: "First page",
        icon: "fa-angle-double-left",
        icon2: "first_page",
      },
      btnPrev: {
        enabled: !0,
        title: "Previous page",
        icon: "icon-caret-left",
        icon2: "chevron_left",
      },
      btnNext: {
        enabled: !0,
        title: "Next page",
        icon: "icon-caret-right",
        icon2: "chevron_right",
      },
      btnLast: {
        enabled: !1,
        title: "Last page",
        icon: "fa-angle-double-right",
        icon2: "last_page",
      },
      btnZoomIn: {
        enabled: !0,
        title: "Zoom in",
        icon: "icon-plus",
        icon2: "zoom_in",
      },
      btnZoomOut: {
        enabled: !0,
        title: "Zoom out",
        icon: "icon-minus",
        icon2: "zoom_out",
      },
      btnRotateLeft: { enabled: !1, title: "Rotate left", icon: "fas fa-undo" },
      btnRotateRight: {
        enabled: !1,
        title: "Rotate right",
        icon: "fas fa-redo",
      },
      btnAutoplay: {
        enabled: !0,
        title: "Autoplay",
        icon: "icon-play",
        icon2: "play_arrow",
        iconAlt: "icon-pause",
        iconAlt2: "pause",
      },
      btnSearch: {
        enabled: !1,
        title: "Search",
        icon: "fas fa-search",
        icon2: "search",
      },
      btnSelect: {
        enabled: !0,
        title: "Select tool",
        icon: "fas fa-i-cursor",
        icon2: "text_format",
      },
      btnBookmark: {
        enabled: !0,
        title: "Bookmark",
        icon: "icon-bookmark-simple",
        icon2: "bookmark",
      },
      btnToc: {
        enabled: !0,
        title: "Table of Contents",
        icon: "icon-list-number",
        icon2: "toc",
      },
      btnThumbs: {
        enabled: !0,
        title: "Pages",
        icon: "icon-squres-four",
        icon2: "view_module",
      },
      btnShare: {
        enabled: !0,
        title: "Share",
        icon: "icon-link",
        icon2: "share",
        hideOnMobile: !0,
      },
      btnPrint: {
        enabled: !0,
        title: "Print",
        icon: "icon-printer",
        icon2: "print",
        hideOnMobile: !0,
      },
      btnDownloadPages: {
        enabled: !0,
        title: "Download pages",
        icon: "icon-download",
        icon2: "file_download",
        url: "images/pages.zip",
        name: "allPages.zip",
      },
      btnDownloadPdf: {
        forceDownload: !1,
        enabled: !0,
        title: "Download PDF",
        icon: "icon-file",
        icon2: "picture_as_pdf",
        url: null,
        openInNewWindow: !0,
        name: "allPages.pdf",
      },
      btnSound: {
        enabled: !0,
        title: "Volume",
        icon: "icon-speaker-hight",
        iconAlt: "icon-speaker-none",
        icon2: "volume_up",
        iconAlt2: "volume_mute",
        hideOnMobile: !0,
      },
      btnExpand: {
        enabled: !0,
        title: "Toggle fullscreen",
        icon: "icon-arrows-out-simple",
        icon2: "fullscreen",
        iconAlt: "icon-arrows-in-simple",
        iconAlt2: "fullscreen_exit",
      },
      btnClose: {
        title: "Close",
        icon: "fa-times",
        icon2: "close",
        hAlign: "right",
        vAlign: "top",
        size: 20,
      },
      btnShareIfMobile: !1,
      btnSoundIfMobile: !1,
      btnPrintIfMobile: !1,
      sideNavigationButtons: !0,
      hideMenu: !1,
      google_plus: { enabled: !0, url: null },
      twitter: { enabled: !0, url: null, description: null },
      facebook: {
        enabled: !0,
        load_sdk: !0,
        url: null,
        app_id: null,
        title: null,
        caption: null,
        description: null,
        image: null,
      },
      pinterest: { enabled: !0, url: null, image: null, description: null },
      email: { enabled: !0, title: null, description: null, url: null },
      pdf: { annotationLayer: !1 },
      pageTextureSize: 2048,
      pageTextureSizeSmall: 1024,
      pageTextureSizeTreshold: 1024,
      viewMode: "webgl",
      singlePageMode: !1,
      singlePageModeIfMobile: !1,
      zoomMin: 0.95,
      zoomMax2: null,
      zoomSize: null,
      zoomStep: 2,
      zoomTime: 0,
      wheelDisabledNotFullscreen: !1,
      arrowsDisabledNotFullscreen: !1,
      arrowsAlwaysEnabledForNavigation: !1,
      responsiveView: !0,
      responsiveViewTreshold: 768,
      minPixelRatio: 1,
      pageFlipDuration: 1,
      contentOnStart: !1,
      thumbnailsOnStart: !1,
      sideMenuOverBook: !0,
      sideMenuOverMenu: !1,
      sideMenuOverMenu2: !0,
      lightBox: !1,
      lightBoxOpened: !1,
      lightBoxFullscreen: !1,
      lightboxCloseOnClick: !1,
      lightboxResetOnOpen: !0,
      lightboxBackground: null,
      lightboxStartPage: null,
      lightboxMarginV: "0",
      lightboxMarginH: "0",
      lightboxCSS: "",
      lightboxPreload: !1,
      disableImageResize: !0,
      pan: 0,
      panMax: 10,
      panMax2: 2,
      panMin: -10,
      panMin2: -2,
      tilt: 0,
      tiltMax: 0,
      tiltMax2: 0,
      tiltMin: -20,
      tiltMin2: -5,
      rotateCameraOnMouseMove: !1,
      rotateCameraOnMouseDrag: !0,
      lights: !0,
      lightColor: 16777215,
      lightPositionX: 0,
      lightPositionZ: 1400,
      lightPositionY: 350,
      lightIntensity: 0.6,
      shadows: !0,
      shadowMapSize: 1024,
      shadowOpacity: 0.2,
      shadowDistance: 15,
      pageRoughness: 1,
      pageMetalness: 0,
      pageHardness: 2,
      coverHardness: 2,
      pageSegmentsW: 5,
      pageSegmentsH: 1,
      pageMiddleShadowSize: 2,
      pageMiddleShadowColorL: "#999999",
      pageMiddleShadowColorR: "#777777",
      antialias: !1,
      preloaderText: "",
      fillPreloader: {
        enabled: !1,
        imgEmpty: "images/logo_light.png",
        imgFull: "images/logo_dark.png",
      },
      logoImg: "",
      logoUrl: "",
      logoCSS: "position:absolute;",
      logoHideOnMobile: !1,
      printMenu: !0,
      downloadMenu: !0,
      cover: !0,
      backCover: !0,
      textLayer: !1,
      googleAnalyticsTrackingCode: null,
      minimumAndroidVersion: 6,
      strings: {
        print: "Print",
        printLeftPage: "Print left page",
        printRightPage: "Print right page",
        printCurrentPage: "Print current page",
        printAllPages: "Print all pages",
        download: "Download",
        downloadLeftPage: "Download left page",
        downloadRightPage: "Download right page",
        downloadCurrentPage: "Download current page",
        downloadAllPages: "Download all pages",
        bookmarks: "Bookmarks",
        bookmarkLeftPage: "Bookmark left page",
        bookmarkRightPage: "Bookmark right page",
        bookmarkCurrentPage: "Bookmark current page",
        search: "Search",
        findInDocument: "Find in document",
        pagesFoundContaining: "pages found containing",
        thumbnails: "Thumbnails",
        tableOfContent: "Table of Contents",
        share: "Share",
        pressEscToClose: "Press ESC to close",
      },
      mobile: {},
    }),
    (FLIPBOOK.Main = function (e, t) {
      var n = this;
      (this.elem = t),
        (this.$elem = M(t)),
        (this.$body = M("body")),
        (this.body = this.$body[0]),
        (this.$window = M(L)),
        (this.bodyHasVerticalScrollbar = function () {
          return n.body.scrollHeight > L.innerHeight;
        }),
        (this.isZoomed = function () {
          return 1 < n.zoom;
        }),
        (this.options = {});
      var o,
        s = C.createElement("div").style,
        a = (function () {
          for (
            var e = "t,webkitT,MozT,msT,OT".split(","), t = 0, o = e.length;
            t < o;
            t++
          )
            if (e[t] + "ransform" in s) return e[t].substr(0, e[t].length - 1);
          return !1;
        })(),
        r = /android/gi.test(navigator.appVersion),
        l = /iphone|ipad/gi.test(navigator.appVersion),
        d =
          ((o = "perspective"),
          ("" === a
            ? o
            : ((o = o.charAt(0).toUpperCase() + o.substr(1)), a + o)) in s);
      (this.msie = L.navigator.userAgent.indexOf("MSIE ")),
        (this.isAndroid = r),
        (this.has3d = d),
        (this.hasWebGl = (function (e) {
          if (L.WebGLRenderingContext) {
            for (
              var t = C.createElement("canvas"),
                o = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
                i = !1,
                n = 0;
              n < 4;
              n++
            )
              try {
                if (
                  (i = t.getContext(o[n])) &&
                  "function" == typeof i.getParameter
                )
                  return !e || { name: o[n], gl: i };
              } catch (e) {}
            return !1;
          }
          return !1;
        })()),
        0 <
          (function () {
            var e = -1;
            if ("Microsoft Internet Explorer" == navigator.appName) {
              var t = navigator.userAgent;
              null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(t) &&
                (e = parseFloat(RegExp.$1));
            } else if ("Netscape" == navigator.appName) {
              t = navigator.userAgent;
              null !=
                new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(t) &&
                (e = parseFloat(RegExp.$1));
            }
            return e;
          })() && ((this.hasWebGl = !1), (this.options.isIE = !0)),
        (this.thumbsShowing = !1),
        (this.bookmarkShowing = !1),
        (this.searchingString = !1),
        (this.tocShowing = !1),
        (this.menuShowing = !0);
      var h = {
          2: {
            currentPage: { vAlign: "bottom", hAlign: "center" },
            btnAutoplay: { hAlign: "left" },
            btnSound: { hAlign: "left" },
            btnExpand: { hAlign: "right" },
            btnZoomIn: { hAlign: "right" },
            btnZoomOut: { hAlign: "right" },
            btnSearch: { hAlign: "left" },
            btnBookmark: { hAlign: "left" },
            btnToc: { hAlign: "left" },
            btnThumbs: { hAlign: "left" },
            btnShare: { hAlign: "right" },
            btnPrint: { hAlign: "right" },
            btnDownloadPages: { hAlign: "right" },
            btnDownloadPdf: { hAlign: "right" },
            btnSelect: { hAlign: "right" },
          },
          3: {
            menuTransparent: !(this.fullscreenActive = !1),
            menu2Transparent: !1,
            menu2OverBook: !1,
            menu2Padding: 5,
            btnMargin: 5,
            currentPage: { vAlign: "top", hAlign: "center" },
            btnPrint: { vAlign: "top", hAlign: "right" },
            btnDownloadPdf: { vAlign: "top", hAlign: "right" },
            btnDownloadPages: { vAlign: "top", hAlign: "right" },
            btnThumbs: { vAlign: "top", hAlign: "left" },
            btnToc: { vAlign: "top", hAlign: "left" },
            btnBookmark: { vAlign: "top", hAlign: "left" },
            btnSearch: { vAlign: "top", hAlign: "left" },
            btnSelect: { vAlign: "top", hAlign: "right" },
            btnShare: { vAlign: "top", hAlign: "right" },
            btnAutoplay: { hAlign: "right" },
            btnExpand: { hAlign: "right" },
            btnZoomIn: { hAlign: "right" },
            btnZoomOut: { hAlign: "right" },
            btnSound: { hAlign: "right" },
            menuPadding: 5,
          },
          4: {
            menu2Transparent: !1,
            menu2OverBook: !1,
            sideMenuOverMenu2: !1,
            currentPage: { vAlign: "top", hAlign: "center" },
            btnAutoplay: { vAlign: "top", hAlign: "left" },
            btnSound: { vAlign: "top", hAlign: "left" },
            btnExpand: { vAlign: "top", hAlign: "right" },
            btnZoomIn: { vAlign: "top", hAlign: "right" },
            btnZoomOut: { vAlign: "top", hAlign: "right" },
            btnSearch: { vAlign: "top", hAlign: "left" },
            btnBookmark: { vAlign: "top", hAlign: "left" },
            btnToc: { vAlign: "top", hAlign: "left" },
            btnThumbs: { vAlign: "top", hAlign: "left" },
            btnShare: { vAlign: "top", hAlign: "right" },
            btnPrint: { vAlign: "top", hAlign: "right" },
            btnDownloadPages: { vAlign: "top", hAlign: "right" },
            btnDownloadPdf: { vAlign: "top", hAlign: "right" },
            btnSelect: { vAlign: "top", hAlign: "right" },
          },
        },
        p = {
          dark: {
            skinColor: "#EEE",
            btnColorHover: "#FFF",
            skinBackground: "#313538",
          },
          light: {
            skinColor: "#222",
            btnColorHover: "#000",
            skinBackground: "#FFF",
            floatingBtnColor: "#FFF",
            floatingBtnBackground: "#00000055",
          },
          gradient: {
            skinColor: "#EEE",
            btnColor: "#EEE",
            btnColorHover: "#FFF",
            skinBackground: "#313538DD",
            zoomMin: 0.85,
            menuOverBook: !0,
            menu2OverBook: !0,
            sideMenuOverMenu: !0,
            sideMenuOverMenu2: !0,
            menuBackground:
              "linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 100%)",
            menu2Background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0%, transparent 100%)",
          },
        };
      for (var c in p) e.skin == c && (e = M.extend(!0, {}, p[c], e));
      for (var c in h)
        String(e.layout) === c && (e = M.extend(!0, {}, h[c], e));
      this.options = M.extend(!0, {}, M.fn.flipBook.options, e);
      var u,
        g,
        f,
        b,
        m,
        k,
        v,
        w,
        P = this.options;
      if (((P.isMobile = M.browser.mobile || l || r), P.isMobile))
        for (var c in P.mobile) P[c] = P.mobile[c];
      if (
        ((this.strings = P.strings),
        (P.pageShininess = P.pageShininess / 2),
        (this.s = 0),
        P.googleAnalyticsTrackingCode &&
          ((this.gaCode = P.googleAnalyticsTrackingCode),
          L.ga ||
            ((g = C),
            (f = "script"),
            (b = "ga"),
            ((u = L).GoogleAnalyticsObject = b),
            (u.ga =
              u.ga ||
              function () {
                (u.ga.q = u.ga.q || []).push(arguments);
              }),
            (u.ga.l = 1 * new Date()),
            (m = g.createElement(f)),
            (k = g.getElementsByTagName(f)[0]),
            (m.async = 1),
            (m.src = "https://www.google-analytics.com/analytics.js"),
            k.parentNode.insertBefore(m, k)),
          ga("create", this.gaCode, "auto")),
        M("head").append(
          "<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />"
        ),
        P.isMobile &&
          ((P.singlePageMode = !!P.singlePageModeIfMobile || P.singlePageMode),
          P.viewModeMobile && (P.viewMode = P.viewModeMobile),
          P.pageTextureSizeMobile &&
            (P.pageTextureSize = P.pageTextureSizeMobile)),
        "3dSinglePage" == P.viewMode && (P.singlePageMode = !0),
        "2dSinglePage" == P.viewMode &&
          ((P.singlePageMode = !0), (P.viewMode = "2d")),
        P.singlePageMode &&
          ("2d" != P.viewMode && "swipe" != P.viewMode && (P.viewMode = "3d"),
          P.rightToLeft && (P.viewMode = "swipe")),
        P.singlePageMode && "3d" == P.viewMode && (P.rightToLeft = !1),
        "simple" == P.viewMode && ((P.viewMode = "3d"), (P.instantFlip = !0)),
        "webgl" == P.viewMode &&
          (!this.hasWebGl ||
            (parseFloat(
              !!(w = (v = (v || navigator.userAgent).toLowerCase()).match(
                /android\s([0-9\.]*)/
              )) && w[1]
            ) < P.minimumAndroidVersion &&
              this.isAndroid)) &&
          (P.viewMode = "3d"),
        "3d" != P.viewMode || n.has3d || (P.viewMode = "2d"),
        (this.webgl = "webgl" == P.viewMode),
        P.menuFloating && ((P.menuOverBook = !0), (P.sideMenuOverMenu = !0)),
        P.menu2Floating && ((P.menu2OverBook = !0), (P.sideMenuOverMenu2 = !0)),
        P.menuTransparent &&
          ((P.menuOverBook = !0),
          (P.sideMenuOverMenu = !0),
          (P.menuBackground = "none")),
        P.menu2Transparent
          ? ((P.menu2OverBook = !0),
            (P.sideMenuOverMenu2 = !0),
            (P.menu2Background = "none"))
          : (P.sideMenuOverMenu2 = !1),
        P.menuOverBook && (P.sideMenuOverMenu = !0),
        P.menu2OverBook && (P.sideMenuOverMenu2 = !0),
        P.isMobile && P.pdfBrowserViewerIfMobile && P.pdfUrl)
      )
        P.lightBox && !P.lightBoxOpened
          ? this.$elem
              .on("touched click", function () {
                x();
              })
              .css("cursor", "pointer")
          : x();
      else if (P.isIE && P.pdfBrowserViewerIfIE && P.pdfUrl)
        P.lightBox && !P.lightBoxOpened
          ? this.$elem
              .on("touched click", function () {
                x();
              })
              .css("cursor", "pointer")
          : x();
      else {
        P.pdfMode = Boolean(P.pdfUrl && "" != P.pdfUrl);
        var S = P.zoomLevels;
        if (S) {
          for (
            "string" == typeof S && (S = S.split(",")), i = 0;
            i < S.length;
            i++
          )
            S[i] = Number(S[i]);
          (P.zoomLevels = S), (P.zoomMin = S[0]);
        }
        P.backgroundTransparent && (P.backgroundColor = "none"),
          (this.wrapper = M(C.createElement("div")).addClass(
            "flipbook-main-wrapper"
          )),
          "" != P.backgroundColor &&
            this.wrapper.css("background", P.backgroundColor),
          "" != P.backgroundPattern &&
            this.wrapper.css(
              "background",
              "url(" + P.backgroundPattern + ") repeat"
            ),
          "" != P.backgroundImage &&
            (this.wrapper.css(
              "background",
              "url(" + P.backgroundImage + ") no-repeat"
            ),
            this.wrapper.css("background-size", "cover")),
          (this.bookLayer = M(C.createElement("div"))
            .addClass("flipbook-bookLayer")
            .appendTo(n.wrapper)),
          P.hideMenu &&
            (this.bookLayer.css("bottom", "0"), (P.menuOverBook = !0)),
          (this.book = M(C.createElement("div"))
            .addClass("book")
            .appendTo(n.bookLayer)),
          P.preloader
            ? (this.preloader = P.preloader)
            : !M(".flipbook-preloader").length && P.lightBox
            ? (this.preloader = M(
                '<div class="flipbook-preloader cssload-container"><div class="cssload-speeding-wheel"/><div class="flipbook-loading-text"></div><div class="flipbook-loading-bg"></div></div>'
              ))
            : P.lightBox
            ? (this.preloader = M(".flipbook-preloader"))
            : (this.preloader = M(
                '<div class="flipbook-preloader-2 cssload-container"><div class="cssload-speeding-wheel"/><div class="flipbook-loading-text"></div><div class="flipbook-loading-bg"></div></div>'
              )),
          M(".flipbook-loading-text").text(P.preloaderText),
          this.setLoadingProgress(0),
          !P.deeplinkingPrefix &&
            P.deeplinking &&
            P.deeplinking.prefix &&
            (P.deeplinkingPrefix = P.deeplinking.prefix),
          (P.deeplinkingEnabled =
            P.deeplinkingPrefix ||
            P.deeplinkingEnabled ||
            (P.deeplinking && P.deeplinking.enabled)),
          P.deeplinkingEnabled &&
            (T(),
            M(L).bind("hashchange", function (e) {
              T();
            })),
          (this.dispose = function () {
            this.disposed = !0;
          }),
          (P.main = this);
        var B = {
          _events: {},
          on: function (e, t) {
            this._events[e] || (this._events[e] = []), this._events[e].push(t);
          },
          off: function (e, t) {
            if (this._events[e]) {
              var o = this._events[e].indexOf(t);
              -1 < o && this._events[e].splice(o, 1);
            }
          },
          trigger: function (e) {
            if (this._events[e]) {
              var t = 0,
                o = this._events[e].length;
              if (o)
                for (; t < o; t++)
                  this._events[e][t].apply(this, [].slice.call(arguments, 1));
            }
          },
        };
        B.on("pageLoaded", function (e) {
          (P.pages[e.index] = P.pages[e.index] || {}),
            (P.pages[e.index].canvas = P.pages[e.index].canvas || {}),
            (P.pages[e.index].canvas[e.size] = e.canvas),
            n.searchingString && n.mark(n.searchingString);
        }),
          B.on("pageUnloaded", function (e) {
            e.unloadedPages.forEach(function (e) {
              n.Book.onPageUnloaded && n.Book.onPageUnloaded(e.index, e.size);
            });
          }),
          B.on("pdfinit", function () {
            (P.tableOfContent = n.pdfService.outline || P.tableOfContent),
              (P.doublePage = n.pdfService.double),
              (n.viewportOriginal = n.pdfService.viewports[0]),
              (P.firstPage = {
                width: n.pdfService.viewports[0].width,
                height: n.pdfService.viewports[0].height,
                ratio:
                  n.pdfService.viewports[0].width /
                  n.pdfService.viewports[0].height,
              }),
              1 < n.pdfService.numPages &&
                (P.secondPage = {
                  width: n.pdfService.viewports[1].width,
                  height: n.pdfService.viewports[1].height,
                  ratio:
                    n.pdfService.viewports[1].width /
                    n.pdfService.viewports[1].height,
                }),
              (P.numPages = n.pdfService.numPages),
              1 == P.numPages &&
                ((P.viewMode = "swipe"),
                (P.singlePageMode = !0),
                (P.btnNext.enabled = !1),
                (P.btnPrev.enabled = !1),
                (P.btnFirst.enabled = !1),
                (P.btnLast.enabled = !1),
                (P.sideNavigationButtons = !1),
                (P.btnAutoplay.enabled = !1),
                (n.webgl = !1));
            for (var e = [], t = 0; t < P.numPages; t++) {
              var o = { canvas: {} };
              P.pages && P.pages[t]
                ? M.extend(o, P.pages[t])
                : (o.title = t + 1),
                (e[t] = o);
            }
            P.pages = e;
            n.book.height();
            var i = P.pageTextureSize;
            (P.pageWidth = parseInt(
              (i * n.viewportOriginal.width) / n.viewportOriginal.height
            )),
              (P.pageHeight = i),
              (P.pw = P.pageWidth),
              (P.ph = P.pageHeight),
              (P.zoomSize = P.zoomSize || P.pageTextureSize),
              n.start();
          }),
          B.on("toolSelect", function () {
            n.bookLayer.removeClass("flipbook-move"),
              n.btnSelect && n.btnSelect.addClass("flipbook-btn-active"),
              M(".flipbook-page-htmlContent").css("userSelect", "auto");
          }),
          B.on("toolMove", function () {
            n.bookLayer.addClass("flipbook-move"),
              n.btnSelect && n.btnSelect.removeClass("flipbook-btn-active"),
              M(".flipbook-page-htmlContent").css("userSelect", "none");
          }),
          (this.model = B),
          P.lightBox
            ? ((P.btnClose.enabled = !0),
              (this.lightbox = new FLIPBOOK.Lightbox(this, this.wrapper, P)),
              (this.lightboxStartedTimes = 0),
              this.wrapper.css("background", "none"),
              this.bookLayer.css("background", "none"),
              this.book.css("background", "none"),
              this.preloader.appendTo(this.$body).css("position", "fixed"),
              this.$elem
                .css("cursor", "pointer")
                .bind("tap click", function (e) {
                  (n.lightboxStartPage = M(this).attr("data-page")),
                    n.started
                      ? (n.lightboxStart(),
                        P.lightBoxFullscreen &&
                          setTimeout(function () {
                            n.toggleExpand();
                          }, 0))
                      : (O(),
                        P.lightBoxFullscreen &&
                          setTimeout(function () {
                            n.toggleExpand();
                          }, 100));
                }),
              P.lightBoxOpened
                ? (O(), M(this).trigger("lightboxLoadingStarted"))
                : P.lightboxPreload &&
                  ("undefined" != typeof IScroll ||
                    FLIPBOOK.scriptsAdded[FLIPBOOK.iscrollSrc] ||
                    n.loadScript(FLIPBOOK.iscrollSrc, function () {}),
                  P.pdfMode &&
                    ("undefined" != typeof pdfjsLib ||
                      FLIPBOOK.scriptsAdded[FLIPBOOK.pdfjsSrc] ||
                      n.loadScript(FLIPBOOK.pdfjsSrc, function () {}),
                    void 0 !== FLIPBOOK.PdfService ||
                      FLIPBOOK.scriptsAdded[FLIPBOOK.pdfServiceSrc] ||
                      n.loadScript(FLIPBOOK.pdfServiceSrc, function () {}),
                    P.btnSearch.enabled &&
                      (FLIPBOOK.scriptsAdded[FLIPBOOK.markSrc] ||
                        n.loadScript(FLIPBOOK.markSrc, function () {}))),
                  "webgl" == P.viewMode &&
                    ("undefined" != typeof THREE ||
                      FLIPBOOK.scriptsAdded[FLIPBOOK.threejsSrc] ||
                      n.loadScript(FLIPBOOK.threejsSrc, function () {}))),
              (this.fullscreenElement = C.documentElement))
            : ((P.btnClose.enabled = !1),
              this.preloader.appendTo(this.wrapper),
              this.wrapper.appendTo(this.$elem),
              (this.fullscreenElement = this.$elem[0]),
              O());
      }
      function x() {
        P.pdfBrowserViewerFullscreen
          ? L.open(P.pdfUrl, P.pdfBrowserViewerFullscreenTarget)
          : M('<object type="application/pdf"/>')
              .width("100%")
              .height("100%")
              .attr("data", P.pdfUrl)
              .appendTo(n.$elem);
      }
      function T() {
        if (!n.disposed) {
          var e = n.getPageFromHash(),
            t = e;
          e &&
            ((e = P.rightToLeft ? P.pages.length - e + 1 : e),
            n.started
              ? n.Book &&
                (n.lightbox && (n.lightbox.openLightbox(), n.lightboxStart()),
                n.goToPage(e, !0))
              : ((P.startPage = t),
                P.lightBox &&
                  (O(),
                  P.lightBoxFullscreen &&
                    setTimeout(function () {
                      n.toggleExpand();
                    }, 100))));
        }
      }
      function O() {
        if (P.fillPreloader.enabled) {
          n.$fillPreloader = M("<div>").addClass("flipbook-fillPreloader");
          var t = new Image();
          (t.src = P.fillPreloader.imgEmpty),
            (t.onload = function () {
              var e = new Image();
              (e.src = P.fillPreloader.imgFull),
                (e.onload = function () {
                  M(t).appendTo(n.$fillPreloader),
                    (n.$fillPreloaderImg = M(e).appendTo(n.$fillPreloader)),
                    n.$fillPreloader.appendTo(n.wrapper),
                    y();
                });
            });
        } else y();
      }
      function y() {
        (n.id = Date.now()),
          n.addPageItems(),
          P.pdfMode ? n.initPdf() : ((P.btnSearch.enabled = !1), n.initJpg()),
          n.setLoadingProgress(0.1);
      }
    }),
    (FLIPBOOK.Main.prototype = {
      start: function () {
        this.options.dp && (this.options.doublePage = !0),
          this.started ||
            ((this.model.pageW = this.options.pageWidth),
            (this.model.bookW = 2 * this.options.pageWidth),
            this.options.singlePageMode && (this.model.bookW /= 2),
            (this.model.pageH = this.options.pageHeight),
            (this.model.bookH = this.options.pageHeight),
            this.options.numPages % 2 == 0
              ? (this.options.numSheets = (this.options.numPages + 2) / 2)
              : (this.options.numSheets = (this.options.numPages + 1) / 2),
            (this.started = !0),
            this.options.lightBox &&
              (this.lightbox.openLightbox(), this.lightboxStart()),
            this.createBook(),
            this.updateSkinColors());
      },
      updateSkinColors: function () {
        var e = this.options;
        e.skinColor &&
          this.wrapper.find(".skin-color").css("color", e.skinColor),
          e.skinBackground &&
            this.wrapper
              .find(".skin-color-bg")
              .css("background", e.skinBackground);
      },
      lightboxStart: function () {
        var e = this;
        this.started || this.start(),
          void 0 !== this.Book
            ? (this.Book.enable(),
              this.options.contentOnStart && this.toggleToc(!0),
              this.options.thumbnailsOnStart && this.toggleThumbs(!0),
              this.lightboxStartPage
                ? this.goToPage(this.lightboxStartPage, !0)
                : this.options.lightboxStartPage &&
                  this.goToPage(this.options.lightboxStartPage, !0),
              this.lightboxStartedTimes++,
              this.gaCode &&
                ga("send", {
                  hitType: "event",
                  eventCategory: "Flipbook : " + this.options.name,
                  eventAction: "lightbox open",
                  eventLabel: "lightbox open",
                  eventValue: this.lightboxStartedTimes,
                  nonInteraction: !0,
                }),
              this.updateCurrentPage(),
              this.initColors(),
              this.resize(),
              M(this).trigger("lightboxOpened"))
            : setTimeout(function () {
                e.lightboxStart();
              }, 100);
      },
      setHash: function (e) {
        e < 1 && (e = 1),
          this.options.deeplinkingEnabled &&
            this.Book.enabled &&
            (L.location.hash =
              "#" + this.options.deeplinkingPrefix + String(e));
      },
      clearHash: function () {
        L.location.hash = "";
      },
      getPageFromHash: function () {
        var e = null,
          t = L.location.hash,
          o = "#" + this.options.deeplinkingPrefix;
        return (
          -1 !== t.indexOf(o) &&
            ((e = parseInt(
              L.location.hash
                .replace(/#/g, "")
                .replace(this.options.deeplinkingPrefix, "")
            )),
            isNaN(e) && (e = 0)),
          e
        );
      },
      initColors: function () {
        this.wrapper
          .find(".skin-color-bg")
          .removeClass("flipbook-bg-light")
          .removeClass("flipbook-bg-dark")
          .addClass("flipbook-bg-" + this.options.skin),
          this.wrapper
            .find(".skin-color")
            .removeClass("flipbook-color-light")
            .removeClass("flipbook-color-dark")
            .addClass("flipbook-color-" + this.options.skin),
          this.updateSkinColors();
      },
      lightboxEnd: function () {
        screenfull.isFullscreen && screenfull.exit(),
          L.location.hash && this.clearHash(),
          this.setLoadingProgress(1),
          this.Book.disable();
      },
      turnPageComplete: function () {
        (this.animating = !1), this.updateCurrentPage();
        var e = this.Book.rightIndex || 0;
        this.options.rightToLeft && (e = this.options.pages.length - e),
          this.pdfService && this.pdfService.setRightIndex(e);
      },
      updateCurrentPage: function () {
        if (void 0 !== this.currentPage) {
          var e,
            t = this.options.rightToLeft,
            o = this.options.numPages,
            i = this.Book.rightIndex || 0;
          t && (i = this.options.pages.length - i),
            this.options.singlePageMode || this.Book.singlePage
              ? (t && i--,
                (e = i + 1),
                (this.currentPageNumber = i),
                this.setHash(e),
                (this.cPage = [i]))
              : (o < i || (i == o && o % 2 == 0)
                  ? ((e = o), (this.cPage = [o - 1]))
                  : i < 1
                  ? ((e = 1), (this.cPage = [0]))
                  : ((e = String(i) + "-" + String(i + 1)),
                    (this.cPage = [i - 1, i])),
                this.setHash(i)),
            t
              ? (this.enableNext(0 < i), this.enablePrev(i < o - 1))
              : (this.enablePrev(0 < i), this.enableNext(i < o - 1)),
            2 == this.cPage.length
              ? (this.wrapper.find(".c-l-p").show(),
                this.wrapper.find(".c-r-p").show(),
                this.wrapper.find(".c-p").hide())
              : (this.wrapper.find(".c-l-p").hide(),
                this.wrapper.find(".c-r-p").hide(),
                this.wrapper.find(".c-p").show()),
            this.s && 0 < this.options.pdfPageScale && this.goToPage(0),
            e != this.currentPageValue &&
              ((this.currentPageValue = String(e)),
              this.currentPage.text(e + " / " + String(o)),
              this.currentPageInput.width(this.currentPageHolder.width()),
              this.resize(),
              M(this).trigger({
                type: "pagechange",
                page: this.currentPageValue,
                name: this.options.name,
              }));
        }
      },
      initJpg: function () {
        var n = this;
        1 == this.options.numPages &&
          ((this.options.viewMode = "swipe"),
          (this.options.singlePageMode = !0),
          (this.webgl = !1)),
          this.loadPage(0, this.options.pageTextureSize, function () {
            if ((n.setLoadingProgress(0.5), 1 == n.options.pages.length)) {
              var e = n.options.pages[0].img;
              (n.options.pw = e.width),
                (n.options.ph = e.height),
                (n.options.pageWidth = e.width),
                (n.options.pageHeight = e.height),
                (n.options.pageMode = "singlePage"),
                (n.options.doublePage = !1),
                (n.options.zoomSize = n.options.zoomSize || e.height),
                n.setLoadingProgress(0.7),
                (n.options.btnNext.enabled = !1),
                (n.options.btnPrev.enabled = !1),
                (n.options.btnFirst.enabled = !1),
                (n.options.btnLast.enabled = !1),
                (n.options.sideNavigationButtons = !1),
                (n.options.btnAutoplay.enabled = !1),
                n.start();
            } else
              n.loadPage(1, n.options.pageTextureSize, function () {
                var e = n.options.pages[0].img,
                  t = n.options.pages[1].img,
                  o = e.width / e.height,
                  i = t.width / t.height;
                (n.options.pw = e.width),
                  (n.options.ph = e.height),
                  (n.options.pageWidth = e.width),
                  (n.options.pageHeight = e.height),
                  (n.options.doublePage = 1.5 < i / o),
                  (n.options.zoomSize = n.options.zoomSize || e.height),
                  n.setLoadingProgress(0.7),
                  n.start();
              });
          });
      },
      initPdf: function () {
        if (!this.started) {
          ("swipe" != this.options.viewMode &&
            !this.options.btnSearch.enabled) ||
            (this.options.textLayer = !0);
          var t = this;
          if ("undefined" == typeof pdfjsLib) {
            if (!FLIPBOOK.scriptsAdded[FLIPBOOK.pdfjsSrc])
              return void t.loadScript(FLIPBOOK.pdfjsSrc, function () {
                t.initPdf();
              });
            if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.pdfjsSrc])
              return void setTimeout(function () {
                t.initPdf();
              }, 100);
          }
          if ((this.setLoadingProgress(0.2), void 0 === FLIPBOOK.PdfService)) {
            if (!FLIPBOOK.scriptsAdded[FLIPBOOK.pdfServiceSrc])
              return void t.loadScript(FLIPBOOK.pdfServiceSrc, function () {
                t.initPdf();
              });
            if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.pdfServiceSrc])
              return void setTimeout(function () {
                t.initPdf();
              }, 100);
          }
          this.setLoadingProgress(0.3),
            L.CanvasPixelArray &&
              (CanvasPixelArray.prototype.set = function (e) {
                for (var t = this.length, o = 0; o < t; o++) this[o] = e[o];
              }),
            (PDFJS = pdfjsLib),
            (pdfjsLib.externalLinkTarget = pdfjsLib.LinkTarget.BLANK),
            (pdfjsLib.GlobalWorkerOptions.workerSrc =
              this.options.pdfjsworkerSrc || FLIPBOOK.pdfjsworkerSrc),
            "https:" == location.protocol &&
              (t.options.pdfUrl = t.options.pdfUrl.replace(
                "http://",
                "https://"
              ));
          var e = {
            cMapPacked: !0,
            cMapUrl: "cmaps/",
            disableAutoFetch: !0,
            disableStream: !0,
            url: t.options.pdfUrl,
            rangeChunkSize: 1024 * Number(t.options.rangeChunkSize),
          };
          if (!this.pdfinitStarted)
            (this.pdfinitStarted = !0),
              pdfjsLib.getDocument(e).promise.then(
                function (e) {
                  (t.pdfDocument = e),
                    (t.pdfService = new FLIPBOOK.PdfService(
                      e,
                      t.model,
                      t.options
                    )),
                    (t.options.thumbLoaded = function (e) {
                      (t.options.thumbs = t.options.thumbs || []),
                        (t.options.thumbs[e.index] = e);
                    }),
                    t.setLoadingProgress(0.5),
                    t.pdfService.init();
                },
                function (e) {
                  alert(e);
                }
              );
        }
      },
      loadPageHTML: function (t, o) {
        if (this.options.pdfMode) {
          var i = this;
          t = t;
          this.pdfService.loadTextLayer(t, function (e) {
            o.call(i, i.options.pages[t].htmlContent);
          });
        } else o.call(this, this.options.pages[t].htmlContent);
      },
      loadPage: function (e, t, o) {
        var i = this,
          n =
            this.options.pages &&
            this.options.pages[e] &&
            this.options.pages[e].src;
        if (this.options.pdfMode && !n) this.loadPageFromPdf(e, t, o);
        else {
          i = this;
          var s = this.options.pages[e];
          s.img
            ? s.imgLoaded
              ? i.pageLoaded(
                  {
                    index: e,
                    size: t,
                    image: s.img,
                    htmlContent: s.htmlContentDiv,
                  },
                  o
                )
              : setTimeout(function () {
                  i.loadPage(e, t, o);
                }, 300)
            : ((s.img = C.createElement("img")),
              s.img.setAttribute("id", e),
              (s.img.onload = function () {
                (s.imgLoaded = !0),
                  s.htmlContent &&
                    (s.htmlContentDiv = M(C.createElement("div"))
                      .addClass("flipbook-page-htmlContent")
                      .append(M(s.htmlContent))),
                  i.pageLoaded(
                    {
                      index: e,
                      size: t,
                      image: s.img,
                      htmlContent: s.htmlContentDiv,
                    },
                    o
                  );
              }),
              "webgl" == this.options.viewMode &&
                (s.img.crossOrigin = "Anonymous"),
              "https:" == location.protocol &&
                (s.src = s.src.replace("http://", "https://")),
              (s.img.src = s.src));
        }
      },
      pageLoaded: function (e, t) {
        t.call(this, e, t),
          this.options.loadAllPages &&
            e.index < this.options.numPages - 1 &&
            this.loadPage(e.index + 1, e.size, function () {});
      },
      loadPageFromPdf: function (e, t, o) {
        (t = t || this.options.pageTextureSize),
          this.options.pages[e]
            ? this.pdfService.renderBookPage(e, t, o)
            : o.call(this);
      },
      getString: function (e) {
        return this.options.strings[e];
      },
      mark: function (e) {
        var t = M(".flipbook-page-htmlContent");
        t.unmark({
          done: function () {
            t.mark(e, { acrossElements: !0 });
          },
        });
      },
      unmark: function () {
        (this.searchingString = null), M(".flipbook-page-htmlContent").unmark();
      },
      setTool: function (e) {
        (this.tool = e), this.model.trigger(e);
      },
      toggleTool: function () {
        var e = "toolSelect" == this.tool ? "toolMove" : "toolSelect";
        this.setTool(e);
      },
      toggleSound: function () {
        var e = this.options;
        e.sound
          ? ((e.sound = !1),
            this.btnSound.$icon.hide(),
            this.btnSound.$iconAlt.show())
          : ((e.sound = !0),
            this.btnSound.$icon.show(),
            this.btnSound.$iconAlt.hide());
      },
      scrollPageIntoView: function (e) {
        var t = this.options.rightToLeft
          ? this.options.pages.length - e.pageNumber + 1
          : e.pageNumber;
        this.goToPage(t);
      },
      loadScript: function (o, i) {
        var n = this,
          s = C.createElement("script"),
          e = C.getElementsByTagName("script")[0];
        (s.async = 1),
          e.parentNode.insertBefore(s, e),
          (FLIPBOOK.scriptsAdded[o] = !0),
          (s.onload = s.onreadystatechange =
            function (e, t) {
              (!t && s.readyState && !/loaded|complete/.test(s.readyState)) ||
                ((s.onload = s.onreadystatechange = null),
                (s = a),
                t || (i && i.call(n)),
                (FLIPBOOK.scriptsLoaded[o] = !0));
            }),
          (s.src = o);
      },
      createBook: function () {
        var n = this,
          e = this.model,
          t = this.options;
        if (
          ("material" != t.icons ||
            FLIPBOOK.MaterialIconsLoaded ||
            ((FLIPBOOK.MaterialIconsLoaded = !0),
            M("head").append(
              '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">'
            )),
          "undefined" == typeof IScroll)
        ) {
          if (!FLIPBOOK.scriptsAdded[FLIPBOOK.iscrollSrc])
            return void n.loadScript(FLIPBOOK.iscrollSrc, n.createBook);
          if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.iscrollSrc])
            return void setTimeout(function () {
              n.createBook();
            }, 100);
        }
        if (this.options.btnSearch.enabled) {
          if (!FLIPBOOK.scriptsAdded[FLIPBOOK.markSrc])
            return void n.loadScript(FLIPBOOK.markSrc, n.createBook);
          if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.markSrc])
            return void setTimeout(function () {
              n.createBook();
            }, 100);
        }
        if ((n.setLoadingProgress(0.9), "webgl" == n.options.viewMode)) {
          if ("undefined" == typeof THREE) {
            if (!FLIPBOOK.scriptsAdded[FLIPBOOK.threejsSrc])
              return void n.loadScript(FLIPBOOK.threejsSrc, n.createBook);
            if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.threejsSrc])
              return void setTimeout(function () {
                n.createBook();
              }, 100);
          }
          if (void 0 === FLIPBOOK.BookWebGL) {
            if (!FLIPBOOK.scriptsAdded[FLIPBOOK.flipbookWebGlSrc])
              return void n.loadScript(FLIPBOOK.flipbookWebGlSrc, n.createBook);
            if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.flipbookWebGlSrc])
              return void setTimeout(function () {
                n.createBook();
              }, 100);
          }
        } else if ("swipe" == n.options.viewMode) {
          if (void 0 === FLIPBOOK.BookSwipe) {
            if (!FLIPBOOK.scriptsAdded[FLIPBOOK.flipBookSwipeSrc])
              return void n.loadScript(FLIPBOOK.flipBookSwipeSrc, n.createBook);
            if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.flipBookSwipeSrc])
              return void setTimeout(function () {
                n.createBook();
              }, 100);
          }
        } else if (void 0 === FLIPBOOK.Book3) {
          if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.flipbookBook3Src])
            return void n.loadScript(FLIPBOOK.flipbookBook3Src, n.createBook);
          if (!FLIPBOOK.scriptsAdded[FLIPBOOK.flipbookBook3Src])
            return void setTimeout(function () {
              n.createBook();
            }, 100);
        }
        if (
          (this.setLoadingProgress(1),
          this.initEasing(),
          n.options.doublePage && 2 < n.options.pages.length)
        ) {
          for (
            var o = [n.options.pages[0]], i = 1;
            i <= n.options.pages.length - 2;
            i++
          ) {
            var s = n.options.pages[i],
              a = {
                src: s.src,
                thumb: s.thumb,
                title: s.title,
                htmlContent: s.htmlContent,
                side: "left",
              },
              r = {
                src: s.src,
                thumb: s.thumb,
                title: s.title,
                htmlContent: s.htmlContent,
                side: "right",
              };
            o.push(a), o.push(r);
          }
          o.push(n.options.pages[n.options.pages.length - 1]),
            (n.options.pages = o);
        }
        if (
          ((this.options.numPages = this.options.pages.length),
          this.options.numPages % 2 == 0 ||
            this.options.singlePageMode ||
            ((this.oddPages = !0),
            (this.options.oddPages = !0),
            this.options.pages.push({
              src: this.options.assets.preloader,
              thumb: "",
            })),
          0 < n.options.pages.length)
        )
          for (i = 0; i < n.options.pages.length; i++)
            void 0 !== n.options.pages[i].htmlContent &&
              ((n.options.hasHtmlContent = !0),
              (n.options.pages[i].htmlContent = M(
                n.options.pages[i].htmlContent
              )));
        function l() {
          (n.flipsound = C.createElement("audio")),
            n.flipsound.setAttribute("src", n.options.assets.flipMp3),
            n.flipsound.setAttribute("type", "audio/mpeg");
        }
        if ("webgl" == n.options.viewMode) {
          var d = n.options;
          (d.scroll = n.scroll),
            ((d.parent = n).Book = new FLIPBOOK.BookWebGL(n.book[0], e, d)),
            (n.webglMode = !0),
            n.initSwipe(),
            l();
        } else
          "swipe" == n.options.viewMode
            ? ((n.Book = new FLIPBOOK.BookSwipe(
                n.book[0],
                n.bookLayer[0],
                e,
                t
              )),
              n.initSwipe())
            : ("2d" != n.options.viewMode && (n.options.viewMode = "3d"),
              (n.Book = new FLIPBOOK.Book3(n.book[0], e, t)),
              n.initSwipe(),
              (n.webglMode = !1),
              l());
        n.Book.enable(),
          n.book.hide().fadeIn("slow"),
          (this.tocCreated = !1),
          this.createMenu(),
          this.onZoom(this.options.zoom),
          1 == this.options.pages.length && (this.rightToLeft = !1),
          (FLIPBOOK.books = FLIPBOOK.books || {}),
          (FLIPBOOK.books[n.id] = n.Book);
        var h = M(n.Book);
        h.bind("loadPagesFromPdf", function (e, t, o, i) {
          n.loadPagesFromPdf(t, o, i);
        }),
          h.bind("turnPageComplete", function (e) {
            n.turnPageComplete();
          }),
          h.bind("initEasing", function (e) {
            n.initEasing();
          }),
          h.bind("playFlipSound", function (e) {
            n.playFlipSound();
          }),
          h.bind("closeLightbox", function (e) {
            n.closeLightbox();
          }),
          h.bind("updateCurrentPage", function (e) {
            n.updateCurrentPage();
          }),
          this.createLogo(),
          this.onBookCreated();
      },
      addPageItems: function () {
        var e = this.options.pages,
          t = this.id;
        for (var o in e) {
          var i = e[o];
          if (i.items)
            for (var n in i.items) {
              var s = i.items[n];
              switch (s.type) {
                case "iframe":
                  var a =
                    '<iframe src="' +
                    s.src +
                    '" width="' +
                    s.width +
                    '" height="' +
                    s.height +
                    '" style="position:absolute;top:' +
                    s.y +
                    "px;left:" +
                    s.x +
                    'px;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                  (i.htmlContent = i.htmlContent || ""), (i.htmlContent += a);
                  break;
                case "img":
                  var r =
                    '<img src="' +
                    s.src +
                    '" style="position:absolute;top:' +
                    s.y +
                    "px;left:" +
                    s.x +
                    "px;width:" +
                    s.width +
                    "px;height:" +
                    s.height +
                    'px;bottom:auto;right:auto;">';
                  (i.htmlContent = i.htmlContent || ""), (i.htmlContent += r);
                  break;
                default:
                  var l =
                    '<div data-bookid="' +
                    t +
                    '" data-page="' +
                    (s.page || "") +
                    '" data-url="' +
                    (s.url || "") +
                    '" style="position:absolute;top:' +
                    s.y +
                    "px;left:" +
                    s.x +
                    "px;width:" +
                    s.width +
                    "px;height:" +
                    s.height +
                    'px;background:#FFFF0033;cursor:pointer;" onclick="FLIPBOOK.onPageLinkClick(this)"></div>';
                  (i.htmlContent = i.htmlContent || ""), (i.htmlContent += l);
              }
            }
        }
      },
      onBookCreated: function () {
        var e = this.options,
          t = this;
        M(L).resize(function () {
          t.resize();
        }),
          e.rightToLeft
            ? t.goToPage(Number(e.pages.length - Number(e.startPage) + 1), !0)
            : t.goToPage(Number(e.startPage), !0),
          this.updateCurrentPage(),
          C.addEventListener("keydown", function (e) {
            if (t.Book.enabled) {
              if (
                !t.options.arrowsAlwaysEnabledForNavigation ||
                (37 != e.keyCode && 39 != e.keyCode)
              ) {
                if (
                  !t.options.lightBox &&
                  !t.fullscreenActive &&
                  (t.options.arrowsDisabledNotFullscreen ||
                    t.bodyHasVerticalScrollbar())
                )
                  return;
              } else;
              switch ((e = e || L.event).keyCode) {
                case 37:
                  t.prevPage();
                  break;
                case 38:
                  t.zoomIn();
                  break;
                case 39:
                  t.nextPage();
                  break;
                case 40:
                  t.zoomOut();
              }
              return !1;
            }
          }),
          C.addEventListener("MSFullscreenChange", function (e) {
            t.handleFsChange();
          }),
          C.addEventListener("mozfullscreenchange", function (e) {
            t.handleFsChange();
          }),
          C.addEventListener("webkitfullscreenchange", function (e) {
            t.handleFsChange();
          }),
          C.addEventListener("fullscreenchange", function (e) {
            t.handleFsChange();
          }),
          (this.zoom = e.zoomMin),
          this.bookLayer.bind("DOMMouseScroll", function (e) {
            if (
              t.Book.enabled &&
              (t.options.lightBox ||
                t.fullscreenActive ||
                (!t.options.wheelDisabledNotFullscreen &&
                  !t.bodyHasVerticalScrollbar()))
            )
              return (
                e.stopPropagation(),
                e.preventDefault(),
                0 < e.originalEvent.detail
                  ? t.zoomOut(e.originalEvent)
                  : t.zoomIn(e.originalEvent),
                !1
              );
          }),
          this.bookLayer.bind("mousewheel", function (e) {
            if (
              t.Book.enabled &&
              (t.options.lightBox ||
                t.fullscreenActive ||
                (!t.options.wheelDisabledNotFullscreen &&
                  !t.bodyHasVerticalScrollbar()))
            )
              return (
                e.stopPropagation(),
                e.preventDefault(),
                e.originalEvent.wheelDelta < 0
                  ? t.zoomOut(e.originalEvent)
                  : t.zoomIn(e.originalEvent),
                !1
              );
          }),
          this.setTool("toolMove"),
          e.contentOnStart && t.toggleToc(!0),
          e.thumbnailsOnStart && t.toggleThumbs(!0),
          e.autoplayOnStart && t.toggleAutoplay(!0),
          t.options.lightBox && t.Book.disable(),
          t.Book.updateVisiblePages(),
          t.initColors(),
          t.resize(),
          t.Book.zoomTo(e.zoomMin),
          setTimeout(function () {
            t.resize();
          }, 200),
          setTimeout(function () {
            t.resize();
          }, 600),
          e.onbookcreated && e.onbookcreated.call(this);
      },
      initSwipe: function () {
        if (1 != this.options.numPages) {
          var l = this;
          L.jQuery(this.bookLayer).swipe({
            swipeStatus: function (e, t, o, i, n, s, a) {
              if ("start" == t)
                try {
                  l.currentPageInput.trigger("blur");
                } catch (e) {}
              if (
                !l.options.sideNavigationButtons ||
                (e.target !== l.arrowL[0] && e.target !== l.arrowR[0])
              )
                if (("end" == t || "cancel" == t) && n < 200 && i < 10) {
                  if (
                    "toolMove" == l.tool &&
                    !l.options.doubleClickZoomDisabled
                  )
                    if (null == l.clickTimer)
                      l.clickTimer = setTimeout(function () {
                        if (((l.clickTimer = null), "touchend" == e.type))
                          e.changedTouches[0].pageX;
                        else if ("mouseup" == e.type) e.offsetX;
                      }, 300);
                    else {
                      clearTimeout(l.clickTimer), (l.clickTimer = null);
                      var r = l.options.zoomTime;
                      l.zoom >= l.options.zoomMax
                        ? l.zoomTo(l.options.zoomMin, r, e)
                        : l.zoomTo(l.options.zoomMax, r, e);
                    }
                } else {
                  if (
                    (("up" == o || "down" == o) && "move" == t) ||
                    1 < l.zoom ||
                    "toolSelect" == l.tool
                  )
                    return;
                  l.Book.onSwipe(e, t, o, i, n, s, a);
                }
            },
            pinchStatus: function (e, t, o, i, n, s, a) {
              "start" == t && (l.zoomStart = l.zoom),
                1 < s &&
                  "move" == t &&
                  (e.preventDefault(),
                  e.scale && (a = e.scale),
                  l.zoomTo(l.zoomStart * a, 0, e));
            },
            fingers: 2,
            pinchThreshold: 0,
            allowPageScroll: "vertical",
            preventDefaultEvents: !1,
          }),
            (this.swipeEnabled = !0);
        }
      },
      toggleMenu: function () {
        this.menuShowing
          ? ((this.menuShowing = !1),
            this.bookLayer.css("bottom", "0px"),
            this.menuBottom.fadeOut(),
            this.currentPageHolder.fadeOut(),
            M(".flipbook-nav").fadeOut())
          : ((this.menuShowing = !0),
            this.bookLayer.css("bottom", this.menuBottom.height() + "px"),
            this.menuBottom.fadeIn(),
            this.currentPageHolder.fadeIn(),
            M(".flipbook-nav").fadeIn()),
          this.Book.onResize();
      },
      createIcon: function (e, t, o) {
        var i;
        return (
          (i =
            "material" == this.options.icons
              ? M("<i>")
                  .addClass(
                    "material-icons flipbook-icon-material flipbook-menu-btn skin-color"
                  )
                  .attr("title", e.title)
                  .text(t ? e.iconAlt2 : e.icon2)
              : "svg" == this.options.icons
              ? M("<button>")
                  .addClass("flipbook-icon-svg flipbook-menu-btn skin-color flipbook-btn-wrapper")
                  .attr("title", e.title)
                  .append(
                    M("<img>")
                      .attr("src", "/icon/" + (t ? e.iconAlt : e.icon) + ".svg")
                      .attr("alt", e.title)
                  )
              : M(C.createElement("span"))
                  .attr("aria-hidden", "true")
                  .addClass(t ? e.iconAlt : e.icon)
                  .addClass(
                    "flipbook-icon-fa flipbook-menu-btn skin-color fa"
                  )),
          o || i.addClass("skin-color-bg"),
          i
        );
      },
      createButton: function (t) {
        var o = this.options,
          e =
            ("top" == t.vAlign && o.menu2Transparent) ||
            ("top" != t.vAlign && o.menuTransparent),
          i = t.background || (e ? o.floatingBtnBackground : o.btnBackground),
          n =
            t.backgroundHover ||
            (e ? o.floatingBtnBackgroundHover : o.btnBackgroundHover),
          s = t.color || (e ? o.floatingBtnColor : o.btnColor),
          a = t.colorHover || (e ? o.floatingBtnColorHover : o.btnColorHover),
          r = e ? o.floatingBtnTextShadow : o.btnTextShadow,
          l = t.radius || (e ? o.floatingBtnRadius : o.btnRadius),
          d = t.border || (e ? o.floatingBtnBorder : o.btnBorder),
          h = e ? o.floatingBtnMargin : o.btnMargin,
          p = M(C.createElement("span")),
          c =
            "material" == o.icons
              ? (t.size || o.btnSize) + 8
              : t.size || o.btnSize,
          u = (t.size || o.btnSize) + 24;
        function g(e) {
          e.css({
            width: u + "px",
            "font-size": c + "px",
            margin: h + "px",
            "border-radius": l + "px",
            "text-shadow": o.btnTextShadow,
            "box-shadow": o.btnShadow,
            border: d,
            color: s,
            background: i,
            "text-shadow": r,
          }),
            s && e.removeClass("skin-color"),
            i && e.removeClass("skin-color-bg");
        }
        (p.$icon = this.createIcon(t).appendTo(p)),
          g(p.$icon),
          t.iconAlt2 &&
            ((p.$iconAlt = this.createIcon(t, !0).appendTo(p).hide()),
            g(p.$iconAlt)),
          (p.icon = t.icon),
          (p.iconAlt = t.iconAlt),
          t.onclick &&
            p.bind("tap click", function (e) {
              t.onclick();
            }),
          (a || n) &&
            p
              .mouseenter(function () {
                p.$icon.css({ color: a, background: n }),
                  p.$iconAlt && p.$iconAlt.css({ color: a, background: n });
              })
              .mouseleave(function () {
                p.$icon.css({ color: s, background: i }),
                  p.$iconAlt && p.$iconAlt.css({ color: s, background: i });
              });
        var f;
        return (
          (f =
            "top" == t.vAlign
              ? o.menu2Floating
                ? this.menuTC
                : "left" == t.hAlign
                ? this.menuTL
                : "right" == t.hAlign
                ? this.menuTR
                : this.menuTC
              : o.menuFloating
              ? this.menuBC
              : "left" == t.hAlign
              ? this.menuBL
              : "right" == t.hAlign
              ? this.menuBR
              : this.menuBC),
          p
            .attr("data-name", t.name)
            .appendTo(f)
            .attr("title", t.title)
            .addClass("")
            .css("order", t.order),
          p
        );
      },
      createMenu: function () {
        var e = this.options,
          t = e.menuFloating ? "flipbook-menu-floating" : "flipbook-menu-fixed",
          o = e.menu2Floating
            ? "flipbook-menu-floating"
            : "flipbook-menu-fixed",
          i = this;
        (this.menuBottom = M(C.createElement("div"))
          .addClass("flipbook-menuBottom")
          .addClass(t)
          .appendTo(this.wrapper)
          .css({
            background: e.menuBackground,
            "box-shadow": e.menuShadow,
            margin: e.menuMargin + "px",
            padding: e.menuPadding + "px",
          })),
          e.menuTransparent ||
            e.menuBackground ||
            this.menuBottom.addClass("skin-color-bg"),
          e.hideMenu && this.menuBottom.hide(),
          (this.menuTop = M(C.createElement("div"))
            .addClass("flipbook-menuTop")
            .addClass(o)
            .appendTo(this.wrapper)
            .css({
              background: e.menu2Background,
              "box-shadow": e.menu2Shadow,
              margin: e.menu2Margin + "px",
              padding: e.menu2Padding + "px",
            })),
          e.menu2Transparent ||
            e.menu2Background ||
            this.menuTop.addClass("skin-color-bg"),
          "swipe" == e.viewMode && (e.btnSound.enabled = !1),
          (this.menuBL = M(C.createElement("div"))
            .addClass("flipbook-menu flipbook-menu-left")
            .appendTo(this.menuBottom)),
          (this.menuBC = M(C.createElement("div"))
            .addClass("flipbook-menu flipbook-menu-center")
            .appendTo(this.menuBottom)),
          (this.menuBR = M(C.createElement("div"))
            .addClass("flipbook-menu flipbook-menu-right")
            .appendTo(this.menuBottom)),
          (this.menuTL = M(C.createElement("div"))
            .addClass("flipbook-menu flipbook-menu-left")
            .appendTo(this.menuTop)),
          (this.menuTC = M(C.createElement("div"))
            .addClass("flipbook-menu flipbook-menu-center")
            .appendTo(this.menuTop)),
          (this.menuTR = M(C.createElement("div"))
            .addClass("flipbook-menu flipbook-menu-right")
            .appendTo(this.menuTop)),
          e.isMobile &&
            (void 0 !== e.btnTocIfMobile &&
              (e.btnToc.hideOnMobile = !e.btnTocIfMobile),
            void 0 !== e.btnThumbsIfMobile &&
              (e.btnThumbs.hideOnMobile = !e.btnThumbsIfMobile),
            void 0 !== e.btnShareIfMobile &&
              (e.btnShare.hideOnMobile = !e.btnShareIfMobile),
            void 0 !== e.btnDownloadPagesIfMobile &&
              (e.btnDownloadPages.hideOnMobile = !e.btnDownloadPagesIfMobile),
            void 0 !== e.btnDownloadPdfIfMobile &&
              (e.btnDownloadPdf.hideOnMobile = !e.btnDownloadPdfIfMobile),
            void 0 !== e.btnSoundIfMobile &&
              (e.btnSound.hideOnMobile = !e.btnSoundIfMobile),
            void 0 !== e.btnExpandIfMobile &&
              (e.btnExpand.hideOnMobile = !e.btnExpandIfMobile),
            void 0 !== e.btnPrintIfMobile &&
              (e.btnPrint.hideOnMobile = !e.btnPrintIfMobile)),
          e.sideNavigationButtons &&
            ((this.btnNext = M(
              '<div class="flipbook-nav"><div class="flipbook-arrow-wrapper"></div></div>'
            )
              .appendTo(this.bookLayer)
              .bind("tap click", function (e) {
                i.btnNext.disabled ||
                  ((i.btnNext.disabled = !0),
                  setTimeout(function () {
                    i.btnNext.disabled = !1;
                  }, 300),
                  e.stopPropagation(),
                  e.preventDefault(),
                  i.nextPage());
              })),
            (this.arrowR = this.createIcon(e.btnNext)
              .appendTo(this.btnNext.first())
              .addClass("flipbook-right-arrow")
              .css({
                width: e.sideBtnSize + "px",
                height: e.sideBtnSize + "px",
                "font-size": e.sideBtnSize + "px",
                "border-radius": e.sideBtnRadius + "px",
                "margin-top": String(-e.sideBtnSize / 2) + "px",
                "margin-right": e.sideBtnMargin + "px",
                padding: e.sideBtnPaddingV + "px " + e.sideBtnPaddingH + "px",
                "text-shadow": e.sideBtnTextShadow,
                "box-shadow": e.sideBtnShadow,
                border: e.sideBtnBorder,
                color: e.sideBtnColor,
                background: e.sideBtnBackground,
                "box-sizing": "initial",
              })),
            e.sideBtnColor && this.arrowR.removeClass("skin-color"),
            e.sideBtnBackground && this.arrowR.removeClass("skin-color-bg"),
            (this.btnPrev = M(
              '<div class="flipbook-nav"><div class="flipbook-arrow-wrapper"></div></div>'
            )
              .appendTo(i.bookLayer)
              .bind("tap click", function (e) {
                i.btnPrev.disabled ||
                  ((i.btnPrev.disabled = !0),
                  setTimeout(function () {
                    i.btnPrev.disabled = !1;
                  }, 300),
                  e.stopPropagation(),
                  e.preventDefault(),
                  i.prevPage());
              })),
            (this.arrowL = this.createIcon(e.btnPrev)
              .appendTo(this.btnPrev.first())
              .addClass("flipbook-left-arrow")
              .css({
                width: e.sideBtnSize + "px",
                height: e.sideBtnSize + "px",
                "font-size": e.sideBtnSize + "px",
                "border-radius": e.sideBtnRadius + "px",
                "margin-top": String(-e.sideBtnSize / 2) + "px",
                "margin-left": e.sideBtnMargin + "px",
                padding: e.sideBtnPaddingV + "px " + e.sideBtnPaddingH + "px",
                "text-shadow": e.sideBtnTextShadow,
                "box-shadow": e.sideBtnShadow,
                border: e.sideBtnBorder,
                color: e.sideBtnColor,
                background: e.sideBtnBackground,
                "box-sizing": "initial",
              })),
            e.sideBtnColor && this.arrowL.removeClass("skin-color"),
            e.sideBtnBackground && this.arrowL.removeClass("skin-color-bg"),
            e.btnFirst.enabled &&
              ((this.btnFirst = M(
                '<div class="flipbook-nav"><div class="flipbook-arrow-wrapper"></div></div>'
              )
                .appendTo(this.bookLayer)
                .bind("tap click", function (e) {
                  i.btnFirst.disabled ||
                    ((i.btnFirst.disabled = !0),
                    setTimeout(function () {
                      i.btnFirst.disabled = !1;
                    }, 300),
                    e.stopPropagation(),
                    e.preventDefault(),
                    i.firstPage());
                })),
              (this.arrowFirst = this.createIcon(e.btnFirst)
                .appendTo(this.btnFirst.first())
                .addClass("flipbook-first-arrow")
                .css({
                  width: e.sideBtnSize + "px",
                  height: 0.66 * e.sideBtnSize + "px",
                  "font-size": 0.66 * e.sideBtnSize + "px",
                  "border-radius": e.sideBtnRadius + "px",
                  "margin-top":
                    String(
                      e.sideBtnSize / 2 +
                        e.sideBtnMargin +
                        2 * e.sideBtnPaddingV
                    ) + "px",
                  "margin-left": e.sideBtnMargin + "px",
                  padding: e.sideBtnPaddingV + "px " + e.sideBtnPaddingH + "px",
                  "text-shadow": e.sideBtnTextShadow,
                  "box-shadow": e.sideBtnShadow,
                  border: e.sideBtnBorder,
                  color: e.sideBtnColor,
                  background: e.sideBtnBackground,
                  "box-sizing": "initial",
                })),
              e.sideBtnColor && this.arrowFirst.removeClass("skin-color"),
              e.sideBtnBackground &&
                this.arrowFirst.removeClass("skin-color-bg")),
            e.btnLast.enabled &&
              ((this.btnLast = M(
                '<div class="flipbook-nav"><div class="flipbook-arrow-wrapper"></div></div>'
              )
                .appendTo(i.bookLayer)
                .bind("tap click", function (e) {
                  i.btnLast.disabled ||
                    ((i.btnLast.disabled = !0),
                    setTimeout(function () {
                      i.btnLast.disabled = !1;
                    }, 300),
                    e.stopPropagation(),
                    e.preventDefault(),
                    i.lastPage());
                })),
              (this.arrowLast = this.createIcon(e.btnLast)
                .appendTo(this.btnLast.first())
                .addClass("flipbook-last-arrow")
                .css({
                  width: e.sideBtnSize + "px",
                  height: 0.66 * e.sideBtnSize + "px",
                  "font-size": 0.66 * e.sideBtnSize + "px",
                  "border-radius": e.sideBtnRadius + "px",
                  "margin-top":
                    String(
                      e.sideBtnSize / 2 +
                        e.sideBtnMargin +
                        2 * e.sideBtnPaddingV
                    ) + "px",
                  "margin-right": e.sideBtnMargin + "px",
                  padding: e.sideBtnPaddingV + "px " + e.sideBtnPaddingH + "px",
                  "text-shadow": e.sideBtnTextShadow,
                  "box-shadow": e.sideBtnShadow,
                  border: e.sideBtnBorder,
                  color: e.sideBtnColor,
                  background: e.sideBtnBackground,
                  "box-sizing": "initial",
                })),
              e.sideBtnColor && this.arrowLast.removeClass("skin-color"),
              e.sideBtnBackground &&
                this.arrowLast.removeClass("skin-color-bg")),
            0 <= e.btnOrder.indexOf("btnFirst") &&
              e.btnOrder.splice(e.btnOrder.indexOf("btnFirst"), 1),
            0 <= e.btnOrder.indexOf("btnPrev") &&
              e.btnOrder.splice(e.btnOrder.indexOf("btnPrev"), 1),
            0 <= e.btnOrder.indexOf("btnNext") &&
              e.btnOrder.splice(e.btnOrder.indexOf("btnNext"), 1),
            0 <= e.btnOrder.indexOf("btnLast") &&
              e.btnOrder.splice(e.btnOrder.indexOf("btnLast"), 1)),
          e.pdfMode &&
            !e.btnDownloadPdf.url &&
            (e.btnDownloadPdf.url = e.pdfUrl),
          e.textLayer || (e.btnSelect.enabled = !1);
        for (var n = 0; n < e.btnOrder.length; n++) {
          var s = e.btnOrder[n],
            a = e[s];
          e.isMobile && a.hideOnMobile && (a.enabled = !1),
            a.enabled &&
              ((a.name = s),
              "currentPage" == a.name
                ? this.createCurrentPage()
                : (this[s] = this.createButton(a).bind(
                    "touchend click",
                    function (e) {
                      e.stopPropagation(),
                        e.preventDefault(),
                        i.onButtonClick(this, e);
                    }
                  )));
        }
        if (e.buttons)
          for (n = 0; n < e.buttons.length; n++) {
            a = e.buttons[n];
            i.createButton(a).index(1);
          }
      },
      onButtonClick: function (e, t) {
        var o = M(e).attr("data-name"),
          i = this.options;
        switch (o) {
          case "btnFirst":
            this.firstPage();
            break;
          case "btnPrev":
            this.prevPage();
            break;
          case "btnNext":
            this.nextPage();
            break;
          case "btnLast":
            this.lastPage();
            break;
          case "btnZoomIn":
            this.zoomIn();
            break;
          case "btnZoomOut":
            this.zoomOut();
            break;
          case "btnAutoplay":
            this.autoplay || this.nextPage(), this.toggleAutoplay();
            break;
          case "btnSearch":
            this.toggleSearch();
            break;
          case "btnBookmark":
            this.toggleBookmark();
            break;
          case "btnRotateLeft":
            this.Book.rotateLeft && this.Book.rotateLeft();
            break;
          case "btnRotateRight":
            this.Book.rotateRight && this.Book.rotateRight();
            break;
          case "btnToc":
            this.toggleToc();
            break;
          case "btnThumbs":
            this.toggleThumbs();
            break;
          case "btnShare":
            this.toggleShareMenu();
            break;
          case "btnDownloadPages":
            if (i.downloadMenu) this.toggleDownloadMenu();
            else {
              var n = C.createElement("a");
              (n.href = i.btnDownloadPages.url),
                (n.download = i.btnDownloadPages.name),
                n.dispatchEvent(new MouseEvent("click"));
            }
            break;
          case "btnPrint":
            i.printMenu ? this.togglePrintMenu() : this.togglePrintWindow();
            break;
          case "btnDownloadPdf":
            if (i.btnDownloadPdf.forceDownload) {
              var s = i.btnDownloadPdf.url,
                a = C.createElement("a");
              a.href = s;
              var r = a.href.split("/").pop().split("#")[0].split("?")[0];
              (a.download = r),
                C.body.appendChild(a),
                a.click(),
                C.body.removeChild(a);
            } else {
              var l =
                i.btnDownloadPdf.openInNewWindow ||
                (i.btnDownloadPdf.openInNewWindow, 1)
                  ? "_blank"
                  : "_self";
              L.open(i.btnDownloadPdf.url, l);
            }
            this.gaCode &&
              ga("send", {
                hitType: "event",
                eventCategory: "Flipbook : " + i.name,
                eventAction: "download PDF",
                eventLabel: i.btnDownloadPdf.url,
                nonInteraction: !0,
              });
            break;
          case "btnSound":
            this.toggleSound();
            break;
          case "btnSelect":
            this.toggleTool();
            break;
          case "btnExpand":
            this.toggleExpand();
            break;
          case "btnClose":
            this.lightbox.closeLightbox();
        }
      },
      handleFsChange: function (e) {
        if (this.Book && this.Book.enabled) {
          var t = M(this.fullscreenElement);
          (C.fullscreenElement ||
            C.webkitFullscreenElement ||
            C.mozFullScreenElement ||
            C.msFullscreenElement) === this.fullscreenElement ||
          this.isFullscreen
            ? (this.btnExpand.$icon.hide(),
              this.btnExpand.$iconAlt.show(),
              t.addClass("flipbook-browser-fullscreen"),
              (this.fullscreenActive = !0),
              this.options.onfullscreenenter &&
                this.options.onfullscreenenter.call(this))
            : (this.btnExpand.$icon.show(),
              this.btnExpand.$iconAlt.hide(),
              t.removeClass("flipbook-browser-fullscreen"),
              (this.fullscreenActive = !1),
              this.options.onfullscreenexit &&
                this.options.onfullscreenexit.call(this)),
            this.triggerResizeOnce();
        }
      },
      createLogo: function () {
        var e = this.options;
        if (e.logoImg && (!e.isMobile || !e.logoHideOnMobile)) {
          var t = M("<img>")
            .attr("src", e.logoImg)
            .attr("style", e.logoCSS)
            .appendTo(this.wrapper);
          "right" == e.logoAlignH && t.css("right", "0"),
            "bottom" == e.logoAlignV && t.css("bottom", "0"),
            e.logoUrl &&
              t.bind("touchend click", function () {
                L.open(e.logoUrl, "_blank");
              });
        }
      },
      setLoadingProgress: function (e) {
        this.disposed ||
          (this.$fillPreloader
            ? this.setFillPreloaderProgress(e)
            : 0 < e && e < 1
            ? M(this.preloader).stop(!0, !0).show()
            : M(this.preloader).stop(!0, !0).hide());
      },
      setFillPreloaderProgress: function (e) {
        if (this.$fillPreloader)
          if (0 < e && e < 1) {
            if (
              ((this.fillPreloaderProgress = this.fillPreloaderProgress || 0),
              e < this.fillPreloaderProgress)
            )
              return;
            this.fillPreloaderProgress = e;
            var t = this.$fillPreloaderImg[0];
            (t.style.clip =
              "rect(0px," + t.width * e + "px," + t.height + "px,0px)"),
              this.$fillPreloader.show();
          } else this.$fillPreloader.hide();
      },
      createNavigation: function () {
        var t = this;
        (this.navLeft = M("<div />")),
          this.navLeft
            .css("background", "#f00")
            .css("left", "0")
            .css("top", "200px")
            .attr("aria-hidden", "true")
            .addClass("skin-color fa fa-chevron-left fa-5x")
            .css("margin-top", this.navLeft.height() + "px")
            .bind("touchend click", function (e) {
              e.stopPropagation(), e.preventDefault(), t.prevPage();
            }),
          (this.navRight = M("<div />")
            .appendTo(this.bookLayer)
            .css("position", "absolute")
            .css("width", "200px")
            .css("height", "200px")
            .css("margin-top", "-100px")
            .css("background", "#f00")
            .css("right", "0")
            .css("top", "200px")
            .bind("touchend click", function (e) {
              e.stopPropagation(), e.preventDefault(), t.nextPage();
            }));
      },
      playFlipSound: function () {
        var e = this;
        this.options.sound &&
          this.Book.enabled &&
          void 0 !== this.flipsound.play &&
          ((this.flipsound.currentTime = 0),
          setTimeout(function () {
            try {
              e.flipsound.play();
            } catch (e) {}
          }, 100));
      },
      onMouseWheel: function (e) {
        if ("wheelDeltaX" in e)
          (wheelDeltaX = e.wheelDeltaX / 12),
            (wheelDeltaY = e.wheelDeltaY / 12);
        else if ("wheelDelta" in e)
          wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;
        else {
          if (!("detail" in e)) return;
          wheelDeltaX = wheelDeltaY = 3 * -e.detail;
        }
        0 < wheelDeltaX ? this.zoomIn(e) : this.zoomOut(e);
      },
      zoomTo: function (e, t, o) {
        var i, n;
        (this.zoom = e),
          void 0 === o
            ? ((i = this.model.wrapperW / 2), (n = this.model.wrapperH / 2))
            : ((n =
                o.touches && o.touches[0]
                  ? ((i = o.touches[0].pageX), o.touches[0].pageY)
                  : o.changedTouches && o.changedTouches[0]
                  ? ((i = o.changedTouches[0].pageX), o.changedTouches[0].pageY)
                  : ((i = o.pageX), o.pageY)),
              (i -= this.wrapper.offset().left),
              (n -= this.wrapper.offset().top)),
          this.zoom < this.options.zoomMin &&
            (this.zoom = this.options.zoomMin),
          this.zoom > this.options.zoomMax &&
            (this.zoom = this.options.zoomMax),
          this.options.zoomMax2 &&
            this.zoom > this.options.zoomMax2 &&
            (this.zoom = this.options.zoomMax2),
          (this.model.zoom = this.zoom),
          this.Book.zoomTo(this.zoom, t, i, n),
          this.onZoom(this.zoom);
      },
      zoomOut: function (e) {
        var t = this.zoom / this.options.zoomStep;
        if (
          ((t = t < this.options.zoomMin ? this.options.zoomMin : t),
          this.zoom != t)
        ) {
          this.zoom = t;
          var o = this.options.zoomTime;
          this.zoomTo(this.zoom, o, e);
        }
      },
      zoomIn: function (e) {
        var t = this.zoom * this.options.zoomStep;
        if (
          (this.bookLayer.height() * t > this.options.zoomSize &&
            (t = this.options.zoomSize / this.bookLayer.height()),
          this.zoom != t)
        ) {
          this.zoom = t;
          var o = this.options.zoomTime;
          this.zoomTo(this.zoom, o, e);
        }
      },
      nextPage: function () {
        this.Book && this.Book.nextPage();
      },
      prevPage: function () {
        this.Book && this.Book.prevPage();
      },
      firstPage: function () {
        this.goToPage(1);
      },
      lastPage: function () {
        this.goToPage(this.options.pages.length);
      },
      goToPage: function (e, t) {
        this.Book && this.Book.goToPage(e, t);
      },
      onZoom: function (e) {
        (this.zoom = e),
          this.enableButton(this.btnZoomIn, e < this.options.zoomMax),
          this.enableButton(this.btnZoomOut, e > this.options.zoomMin),
          this.enableSwipe(e <= 1),
          (this.model.zoom = e);
      },
      enableSwipe: function (e) {
        this.swipeEnabled = e;
      },
      createCurrentPage: function () {
        var e,
          o = this,
          i = this.options,
          t = "flipbook-currentPageHolder ";
        e =
          "top" == i.currentPage.vAlign
            ? "left" == i.currentPage.hAlign
              ? this.menuTL
              : "right" == i.currentPage.hAlign
              ? this.menuTR
              : this.menuTC
            : "left" == i.currentPage.hAlign
            ? this.menuBL
            : "right" == i.currentPage.hAlign
            ? this.menuBR
            : this.menuBC;
        var n =
            ("top" == i.currentPage.vAlign && i.menu2Transparent) ||
            ("top" != i.currentPage.vAlign && i.menuTransparent),
          s = n ? i.floatingBtnBackground : "",
          a = n ? i.floatingBtnColor : i.btnColor,
          r = n ? i.floatingBtnTextShadow : "",
          l = n ? i.floatingBtnRadius : i.btnRadius,
          d = (n ? i.floatingBtnMargin : i.btnMargin, M("<div>").appendTo(e));
        d.css(
          "margin",
          i.currentPage.marginV + "px " + i.currentPage.marginH + "px"
        ),
          n || (t += "skin-color "),
          d.addClass(t).css({
            color: a,
            background: s,
            "text-shadow": r,
            "border-radius": l + "px",
          }),
          i.currentPage.order && d.css("order", i.currentPage.order),
          (this.currentPageHolder = d),
          (this.currentPage = M(C.createElement("div"))
            .addClass("flipbook-currentPageNumber")
            .appendTo(d));
        var h = M("<form>")
          .appendTo(d)
          .submit(function (e) {
            var t = parseInt(o.currentPageInput.val());
            return (
              (t = t > i.pages.length ? i.pages.length : t),
              o.options.rightToLeft && (t = i.pages.length - t + 1),
              o.goToPage(t),
              o.currentPageInput.trigger("blur"),
              !1
            );
          });
        (this.currentPageInput = M('<input type="text" maxlength="4">')
          .addClass("flipbook-currentPageInput")
          .css({
            margin:
              i.currentPage.marginV + "px " + i.currentPage.marginH + "px",
            color: a,
          })
          .appendTo(h)
          .val("")
          .focus(function () {
            o.currentPageInput.val(""),
              o.currentPage.addClass("flipbook-color-transparent");
          })
          .blur(function () {
            o.currentPageInput.val(""),
              o.currentPage.removeClass("flipbook-color-transparent");
          })),
          n || this.currentPageInput.addClass("skin-color");
      },
      createMenuHeader: function (e, t, o) {
        var i = this,
          n = M("<div>")
            .addClass("flipbook-menu-header skin-clor flipbook-font")
            .appendTo(e),
          s =
            ((t = M("<span>")
              .text(t)
              .addClass("flipbook-menu-title skin-color")
              .appendTo(n)),
            M("<span>")
              .appendTo(n)
              .addClass("flipbook-btn-close")
              .bind("touchend click", function (e) {
                e.stopPropagation(), e.preventDefault(), i.closeMenus();
              }));
        this.createIcon(this.options.btnClose, null, !0).appendTo(s);
      },
      createToc: function () {
        var t = this,
          e = this.options.tableOfContent;
        if (e || !this.pdfService || this.pdfService.outlineLoaded) {
          if (
            ((this.tocHolder = M("<div>")
              .addClass("flipbook-tocHolder flipbook-side-menu skin-color-bg")
              .appendTo(this.wrapper)
              .hide()),
            this.createMenuHeader(
              this.tocHolder,
              this.strings.tableOfContent,
              this.toggleToc
            ),
            (this.toc = M("<div>")
              .addClass("flipbook-toc")
              .appendTo(this.tocHolder)),
            (this.tocScroller = M("<div>")
              .addClass("flipbook-toc-scroller")
              .appendTo(this.toc)),
            (this.tocScroll = new FLIPBOOK.IScroll(t.toc[0], {
              bounce: !1,
              mouseWheel: !0,
              scrollbars: !0,
              interactiveScrollbars: !0,
            })),
            e && 0 < e.length)
          ) {
            this.options.pages;
            for (var o = 0; o < e.length; o++) this.createTocItem(e[o]);
          } else {
            var i = this.options.pages;
            for (o = 0; o < i.length; o++) {
              var n = i[o].title;
              if ("" != n && void 0 !== n) {
                var s = { title: n, page: String(o + 1) };
                this.createTocItem(s);
              }
            }
          }
          this.initColors(),
            this.tocScroll.refresh(),
            (this.tocCreated = !0),
            this.toggleToc();
        } else
          t.pdfService.loadOutline(function (e) {
            (t.options.tableOfContent = e), t.createToc();
          });
      },
      createTocItem: function (o, e, t) {
        var i = this,
          n =
            ((e = e || this.tocScroller),
            M(C.createElement("a"))
              .attr("class", "flipbook-tocItem")
              .addClass("skin-color")
              .appendTo(e)
              .bind("touchend click", function (e) {
                if (
                  (e.stopPropagation(), e.preventDefault(), !i.tocScroll.moved)
                )
                  if (
                    (i.options.tableOfContentCloseOnClick && i.toggleToc(!1),
                    !o.page && o.dest)
                  )
                    i.pdfService.pdfDocument
                      .getPageIndex(o.dest[0])
                      .then(function (e) {
                        var t = e + 1;
                        (t = i.options.rightToLeft
                          ? i.options.pages.length - t + 1
                          : t),
                          setTimeout(function () {
                            i.goToPage(t);
                          }, 200);
                      });
                  else {
                    var t = Number(o.page);
                    (t = i.options.rightToLeft
                      ? i.options.pages.length - t + 1
                      : t),
                      setTimeout(function () {
                        i.goToPage(t);
                      }, 200);
                  }
              }));
        t || (t = 0),
          (n.level = t),
          n.css("padding", "8px 0"),
          n.css("margin-left", "10px"),
          t
            ? (n.css("margin-top", "8px"), n.css("padding-bottom", "0"))
            : (n.css("margin-right", "15px"), n.css("padding-left", "10px"));
        var s = M(C.createElement("span"))
            .appendTo(n)
            .css("width", "20px")
            .css("display", "inline-block")
            .css("cursor", "auto")
            .bind("touchend click", function (e) {
              e.stopPropagation(), e.preventDefault();
              for (var t = 0; t < n.items.length; t++) n.items[t].toggle();
              a.toggle(), r.toggle(), i.tocScroll.refresh();
            }),
          a = M("<span>")
            .attr("aria-hidden", "true")
            .appendTo(s)
            .addClass("fa fa-chevron-right skin-color")
            .hide(),
          r = M("<span>")
            .attr("aria-hidden", "true")
            .appendTo(s)
            .addClass("fa fa-chevron-down skin-color")
            .hide();
        if (
          (M(C.createElement("span"))
            .appendTo(n)
            .addClass("title")
            .text(o.title)
            .css("width", String(170 - 10 * n.level) + "px"),
          M(C.createElement("span"))
            .appendTo(n)
            .attr("class", "right")
            .text(o.page),
          o.items && o.items.length)
        ) {
          n.items = [];
          for (var l = 0; l < o.items.length; l++) {
            var d = this.createTocItem(o.items[l], n, n.level + 1);
            n.items.push(d), d.hide();
          }
          a.show();
        }
        return n;
      },
      enablePrev: function (e) {
        this.enableButton(this.btnPrev, e),
          this.enableButton(this.btnFirst, e),
          this.Book.enablePrev(e);
      },
      enableNext: function (e) {
        this.enableButton(this.btnNext, e),
          this.enableButton(this.btnLast, e),
          this.Book.enableNext(e);
      },
      enableButton: function (e, t) {
        void 0 !== e &&
          (t
            ? (e.css("opacity", "1"), e.css("pointer-events", "auto"))
            : (e.css("opacity", "0.2"), e.css("pointer-events", "none")),
          (e.enabled = t));
      },
      resize: function () {
        if (this.Book && this.Book.enabled) {
          var e = this.options;
          !e.menuOverBook && this.menuShowing && this.menuBottom
            ? this.bookLayer.css("bottom", this.menuBottom.outerHeight() + "px")
            : this.bookLayer.css("bottom", "0px"),
            !e.menu2OverBook && this.menuShowing && this.menuTop
              ? this.bookLayer.css("top", this.menuTop.outerHeight() + "px")
              : this.bookLayer.css("top", "0px"),
            this.tocShowing ||
            this.thumbsShowing ||
            this.searchShowing ||
            this.bookmarkShowing
              ? (e.sideMenuOverBook || this.bookLayer.css("left", "250px"),
                this.options.sideMenuOverMenu ||
                  this.wrapper
                    .find(".flipbook-side-menu")
                    .css("bottom", this.menuBottom.outerHeight() + "px"),
                this.options.sideMenuOverMenu2 ||
                  this.wrapper
                    .find(".flipbook-side-menu")
                    .css("top", this.menuTop.outerHeight() + "px"))
              : this.bookLayer.css("left", "0px");
          var t = this.model;
          (t.wrapperW = this.bookLayer.width()),
            (t.wrapperH = this.bookLayer.height()),
            (e.zoomMax = e.zoomSize / t.wrapperH),
            (t.zoom = e.zoomMin),
            this.Book.onResize();
        }
      },
      pdfResize: function () {
        this.Book.onZoom();
      },
      createThumbs: function () {
        this.thumbs = new FLIPBOOK.Thumbnails(this);
      },
      toggleThumbs: function (e) {
        this.thumbs || this.createThumbs(),
          void 0 !== e && (this.thumbsShowing = !e),
          this.thumbsShowing
            ? (this.thumbs.hide(), (this.thumbsShowing = !1))
            : (this.closeMenus(),
              this.thumbs.show(),
              (this.thumbsShowing = !0)),
          this.resize();
      },
      toggleToc: function (e) {
        this.tocCreated
          ? (!this.tocShowing || e
              ? (this.closeMenus(),
                (this.tocShowing = !0),
                this.tocHolder.show(),
                this.tocScroll.refresh())
              : (this.tocHolder.hide(), (this.tocShowing = !1)),
            this.resize())
          : this.createToc();
      },
      toggleSearch: function (e) {
        this.thumbs || this.createThumbs(),
          void 0 !== e && (this.searchShowing = !e),
          this.searchShowing
            ? (this.thumbs.hide(), (this.searchShowing = !1), this.unmark())
            : (this.closeMenus(),
              this.thumbs.show(),
              this.thumbs.showSearch(),
              (this.searchShowing = !0)),
          this.resize();
      },
      toggleBookmark: function (e) {
        this.thumbs || this.createThumbs(),
          void 0 !== e && (this.bookmarkShowing = !e),
          this.bookmarkShowing
            ? (this.thumbs.hide(), (this.bookmarkShowing = !1))
            : (this.closeMenus(),
              this.thumbs.show(),
              this.thumbs.showBookmarks(),
              (this.bookmarkShowing = !0)),
          this.resize();
      },
      closeMenus: function () {
        this.thumbsShowing && this.toggleThumbs(),
          this.tocShowing && this.toggleToc(),
          this.searchShowing && this.toggleSearch(),
          this.bookmarkShowing && this.toggleBookmark(),
          this.printMenuShowing && this.togglePrintMenu(),
          this.dlMenuShowing && this.toggleDownloadMenu(),
          this.shareMenuShowing && this.toggleShareMenu();
      },
      togglePrintMenu: function () {
        var t = this;
        if (this.printMenu)
          this.printMenuShowing
            ? (this.printMenu.hide(), (this.printMenuShowing = !1))
            : (this.closeMenus(),
              this.printMenu.show(),
              (this.printMenuShowing = !0),
              this.updateCurrentPage());
        else {
          this.printMenu = M(
            '<div class="flipbook-sub-menu flipbook-font">'
          ).appendTo(this.wrapper);
          var e = M('<idv class="flipbook-sub-menu-center">').appendTo(
              this.printMenu
            ),
            o = M(
              '<idv class="flipbook-sub-menu-content skin-color-bg">'
            ).appendTo(e);
          this.createMenuHeader(o, this.strings.print, this.togglePrintMenu);
          M(
            '<a><div class="c-p skin-color flipbook-btn">' +
              this.strings.printCurrentPage +
              "</div></a>"
          )
            .appendTo(o)
            .bind("touchend click", function (e) {
              t.printPage(t.cPage[0], this);
            }),
            M(
              '<a><div class="c-l-p skin-color flipbook-btn">' +
                this.strings.printLeftPage +
                "</div></a>"
            )
              .appendTo(this.printMenu)
              .appendTo(o)
              .bind("touchend click", function (e) {
                t.printPage(t.cPage[0], this);
              }),
            M(
              '<a><div class="c-r-p skin-color flipbook-btn">' +
                this.strings.printRightPage +
                "</div></a>"
            )
              .appendTo(this.printMenu)
              .appendTo(o)
              .bind("touchend click", function (e) {
                t.printPage(t.cPage[1], this);
              }),
            M(
              '<a><div class="skin-color flipbook-btn">' +
                this.strings.printAllPages +
                "</div></a>"
            )
              .appendTo(o)
              .bind("touchend click", function (e) {
                t.togglePrintWindow();
              });
          this.closeMenus(),
            (this.printMenuShowing = !0),
            this.initColors(),
            this.updateCurrentPage();
        }
      },
      toggleDownloadMenu: function () {
        var i = this;
        if (this.dlMenu)
          this.dlMenuShowing
            ? (this.dlMenu.hide(), (this.dlMenuShowing = !1))
            : (this.dlMenu.show(),
              this.closeMenus(),
              (this.dlMenuShowing = !0),
              this.updateCurrentPage());
        else {
          this.dlMenu = M(
            '<div class="flipbook-sub-menu flipbook-font">'
          ).appendTo(this.wrapper);
          var e = M('<idv class="flipbook-sub-menu-center">').appendTo(
              this.dlMenu
            ),
            t = M(
              '<idv class="flipbook-sub-menu-content skin-color-bg">'
            ).appendTo(e);
          this.createMenuHeader(
            t,
            this.strings.download,
            this.toggleDownloadMenu
          );
          M(
            '<a><div class="c-p skin-color flipbook-btn">' +
              this.strings.downloadCurrentPage +
              "</div></a>"
          )
            .appendTo(t)
            .bind("touchend click", function (e) {
              i.downloadPage(i.cPage[0], this);
            }),
            M(
              '<a><div class="c-l-p skin-color flipbook-btn">' +
                this.strings.downloadLeftPage +
                "</div></a>"
            )
              .appendTo(t)
              .bind("touchend click", function (e) {
                i.downloadPage(i.cPage[0], this);
              }),
            M(
              '<a><div class="c-r-p skin-color flipbook-btn">' +
                this.strings.downloadRightPage +
                "</div></a>"
            )
              .appendTo(t)
              .bind("touchend click", function (e) {
                i.downloadPage(i.cPage[1], this);
              }),
            M(
              '<a><div class="skin-color flipbook-btn">' +
                this.strings.downloadAllPages +
                "</div></a>"
            )
              .appendTo(t)
              .bind("touchend click", function (e) {
                var t = C.createElement("a");
                t.href = i.options.btnDownloadPages.url;
                var o = t.href.split("/").pop().split("#")[0].split("?")[0];
                (t.download = o), t.dispatchEvent(new MouseEvent("click"));
              });
          this.closeMenus(),
            (this.dlMenuShowing = !0),
            this.initColors(),
            this.updateCurrentPage();
        }
      },
      toggleShareMenu: function () {
        if (this.shareMenu)
          this.shareMenuShowing
            ? (this.shareMenu.hide(), (this.shareMenuShowing = !1))
            : (this.shareMenu.show(),
              this.closeMenus(),
              (this.shareMenuShowing = !0));
        else {
          this.shareMenu = M(
            '<div class="flipbook-sub-menu flipbook-font">'
          ).appendTo(this.wrapper);
          var e = M('<idv class="flipbook-sub-menu-center">').appendTo(
              this.shareMenu
            ),
            t = M(
              '<idv class="flipbook-sub-menu-content skin-color-bg">'
            ).appendTo(e);
          this.createMenuHeader(t, "Share", this.toggleShareMenu);
          var o = M('<idv class="flipbook-share">').appendTo(t),
            i = this.options;
          (this.share = new Share(o[0], {
            networks: {
              google_plus: i.google_plus,
              twitter: i.twitter,
              facebook: i.facebook,
              pinterest: i.pinterest,
              email: i.email,
            },
          })),
            this.closeMenus(),
            (this.shareMenuShowing = !0),
            this.initColors();
        }
      },
      bookmarkPage: function (e) {
        var t = this.getBookmarkedPages();
        t.indexOf(String(e)) < 0 && t.push(e),
          this.setBookmarkedPages(t),
          this.thumbs.showBookmarkedThumbs(),
          this.bookmarkShowing || this.toggleBookmark();
      },
      removeBookmark: function (e) {
        var t = this.getBookmarkedPages();
        -1 < t.indexOf(String(e)) && t.splice(t.indexOf(String(e)), 1),
          this.setBookmarkedPages(t),
          this.thumbs.showBookmarkedThumbs(),
          this.bookmarkShowing || this.toggleBookmark();
      },
      isBookmarked: function (e) {
        return 0 < this.getBookmarkedPages().indexOf(String(e));
      },
      getBookmarkedPages: function () {
        var e = localStorage.getItem(this.options.name + "_flipbook_bookmarks");
        return e ? e.split(";") : [];
      },
      setBookmarkedPages: function (e) {
        localStorage.setItem(
          this.options.name + "_flipbook_bookmarks",
          e.join(";")
        );
      },
      printPage: function (e, t) {
        var o;
        if (
          (this.options.pages[e] && this.options.pages[e].print
            ? (o = this.options.pages[e].print)
            : this.options.pages[e] &&
              this.options.pages[e].canvas &&
              this.options.pages[e].canvas[this.options.pageTextureSize]
            ? (o =
                this.options.pages[e].canvas[
                  this.options.pageTextureSize
                ].toDataURL())
            : this.options.pages[e] &&
              this.options.pages[e].src &&
              (o = this.options.pages[e].src),
          o)
        ) {
          var i = "<!DOCTYPE html>";
          (i += "<html>"),
            (i += "<head><title>Print canvas</title></head>"),
            (i += "<body>"),
            (i += '<img src="' + o + '">'),
            (i += "</body>"),
            (i += "</html>");
          var n = L.open("", "Print", "height=1600,width=800");
          n.document.open(),
            n.document.write(i),
            n.document.close(),
            n.document.addEventListener(
              "load",
              function () {
                n.focus(), n.print(), n.document.close(), n.close();
              },
              !0
            );
        } else {
          var s = this;
          this.loadPage(e, this.options.pageTextureSize, function () {
            s.printPage(e);
          });
        }
      },
      downloadPage: function (e) {
        if (this.options.pages[e] && this.options.pages[e].download)
          url = this.options.pages[e].download;
        else if (this.options.pages[e] && this.options.pages[e].src)
          url = this.options.pages[e].src;
        else if (
          this.options.pages[e] &&
          this.options.pages[e].canvas &&
          this.options.pages[e].canvas[this.options.pageTextureSize]
        ) {
          var t = C.createElement("canvas"),
            o = this.options.pageWidth / this.options.pageHeight;
          (t.width = this.options.pageTextureSize * o),
            (t.height = this.options.pageTextureSize),
            t
              .getContext("2d")
              .drawImage(
                this.options.pages[e].canvas[this.options.pageTextureSize],
                0,
                0
              ),
            (url = t.toDataURL("image/jpeg", 0.5));
        }
        if (url) {
          var i = C.createElement("a");
          (i.href = url),
            (i.download = "page" + String(e + 1)),
            C.body.appendChild(i),
            i.click(),
            C.body.removeChild(i);
        } else {
          var n = this;
          this.loadPage(e, this.options.pageTextureSize, function () {
            n.downloadPage(e);
          });
        }
      },
      printPdf: function (e) {
        L.open(e, "_blank").onload = function () {
          this.print();
        };
      },
      togglePrintWindow: function (e) {
        var n;
        (n = this).options.printPdfUrl
          ? n.printPdf(n.options.printPdfUrl)
          : n.options.pdfUrl
          ? n.printPdf(n.options.pdfUrl)
          : t();
        function t() {
          link = "about:blank";
          var e = L.open(link, "_new");
          e.document.open();
          for (var t = "", o = 0; o < n.options.pages.length; o++)
            n.options.pages[o].src &&
              (t += '<img src="' + n.options.pages[o].src.toString() + '"/>\n');
          var i = (function (e) {
            return (
              "<html>\n<head>\n<title>Temporary Printing Window</title>\n<script>\nfunction step1() {\n  setTimeout('step2()', 10);\n}\nfunction step2() {\n  window.print();\n  window.close();\n}\n</script>\n</head>\n<body onLoad='step1()'>\n" +
              e +
              "</body>\n</html>\n"
            );
          })(t);
          e.document.write(i), e.document.close();
        }
      },
      thumbsVertical: function () {
        this.thumbsCreated &&
          ((this.thumbScroll.hScroll = !1),
          (this.thumbScroll.vScroll = !0),
          this.thumbScroll.refresh());
      },
      toggleExpand: function (e) {
        (this.browserFullscreen = !0),
          screenfull.enabled
            ? screenfull.toggle(this.fullscreenElement)
            : ((this.isFullscreen = !this.isFullscreen), this.handleFsChange());
      },
      expand: function () {},
      toggleAutoplay: function (e) {
        var t = this;
        (this.autoplay = e || !this.autoplay),
          this.autoplay
            ? (this.btnAutoplay.$icon.hide(),
              this.btnAutoplay.$iconAlt.show(),
              (this.autoplayTimer = setInterval(function () {
                if (t.autoplay) {
                  var e = t.options.autoplayStartPage || 1;
                  t.options.rightToLeft
                    ? t.Book.prevEnabled
                      ? t.prevPage()
                      : t.options.autoplayLoop &&
                        t.goToPage(t.options.pages.length - e + 1)
                    : t.Book.nextEnabled
                    ? t.nextPage()
                    : t.options.autoplayLoop && t.goToPage(e);
                }
              }, t.options.autoplayInterval)))
            : (this.btnAutoplay.$icon.show(),
              this.btnAutoplay.$iconAlt.hide(),
              clearInterval(t.autoplayTimer));
      },
      triggerResizeOnce: function () {
        setTimeout(function () {
          M(L).trigger("resize");
        }, 100),
          setTimeout(function () {
            M(L).trigger("resize");
          }, 500);
      },
      triggerResize: function () {
        setTimeout(function () {
          M(L).trigger("resize");
        }, 100),
          setTimeout(function () {
            M(L).trigger("resize");
          }, 500),
          setTimeout(function () {
            M(L).trigger("resize");
          }, 2e3);
      },
      initEasing: function () {
        L.jQuery.extend(L.jQuery.easing, {
          def: "easeOutQuad",
          swing: function (e, t, o, i, n) {
            return M.easing[M.easing.def](e, t, o, i, n);
          },
          easeInQuad: function (e, t, o, i, n) {
            return i * (t /= n) * t + o;
          },
          easeOutQuad: function (e, t, o, i, n) {
            return -i * (t /= n) * (t - 2) + o;
          },
          easeInOutQuad: function (e, t, o, i, n) {
            return (t /= n / 2) < 1
              ? (i / 2) * t * t + o
              : (-i / 2) * (--t * (t - 2) - 1) + o;
          },
          easeInCubic: function (e, t, o, i, n) {
            return i * (t /= n) * t * t + o;
          },
          easeOutCubic: function (e, t, o, i, n) {
            return i * ((t = t / n - 1) * t * t + 1) + o;
          },
          easeInOutCubic: function (e, t, o, i, n) {
            return (t /= n / 2) < 1
              ? (i / 2) * t * t * t + o
              : (i / 2) * ((t -= 2) * t * t + 2) + o;
          },
          easeInQuart: function (e, t, o, i, n) {
            return i * (t /= n) * t * t * t + o;
          },
          easeOutQuart: function (e, t, o, i, n) {
            return -i * ((t = t / n - 1) * t * t * t - 1) + o;
          },
          easeInOutQuart: function (e, t, o, i, n) {
            return (t /= n / 2) < 1
              ? (i / 2) * t * t * t * t + o
              : (-i / 2) * ((t -= 2) * t * t * t - 2) + o;
          },
          easeInQuint: function (e, t, o, i, n) {
            return i * (t /= n) * t * t * t * t + o;
          },
          easeOutQuint: function (e, t, o, i, n) {
            return i * ((t = t / n - 1) * t * t * t * t + 1) + o;
          },
          easeInOutQuint: function (e, t, o, i, n) {
            return (t /= n / 2) < 1
              ? (i / 2) * t * t * t * t * t + o
              : (i / 2) * ((t -= 2) * t * t * t * t + 2) + o;
          },
          easeInSine: function (e, t, o, i, n) {
            return -i * Math.cos((t / n) * (Math.PI / 2)) + i + o;
          },
          easeOutSine: function (e, t, o, i, n) {
            return i * Math.sin((t / n) * (Math.PI / 2)) + o;
          },
          easeInOutSine: function (e, t, o, i, n) {
            return (-i / 2) * (Math.cos((Math.PI * t) / n) - 1) + o;
          },
          easeInExpo: function (e, t, o, i, n) {
            return 0 == t ? o : i * Math.pow(2, 10 * (t / n - 1)) + o;
          },
          easeOutExpo: function (e, t, o, i, n) {
            return t == n ? o + i : i * (1 - Math.pow(2, (-10 * t) / n)) + o;
          },
          easeInOutExpo: function (e, t, o, i, n) {
            return 0 == t
              ? o
              : t == n
              ? o + i
              : (t /= n / 2) < 1
              ? (i / 2) * Math.pow(2, 10 * (t - 1)) + o
              : (i / 2) * (2 - Math.pow(2, -10 * --t)) + o;
          },
          easeInCirc: function (e, t, o, i, n) {
            return -i * (Math.sqrt(1 - (t /= n) * t) - 1) + o;
          },
          easeOutCirc: function (e, t, o, i, n) {
            return i * Math.sqrt(1 - (t = t / n - 1) * t) + o;
          },
          easeInOutCirc: function (e, t, o, i, n) {
            return (t /= n / 2) < 1
              ? (-i / 2) * (Math.sqrt(1 - t * t) - 1) + o
              : (i / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + o;
          },
          easeInElastic: function (e, t, o, i, n) {
            var s = 1.70158,
              a = 0,
              r = i;
            if (0 == t) return o;
            if (1 == (t /= n)) return o + i;
            if ((a || (a = 0.3 * n), r < Math.abs(i))) {
              r = i;
              s = a / 4;
            } else s = (a / (2 * Math.PI)) * Math.asin(i / r);
            return (
              -r *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin(((t * n - s) * (2 * Math.PI)) / a) +
              o
            );
          },
          easeOutElastic: function (e, t, o, i, n) {
            var s = 1.70158,
              a = 0,
              r = i;
            if (0 == t) return o;
            if (1 == (t /= n)) return o + i;
            if ((a || (a = 0.3 * n), r < Math.abs(i))) {
              r = i;
              s = a / 4;
            } else s = (a / (2 * Math.PI)) * Math.asin(i / r);
            return (
              r *
                Math.pow(2, -10 * t) *
                Math.sin(((t * n - s) * (2 * Math.PI)) / a) +
              i +
              o
            );
          },
          easeInOutElastic: function (e, t, o, i, n) {
            var s = 1.70158,
              a = 0,
              r = i;
            if (0 == t) return o;
            if (2 == (t /= n / 2)) return o + i;
            if ((a || (a = n * (0.3 * 1.5)), r < Math.abs(i))) {
              r = i;
              s = a / 4;
            } else s = (a / (2 * Math.PI)) * Math.asin(i / r);
            return t < 1
              ? r *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin(((t * n - s) * (2 * Math.PI)) / a) *
                  -0.5 +
                  o
              : r *
                  Math.pow(2, -10 * (t -= 1)) *
                  Math.sin(((t * n - s) * (2 * Math.PI)) / a) *
                  0.5 +
                  i +
                  o;
          },
          easeInBack: function (e, t, o, i, n, s) {
            return (
              s == a && (s = 1.70158), i * (t /= n) * t * ((s + 1) * t - s) + o
            );
          },
          easeOutBack: function (e, t, o, i, n, s) {
            return (
              s == a && (s = 1.70158),
              i * ((t = t / n - 1) * t * ((s + 1) * t + s) + 1) + o
            );
          },
          easeInOutBack: function (e, t, o, i, n, s) {
            return (
              s == a && (s = 1.70158),
              (t /= n / 2) < 1
                ? (i / 2) * (t * t * ((1 + (s *= 1.525)) * t - s)) + o
                : (i / 2) * ((t -= 2) * t * ((1 + (s *= 1.525)) * t + s) + 2) +
                  o
            );
          },
          easeInBounce: function (e, t, o, i, n) {
            return i - M.easing.easeOutBounce(e, n - t, 0, i, n) + o;
          },
          easeOutBounce: function (e, t, o, i, n) {
            return (t /= n) < 1 / 2.75
              ? i * (7.5625 * t * t) + o
              : t < 2 / 2.75
              ? i * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + o
              : t < 2.5 / 2.75
              ? i * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + o
              : i * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + o;
          },
          easeInOutBounce: function (e, t, o, i, n) {
            return t < n / 2
              ? 0.5 * M.easing.easeInBounce(e, 2 * t, 0, i, n) + o
              : 0.5 * M.easing.easeOutBounce(e, 2 * t - n, 0, i, n) +
                  0.5 * i +
                  o;
          },
        });
      },
    }),
    (FLIPBOOK.Book = function () {}),
    (FLIPBOOK.Book.prototype = { rightIndex: 0, goToPage: function () {} }),
    (FLIPBOOK.Thumbnails = function (o) {
      var i = this,
        n = o.options,
        e = o.wrapper;
      if (
        ((this.main = o),
        (this.options = n),
        (this.wrapper = e),
        (this.active = null),
        n.btnThumbs.enabled)
      ) {
        M(o).bind("pagechange", function () {
          i.thumbsWrapper.css("top", i.bookmark.height() + 50 + "px");
        }),
          (this.thumbHolder = M(C.createElement("div"))
            .addClass("flipbook-thumbHolder flipbook-side-menu skin-color-bg")
            .appendTo(e)
            .hide()),
          (this.thumbsWrapper = M(C.createElement("div"))
            .appendTo(this.thumbHolder)
            .addClass("flipbook-thumbsWrapper")),
          (this.thumbsScroller = M(C.createElement("div"))
            .appendTo(this.thumbsWrapper)
            .addClass("flipbook-thumbsScroller")),
          o.createMenuHeader(
            this.thumbHolder,
            o.strings.thumbnails,
            o.toggleThumbs
          ),
          (this.bookmark = M("<div>")
            .addClass("flipbook-font")
            .appendTo(this.thumbHolder)
            .hide());
        M(
          '<a><div class="c-p skin-color flipbook-btn">' +
            n.strings.bookmarkCurrentPage +
            "</div></a>"
        )
          .appendTo(this.bookmark)
          .bind("touchend click", function (e) {
            o.bookmarkPage(o.cPage[0], this),
              e.preventDefault(),
              e.stopPropagation();
          }),
          M(
            '<a><div class="c-l-p skin-color flipbook-btn">' +
              n.strings.bookmarkLeftPage +
              "</div></a>"
          )
            .appendTo(this.bookmark)
            .bind("touchend click", function (e) {
              o.bookmarkPage(o.cPage[0], this),
                e.preventDefault(),
                e.stopPropagation();
            }),
          M(
            '<a><div class="c-r-p skin-color flipbook-btn">' +
              n.strings.bookmarkRightPage +
              "</div></a>"
          )
            .appendTo(this.bookmark)
            .bind("touchend click", function (e) {
              o.bookmarkPage(o.cPage[1], this),
                e.preventDefault(),
                e.stopPropagation();
            });
        (this.search = M("<div>")
          .addClass("flipbook-search")
          .appendTo(this.thumbHolder)
          .hide()),
          (this.$searchBar = M(
            '<div class="flipbook-findbar" id="findbar" deluminate_imagetype="png"><div id="findbarInputContainer"><input id="findInput" class="toolbarField" title="Find" placeholder="' +
              n.strings.findInDocument +
              '..."></div><div class="flipbook-find-info skin-color"/></div>'
          ).appendTo(this.search)),
          (this.$findInput = this.$searchBar
            .find("#findInput")
            .keyup(function () {
              i.searchPDF(this.value);
            })),
          (this.$findInfo = this.$searchBar.find(".flipbook-find-info")),
          (this.thumbs = []);
        var t = n.pages,
          s = [];
        if (n.doublePage)
          for (var a = 0; a < t.length; a++)
            (0 != a && a % 2 == 0) || s.push(t[a]);
        else s = t;
        n.pdfMode && this.loadThumbsFromPdf(s);
        var r = n.thumbSize,
          l = (n.thumbSize * n.pageWidth) / n.pageHeight;
        for (a = 0; a < s.length; a++) {
          var d = s[a].thumb,
            h = M("<div>")
              .addClass("flipbook-thumb")
              .appendTo(i.thumbsScroller)
              .attr("data-thumb-index", a)
              .width(l)
              .height(r),
            p = M("<span>")
              .appendTo(h)
              .addClass("thumb-btn-close")
              .bind("touchend click", function (e) {
                e.stopPropagation(),
                  e.preventDefault(),
                  o.removeBookmark(M(this).parent().attr("data-thumb-index"));
              });
          M("<span>")
            .attr("aria-hidden", "true")
            .appendTo(p)
            .addClass("fa fa-times skin-color");
          if ((this.thumbs.push(h), s[a].thumbCanvas))
            var c = M(s[a].thumbCanvas);
          else {
            if (!d) continue;
            (c = M("<img/>").attr("src", d))[0].onload = function () {
              i.thumbScroll.refresh();
            };
          }
          if ((c.appendTo(h), M("<br/>").appendTo(h), n.doublePage && 0 < a)) {
            h.width(2 * l),
              c
                .height(r)
                .width(2 * l)
                .attr("page-title", 2 * a + 1);
            M(C.createElement("soan"))
              .text(String(2 * a) + "-" + String(2 * a + 1))
              .appendTo(h)
              .addClass("skin-color")
              .addClass("flipbook-thumb-num");
          } else {
            c.height(r)
              .width(l)
              .attr("page-title", a + 1);
            M(C.createElement("span"))
              .text(a + 1)
              .appendTo(h)
              .addClass("skin-color")
              .addClass("flipbook-thumb-num");
          }
          c.bind("touchend click", function (e) {
            if (
              (e.stopPropagation(), e.preventDefault(), !i.thumbScroll.moved)
            ) {
              var t = Number(M(this).attr("page-title"));
              n.rightToLeft && (t = n.pages.length - t + 1),
                setTimeout(function () {
                  o.goToPage(t);
                }, 200),
                "search" != i.active &&
                  n.thumbsCloseOnClick &&
                  o.toggleThumbs(!1);
            }
          });
        }
        (this.thumbScroll = new FLIPBOOK.IScroll(this.thumbsWrapper[0], {
          bounce: !1,
          mouseWheel: !0,
          scrollbars: !0,
          interactiveScrollbars: !0,
        })),
          o.initColors();
      }
    }),
    (FLIPBOOK.Thumbnails.prototype = {
      loadThumbsFromPdf: function (e) {
        for (
          var t = this.main.pdfDocument._pdfInfo.numPages, o = 0;
          o < t;
          o++
        ) {
          var i = C.createElement("canvas");
          e[o].thumbCanvas = i;
        }
        this.loadThumbFromPdf(0, e);
      },
      loadVisibleThumbs: function () {},
      loadThumbFromPdf: function (e, r) {
        var l = this;
        this.main.pdfDocument.getPage(e + 1).then(function (e) {
          var t = e.getViewport({ scale: 1 }),
            o = l.options.thumbSize / t.height,
            i = e.getViewport({ scale: o }),
            n = r[e.pageIndex].thumbCanvas,
            s = n.getContext("2d");
          (n.height = i.height), (n.width = i.width);
          var a = { canvasContext: s, viewport: i };
          (e.cleanupAfterRender = !0),
            e.render(a).promise.then(function () {
              e.cleanup(),
                e.pageIndex + 1 < l.main.pdfDocument._pdfInfo.numPages &&
                  l.loadThumbFromPdf(e.pageIndex + 1, r);
            }),
            l.thumbScroll.refresh();
        });
      },
      showAllThumbs: function () {
        M(".flipbook-thumb").show(), this.thumbScroll.refresh();
      },
      hideAllThumbs: function () {
        M(".flipbook-thumb").hide(), this.thumbScroll.refresh();
      },
      showThumb: function (e) {
        this.thumbs[e] && this.thumbs[e].show(), this.thumbScroll.refresh();
      },
      hideThumb: function (e) {
        this.thumbs[e].hide(), this.thumbScroll.refresh();
      },
      showBookmarks: function () {
        M(".thumb-btn-close").show(),
          this.showBookmarkedThumbs(),
          this.bookmark.show(),
          this.setTitle(this.options.strings.bookmarks),
          this.main.updateCurrentPage(),
          (this.active = "bookmarks");
      },
      showSearch: function () {
        this.thumbsWrapper.css("top", "120px"),
          this.hideAllThumbs(),
          this.search.show(),
          this.$findInfo.hide(),
          M(".thumb-btn-close").hide(),
          this.setTitle(this.options.strings.search),
          this.$findInput.val("").focus(),
          (this.active = "search");
      },
      showBookmarkedThumbs: function () {
        var e = this.main.getBookmarkedPages();
        this.hideAllThumbs();
        for (var t = 0; t < e.length; t++) {
          var o = e[t];
          o && this.showThumb(o);
        }
        this.thumbsWrapper.css("top", 50 + this.bookmark.height() + "px");
      },
      show: function () {
        this.setTitle(this.options.strings.thumbnails),
          this.bookmark.hide(),
          this.search.hide(),
          this.thumbHolder.show(),
          this.main.thumbsVertical(),
          this.thumbsWrapper.css("top", "50px"),
          this.showAllThumbs(),
          M(".thumb-btn-close").hide(),
          this.loadVisibleThumbs(),
          this.main.resize(),
          (this.active = "thumbs");
      },
      hide: function () {
        this.thumbHolder.hide(), this.main.resize(), (this.active = null);
      },
      searchPDF: function (e) {
        var t = this.main;
        if (
          (this.hideAllThumbs(),
          (this.pagesFound = 0),
          this.$findInfo.hide(),
          t.unmark(),
          "" != e && ((t.searchingString = e), t.pdfService))
        )
          for (var o = 0; o < t.pdfService.pdfInfo.numPages; o++)
            this.findInPage(e, o);
      },
      setTitle: function (e) {
        this.thumbHolder.find(".flipbook-menu-title").text(e);
      },
      findInPage: function (t, o) {
        var i = this;
        this.main.pdfService.findInPage(t, o, function (e) {
          0 < e &&
            (i.showThumb(o),
            i.pagesFound++,
            i.$findInfo
              .show()
              .text(
                i.pagesFound +
                  " " +
                  i.options.strings.pagesFoundContaining +
                  ' "' +
                  t +
                  '"'
              ),
            i.main.mark(t));
        });
      },
    }),
    (FLIPBOOK.Lightbox = function (e, t, o) {
      var i = this;
      (this.context = e),
        (this.options = o),
        (this.lightboxOpened = !1),
        e.$elem.bind("tap click", function (e) {
          t.disposed || (i.openLightbox(), e.stopPropagation());
        });
      M(e.elem).find("img");
      (i.overlay = M(C.createElement("div"))
        .attr("style", o.lightboxCSS)
        .addClass("flipbook-overlay")
        .css("display", "none")
        .css("top", i.options.lightboxMarginV)
        .css("bottom", i.options.lightboxMarginV)
        .css("left", i.options.lightboxMarginH)
        .css("right", i.options.lightboxMarginH)
        .appendTo("body")),
        i.options.lightboxCloseOnClick &&
          M("body").bind("tap click", function (e) {
            var t = M(e.target);
            (t.parents().hasClass("flipbook-overlay") &&
              !t.hasClass("flipbook-bookLayer")) ||
              i.closeLightbox();
          }),
        o.lightboxBackground &&
          i.overlay.css("background", o.lightboxBackground),
        M(C).keyup(function (e) {
          27 == e.keyCode && i.closeLightbox();
        }),
        (i.wrapper = M(C.createElement("div"))
          .css("height", "auto")
          .appendTo(i.overlay)),
        i.wrapper
          .attr("class", "flipbook-wrapper-transparent")
          .css("margin", "0px auto")
          .css("padding", "0px")
          .css("height", "100%")
          .css("width", "100%"),
        t.appendTo(i.wrapper);
      M("<div/>").appendTo(i.wrapper).addClass("flipbook-lightbox-toolbar");
    }),
    (FLIPBOOK.Lightbox.prototype = {
      openLightbox: function () {
        this.lightboxOpened ||
          ((this.lightboxOpened = !0),
          this.overlay.css("display", "none"),
          this.overlay.fadeIn("slow", function () {}),
          M("body").addClass("flipbook-overflow-hidden"),
          M("html").addClass("flipbook-overflow-hidden"));
      },
      closeLightbox: function () {
        1 == this.lightboxOpened &&
          ((this.lightboxOpened = !1),
          this.overlay.fadeOut("fast"),
          M("body").removeClass("flipbook-overflow-hidden"),
          M("html").removeClass("flipbook-overflow-hidden"),
          M(this.context.fullscreenElement).removeClass(
            "flipbook-browser-fullscreen"
          ),
          this.context.lightboxEnd());
      },
      resize: function () {
        var e = M(L);
        e.width(), e.height();
      },
    }),
    (FLIPBOOK.getFlipbookSrc = function () {
      for (var e = C.getElementsByTagName("script"), t = 0; t < e.length; t++) {
        var o = String(e[t].src);
        if (o.match("flipbook\\.js") || o.match("flipbook\\.min\\.js"))
          return o;
      }
      return "";
    }),
    (FLIPBOOK.flipbookSrc = FLIPBOOK.getFlipbookSrc()),
    (FLIPBOOK.iscrollSrc = FLIPBOOK.flipbookSrc.replace(
      "/flipbook.",
      "/iscroll.min."
    )),
    (FLIPBOOK.threejsSrc = FLIPBOOK.flipbookSrc.replace(
      "/flipbook.",
      "/three.min."
    )),
    (FLIPBOOK.flipbookWebGlSrc = FLIPBOOK.flipbookSrc.replace(
      "/flipbook.",
      "/flipbook.webgl.min."
    )),
    (FLIPBOOK.flipbookBook3Src = FLIPBOOK.flipbookSrc.replace(
      "/flipbook.",
      "/flipbook.book3."
    )),
    (FLIPBOOK.flipBookSwipeSrc = FLIPBOOK.flipbookSrc.replace(
      "/flipbook.",
      "/flipbook.swipe."
    )),
    (FLIPBOOK.pdfjsSrc = FLIPBOOK.flipbookSrc.replace("/flipbook.", "/pdf.")),
    (FLIPBOOK.pdfServiceSrc = FLIPBOOK.flipbookSrc.replace(
      "/flipbook.",
      "/flipbook.pdfservice."
    )),
    (FLIPBOOK.pdfjsworkerSrc = FLIPBOOK.flipbookSrc.replace(
      "/flipbook.",
      "/pdf.worker."
    )),
    (FLIPBOOK.markSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/jquery.mark.js"),
    (FLIPBOOK.scriptsLoaded = {}),
    (FLIPBOOK.scriptsAdded = {});
})(jQuery, window, document),
  (FLIPBOOK.onPageLinkClick = function (e) {
    var t = e.dataset.bookid,
      o = e.dataset.page;
    o && FLIPBOOK.books[t].goToPage(Number(o));
    var i = e.dataset.url;
    i && window.open(i, "_blank");
  }),
  (function () {
    "use strict";
    var s =
        "undefined" != typeof window && void 0 !== window.document
          ? window.document
          : {},
      e = "undefined" != typeof module && module.exports,
      n = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
      a = (function () {
        for (
          var e,
            t = [
              [
                "requestFullscreen",
                "exitFullscreen",
                "fullscreenElement",
                "fullscreenEnabled",
                "fullscreenchange",
                "fullscreenerror",
              ],
              [
                "webkitRequestFullscreen",
                "webkitExitFullscreen",
                "webkitFullscreenElement",
                "webkitFullscreenEnabled",
                "webkitfullscreenchange",
                "webkitfullscreenerror",
              ],
              [
                "webkitRequestFullScreen",
                "webkitCancelFullScreen",
                "webkitCurrentFullScreenElement",
                "webkitCancelFullScreen",
                "webkitfullscreenchange",
                "webkitfullscreenerror",
              ],
              [
                "mozRequestFullScreen",
                "mozCancelFullScreen",
                "mozFullScreenElement",
                "mozFullScreenEnabled",
                "mozfullscreenchange",
                "mozfullscreenerror",
              ],
              [
                "msRequestFullscreen",
                "msExitFullscreen",
                "msFullscreenElement",
                "msFullscreenEnabled",
                "MSFullscreenChange",
                "MSFullscreenError",
              ],
            ],
            o = 0,
            i = t.length,
            n = {};
          o < i;
          o++
        )
          if ((e = t[o]) && e[1] in s) {
            for (o = 0; o < e.length; o++) n[t[0][o]] = e[o];
            return n;
          }
        return !1;
      })(),
      i = { change: a.fullscreenchange, error: a.fullscreenerror },
      t = {
        request: function (i) {
          return new Promise(
            function (e) {
              var t = a.requestFullscreen,
                o = function () {
                  this.off("change", o), e();
                }.bind(this);
              (i = i || s.documentElement),
                / Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)
                  ? i[t]()
                  : i[t](n ? Element.ALLOW_KEYBOARD_INPUT : {}),
                this.on("change", o);
            }.bind(this)
          );
        },
        exit: function () {
          return new Promise(
            function (e) {
              var t = function () {
                this.off("change", t), e();
              }.bind(this);
              s[a.exitFullscreen](), this.on("change", t);
            }.bind(this)
          );
        },
        toggle: function (e) {
          return this.isFullscreen ? this.exit() : this.request(e);
        },
        onchange: function (e) {
          this.on("change", e);
        },
        onerror: function (e) {
          this.on("error", e);
        },
        on: function (e, t) {
          var o = i[e];
          o && s.addEventListener(o, t, !1);
        },
        off: function (e, t) {
          var o = i[e];
          o && s.removeEventListener(o, t, !1);
        },
        raw: a,
      };
    a
      ? (Object.defineProperties(t, {
          isFullscreen: {
            get: function () {
              return Boolean(s[a.fullscreenElement]);
            },
          },
          element: {
            enumerable: !0,
            get: function () {
              return s[a.fullscreenElement];
            },
          },
          enabled: {
            enumerable: !0,
            get: function () {
              return Boolean(s[a.fullscreenEnabled]);
            },
          },
        }),
        e ? (module.exports = t) : (window.screenfull = t))
      : e
      ? (module.exports = !1)
      : (window.screenfull = !1);
  })(),
  (function (e) {
    (jQuery.browser = jQuery.browser || {}).mobile =
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        e
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        e.substr(0, 4)
      );
  })(navigator.userAgent || navigator.vendor || window.opera),
  (function (e) {
    "function" == typeof define && define.amd && define.amd.jQuery
      ? define(["jquery"], e)
      : e(
          "undefined" != typeof module && module.exports
            ? require("jquery")
            : jQuery
        );
  })(function (re) {
    "use strict";
    function i(e, r) {
      function t(e) {
        if (
          !(
            !0 === Y.data(Fe + "_intouch") ||
            0 < re(e.target).closest(r.excludedElements, Y).length
          )
        ) {
          var t = e.originalEvent ? e.originalEvent : e;
          if (
            !t.pointerType ||
            "mouse" != t.pointerType ||
            0 != r.fallbackToMouseEvents
          ) {
            var o,
              i = t.touches,
              n = i ? i[0] : t;
            return (
              (X = Te),
              i
                ? (G = i.length)
                : !1 !== r.preventDefaultEvents && e.preventDefault(),
              (Z = j = N = null),
              (U = 1),
              (q = W = V = $ = R = 0),
              (Q = (function () {
                var e = {};
                return (
                  (e[le] = L(le)),
                  (e[de] = L(de)),
                  (e[he] = L(he)),
                  (e[pe] = L(pe)),
                  e
                );
              })()),
              B(),
              O(0, n),
              !i || G === r.fingers || r.fingers === Be || f()
                ? ((ee = E()),
                  2 == G && (O(1, i[1]), (V = W = I(J[0].start, J[1].start))),
                  (r.swipeStatus || r.pinchStatus) && (o = d(t, X)))
                : (o = !1),
              !1 === o
                ? (d(t, (X = Me)), o)
                : (r.hold &&
                    (ae = setTimeout(
                      re.proxy(function () {
                        Y.trigger("hold", [t.target]),
                          r.hold && (o = r.hold.call(Y, t, t.target));
                      }, this),
                      r.longTapThreshold
                    )),
                  T(!0),
                  null)
            );
          }
        }
      }
      function o(e) {
        var t = e.originalEvent ? e.originalEvent : e;
        if (X !== ye && X !== Me && !x()) {
          var o,
            i = t.touches,
            n = y(i ? i[0] : t);
          if (
            ((te = E()),
            i && (G = i.length),
            r.hold && clearTimeout(ae),
            (X = Oe),
            2 == G &&
              (0 == V
                ? (O(1, i[1]), (V = W = I(J[0].start, J[1].start)))
                : (y(i[1]),
                  (W = I(J[0].end, J[1].end)),
                  J[0].end,
                  J[1].end,
                  (Z = U < 1 ? ue : ce)),
              (U = (function (e, t) {
                return ((t / e) * 1).toFixed(2);
              })(V, W)),
              (q = Math.abs(V - W))),
            G === r.fingers || r.fingers === Be || !i || f())
          ) {
            if (
              ((N = F(n.start, n.end)),
              (function (e, t) {
                if (!1 !== r.preventDefaultEvents)
                  if (r.allowPageScroll === ge) e.preventDefault();
                  else {
                    var o = r.allowPageScroll === fe;
                    switch (t) {
                      case le:
                        ((r.swipeLeft && o) ||
                          (!o && r.allowPageScroll != Pe)) &&
                          e.preventDefault();
                        break;
                      case de:
                        ((r.swipeRight && o) ||
                          (!o && r.allowPageScroll != Pe)) &&
                          e.preventDefault();
                        break;
                      case he:
                        ((r.swipeUp && o) || (!o && r.allowPageScroll != Se)) &&
                          e.preventDefault();
                        break;
                      case pe:
                        ((r.swipeDown && o) ||
                          (!o && r.allowPageScroll != Se)) &&
                          e.preventDefault();
                    }
                  }
              })(e, (j = F(n.last, n.end))),
              (R = (function (e, t) {
                return Math.round(
                  Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
                );
              })(n.start, n.end)),
              ($ = C()),
              (function (e, t) {
                e != ge && ((t = Math.max(t, M(e))), (Q[e].distance = t));
              })(N, R),
              (o = d(t, X)),
              !r.triggerOnTouchEnd || r.triggerOnTouchLeave)
            ) {
              var s = !0;
              if (r.triggerOnTouchLeave) {
                var a = (function (e) {
                  var t = (e = re(e)).offset();
                  return {
                    left: t.left,
                    right: t.left + e.outerWidth(),
                    top: t.top,
                    bottom: t.top + e.outerHeight(),
                  };
                })(this);
                s = (function (e, t) {
                  return (
                    e.x > t.left &&
                    e.x < t.right &&
                    e.y > t.top &&
                    e.y < t.bottom
                  );
                })(n.end, a);
              }
              !r.triggerOnTouchEnd && s
                ? (X = l(Oe))
                : r.triggerOnTouchLeave && !s && (X = l(ye)),
                (X != Me && X != ye) || d(t, X);
            }
          } else d(t, (X = Me));
          !1 === o && d(t, (X = Me));
        }
      }
      function i(e) {
        var t = e.originalEvent ? e.originalEvent : e,
          o = t.touches;
        if (o) {
          if (o.length && !x())
            return (
              (function (e) {
                (oe = E()), (ie = e.touches.length + 1);
              })(t),
              !0
            );
          if (o.length && x()) return !0;
        }
        return (
          x() && (G = ie),
          (te = E()),
          ($ = C()),
          c() || !p()
            ? d(t, (X = Me))
            : r.triggerOnTouchEnd || (!1 === r.triggerOnTouchEnd && X === Oe)
            ? (!1 !== r.preventDefaultEvents &&
                !1 !== e.cancelable &&
                e.preventDefault(),
              d(t, (X = ye)))
            : !r.triggerOnTouchEnd && w()
            ? h(t, (X = ye), ke)
            : X === Oe && d(t, (X = Me)),
          T(!1),
          null
        );
      }
      function n() {
        (W = V = ee = te = G = 0), (U = 1), B(), T(!1);
      }
      function s(e) {
        var t = e.originalEvent ? e.originalEvent : e;
        r.triggerOnTouchLeave && d(t, (X = l(ye)));
      }
      function a() {
        Y.unbind(A, t),
          Y.unbind(H, n),
          Y.unbind(_, o),
          Y.unbind(D, i),
          K && Y.unbind(K, s),
          T(!1);
      }
      function l(e) {
        var t = e,
          o = u(),
          i = p(),
          n = c();
        return (
          !o || n
            ? (t = Me)
            : !i || e != Oe || (r.triggerOnTouchEnd && !r.triggerOnTouchLeave)
            ? !i && e == ye && r.triggerOnTouchLeave && (t = Me)
            : (t = ye),
          t
        );
      }
      function d(e, t) {
        var o,
          i = e.touches;
        return (
          ((!b() || !m()) && !m()) || (o = h(e, t, be)),
          ((!g() || !f()) && !f()) || !1 === o || (o = h(e, t, me)),
          S() && P() && !1 !== o
            ? (o = h(e, t, ve))
            : $ > r.longTapThreshold && R < xe && r.longTap && !1 !== o
            ? (o = h(e, t, we))
            : (1 !== G && Le) ||
              !(isNaN(R) || R < r.threshold) ||
              !w() ||
              !1 === o ||
              (o = h(e, t, ke)),
          t === Me && n(),
          t === ye && ((i && i.length) || n()),
          o
        );
      }
      function h(e, t, o) {
        var i;
        if (o == be) {
          if (
            (Y.trigger("swipeStatus", [t, N || null, R || 0, $ || 0, G, J, j]),
            r.swipeStatus &&
              !1 ===
                (i = r.swipeStatus.call(
                  Y,
                  e,
                  t,
                  N || null,
                  R || 0,
                  $ || 0,
                  G,
                  J,
                  j
                )))
          )
            return !1;
          if (t == ye && b()) {
            if (
              (clearTimeout(se),
              clearTimeout(ae),
              Y.trigger("swipe", [N, R, $, G, J, j]),
              r.swipe && !1 === (i = r.swipe.call(Y, e, N, R, $, G, J, j)))
            )
              return !1;
            switch (N) {
              case le:
                Y.trigger("swipeLeft", [N, R, $, G, J, j]),
                  r.swipeLeft && (i = r.swipeLeft.call(Y, e, N, R, $, G, J, j));
                break;
              case de:
                Y.trigger("swipeRight", [N, R, $, G, J, j]),
                  r.swipeRight &&
                    (i = r.swipeRight.call(Y, e, N, R, $, G, J, j));
                break;
              case he:
                Y.trigger("swipeUp", [N, R, $, G, J, j]),
                  r.swipeUp && (i = r.swipeUp.call(Y, e, N, R, $, G, J, j));
                break;
              case pe:
                Y.trigger("swipeDown", [N, R, $, G, J, j]),
                  r.swipeDown && (i = r.swipeDown.call(Y, e, N, R, $, G, J, j));
            }
          }
        }
        if (o == me) {
          if (
            (Y.trigger("pinchStatus", [t, Z || null, q || 0, $ || 0, G, U, J]),
            r.pinchStatus &&
              !1 ===
                (i = r.pinchStatus.call(
                  Y,
                  e,
                  t,
                  Z || null,
                  q || 0,
                  $ || 0,
                  G,
                  U,
                  J
                )))
          )
            return !1;
          if (t == ye && g())
            switch (Z) {
              case ce:
                Y.trigger("pinchIn", [Z || null, q || 0, $ || 0, G, U, J]),
                  r.pinchIn &&
                    (i = r.pinchIn.call(
                      Y,
                      e,
                      Z || null,
                      q || 0,
                      $ || 0,
                      G,
                      U,
                      J
                    ));
                break;
              case ue:
                Y.trigger("pinchOut", [Z || null, q || 0, $ || 0, G, U, J]),
                  r.pinchOut &&
                    (i = r.pinchOut.call(
                      Y,
                      e,
                      Z || null,
                      q || 0,
                      $ || 0,
                      G,
                      U,
                      J
                    ));
            }
        }
        return (
          o == ke
            ? (t !== Me && t !== ye) ||
              (clearTimeout(se),
              clearTimeout(ae),
              P() && !S()
                ? ((ne = E()),
                  (se = setTimeout(
                    re.proxy(function () {
                      (ne = null),
                        Y.trigger("tap", [e.target]),
                        r.tap && (i = r.tap.call(Y, e, e.target));
                    }, this),
                    r.doubleTapThreshold
                  )))
                : ((ne = null),
                  Y.trigger("tap", [e.target]),
                  r.tap && (i = r.tap.call(Y, e, e.target))))
            : o == ve
            ? (t !== Me && t !== ye) ||
              (clearTimeout(se),
              clearTimeout(ae),
              (ne = null),
              Y.trigger("doubletap", [e.target]),
              r.doubleTap && (i = r.doubleTap.call(Y, e, e.target)))
            : o == we &&
              ((t !== Me && t !== ye) ||
                (clearTimeout(se),
                (ne = null),
                Y.trigger("longtap", [e.target]),
                r.longTap && (i = r.longTap.call(Y, e, e.target)))),
          i
        );
      }
      function p() {
        var e = !0;
        return null !== r.threshold && (e = R >= r.threshold), e;
      }
      function c() {
        var e = !1;
        return (
          null !== r.cancelThreshold &&
            null !== N &&
            (e = M(N) - R >= r.cancelThreshold),
          e
        );
      }
      function u() {
        return !(r.maxTimeThreshold && $ >= r.maxTimeThreshold);
      }
      function g() {
        var e = k(),
          t = v(),
          o = null === r.pinchThreshold || q >= r.pinchThreshold;
        return e && t && o;
      }
      function f() {
        return !!(r.pinchStatus || r.pinchIn || r.pinchOut);
      }
      function b() {
        var e = u(),
          t = p(),
          o = k(),
          i = v();
        return !c() && i && o && t && e;
      }
      function m() {
        return !!(
          r.swipe ||
          r.swipeStatus ||
          r.swipeLeft ||
          r.swipeRight ||
          r.swipeUp ||
          r.swipeDown
        );
      }
      function k() {
        return G === r.fingers || r.fingers === Be || !Le;
      }
      function v() {
        return 0 !== J[0].end.x;
      }
      function w() {
        return !!r.tap;
      }
      function P() {
        return !!r.doubleTap;
      }
      function S() {
        if (null == ne) return !1;
        var e = E();
        return P() && e - ne <= r.doubleTapThreshold;
      }
      function B() {
        ie = oe = 0;
      }
      function x() {
        var e = !1;
        oe && E() - oe <= r.fingerReleaseThreshold && (e = !0);
        return e;
      }
      function T(e) {
        Y &&
          (!0 === e
            ? (Y.bind(_, o), Y.bind(D, i), K && Y.bind(K, s))
            : (Y.unbind(_, o, !1), Y.unbind(D, i, !1), K && Y.unbind(K, s, !1)),
          Y.data(Fe + "_intouch", !0 === e));
      }
      function O(e, t) {
        var o = {
          start: { x: 0, y: 0 },
          last: { x: 0, y: 0 },
          end: { x: 0, y: 0 },
        };
        return (
          (o.start.x = o.last.x = o.end.x = t.pageX || t.clientX),
          (o.start.y = o.last.y = o.end.y = t.pageY || t.clientY),
          (J[e] = o)
        );
      }
      function y(e) {
        var t = void 0 !== e.identifier ? e.identifier : 0,
          o = (function (e) {
            return J[e] || null;
          })(t);
        return (
          null === o && (o = O(t, e)),
          (o.last.x = o.end.x),
          (o.last.y = o.end.y),
          (o.end.x = e.pageX || e.clientX),
          (o.end.y = e.pageY || e.clientY),
          o
        );
      }
      function M(e) {
        if (Q[e]) return Q[e].distance;
      }
      function L(e) {
        return { direction: e, distance: 0 };
      }
      function C() {
        return te - ee;
      }
      function I(e, t) {
        var o = Math.abs(e.x - t.x),
          i = Math.abs(e.y - t.y);
        return Math.round(Math.sqrt(o * o + i * i));
      }
      function F(e, t) {
        if (
          (function (e, t) {
            return e.x == t.x && e.y == t.y;
          })(e, t)
        )
          return ge;
        var o = (function (e, t) {
          var o = e.x - t.x,
            i = t.y - e.y,
            n = Math.atan2(i, o),
            s = Math.round((180 * n) / Math.PI);
          return s < 0 && (s = 360 - Math.abs(s)), s;
        })(e, t);
        return o <= 45 && 0 <= o
          ? le
          : o <= 360 && 315 <= o
          ? le
          : 135 <= o && o <= 225
          ? de
          : 45 < o && o < 135
          ? pe
          : he;
      }
      function E() {
        return new Date().getTime();
      }
      r = re.extend({}, r);
      var z = Le || Ie || !r.fallbackToMouseEvents,
        A = z
          ? Ie
            ? Ce
              ? "MSPointerDown"
              : "pointerdown"
            : "touchstart"
          : "mousedown",
        _ = z
          ? Ie
            ? Ce
              ? "MSPointerMove"
              : "pointermove"
            : "touchmove"
          : "mousemove",
        D = z
          ? Ie
            ? Ce
              ? "MSPointerUp"
              : "pointerup"
            : "touchend"
          : "mouseup",
        K = z ? (Ie ? "mouseleave" : null) : "mouseleave",
        H = Ie ? (Ce ? "MSPointerCancel" : "pointercancel") : "touchcancel",
        R = 0,
        N = null,
        j = null,
        $ = 0,
        V = 0,
        W = 0,
        U = 1,
        q = 0,
        Z = 0,
        Q = null,
        Y = re(e),
        X = "start",
        G = 0,
        J = {},
        ee = 0,
        te = 0,
        oe = 0,
        ie = 0,
        ne = 0,
        se = null,
        ae = null;
      try {
        Y.bind(A, t), Y.bind(H, n);
      } catch (e) {
        re.error("events not supported " + A + "," + H + " on jQuery.swipe");
      }
      (this.enable = function () {
        return this.disable(), Y.bind(A, t), Y.bind(H, n), Y;
      }),
        (this.disable = function () {
          return a(), Y;
        }),
        (this.destroy = function () {
          a(), Y.data(Fe, null), (Y = null);
        }),
        (this.option = function (e, t) {
          if ("object" == typeof e) r = re.extend(r, e);
          else if (void 0 !== r[e]) {
            if (void 0 === t) return r[e];
            r[e] = t;
          } else {
            if (!e) return r;
            re.error("Option " + e + " does not exist on jQuery.swipe.options");
          }
          return null;
        });
    }
    var le = "left",
      de = "right",
      he = "up",
      pe = "down",
      ce = "in",
      ue = "out",
      ge = "none",
      fe = "auto",
      be = "swipe",
      me = "pinch",
      ke = "tap",
      ve = "doubletap",
      we = "longtap",
      Pe = "horizontal",
      Se = "vertical",
      Be = "all",
      xe = 10,
      Te = "start",
      Oe = "move",
      ye = "end",
      Me = "cancel",
      Le = "ontouchstart" in window,
      Ce =
        window.navigator.msPointerEnabled &&
        !window.navigator.pointerEnabled &&
        !Le,
      Ie =
        (window.navigator.pointerEnabled ||
          window.navigator.msPointerEnabled) &&
        !Le,
      Fe = "TouchSwipe";
    (re.fn.swipe = function (e) {
      var t = re(this),
        o = t.data(Fe);
      if (o && "string" == typeof e) {
        if (o[e])
          return o[e].apply(o, Array.prototype.slice.call(arguments, 1));
        re.error("Method " + e + " does not exist on jQuery.swipe");
      } else if (o && "object" == typeof e) o.option.apply(o, arguments);
      else if (!(o || ("object" != typeof e && e)))
        return function (o) {
          return (
            !o ||
              void 0 !== o.allowPageScroll ||
              (void 0 === o.swipe && void 0 === o.swipeStatus) ||
              (o.allowPageScroll = ge),
            void 0 !== o.click && void 0 === o.tap && (o.tap = o.click),
            o || (o = {}),
            (o = re.extend({}, re.fn.swipe.defaults, o)),
            this.each(function () {
              var e = re(this),
                t = e.data(Fe);
              t || ((t = new i(this, o)), e.data(Fe, t));
            })
          );
        }.apply(this, arguments);
      return t;
    }),
      (re.fn.swipe.version = "1.6.18"),
      (re.fn.swipe.defaults = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: !0,
        triggerOnTouchLeave: !1,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0,
        excludedElements: ".noSwipe",
        preventDefaultEvents: !0,
      }),
      (re.fn.swipe.phases = {
        PHASE_START: Te,
        PHASE_MOVE: Oe,
        PHASE_END: ye,
        PHASE_CANCEL: Me,
      }),
      (re.fn.swipe.directions = {
        LEFT: le,
        RIGHT: de,
        UP: he,
        DOWN: pe,
        IN: ce,
        OUT: ue,
      }),
      (re.fn.swipe.pageScroll = {
        NONE: ge,
        HORIZONTAL: Pe,
        VERTICAL: Se,
        AUTO: fe,
      }),
      (re.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        ALL: Be,
      });
  }),
  (function (e) {
    if ("object" == typeof exports && "undefined" != typeof module)
      module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
      ("undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this
      ).Share = e();
    }
  })(function () {
    function e() {}
    "classList" in document.documentElement ||
      !Object.defineProperty ||
      "undefined" == typeof HTMLElement ||
      Object.defineProperty(HTMLElement.prototype, "classList", {
        get: function () {
          var e, n, t;
          return (
            (t = function (i) {
              return function (e) {
                var t, o;
                (o = (t = n.className.split(/\s+/)).indexOf(e)),
                  i(t, o, e),
                  (n.className = t.join(" "));
              };
            }),
            (n = this),
            (e = {
              add: t(function (e, t, o) {
                ~t || e.push(o);
              }),
              remove: t(function (e, t) {
                ~t && e.splice(t, 1);
              }),
              toggle: t(function (e, t, o) {
                ~t ? e.splice(t, 1) : e.push(o);
              }),
              contains: function (e) {
                return !!~n.className.split(/\s+/).indexOf(e);
              },
              item: function (e) {
                return n.className.split(/\s+/)[e] || null;
              },
            }),
            Object.defineProperty(e, "length", {
              get: function () {
                return n.className.split(/\s+/).length;
              },
            }),
            e
          );
        },
      }),
      (String.prototype.to_rfc3986 = function () {
        return encodeURIComponent(this).replace(/[!'()*]/g, function (e) {
          return "%" + e.charCodeAt(0).toString(16);
        });
      }),
      (e.prototype.extend = function (e, t, o) {
        var i, n;
        for (n in t)
          (i = void 0 !== e[n]) && "object" == typeof t[n]
            ? this.extend(e[n], t[n], o)
            : (!o && i) || (e[n] = t[n]);
      }),
      (e.prototype.hide = function (e) {
        return (e.style.display = "none");
      }),
      (e.prototype.show = function (e) {
        return (e.style.display = "block");
      }),
      (e.prototype.has_class = function (e, t) {
        return e.classList.contains(t);
      }),
      (e.prototype.add_class = function (e, t) {
        return e.classList.add(t);
      }),
      (e.prototype.remove_class = function (e, t) {
        return e.classList.remove(t);
      }),
      (e.prototype.is_encoded = function (e) {
        return (e = e.to_rfc3986()), decodeURIComponent(e) !== e;
      }),
      (e.prototype.encode = function (e) {
        return void 0 === e || this.is_encoded(e) ? e : e.to_rfc3986();
      }),
      (e.prototype.popup = function (e, t) {
        var o, i, n, s;
        return (
          null == t && (t = {}),
          ((i = { width: 500, height: 350 }).top =
            screen.height / 2 - i.height / 2),
          (i.left = screen.width / 2 - i.width / 2),
          (n = function () {
            var e;
            for (o in ((e = []), t))
              (s = t[o]), e.push(o + "=" + this.encode(s));
            return e;
          }
            .call(this)
            .join("&")) && (n = "?" + n),
          window.open(
            e + n,
            "targetWindow",
            "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" +
              i.left +
              ",top=" +
              i.top +
              ",width=" +
              i.width +
              ",height=" +
              i.height
          )
        );
      });
    var n = {}.hasOwnProperty;
    return (
      (function (e, t) {
        function o() {
          this.constructor = e;
        }
        for (var i in t) n.call(t, i) && (e[i] = t[i]);
        (o.prototype = t.prototype),
          (e.prototype = new o()),
          (e.__super__ = t.prototype);
      })(t, e),
      (t.prototype.setup = function (e, t) {
        var o, i, n, s;
        for (
          n = [e],
            this.extend(this.config, t, !0),
            this.set_global_configuration(),
            this.normalize_network_configuration(),
            this.config.networks.facebook.enabled &&
              this.config.networks.facebook.load_sdk &&
              this.inject_facebook_sdk(),
            i = o = 0,
            s = n.length;
          o < s;
          i = ++o
        )
          this.setup_instance(e, i);
      }),
      (t.prototype.setup_instance = function (e, t) {
        var o, i, n, s, a, r, l, d;
        for (
          s = e,
            this.add_class(s, "sharer-" + t),
            this.inject_html(s),
            document.getElementById("flipbook-share-facebook").style.display =
              this.config.networks.facebook.display,
            document.getElementById("flipbook-share-twitter").style.display =
              this.config.networks.twitter.display,
            document.getElementById("flipbook-share-pinterest").style.display =
              this.config.networks.pinterest.display,
            document.getElementById("flipbook-share-email").style.display =
              this.config.networks.email.display,
            document.getElementById(
              "flipbook-share-google_plus"
            ).style.display = this.config.networks.google_plus.display,
            s.getElementsByTagName("label")[0],
            i = s.getElementsByClassName("social")[0],
            l = s.getElementsByTagName("li"),
            this.add_class(i, "networks-" + this.config.enabled_networks),
            s.addEventListener(
              "click",
              (function (e) {
                return function () {
                  return e.event_toggle(i);
                };
              })(this)
            ),
            o = this,
            d = [],
            t = n = 0,
            a = l.length;
          n < a;
          t = ++n
        )
          (r = l[t]),
            d.push(
              r.addEventListener("click", function () {
                return o.event_network(s, this), o.event_close(i);
              })
            );
        return d;
      }),
      (t.prototype.event_toggle = function (e) {
        return this.has_class(e, "active")
          ? this.event_close(e)
          : this.event_open(e);
      }),
      (t.prototype.event_open = function (e) {
        return (
          this.has_class(e, "load") && this.remove_class(e, "load"),
          this.add_class(e, "active")
        );
      }),
      (t.prototype.event_close = function (e) {
        return this.remove_class(e, "active");
      }),
      (t.prototype.event_network = function (e, t) {
        var o;
        return (
          (o = t.getAttribute("data-network")),
          this.hook("before", o, e),
          this["network_" + o](),
          this.hook("after", o, e)
        );
      }),
      (t.prototype.open = function () {
        return this.public("open");
      }),
      (t.prototype.close = function () {
        return this.public("close");
      }),
      (t.prototype.toggle = function () {
        return this.public("toggle");
      }),
      (t.prototype.public = function (e) {
        var t, o, i, n, s, a;
        for (
          a = [],
            i = o = 0,
            n = (s = document.querySelectorAll(this.element)).length;
          o < n;
          i = ++o
        )
          (t = s[i].getElementsByClassName("social")[0]),
            a.push(this["event_" + e](t));
        return a;
      }),
      (t.prototype.network_facebook = function () {
        return this.config.networks.facebook.load_sdk
          ? window.FB
            ? FB.ui({
                method: "feed",
                name: this.config.networks.facebook.title,
                link: this.config.networks.facebook.url,
                picture: this.config.networks.facebook.image,
                caption: this.config.networks.facebook.caption,
                description: this.config.networks.facebook.description,
              })
            : console.error("The Facebook JS SDK hasn't loaded yet.")
          : this.popup("https://www.facebook.com/sharer/sharer.php", {
              u: this.config.networks.facebook.url,
            });
      }),
      (t.prototype.network_twitter = function () {
        return this.popup("https://twitter.com/intent/tweet", {
          text: this.config.networks.twitter.description,
          url: this.config.networks.twitter.url,
        });
      }),
      (t.prototype.network_google_plus = function () {
        return this.popup("https://plus.google.com/share", {
          url: this.config.networks.google_plus.url,
        });
      }),
      (t.prototype.network_pinterest = function () {
        return this.popup("https://www.pinterest.com/pin/create/button", {
          url: this.config.networks.pinterest.url,
          media: this.config.networks.pinterest.image,
          description: this.config.networks.pinterest.description,
        });
      }),
      (t.prototype.network_email = function () {
        return this.popup("mailto:", {
          subject: this.config.networks.email.title,
          body:
            this.config.networks.email.description +
              "%0D%0A" +
              this.config.networks.email.url || this.config.url,
        });
      }),
      (t.prototype.inject_stylesheet = function (e) {
        var t;
        return this.el.head.querySelector('link[href="' + e + '"]')
          ? void 0
          : ((t = document.createElement("link")).setAttribute(
              "rel",
              "stylesheet"
            ),
            t.setAttribute("href", e),
            this.el.head.appendChild(t));
      }),
      (t.prototype.inject_html = function (e) {
        return (e.innerHTML =
          "<div class='social load " +
          this.config.ui.flyout +
          "'><ul><li id='flipbook-share-pinterest' class='fab fa-pinterest-p skin-color' data-network='pinterest'></li><li id='flipbook-share-twitter' class='fab fa-twitter skin-color' data-network='twitter'></li><li id='flipbook-share-facebook' class='fab fa-facebook-f skin-color' data-network='facebook'></li><li id='flipbook-share-google_plus' class='fab fa-google-plus-g skin-color' data-network='google_plus'></li><li id='flipbook-share-email' class='fas fa-at skin-color' data-network='email'></li></ul></div>");
      }),
      (t.prototype.inject_facebook_sdk = function () {
        var e, t;
        return window.FB ||
          !this.config.networks.facebook.app_id ||
          this.el.body.querySelector("#fb-root")
          ? void 0
          : (((t = document.createElement("script")).text =
              "window.fbAsyncInit=function(){FB.init({appId:'" +
              this.config.networks.facebook.app_id +
              "',status:true,xfbml:true})};(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n)){return}r=e.createElement(t);r.id=n;r.src='" +
              this.config.protocol +
              "connect.facebook.net/en_US/all.js';i.parentNode.insertBefore(r,i)})(document,'script','facebook-jssdk')"),
            ((e = document.createElement("div")).id = "fb-root"),
            this.el.body.appendChild(e),
            this.el.body.appendChild(t));
      }),
      (t.prototype.hook = function (e, t, o) {
        var i, n;
        "function" != typeof (i = this.config.networks[t][e]) ||
          (void 0 !== (n = i.call(this.config.networks[t], o)) &&
            ((n = this.normalize_filter_config_updates(n)),
            this.extend(this.config.networks[t], n, !0),
            this.normalize_network_configuration()));
      }),
      (t.prototype.default_title = function () {
        var e;
        return (e =
          document.querySelector('meta[property="og:title"]') ||
          document.querySelector('meta[name="twitter:title"]'))
          ? e.getAttribute("content")
          : (e = document.querySelector("title"))
          ? e.innerText
          : void 0;
      }),
      (t.prototype.default_image = function () {
        var e;
        return (e =
          document.querySelector('meta[property="og:image"]') ||
          document.querySelector('meta[name="twitter:image"]'))
          ? e.getAttribute("content")
          : void 0;
      }),
      (t.prototype.default_description = function () {
        var e;
        return (e =
          document.querySelector('meta[property="og:description"]') ||
          document.querySelector('meta[name="twitter:description"]') ||
          document.querySelector('meta[name="description"]'))
          ? e.getAttribute("content")
          : "";
      }),
      (t.prototype.set_global_configuration = function () {
        var e, t, o, i, n;
        for (t in ((n = []), (i = this.config.networks))) {
          for (o in i[t])
            null == this.config.networks[t][o] &&
              (this.config.networks[t][o] = this.config[o]);
          this.config.networks[t].enabled
            ? ((e = "block"), (this.config.enabled_networks += 1))
            : (e = "none"),
            n.push((this.config.networks[t].display = e));
        }
        return n;
      }),
      (t.prototype.normalize_network_configuration = function () {
        return (
          this.config.networks.facebook.app_id ||
            (this.config.networks.facebook.load_sdk = !1),
          this.is_encoded(this.config.networks.twitter.description) ||
            (this.config.networks.twitter.description = encodeURIComponent(
              this.config.networks.twitter.description
            )),
          "number" == typeof this.config.networks.facebook.app_id
            ? (this.config.networks.facebook.app_id =
                this.config.networks.facebook.app_id.toString())
            : void 0
        );
      }),
      (t.prototype.normalize_filter_config_updates = function (e) {
        return (
          this.config.networks.facebook.app_id !== e.app_id &&
            (console.warn(
              "You are unable to change the Facebook app_id after the button has been initialized. Please update your Facebook filters accordingly."
            ),
            delete e.app_id),
          this.config.networks.facebook.load_sdk !== e.load_sdk &&
            (console.warn(
              "You are unable to change the Facebook load_sdk option after the button has been initialized. Please update your Facebook filters accordingly."
            ),
            delete e.app_id),
          e
        );
      }),
      t
    );
    function t(e, t) {
      return (
        (this.element = e),
        (this.el = {
          head: document.getElementsByTagName("head")[0],
          body: document.getElementsByTagName("body")[0],
        }),
        (this.config = {
          enabled_networks: 0,
          protocol:
            -1 === ["http", "https"].indexOf(window.location.href.split(":")[0])
              ? "https://"
              : "//",
          url: window.location.href,
          caption: null,
          title: this.default_title(),
          image: this.default_image(),
          description: this.default_description(),
          ui: {
            flyout: "top center",
            button_text: "Share",
            button_font: !0,
            icon_font: !0,
          },
          networks: {
            google_plus: { enabled: !0, url: null },
            twitter: { enabled: !0, url: null, description: null },
            facebook: {
              enabled: !0,
              load_sdk: !0,
              url: null,
              app_id: null,
              title: null,
              caption: null,
              description: null,
              image: null,
            },
            pinterest: {
              enabled: !0,
              url: null,
              image: null,
              description: null,
            },
            email: { enabled: !0, title: null, description: null, url: null },
          },
        }),
        this.setup(this.element, t),
        this
      );
    }
  });
