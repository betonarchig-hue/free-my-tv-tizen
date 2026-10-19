/*
 * Free My TV's helper on the TV. TizenBrew runs this file in its background service (Node.js) when the module opens,
 * with the `tizen` API the page itself doesn't get. It answers the page on http://127.0.0.1:8097:
 *
 *   GET /ping            → { ok: true, version }
 *   GET /apps            → the TV's apps: [{ id, name, icon }]
 *   GET /icon?id=<app>   → that app's icon (the image file the app installed on the TV)
 *   GET /launch?id=<app> → opens the app: { ok, method } or { ok: false, error }
 *
 * Only Node's built-in modules, and plain ES5: the TV's Node can be old.
 */
var http = require("http");
var fs = require("fs");
var urlLib = require("url");

var PORT = 8097;
var VERSION = "1.3";
var appsCache = null, appsAt = 0;

function send(res, code, body, type) {
  res.writeHead(code, {
    "Content-Type": type || "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store"
  });
  res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}

function listApps(done) {
  if (appsCache && Date.now() - appsAt < 60000) return done(null, appsCache);
  try {
    tizen.application.getAppsInfo(function (list) {
      appsCache = list.map(function (a) {
        return { id: a.id, name: a.name, icon: a.iconPath || "", show: a.show !== false };
      });
      appsAt = Date.now();
      done(null, appsCache);
    }, function (e) { done(e && (e.name + ": " + e.message) || "error"); });
  } catch (e) {
    done(String(e && e.message || e));
  }
}

function launch(id, done) {
  var finished = false;
  function finish(r) { if (!finished) { finished = true; done(r); } }
  try {
    tizen.application.launch(id, function () { finish({ ok: true, method: "launch" }); }, function (e) {
      // Some apps only open through an app control.
      try {
        tizen.application.launchAppControl(
          new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/default", null, null, null, null),
          id,
          function () { finish({ ok: true, method: "appcontrol" }); },
          function (e2) { finish({ ok: false, error: (e && e.name) + " / " + (e2 && e2.name) }); },
          null);
      } catch (e3) {
        finish({ ok: false, error: (e && e.name) + " / " + (e3 && e3.message) });
      }
    });
  } catch (e) {
    finish({ ok: false, error: String(e && e.message || e) });
  }
  setTimeout(function () { finish({ ok: true, method: "launch (no answer)" }); }, 4000);
}

var server = http.createServer(function (req, res) {
  var u = urlLib.parse(req.url, true);
  var id = u.query && u.query.id;
  if (u.pathname === "/ping") return send(res, 200, { ok: true, version: VERSION, tizen: typeof tizen !== "undefined" });
  if (u.pathname === "/apps") {
    return listApps(function (err, list) {
      if (err) return send(res, 500, { ok: false, error: err });
      send(res, 200, { ok: true, apps: list });
    });
  }
  if (u.pathname === "/icon" && id) {
    return listApps(function (err, list) {
      var app = null;
      (list || []).forEach(function (a) { if (a.id === id) app = a; });
      if (!app || !app.icon) return send(res, 404, { ok: false });
      var file = app.icon.replace(/^file:\/\//, "");
      fs.readFile(file, function (e, data) {
        if (e) return send(res, 404, { ok: false });
        var type = /\.jpe?g$/i.test(file) ? "image/jpeg" : /\.svg$/i.test(file) ? "image/svg+xml" : "image/png";
        send(res, 200, data, type);
      });
    });
  }
  if (u.pathname === "/launch" && id) return launch(id, function (r) { send(res, r.ok ? 200 : 500, r); });
  send(res, 404, { ok: false, error: "not found" });
});

// Opening the module again starts this file again: if a copy is already listening, this one just stops.
server.on("error", function () { });
server.listen(PORT, "127.0.0.1");
