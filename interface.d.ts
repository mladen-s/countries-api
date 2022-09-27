export type JSONValue =
  | string
  | number
  | boolean
  | { [property: string]: JSONValue }
  | { [Key in JSONValue]: JSONValue }
  | JSONValue[];
