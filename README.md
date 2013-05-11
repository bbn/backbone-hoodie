backbone-hoodie adapter

Ben Nevile

(begun by gr2m -- https://github.com/hoodiehq/hoodie.js/pull/56#issuecomment-17736543)


```coffeescript
Backbone.connect() #creates a new hoodie at Backbone.hoodie

class Task extends Backbone.Model
  type: "task"
  defaults: 
    name: "New Task"

class TaskCollection extends Backbone.Collection  
  model: Task


t = new Task {name:"laundry"}
t.save() 
# t will be saved into the hoodie store

tasks = new TaskCollection()
# upon initialization, tasks will fetch() all Task models from the datastore.
# it'll find t and insert t in tasks.

t2 = new Task {name:"groceries"}
t2.save()
# t2 will be saved into the hoodie store
# and will also be inserted into tasks

t.destroy()
# t will be deleted from the store
# and will be removed from tasks
```
