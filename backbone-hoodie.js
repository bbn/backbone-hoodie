(function() {
  var Backbone, Hoodie, factory;

  factory = function(Backbone, Hoodie) {
    Backbone.connect = function(url) {
      return Backbone.hoodie = new Hoodie(url);
    };
    Backbone.sync = function(method, modelOrCollection, options) {
      var attributes, id, promise, type;
      id = modelOrCollection.id, attributes = modelOrCollection.attributes, type = modelOrCollection.type;
      type || (type = modelOrCollection.model.prototype.type);
      promise = (function() {
        switch (method) {
          case "read":
            if (id) {
              return Backbone.hoodie.store.find(type, id);
            } else {
              return Backbone.hoodie.store.findAll(type);
            }
            break;
          case "create":
            return Backbone.hoodie.store.add(type, attributes);
          case "update":
            return Backbone.hoodie.store.update(type, id, attributes);
          case "delete":
            return Backbone.hoodie.store.remove(type, id);
        }
      })();
      if (options.success) {
        promise.done(options.success);
      }
      if (options.error) {
        return promise.fail(options.error);
      }
    };
    Backbone.Model.prototype.merge = function(attributes) {
      return this.set(attributes, {
        remote: true
      });
    };
    Backbone.Collection.prototype.initialize = function() {
      var type,
        _this = this;
      if (this.model) {
        type = this.model.prototype.type;
        this.fetch();
        if (type) {
          Backbone.hoodie.store.on("add:" + type, function(attributes) {
            return _this.eventAdd(attributes);
          });
          Backbone.hoodie.remote.on("add:" + type, function(attributes) {
            return _this.eventAdd(attributes);
          });
          Backbone.hoodie.store.on("remove:" + type, function(attributes) {
            return _this.eventRemove(attributes);
          });
          Backbone.hoodie.remote.on("remove:" + type, function(attributes) {
            return _this.eventRemove(attributes);
          });
          Backbone.hoodie.store.on("update:" + type, function(attributes) {
            return _this.eventUpdate(attributes);
          });
          return Backbone.hoodie.remote.on("update:" + type, function(attributes) {
            return _this.eventUpdate(attributes);
          });
        }
      }
    };
    Backbone.Collection.prototype.eventAdd = function(attributes) {
      return this.add(attributes);
    };
    Backbone.Collection.prototype.eventRemove = function(attributes) {
      var id, _ref;
      id = attributes.id;
      return (_ref = this.get(id)) != null ? _ref.destroy() : void 0;
    };
    Backbone.Collection.prototype.eventUpdate = function(attributes) {
      var id, _ref;
      id = attributes.id;
      return (_ref = this.get(id)) != null ? _ref.merge(attributes) : void 0;
    };
    return Backbone;
  };

  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) && require) {
    Backbone = require("backbone");
    Hoodie = require("hoodie");
    module.exports = factory(Backbone, Hoodie);
  } else {
    factory(this.Backbone, this.Hoodie);
  }

}).call(this);
