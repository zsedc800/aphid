/// <reference path="../../index.d.ts"/>
import { getOptions } from 'loader-utils';
import traverse from '@babel/traverse';
// import t from '@babel/types';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
export default function(this: any, source: any) {
  return source;
  console.log(source, 'source====');

  const callback: Function = this.async();
  const query = getOptions(this);
  console.log(query, 'query+==');
  const ast = parse(source);
  traverse(ast, {
    enter: (path: any) => {},
  });
  const output = generate(ast, source);
  console.log(output);
  callback(null, output.code);
}
