export class TemplateEngine {
  private readonly INTERPOLATE_REGEX = /{{\s*(\w+)\s*}}/g;

  render(template: string, context: Record<string, any>): string {
    return template.replace(this.INTERPOLATE_REGEX, (match, key) => {
      return key in context ? String(context[key]) : match;
    });
  }
}
