# woot-crdt
Replicate text or sequences over networks.

Uses the WOOT CRDT algorithm: https://ieeexplore.ieee.org/document/5158449/

## example
```javascript
var w1 = new Woot('site1')
var w2 = new Woot('site1')

// send sync messages between peers
w1.on('operation', (op) => {
  // send through your network (high latency, out-of-order delivery is fine!)
  w2.receive(op)
})
w2.on('operation', (op) => {
  w1.receive(op)
})

// make concurrent changes
w1.insert('abc', 0)
w2.insert('123', 0)

// the values eventually converge!
w1.value() // 'abc123'
w2.value() // 'abc123'
```

## install
```html
<script src="dist/woot.js>"></script>
```
or
```
npm install --save woot-crdt
```

## api
### `var w = new Woot(site, [state])`
Create a new synchronized sequence.

- `site` is a globally unique identifer.
- `state` allows you to initialize from an existing sequence state. 

### `w.insert(value, index)`
Insert a new string.
- `value` is the string value to insert.
- `index` is the position to insert.

### `w.delete(index, [length])`
Delete characters.
- `index` starting position of deletion.
- `length` number of characters to delete (default is `1`).

### `w.replaceRange(value, index, length)`
Replace a range of elements with a new string.
- `value` is the string value to insert.
- `index` is the position to insert/delete.
- `length` number of characters to delete before inserting (default is `0`).

### `w.setValue(value)`
Replaces all text with the given value.
- `value` is the string value to set the text to.

### `w.value()`
Get the full string content of the sequence.

### `w.getState()`
Returns the current state of the CRDT. Can be passed into the constructor of another sequence to transfer state.

### `w.on('operation', (op) => {})`
This event fires when an operation object needs to be sent to all other synchronized sequences.

### `w.receive(op)`
Receive an operation object from another sequence.

### `w.on('insert', (event) => {})`
This event fires when a remote insertion has been integrated. Event object looks like:

```javascript
{
  value: 'a', // The character inserted
  index: 0  // The index in the sequence
}
```

### `w.on('delete', (event) => {})`
This event fires when a remote insertion has been integrated. Event object looks like:

```javascript
{
  value: 'a', // The character deleted
  index: 0  // The index in the sequence where the element was
}
```
