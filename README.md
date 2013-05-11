backbone-hoodie
Ben Nevile
(begun by gr2m -- https://github.com/hoodiehq/hoodie.js/pull/56#issuecomment-17736543)


```coffeescript
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
# upon initialization, tasks will fetch() from the store

t2 = new Task {name:"groceries"}
t2.save()
# t2 will be saved into the hoodie store
# and will also be inserted into tasks

t.destroy()
# t will be deleted from the store
# and will be removed from tasks
```
