export function pick(object: { [key: string]: any }, props: Array<string>) {
  const target: { [key: string]: any } = {};
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && props.includes(key)) {
      target[key] = object[key];
    }
  }
  return target;
}

export function omit(object: { [key: string]: any }, props: Array<string>) {
  const target: { [key: string]: any } = {};
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && !props.includes(key)) {
      target[key] = object[key];
    }
  }
  return target;
}
