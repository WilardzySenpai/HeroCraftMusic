const express = require("express");
const url = require("url");
const app = express();
const session = require("express-session");
const ejs = require("ejs")
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const path = require("path");
const discord = require("discord.js");
const MemoryStore = require("memorystore")(session);
const bodyParser = require("body-parser");
const { formatDate } = require("../function.js");
const fs = require("fs");


module.exports = client => {
    app.engine("html", ejs.render)
    app.set("view engine", "html")
    app.set("views", path.join(__dirname, "./views"))
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((obj, done) => done(null, obj))

    passport.use(new Strategy({
        clientID: `${client.dashboard.clientId}`,
        clientSecret: `${client.dashboard.clientSecret}`,
        callbackURL: `${client.dashboard.URL}/callback`,
        scope: ["identify", "guilds", "guilds.join"]
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile))
    }));
    
    app.use(session({
        store: new MemoryStore({checkPeriod: 86400000 }),
        secret: `#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n`,
        resave: false,
        saveUninitialized: false
    }))

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.static(path.join(__dirname, "./public")));
    const checkAuth = (req, res, next) => {
        if(req.isAuthenticated()) return next();
        req.session.backURL = req.url;
        res.redirect("/login");
    }
    app.get("/login", (req, res, next) => {
        if(req.session.backURL){
            req.session.backURL = req.session.backURL
        } else if(req.headers.referer){
            const parsed = url.parse(req.headers.referer);
            if(parsed.hostname == app.locals.domain){
                req.session.backURL = parsed.path
            }
        } else {
            req.session.backURL = "/"
        }
        next();
        }, passport.authenticate("discord", { prompt: "none"})
    );
    app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), async (req, res) => {
        res.redirect("/dashboard")
    })
    app.get("/logout", function(req, res) {
        req.session.destroy(()=>{
            req.logout();
            res.redirect("/");
        })
    })
    app.get("/", (req, res) => {
        res.render("index.ejs", {
            req: req,
            user: req.isAuthenticated() ? client.users.cache.get(req.user.id) : null,
            bot: client,
            Permissions: discord.Permissions,
            location: "Home",
            callback: `${client.dashboard.URL}/callback`,
        });
    })
    app.get("/dashboard", (req, res) => {
      if(!req.isAuthenticated || !req.user) return res.redirect("/login");
      res.render("dashboard.ejs", {
            req: req,
            user: req.isAuthenticated() ? req.user : null,
            bot: client,
            Permissions: discord.Permissions,
            location: "Dashboard",
            callback: `${client.dashboard.URL}/callback`,
        })
    })
    app.get("/dashboard/:guildID", checkAuth, async(req, res) => {
      const guild = client.guilds.cache.get(req.params.guildID)
      if(!guild)
      return res.redirect("/dashboard");
      let member = guild.members.cache.get(req.user.id);
      if(!member) {
        try{
          member = await guild.members.fetch(req.user.id);
        } catch{

        }
      }
      const guilds = client.Guilds.get(guild.id);
      if(!guilds) {
        client.Guilds.ensure(guild.id, {
          prefix: client.prefix,
          deletecmd: 0,
          dj: 0,
          djrole: []
        });
      }

      if(!member)
      return res.redirect("/");
      if(!member.permissions.has(discord.Permissions.FLAGS.MANAGE_GUILD))
      return res.redirect("/dashboard");
      res.render("settings.ejs", {
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        bot: client,
        Permissions: discord.Permissions,
        location: guild.name,
        callback: `${client.dashboard.URL}/callback`,
        guild: guild,
        users: member,
        fs: fs,
        alert: null,
      })
      
    })

    app.post("/dashboard/:guildID", checkAuth, async(req, res) => {
      const guild = client.guilds.cache.get(req.params.guildID)
      if(!guild)
      return res.redirect("/dashboard")
      let member = guild.members.cache.get(req.user.id);
      if(!member) {
        try{
          member = await guild.members.fetch(req.user.id);
        } catch{

        }
      }

      if(!member)
      return res.redirect("/");
      if(!member.permissions.has(discord.Permissions.FLAGS.MANAGE_GUILD))
      return res.redirect("/dashboard");

      if(req.body.prefix) {
       client.Guilds.set(guild.id, req.body.prefix, "prefix");
      };
      if(req.body.autodelete_CMD) {
       client.Guilds.set(guild.id, 1, "deletecmd");
      } else {
       client.Guilds.set(guild.id, 0, "deletecmd");
      };
      if(req.body.dj) {
       client.Guilds.set(guild.id, 1, "dj");
      } else {
       client.Guilds.set(guild.id, 0, "dj");
      };
      if(req.body.djrole) client.Guilds.set(guild.id, req.body.djrole, "djrole");

      res.render("settings.ejs", {
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        bot: client,
        Permissions: discord.Permissions,
        location: guild.name,
        callback: `${client.dashboard.URL}/callback`,
        guild: guild,
        users: member,
        fs: fs,
        alert: "✅ Your changes was successfuly save!",
      })
    });

    const http = require("http").createServer(app);
    http.listen(client.dashboard.port, () => {
        console.log(`Website is online on the Port: ${client.dashboard.port}, ${client.dashboard.URL}`);
    });
}