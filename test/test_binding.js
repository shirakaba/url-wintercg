import { UrlWintercg } from '../lib/binding.js';
import assert from 'assert';

assert(UrlWintercg, 'The expected module is undefined');

function testBasic() {
  const instance = new UrlWintercg('mr-yeoman');
  assert(instance.greet, 'The expected method is not defined');
  assert.strictEqual(
    instance.greet('kermit'),
    'mr-yeoman',
    'Unexpected value returned',
  );
}

function testInvalidParams() {
  new UrlWintercg();
}

assert.doesNotThrow(testBasic, undefined, 'testBasic threw an expection');
assert.throws(testInvalidParams, undefined, "testInvalidParams didn't throw");

console.log('Tests passed- everything looks OK!');
