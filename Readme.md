# awesome-print

Beautifully print your JS objects.
Port of Michael Dvorkin's [awesome_print](https://github.com/michaeldv/awesome_print), which is written in Ruby.


### Installation

```
$ npm install awesome-print --save
```


### Usage

```javascript
var print = require('awesome-print');

print({
  id: 100,
  name: 'Michael White',
  email: 'example-99@railstutorial.org',
  created_at: new Date(),
  updated_at: new Date(),
  remember_digest: undefined,
  admin: false,
  activated: true,
  reset_digest: null,
  items: [1, 2, 3],
  test: function something () { console.log('some function'); }
});
```

![](http://cl.ly/image/3m14172Q3M2G/direct)


### License

awesome-print is released under MIT license.
