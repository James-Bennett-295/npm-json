JSON utilities.

**Typescript examples**
```ts
import { stripComments, parseJsonc, readJsonc } from "@james-bennett-295/json";

const json = `{
  "a": "some // text", // single line comment
  /*
   * multi-line comment
   */
  "b": 3
}`;

console.log(stripComments(json)); /* STRING:
                                      {
                                        "a": "some // text", 

                                        "b": 3
                                      }
                                  */

console.log(parseJsonc(json)); /* OBJECT:
                                   { a: 'some // text', b: 3 }
                               */

console.log(readJsonc("./file.jsonc")); /* OBJECT:
                                            { x: 'from json in file.jsonc' }
                                        */
```
