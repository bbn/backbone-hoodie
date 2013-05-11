Backbone.connect = (url) ->
  Backbone.hoodie = new Hoodie url

Backbone.sync = (method, modelOrCollection, options) ->
  {id, attributes, type} = modelOrCollection
  type                 or= modelOrCollection.model.prototype.type

  promise = switch method
    when "read"
      if id
        Backbone.hoodie.store.find type, id
      else
        Backbone.hoodie.store.findAll type

    when "create" then Backbone.hoodie.store.add type, attributes
    when "update" then Backbone.hoodie.store.update type, id, attributes
    when "delete" then Backbone.hoodie.store.remove type, id

  promise.done options.success if options.success
  promise.fail options.error if options.error

# simple merge strategy: remote always wins.
# Feel free to overwrite.
Backbone.Model::merge           = (attributes) ->
  @set attributes, remote: true

# Make Collections listen to events.
Backbone.Collection::initialize = ->
  if @model
    type = @model.prototype.type
    @fetch()

    if type
      Backbone.hoodie.store.on    "add:#{type}", (attributes) =>
        @add attributes

      Backbone.hoodie.store.on "remove:#{type}", (attributes,options) =>
        id = attributes.id
        @get(id)?.destroy options

      Backbone.hoodie.store.on "update:#{type}", (attributes,options) =>
        if options.remote
          id = attributes.id
          @get(id)?.merge attributes
