import { Middleware, Context } from '@curveball/kernel';
import { getPrivilegesForResource } from '../a12n';

export default function aclMw(): Middleware {

  return async (ctx, next) => {

    if ('acl' in ctx.query) return aclDocument(ctx);

    await next();
    aclLink(ctx);

  };

}

/**
 * Adds a 'acl' link to the response.
 */
function aclLink(ctx: Context) {

  if (ctx.privileges.has('admin')) {
    ctx.response.links.add({
      rel: 'acl',
      href: ctx.path + '?acl',
      title: 'ACL',
    });
  }

}

/**
 * Renders the 'ACL document'
 */
async function aclDocument(ctx: Context) {

  const aclEntries = await getPrivilegesForResource(
    new URL(ctx.path, ctx.request.origin)
  );

  ctx.response.body = {
    _links: {
      self: {
        href: ctx.path + '?acl',
        title: 'ACL rules for ' + ctx.path
      }
    },
    rules: aclEntries,
  };

}
