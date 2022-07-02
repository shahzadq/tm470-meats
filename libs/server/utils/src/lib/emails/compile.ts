import { compile } from 'handlebars';

export async function compileHtmlTemplate(source: string, replacements: any) {
  try {
    const template = compile(source);
    return template(replacements);
  } catch (err) {
    return err;
  }
}
